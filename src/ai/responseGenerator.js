import { getChatModel } from './aishwarya.js';
import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';

// ============================================================
// RESPONSE GENERATOR
// All of Aishwarya's messages come through here
// ============================================================

// Build Gemini chat history format from our turn_history
function buildChatHistory(turnHistory = []) {
  return turnHistory.slice(-10).map(turn => ({
    role: turn.role === 'user' ? 'user' : 'model',
    parts: [{ text: turn.content }],
  }));
}

// Core: generate a contextual response using full conversation history
export async function generateResponse(userMessage, turnHistory = [], context = {}) {
  try {
    const model = getChatModel();
    const chat = model.startChat({ history: buildChatHistory(turnHistory) });

    // Inject context into the message if available (search results, etc.)
    const augmentedMessage = context.systemContext
      ? `[CONTEXT FOR AISHWARYA - not shown to user]\n${context.systemContext}\n[END CONTEXT]\n\nUser message: ${userMessage}`
      : userMessage;

    const result = await chat.sendMessage(augmentedMessage);
    return result.response.text().trim();
  } catch (err) {
    logger.error('Response generation failed', { error: err.message });
    return `I'm having a small technical issue right now. Could you repeat that? I want to make sure I help you properly.`;
  }
}

// ============================================================
// TEMPLATED MESSAGES
// Critical messages use templates for consistency and reliability.
// These are NOT sent through Gemini — they are deterministic.
// ============================================================

export const Messages = {

  greeting(name = null) {
    const greeting = name ? `Hi ${name}! 👋` : 'Hi there! 👋';
    return `${greeting} I'm Aishwarya, your startup ecosystem matchmaker at StartupHub.

I help founders, builders, and creators find exactly who they need — whether that's a co-founder, a designer, a legal expert, a marketing agency, a mentor, or anything in between.

What are you looking for today?`;
  },

  alreadyKnowYou(name) {
    return `Welcome back${name ? `, ${name}` : ''}! What can I help you with today?`;
  },

  clarificationNeeded(question, language = 'english') {
    if (language === 'hinglish') {
      return `Understood! Bas ek quick question — ${question}`;
    }
    return `Got it! Quick question before I search — ${question}`;
  },

  searching(language = 'english') {
    if (language === 'hinglish') {
      return 'Perfect, let me find the best options for you... ⚡';
    }
    return 'Perfect. Let me find the right people for you... ⚡';
  },

  matchesFound(matches, requirementSummary, language = 'english') {
    const intro = language === 'hinglish'
      ? `Great news! "${requirementSummary}" ke liye mujhe kuch excellent options mile hain:\n\n`
      : `I found some excellent matches for "${requirementSummary}":\n\n`;

    const list = matches.map((m, i) => {
      const location = m.location_city ? ` • ${m.location_city}` : '';
      const verified = m.verification_tier === 'identity_verified' ? ' ✓' : '';
      const premium = m.is_premium ? ' ⭐' : '';
      return `${i + 1}. *${m.name}*${verified}${premium}\n${m.tagline || m.description?.substring(0, 80) + '...'}${location}`;
    }).join('\n\n');

    const outro = language === 'hinglish'
      ? '\n\nKis ke baare mein aur detail chahiye? Reply with 1, 2, or 3.'
      : '\n\nWhich one would you like to know more about? Reply with 1, 2, or 3.';

    return intro + list + outro;
  },

  profileDetail(profile, language = 'english') {
    const lines = [
      `Here are the full details for *${profile.name}*:`,
      '',
      profile.description,
      '',
    ];

    if (profile.services?.length) {
      lines.push(`Services: ${profile.services.join(', ')}`);
    }
    if (profile.pricing_min || profile.pricing_max) {
      const min = profile.pricing_min ? `₹${Number(profile.pricing_min).toLocaleString('en-IN')}` : '';
      const max = profile.pricing_max ? `₹${Number(profile.pricing_max).toLocaleString('en-IN')}` : '';
      const range = min && max ? `${min} – ${max}` : min || max;
      lines.push(`Pricing: ${range} (${profile.pricing_model || 'varies'})`);
    }
    if (profile.location_city) {
      lines.push(`Location: ${profile.location_city}${profile.is_remote_friendly ? ' (Remote friendly)' : ''}`);
    }
    if (profile.website) {
      lines.push(`Website: ${profile.website}`);
    }
    if (profile.average_rating) {
      lines.push(`Rating: ${profile.average_rating}/5`);
    }

    lines.push('');
    lines.push('To connect with them, I\'ll let them know about your requirement. They\'ll reach out to you directly.');
    lines.push('');
    lines.push('Would you like me to notify them? Reply *Yes* to connect.');

    return lines.join('\n');
  },

  noMatches(requirementSummary, language = 'english') {
    if (language === 'hinglish') {
      return `"${requirementSummary}" ke liye abhi platform pe koi perfect match nahi hai.

Par tension mat lo — main aapki requirement note kar leti hoon. Jaise hi koi relevant profile aaye, main aapko notify karungi.

Aur kuch chahiye?`;
    }
    return `I don't have a perfect match for "${requirementSummary}" on the platform right now.

But I've noted your requirement. As soon as a relevant profile joins, I'll notify you.

Is there anything else I can help you with?`;
  },

  leadNotificationToProvider(lead, seekerRequirement) {
    return `Hello! 👋 This is Aishwarya from StartupHub.

You have a new lead that matches your profile:

*Requirement:* ${seekerRequirement}

This person is actively looking and has been matched with you based on your profile.

Reply *ACCEPT* to connect with them, or *PASS* if this isn't a good fit right now.

(This lead expires in 24 hours)`;
  },

  providerAccepted(providerName) {
    return `Great news! *${providerName}* has accepted your request and will reach out to you shortly.

Is there anything else you need?`;
  },

  connectConfirmed(providerName, providerPhone) {
    return `I've notified ${providerName} about your requirement.

You can also reach them directly:
WhatsApp: ${providerPhone}

All the best! 🚀`;
  },

  registrationStart(language = 'english') {
    if (language === 'hinglish') {
      return `Bahut badhiya! Main aapka profile StartupHub pe list kar deti hoon.

Bas kuch details chahiye — simple questions hain, ek ek karke. Ready?

Pehle bataiye — aapka naam kya hai ya aapke business ka naam kya hai?`;
    }
    return `Let's get you listed on StartupHub! 🎉

I'll collect a few details — it'll only take a couple of minutes.

First — what's your name or your business name?`;
  },

  registrationComplete(name) {
    return `Your profile is set up, ${name}! 🎉

It's currently under review — we'll activate it within 24 hours after a quick verification check.

Once it's live, you'll start receiving relevant leads directly on WhatsApp.

Welcome to StartupHub! 🚀`;
  },

  providerNotifyConnect(seekerPhone) {
    return `The person you were matched with would like to connect!

Here's their WhatsApp: ${seekerPhone}

Reach out when you're ready. Best of luck! 💼`;
  },

  helpMenu() {
    return `Here's what I can help you with:

*Find someone*
Just tell me what you need — "I need a UI designer", "Looking for a CA for GST filing", "Need a technical co-founder"

*List your profile*
Say "List my profile" or "Register my agency"

*Discover events*
"Any startup events in Bangalore this month?"

*Find programs*
"Any accelerators open for applications?"

What would you like to do?`;
  },

  rateLimitHit() {
    return `You're sending messages quite fast! Give me a moment to catch up. 😊`;
  },

  error() {
    return `I ran into a small issue on my end. Please try again in a moment — I'm here and ready to help.`;
  },

  offTopic(language = 'english') {
    if (language === 'hinglish') {
      return `Yeh meri expertise se thoda bahar hai! Main startup ecosystem ke liye hun — finding the right people, opportunities, and resources.

Kuch aur chahiye? Koi co-founder, agency, freelancer, mentor?`;
    }
    return `That's a bit outside what I'm built for! I specialise in the startup ecosystem — finding the right people, services, and opportunities for founders and builders.

Is there something along those lines I can help you with?`;
  },
};
