import { getExtractionModel, getFallbackChatModel } from './aishwarya.js';
import { logger } from '../utils/logger.js';

export async function extractIntent(userMessage, conversationHistory = []) {
  const contextStr = conversationHistory.slice(-4).map(t =>
    `${t.role === 'user' ? 'User' : 'Aishwarya'}: ${t.content}`
  ).join('\n');

  const prompt = contextStr
    ? `Previous context:\n${contextStr}\n\nNew message: ${userMessage}`
    : userMessage;

  for (const getModel of [getExtractionModel, getFallbackChatModel]) {
    try {
      const model = getModel();
      const result = await model.generateContent(prompt);
      const raw = result.response.text().trim();

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
      continue;
    }
  }

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
  state: 'Which state or region should they be in?',
  timeline: 'When do you need this by?',
  industry: 'Which industry or sector is this for?',
  experience_years: 'How many years of experience are you looking for?',
  experience_level: 'What experience level do you need — junior, mid, senior, or lead?',
  engagement_type: 'Are you looking for full-time, part-time, freelance, contract, or advisory?',
  funding_stage: 'What funding stage are you targeting — bootstrapped, pre-seed, seed, or series-a?',
  open_to: 'Are you looking for someone open to investment, mentorship, co-founder, or hiring?',
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

const BASE_REGISTRATION_FIELDS = [
  { key: 'reg_name', question: "What's your name or your business name?" },
  {
    key: 'reg_profile_type',
    question: `Which category best describes you?

1. Founder / Startup
2. Freelancer
3. Agency
4. Developer / Engineer
5. Designer
6. Consultant
7. Mentor
8. Investor
9. Job Seeker
10. Student / Intern
11. Service Provider
12. Manufacturer / Vendor
13. Creator / Influencer
14. Recruiter / HR
15. Other Professional

Just reply with the number.`,
  },
  { key: 'reg_tagline', question: 'Give me a one-line pitch — what do you do?' },
  { key: 'reg_description', question: 'Now a bit more detail — describe your services and what makes you the right person to work with.' },
  { key: 'reg_location', question: 'Which city are you based in?' },
  { key: 'reg_pricing', question: "What is your pricing range? (e.g. Rs.5,000-Rs.20,000 per project, or type 'skip')" },
  { key: 'reg_website', question: "Share your website or portfolio link (or type 'skip' if you don't have one)." },
  { key: 'reg_whatsapp', question: 'What WhatsApp number should interested people reach you on?' },
];

const CONDITIONAL_REGISTRATION_FIELDS = {
  founder_startup: [
    { key: 'reg_company_name', question: "What's your company or startup name?" },
    { key: 'reg_funding_stage', question: 'What stage are you at? (bootstrapped / pre-seed / seed / series-a)' },
    { key: 'reg_looking_for', question: 'What do you need from the ecosystem? (comma separated — e.g. co-founder, funding, mentorship)' },
  ],
  investor: [
    { key: 'reg_investment_thesis', question: 'What is your investment thesis in one or two sentences?' },
    { key: 'reg_preferred_sectors', question: 'Which sectors do you prefer to invest in? (comma separated)' },
    { key: 'reg_pricing', question: "What's your typical check size range? (e.g. Rs.10L-Rs.50L)" },
  ],
  job_seeker: [
    { key: 'reg_preferred_roles', question: 'What roles are you looking for? (comma separated)' },
    { key: 'reg_notice_period', question: "What's your notice period? (e.g. immediate, 1 month, 2 months)" },
    { key: 'reg_pricing', question: "What's your expected CTC? (e.g. Rs.8L-Rs.12L)" },
  ],
  student: [
    { key: 'reg_graduation_year', question: 'When do you graduate (or when did you)? (year)' },
    { key: 'reg_field_of_study', question: 'What field are you studying?' },
    { key: 'reg_seeking', question: 'What opportunities are you looking for? (internship, full-time, mentorship — comma separated)' },
  ],
};

const DEFAULT_CONDITIONAL_FIELDS = [
  { key: 'reg_services', question: 'List your top 3-5 services or skills (comma separated).' },
  { key: 'reg_problems_solved', question: 'What problems do you solve for your clients? (comma separated)' },
  { key: 'reg_industries', question: 'Which industries do you typically work with? (comma separated)' },
];

export function getRegistrationFields(slots = {}) {
  const profileType = slots.reg_profile_type || slots.reg_category;
  const fields = [...BASE_REGISTRATION_FIELDS];

  const typeIndex = fields.findIndex(f => f.key === 'reg_profile_type');
  if (typeIndex !== -1 && profileType) {
    const conditional = CONDITIONAL_REGISTRATION_FIELDS[profileType] || DEFAULT_CONDITIONAL_FIELDS;
    fields.splice(typeIndex + 1, 0, ...conditional);
  }

  return fields;
}

export function getNextRegistrationQuestion(partialSlots) {
  const fields = getRegistrationFields(partialSlots);
  for (const field of fields) {
    if (!partialSlots[field.key]) {
      return { field: field.key, question: field.question };
    }
  }
  return null;
}

const PROFILE_TYPE_MAP = {
  '1': 'founder_startup',
  '2': 'freelancer',
  '3': 'agency',
  '4': 'developer',
  '5': 'designer',
  '6': 'consultant',
  '7': 'mentor',
  '8': 'investor',
  '9': 'job_seeker',
  '10': 'student',
  '11': 'service_provider',
  '12': 'manufacturer',
  '13': 'creator',
  '14': 'recruiter',
  '15': 'other',
};

export function mapCategoryInput(input) {
  const trimmed = input.trim();
  if (PROFILE_TYPE_MAP[trimmed]) return PROFILE_TYPE_MAP[trimmed];
  return trimmed.toLowerCase().replace(/\s+/g, '_').replace(/\//g, '_');
}
