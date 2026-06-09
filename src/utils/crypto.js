import crypto from 'crypto';
import { config } from '../../config/index.js';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(config.security.encryptionKey, 'hex');

// Encrypt phone number for storage in users table
export function encryptPhone(phone) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(phone, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

// Decrypt phone number when needed (e.g. to send WhatsApp notification)
export function decryptPhone(encrypted) {
  const [ivHex, tagHex, dataHex] = encrypted.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const data = Buffer.from(dataHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(tag);
  return decipher.update(data) + decipher.final('utf8');
}

// Hash phone number for indexed lookup (never reversed)
export function hashPhone(phone) {
  return crypto.createHash('sha256').update(phone).digest('hex');
}

// Verify Meta webhook signature
export function verifyWebhookSignature(payload, signature, appSecret) {
  const expected = crypto
    .createHmac('sha256', appSecret)
    .update(payload)
    .digest('hex');
  const received = signature.replace('sha256=', '');
  return crypto.timingSafeEqual(
    Buffer.from(expected, 'hex'),
    Buffer.from(received, 'hex')
  );
}
