import { getExtractionModel } from './aishwarya.js';
import { logger } from '../utils/logger.js';

// ============================================================
// INTENT EXTRACTOR
// Calls Gemini in extraction mode, returns structured intent object
// ============================================================

export async function extractIntent(userMessage, conversationHistory = []) {
  try {
    const model = getExtractionModel();

    // Include last 2 turns for context (slot carryover)
    const contextStr = conversationHistory.slice(-4).map(t =>
      `${t.role === 'user' ? 'User' : 'Aishwarya'}: ${t.content}`
    ).join('\n');

    const prompt = contextStr
      ? `Previous context:\n${contextStr}\n\nNew message: ${userMessage}`
      : userMessage;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    // Strip any accidental markdown backticks
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    logger.debug('Intent extracted', {
      message: userMessage.substring(0, 80),
      intent: parsed.intent,
      confidence: parsed.confidence,
      slots: parsed.slots,
    });

    return parsed;
  } catch (err) {
    logger.error('Intent extraction failed', { error: err.message });
    // Safe fallback
    return {
      intent: 'off_topic',
      confidence: 0,
      category_filter: [],
      slots: {},
      missing_critical_slots: [],
      requirement_summary: userMessage,
      language_detected: 'english',
    };
  }
}

// ============================================================
// SLOT MERGER
// Merges new slots with existing partial slots from conversation state
// ============================================================

export function mergeSlots(existingSlots = {}, newSlots = {}) {
  const merged = { ...existingSlots };
  for (const [key, value] of Object.entries(newSlots)) {
    if (value !== null && value !== undefined && value !== '') {
      merged[key] = value;
    }
  }
  return merged;
}

// ============================================================
// CLARIFICATION QUESTION GENERATOR
// Decides what single question to ask based on missing slots and intent
// ============================================================

const CLARIFICATION_QUESTIONS = {
  role: 'What specific role are you looking to fill?',
  skill: 'What specific skill or expertise do you need?',
  service_type: 'What type of service are you looking for exactly?',
  domain: 'Which domain or industry is this for?',
  budget_min: 'What is your approximate budget for this?',
  location: 'Does the location matter, or are you open to remote as well?',
  timeline: 'When do you need this by?',
  industry: 'Which industry or sector is this for?',
  experience_years: 'How many years of experience are you looking for?',
  engagement_type: 'Are you looking for a one-time project, ongoing retainer, or something else?',
  product_name: "What's the name of your product or startup?",
};

// Website type clarification for vague "need a website" requests
const VAGUE_CLARIFICATIONS = {
  website: 'What kind of website? Business website, SaaS platform, ecommerce store, or portfolio?',
  app: 'What kind of app? Mobile app (iOS/Android), web app, or both?',
  marketing: 'What kind of marketing help? Social media, performance ads, SEO, content, or full-service?',
  design: 'What kind of design work? UI/UX, branding, logo, or marketing creatives?',
};

export function getClarificationQuestion(missingSlots, intent, requirementSummary) {
  // Check if the requirement is vague and needs specific clarification
  const lowerSummary = requirementSummary?.toLowerCase() || '';
  for (const [keyword, question] of Object.entries(VAGUE_CLARIFICATIONS)) {
    if (lowerSummary.includes(keyword) && missingSlots.includes('service_type')) {
      return question;
    }
  }

  // Return the first missing critical slot question
  for (const slot of missingSlots) {
    if (CLARIFICATION_QUESTIONS[slot]) {
      return CLARIFICATION_QUESTIONS[slot];
    }
  }

  // Generic fallback
  return 'Could you share a bit more detail about what you need?';
}

// ============================================================
// REGISTRATION SLOT COLLECTOR
// Returns the next question to ask during profile registration
// ============================================================

const REGISTRATION_FIELDS = [
  { key: 'reg_name', question: "What's your name or your business name?" },
  { key: 'reg_category', question: "Which category best describes you?\n\n1. Freelancer\n2. Agency\n3. Consultant\n4. Startup\n5. Service Provider\n6. Mentor\n7. Investor\n8. Vendor\n9. Creator\n10. Event Organizer\n\nJust reply with the number." },
  { key: 'reg_tagline', question: "Give me a one-line pitch — what do you do?" },
  { key: 'reg_description', question: "Now a bit more detail — describe your services and what makes you the right person to work with." },
  { key: 'reg_services', question: "List your top 3-5 services or skills (comma separated)." },
  { key: 'reg_industries', question: "Which industries do you typically work with? (e.g. SaaS, Fintech, D2C, Healthcare)" },
  { key: 'reg_location', question: "Which city are you based in?" },
  { key: 'reg_pricing', question: "What is your pricing range? (e.g. ₹5,000–₹20,000 per project / ₹500/hour)" },
  { key: 'reg_website', question: "Share your website or portfolio link (or type 'skip' if you don't have one)." },
  { key: 'reg_whatsapp', question: "What WhatsApp number should interested people reach you on?" },
];

export function getNextRegistrationQuestion(partialSlots) {
  for (const field of REGISTRATION_FIELDS) {
    if (!partialSlots[field.key]) {
      return { field: field.key, question: field.question };
    }
  }
  return null; // All fields collected
}

const CATEGORY_MAP = {
  '1': 'freelancer', '2': 'agency', '3': 'consultant',
  '4': 'startup', '5': 'service_provider', '6': 'mentor',
  '7': 'investor', '8': 'vendor', '9': 'creator', '10': 'event_organizer',
};

export function mapCategoryInput(input) {
  return CATEGORY_MAP[input.trim()] || input.toLowerCase().replace(/\s+/g, '_');
}
