import rateLimit from 'express-rate-limit';
import { config } from '../../config/index.js';

// API-level rate limiter (per IP)
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please slow down.' },
});

// Per-phone in-memory rate limiter for WhatsApp messages
const phoneMessageCounts = new Map();

export function phoneRateLimiter(phone) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxMessages = config.agent.maxMessagesPerMinute;

  const key = phone;
  const entry = phoneMessageCounts.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + windowMs;
  } else {
    entry.count += 1;
  }

  phoneMessageCounts.set(key, entry);

  // Cleanup old entries every 1000 messages to prevent memory leak
  if (phoneMessageCounts.size > 10000) {
    for (const [k, v] of phoneMessageCounts.entries()) {
      if (now > v.resetAt) phoneMessageCounts.delete(k);
    }
  }

  return entry.count <= maxMessages;
}
