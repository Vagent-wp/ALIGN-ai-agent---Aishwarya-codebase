import { supabase } from '../utils/supabase.js';
import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';
import { extractIntent, mergeSlots, getClarificationQuestion, getNextRegistrationQuestion, mapCategoryInput } from '../ai/intentExtractor.js';
import { generateResponse, Messages } from '../ai/responseGenerator.js';
import { semanticSearch } from '../search/semanticSearch.js';
import { createLead, notifyProviders } from '../leads/leadManager.js';
import { getOrCreateUser, getUserByPhone, createProfile } from '../profiles/profileManager.js';
import { hashPhone } from '../utils/crypto.js';

// ============================================================
// CONVERSATION ENGINE
// The central brain of Aishwarya.
// Receives every message, manages state, and returns a reply.
// ============================================================

export async function processMessage(fromPhone, messageText, messageId) {
  const phoneHash = hashPhone(fromPhone);

  // 1. Load or create conversation state
  let session = await getOrCreateSession(phoneHash);

  // 2. Add user turn to history
  session = appendTurn(session, 'user', messageText);

  // 3. Get or create user record
  const user = await getOrCreateUser(fromPhone);

  // 4. Route based on current conversation state
  let reply;

  switch (session.state) {
    case 'registering':
      reply = await handleRegistration(session, messageText, user, phoneHash);
      break;

    case 'clarifying':
      reply = await handleClarification(session, messageText, user, phoneHash);
      break;

    case 'awaiting_confirmation':
      reply = await handleConfirmation(session, messageText, user, fromPhone);
      break;

    default:
      reply = await handleNewMessage(session, messageText, user, phoneHash, fromPhone);
  }

  // 5. Save updated session
  await saveSession(session, phoneHash);

  return reply;
}

// ============================================================
// HANDLER: NEW / IDLE MESSAGE
// ============================================================

async function handleNewMessage(session, messageText, user, phoneHash, fromPhone) {
  const lowerText = messageText.toLowerCase().trim();

  // Greetings
  if (isGreeting(lowerText)) {
    const isReturning = !!user?.name;
    const reply = isReturning
      ? Messages.alreadyKnowYou(user.name)
      : Messages.greeting();
    session.state = 'idle';
    return reply;
  }

  // Help request
  if (lowerText === 'help' || lowerText === '?') {
    return Messages.helpMenu();
  }

  // Provider ACCEPT / PASS response to a lead notification
  if (lowerText === 'accept' || lowerText === 'pass') {
    return await handleProviderLeadResponse(fromPhone, lowerText);
  }

  // Extract intent from message
  const intentData = await extractIntent(messageText, session.turn_history);
  const { intent, confidence, category_filter, slots, missing_critical_slots, requirement_summary, language_detected } = intentData;

  session.partial_slots = mergeSlots(session.partial_slots || {}, slots);
  session.partial_slots._language = language_detected;
  session.intent = intent;

  if (language_detected) {
    await getOrCreateUser(fromPhone, 'seeker', language_detected);
  }

  logger.debug('Intent detected', { intent, confidence, missing: missing_critical_slots });

  // Registration intent
  if (intent === 'registration') {
    session.state = 'registering';
    const reply = Messages.registrationStart(language_detected);
    return reply;
  }

  // Off-topic or greeting
  if (intent === 'off_topic' || intent === 'greeting') {
    return Messages.offTopic(language_detected);
  }

  // Low confidence — ask for clarification
  if (confidence < 0.5) {
    session.state = 'clarifying';
    session.clarification_count = (session.clarification_count || 0) + 1;
    return await generateResponse(
      messageText,
      session.turn_history,
      { systemContext: `Intent confidence is low (${confidence}). Ask the user to clarify what they're looking for. Be warm and helpful.` }
    );
  }

  // Missing critical slots — clarify before searching
  if (
    missing_critical_slots?.length > 0 &&
    (session.clarification_count || 0) < config.agent.maxClarificationTurns
  ) {
    session.state = 'clarifying';
    session.clarification_count = (session.clarification_count || 0) + 1;
    const question = getClarificationQuestion(missing_critical_slots, intent, requirement_summary);
    return Messages.clarificationNeeded(question, language_detected);
  }

  // All good — perform search
  return await performSearch(session, user, phoneHash, language_detected, requirement_summary);
}

// ============================================================
// HANDLER: CLARIFICATION TURN
// ============================================================

async function handleClarification(session, messageText, user, phoneHash) {
  // Extract slots from clarification answer and merge
  const intentData = await extractIntent(messageText, session.turn_history);
  session.partial_slots = mergeSlots(session.partial_slots || {}, intentData.slots);

  // If they now mention registration
  if (intentData.intent === 'registration') {
    session.state = 'registering';
    return Messages.registrationStart(intentData.language_detected);
  }

  // Check if we still have critical missing slots and have turns left
  const stillMissing = intentData.missing_critical_slots?.filter(
    slot => !session.partial_slots[slot]
  ) || [];

  if (
    stillMissing.length > 0 &&
    (session.clarification_count || 0) < config.agent.maxClarificationTurns
  ) {
    session.clarification_count = (session.clarification_count || 0) + 1;
    const question = getClarificationQuestion(stillMissing, session.intent, intentData.requirement_summary);
    return Messages.clarificationNeeded(question, intentData.language_detected);
  }

  // Enough info — search
  const requirementSummary = intentData.requirement_summary || session.partial_slots?.additional_context || messageText;
  return await performSearch(session, user, phoneHash, intentData.language_detected, requirementSummary);
}

// ============================================================
// HANDLER: AWAITING CONFIRMATION (user picks 1, 2, or 3)
// ============================================================

async function handleConfirmation(session, messageText, user, fromPhone) {
  const choice = messageText.trim();
  const idx = parseInt(choice) - 1;
  const matches = session.partial_slots?._shown_matches || [];

  if (isNaN(idx) || idx < 0 || idx >= matches.length) {
    return `Please reply with 1, 2, or 3 to choose which profile you'd like more details on.`;
  }

  const chosen = matches[idx];

  // Build and return detailed profile card
  const reply = Messages.profileDetail(chosen, session.partial_slots?._language || 'english');

  // Move to next confirmation state — waiting for "Yes" to connect
  session.partial_slots._chosen_profile = chosen;
  session.state = 'awaiting_confirmation';

  return reply;
}

// ============================================================
// HANDLER: YES/NO after profile detail — connect or not
// ============================================================

// Extended confirmation handler — if user says Yes after profile detail
async function handleConnectionConfirmation(session, messageText, user, fromPhone) {
  const lowerText = messageText.toLowerCase().trim();
  const isYes = lowerText === 'yes' || lowerText === 'y' || lowerText === 'haan' || lowerText === 'ha';

  if (!isYes) {
    session.state = 'idle';
    session.partial_slots = {};
    return `No problem! Is there anything else I can help you with?`;
  }

  const chosenProfile = session.partial_slots?._chosen_profile;
  const lead = session.partial_slots?._current_lead;

  if (!chosenProfile || !lead) {
    session.state = 'idle';
    return Messages.error();
  }

  // Notify the chosen provider
  await notifyProviders(lead, [chosenProfile]);

  session.state = 'idle';
  session.partial_slots = {};

  return `I've sent your requirement to ${chosenProfile.name}. They'll reach out to you on WhatsApp shortly.

Is there anything else you need?`;
}

// ============================================================
// HANDLER: REGISTRATION FLOW
// ============================================================

async function handleRegistration(session, messageText, user, phoneHash) {
  const slots = session.partial_slots || {};

  if (slots._awaiting_profile_type) {
    const mapped = mapCategoryInput(messageText);
    slots.reg_profile_type = mapped;
    slots.reg_category = mapped;
    delete slots._awaiting_profile_type;
    session.partial_slots = slots;
  } else {
    const lastField = slots._last_reg_field;
    if (lastField) {
      slots[lastField] = messageText.trim();
      delete slots._last_reg_field;
      session.partial_slots = slots;
    }
  }

  const next = getNextRegistrationQuestion(slots);

  if (next) {
    session.partial_slots._last_reg_field = next.field;
    if (next.field === 'reg_profile_type') {
      session.partial_slots._awaiting_profile_type = true;
    }
    return next.question;
  }

  // All fields collected — save profile
  const profile = await createProfile(user.id, slots);

  if (!profile) {
    return Messages.error();
  }

  // Reset session
  session.state = 'idle';
  session.partial_slots = {};
  session.clarification_count = 0;

  return Messages.registrationComplete(slots.reg_name);
}

// ============================================================
// CORE SEARCH + RESPONSE
// ============================================================

async function performSearch(session, user, phoneHash, language, requirementSummary) {
  // Send searching indicator
  const searchingMsg = Messages.searching(language);

  const results = await semanticSearch({
    slots: session.partial_slots || {},
    intent: session.intent,
    categoryFilter: session.partial_slots?._category_filter || [],
    requirementSummary,
    location: session.partial_slots?.location || null,
  });

  if (!results || results.length === 0) {
    session.state = 'idle';
    session.partial_slots = {};
    session.clarification_count = 0;
    return Messages.noMatches(requirementSummary, language);
  }

  const shownMatches = results.slice(0, config.agent.shownResultsCount);

  // Create lead
  const lead = await createLead({
    seekerPhoneHash: phoneHash,
    seekerUserId: user?.id,
    intent: session.intent,
    requirementText: requirementSummary,
    slots: session.partial_slots || {},
    allMatches: results,
    shownMatches,
  });

  // Store matches and lead in session for confirmation step
  session.partial_slots._shown_matches = shownMatches;
  session.partial_slots._current_lead = lead;
  session.partial_slots._language = language;
  session.state = 'awaiting_confirmation';
  session.clarification_count = 0;
  session.current_lead_id = lead?.id || null;

  return Messages.matchesFound(shownMatches, requirementSummary, language, session.partial_slots || {});
}

// ============================================================
// PROVIDER LEAD RESPONSE (ACCEPT / PASS)
// ============================================================

async function handleProviderLeadResponse(fromPhone, action) {
  const { handleProviderResponse } = await import('../leads/leadManager.js');
  const result = await handleProviderResponse(fromPhone, action);

  if (!result) {
    return `I don't have a pending lead for your profile right now. If you received a notification earlier, it may have expired.`;
  }

  if (result.action === 'passed') {
    return `Noted! I've marked this lead as passed. You'll receive the next relevant lead soon.`;
  }

  if (result.action === 'accepted') {
    return `Great! I'll connect you with the person right away. They'll receive your contact details shortly. 🤝`;
  }

  return Messages.error();
}

// ============================================================
// SESSION MANAGEMENT
// ============================================================

async function getOrCreateSession(phoneHash) {
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .eq('phone_hash', phoneHash)
    .single();

  if (existing) {
    // Check session timeout
    const lastActive = new Date(existing.last_active_at);
    const minutesSinceActive = (Date.now() - lastActive.getTime()) / 60000;

    if (minutesSinceActive > config.agent.sessionTimeoutMinutes) {
      // Reset expired session
      return {
        ...existing,
        state: 'idle',
        partial_slots: {},
        turn_history: [],
        clarification_count: 0,
        current_lead_id: null,
      };
    }

    return existing;
  }

  return {
    phone_hash: phoneHash,
    state: 'idle',
    partial_slots: {},
    turn_history: [],
    clarification_count: 0,
    current_lead_id: null,
    last_active_at: new Date().toISOString(),
  };
}

async function saveSession(session, phoneHash) {
  const payload = {
    phone_hash: phoneHash,
    state: session.state,
    intent: session.intent || null,
    partial_slots: session.partial_slots || {},
    turn_history: (session.turn_history || []).slice(-10), // keep last 10 turns
    current_lead_id: session.current_lead_id || null,
    clarification_count: session.clarification_count || 0,
    last_active_at: new Date().toISOString(),
  };

  await supabase
    .from('conversations')
    .upsert(payload, { onConflict: 'phone_hash' });
}

function appendTurn(session, role, content) {
  const history = session.turn_history || [];
  history.push({ role, content, timestamp: new Date().toISOString() });
  return { ...session, turn_history: history };
}

// ============================================================
// HELPERS
// ============================================================

function isGreeting(text) {
  const greetings = [
    'hi', 'hello', 'hey', 'hii', 'helo', 'namaste', 'namaskar',
    'good morning', 'good afternoon', 'good evening', 'sup', 'yo',
    'start', 'hola', 'salut', 'kya haal', 'kaise ho',
  ];
  return greetings.some(g => text === g || text.startsWith(g + ' '));
}
