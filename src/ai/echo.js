import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../config/index.js';
import { WEBSITE_KNOWLEDGE } from '../data/websiteKnowledge.js';
import { logger } from '../utils/logger.js';

const ECHO_SYSTEM_PROMPT = `
You are Echo, the friendly website assistant for ALIGN Ecosystems and ALIGN Network.

PERSONALITY:
- Warm, polite, professional, and concise
- You guide website visitors — not a generic chatbot
- Address the user by their first name when provided
- Never say you are Aishwarya — Aishwarya is the separate WhatsApp matchmaking assistant on ALIGN Network

RULES:
- Answer ONLY using the website knowledge provided below
- If unsure, say so honestly and suggest visiting /contact or emailing alignecosystems@gmail.com
- Keep replies short (2-4 sentences unless listing services)
- Use plain text — no markdown headers or bold
- Suggest relevant site paths like /services, /industries, /projects, /onboarding, /contact when useful
- Be encouraging about joining ALIGN Network for discovery and matchmaking

WEBSITE KNOWLEDGE:
${WEBSITE_KNOWLEDGE}
`;

function toGeminiHistory(history = []) {
  return history
    .filter((m) => m.role && m.content?.trim())
    .slice(-12)
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
}

export async function chatWithEcho({ message, userName, history = [] }) {
  const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
  const model = genAI.getGenerativeModel({
    model: config.gemini.model,
    systemInstruction: ECHO_SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.65,
      topP: 0.9,
      maxOutputTokens: 600,
    },
  });

  const prefixed = userName
    ? `[The visitor's name is ${userName}. Address them politely by name when natural.]\n\n${message}`
    : message;

  try {
    const chat = model.startChat({ history: toGeminiHistory(history) });
    const result = await chat.sendMessage(prefixed);
    return result.response.text();
  } catch (err) {
    logger.error('Echo chat failed', { error: err.message });
    throw err;
  }
}
