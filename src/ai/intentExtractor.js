import { getExtractionModel, getFallbackChatModel } from './aishwarya.js';
import { logger } from '../utils/logger.js';

export async function extractIntent(userMessage, conversationHistory = []) {
  const contextStr = conversationHistory.slice(-4).map(t =>
    `${t.role === 'user' ? 'User' : 'Aishwarya'}: ${t.content}`
  ).join('\n');

  const prompt = contextStr
    ? `Previous context:\n${contextStr}\n\nNew message: ${userMessage}`
    : userMessage;

  // Try primary model first, fall back to stable model
  for (const getModel of [getExtractionModel, getFallbackChatModel]) {
    try {
      const model = getModel();
      const result = await model.generateContent(prompt);
      const raw = result.response.text().trim();

      // Strip accidental markdown
      const cleaned = raw
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      logger.info('Intent extracted', {
        intent: parsed.intent,
        confidence: parsed.confidence,
        language: parsed.language_detected,
      });

      return parsed;
    } catch (err) {
      logger.error('Intent extraction attempt failed', {
        error: err.message,
        model: getModel.name,
      });
      // Try fallback model
      continue;
    }
  }

  // Both models failed — return safe default
  logger.error('All intent extraction attempts failed — using fallback');
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

export function mergeSlots(existingSlots = {}, newSlots = {}) {
  const merged = { ...existingSlots };
  for (const [key, value] of Object.entries(newSlots)) {
    if (value !== null && value !== undefined && value !== '') {
      merged[key] = value;
    }
  }
  return merged;
}

const CLARIFICATION_QUESTIONS = {
  role: 'What specific role are you looking to fill?',
  skill: 'What specific skill or expertise do you need?',
  service_type: 'What type of service are you looking for exactly?',
  domain: 'Which domain or industry is this for?',
  budget_min: 'What is your approximate budget for this?',
  location: 'Does location matter, or are you open to remote?',
  timeline: 'When do you need this by?',
  industry: 'Which industry or sector is this for?',
  experience_years: 'How many years of experience are you looking for?',
  engagement_type: 'Are you looking for a one-time project, ongoing retainer, or something else?',
  product_name: "What's the name of your product or startup?",
};

const VAGUE_CLARIFICATIONS = {
  website: 'What kind of website? Business website, SaaS platform, ecommerce store, or portfolio?',
  app: 'What kind of app — mobile (iOS/Android), web app, or both?',
  marketing: 'What kind of marketing? Social media, performance ads, SEO, content, or full-service?',
  design: 'What kind of design? UI/UX, branding, logo, or marketing creatives?',
};

export function getClarificationQuestion(missingSlots, intent, requirementSummary) {
  const lowerSummary = requirementSummary?.toLowerCase() || '';
  for (const [keyword, question] of Object.entries(VAGUE_CLARIFICATIONS)) {
    if (lowerSummary.includes(keyword) && missingSlots.includes('service_type')) {
      return question;
    }
  }
  for (const slot of missingSlots) {
    if (CLARIFICATION_QUESTIONS[slot]) {
      return CLARIFICATION_QUESTIONS[slot];
    }
  }
  return 'Could you share a bit more detail about what you need?';
}

const REGISTRATION_FIELDS = [
  { key: 'reg_name', question: "What's your name or your business name?" },
  { key: 'reg_category', question: "Which category best describes you?\n\n1. Freelancer\n2. Agency\n3. Consultant\n4. Startup\n5. Service Provider\n6. Mentor\n7. Investor\n8. Vendor\n9. Creator\n10. Event Organizer\n\nJust reply with the number." },
  { key: 'reg_tagline', question: "Give me a one-line pitch — what do you do?" },
  { key: 'reg_description', question: "Now a bit more detail — describe your services and what makes you the right person to work with." },
  { key: 'reg_services', question: "List your top 3-5 services or skills (comma separated)." },
  { key: 'reg_industries', question: "Which industries do you typically work with? (e.g. SaaS, Fintech, D2C, Healthcare)" },
  { key: 'reg_location', question: "Which city are you based in?" },
  { key: 'reg_pricing', question: "What is your pricing range? (e.g. Rs.5,000-Rs.20,000 per project)" },
  { key: 'reg_website', question: "Share your website or portfolio link (or type 'skip' if you don't have one)." },
  { key: 'reg_whatsapp', question: "What WhatsApp number should interested people reach you on?" },
];

export function getNextRegistrationQuestion(partialSlots) {
  for (const field of REGISTRATION_FIELDS) {
    if (!partialSlots[field.key]) {
      return { field: field.key, question: field.question };
    }
  }
  return null;
}

const CATEGORY_MAP = {
  '1': 'freelancer', '2': 'agency', '3': 'consultant',
  '4': 'startup', '5': 'service_provider', '6': 'mentor',
  '7': 'investor', '8': 'vendor', '9': 'creator', '10': 'event_organizer',
};

export function mapCategoryInput(input) {
  return CATEGORY_MAP[input.trim()] || input.toLowerCase().replace(/\s+/g, '_');
}
