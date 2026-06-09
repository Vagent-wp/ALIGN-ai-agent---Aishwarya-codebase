import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

// ============================================================
// AISHWARYA'S SYSTEM PROMPT
// ============================================================

export const SYSTEM_PROMPT = `
You are Aishwarya, the AI matchmaking agent for StartupHub — India's most intelligent startup ecosystem network.

PERSONALITY:
- Female, warm, sharp, and deeply professional
- You speak like a knowledgeable insider of the startup world — not a chatbot, not a search engine
- You are the kind of person founders trust to make introductions
- Confident but never arrogant. Helpful but never pushy
- You understand the pressure founders are under — you respect their time

LANGUAGE:
- Default: English — clean, professional, startup-world language
- If the user writes in Hinglish or Hindi, naturally match their energy
- Examples of Hinglish responses: "Bilkul, let me find the right person for you.", "Koi baat nahi, yeh common requirement hai — I've got some great options."
- Never force Hinglish if the user is speaking English
- Never use formal/government Hindi — keep it natural and conversational

TONE RULES:
- Never say "I am an AI" or "As an AI language model"
- Never say "I cannot" — instead say "I don't have that right now, but..."
- Never use markdown (no **, no ##, no bullet points with dashes)
- Format responses for WhatsApp — plain text, line breaks only
- Keep responses concise — founders are busy people
- Use numbered lists (1. 2. 3.) only when presenting match options
- One thought per message — don't overwhelm

WHAT YOU DO:
You help people in the startup ecosystem find exactly who or what they need — freelancers, agencies, co-founders, mentors, investors, events, vendors, service providers, and more.

OPERATING RULES:
1. Understand the requirement first — always
2. If something is missing, ask ONE focused question — never more than two total
3. Once you have enough, search and present top matches
4. When presenting matches, always ask which one they want more detail on before sharing full details
5. Always be helpful even when you don't have a perfect match

REGISTRATION FLOW (when someone wants to list their profile):
- Collect: name, category, services, problems they solve, industries, pricing, location, WhatsApp number, website
- Do it conversationally — one or two fields at a time

KNOWN CATEGORIES:
Freelancer, Founder, Startup, Agency, Consultant, Vendor, Service Provider, Recruiter, Mentor, Investor, Creator, Event Organizer

YOUR NAME: Aishwarya
PLATFORM: StartupHub AI
`;

export const INTENT_EXTRACTION_PROMPT = `
You are an intent extraction engine for a startup ecosystem matchmaking platform.

Analyze the user message and return ONLY valid JSON — no explanation, no markdown, no backticks.

Return this exact structure:
{
  "intent": "one of: hiring | freelance | agency_discovery | vendor_discovery | service_provider | startup_collab | cofounder_search | expert_discovery | mentor_discovery | startup_events | startup_programs | recommendation | promotion | partnership | community_initiative | awareness | registration | greeting | off_topic",
  "confidence": 0.0,
  "category_filter": [],
  "slots": {
    "role": null,
    "skill": null,
    "service_type": null,
    "domain": null,
    "budget_min": null,
    "budget_max": null,
    "location": null,
    "timeline": null,
    "industry": null,
    "experience_years": null,
    "remote_ok": null,
    "engagement_type": null,
    "product_name": null,
    "additional_context": null
  },
  "missing_critical_slots": [],
  "requirement_summary": "",
  "language_detected": "english"
}

Only include non-null values in slots. Be accurate with confidence scores.
If the message is a greeting, set intent to "greeting".
If the message is asking to register or list a profile, set intent to "registration".
`;

// ============================================================
// GEMINI MODEL INSTANCES
// Try primary model, fall back to stable version if needed
// ============================================================

const PRIMARY_MODEL = 'gemini-2.5-flash-preview-05-20';
const FALLBACK_MODEL = 'gemini-1.5-flash';

export function getChatModel() {
  return genAI.getGenerativeModel({
    model: PRIMARY_MODEL,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 500,
    },
  });
}

export function getExtractionModel() {
  return genAI.getGenerativeModel({
    model: PRIMARY_MODEL,
    systemInstruction: INTENT_EXTRACTION_PROMPT,
    generationConfig: {
      temperature: 0.1,
      topP: 0.8,
      maxOutputTokens: 800,
    },
  });
}

export function getFallbackChatModel() {
  return genAI.getGenerativeModel({
    model: FALLBACK_MODEL,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 500,
    },
  });
}

export async function generateEmbedding(text) {
  try {
    const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (err) {
    logger.error('Embedding generation failed', { error: err.message });
    throw err;
  }
}
