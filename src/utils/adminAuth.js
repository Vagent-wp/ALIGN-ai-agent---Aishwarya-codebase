import crypto from 'crypto';
import { config } from '../../config/index.js';

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

export function createAdminToken(email) {
  const expires = Date.now() + TOKEN_TTL_MS;
  const payload = JSON.stringify({ email, exp: expires });
  const sig = crypto
    .createHmac('sha256', config.security.encryptionKey)
    .update(payload)
    .digest('hex');
  return Buffer.from(JSON.stringify({ payload, sig })).toString('base64url');
}

export function verifyAdminToken(token) {
  if (!token) return null;
  try {
    const { payload, sig } = JSON.parse(Buffer.from(token, 'base64url').toString());
    const expected = crypto
      .createHmac('sha256', config.security.encryptionKey)
      .update(payload)
      .digest('hex');
    if (sig !== expected) return null;
    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return null;
    if (data.email?.toLowerCase() !== config.admin.email.toLowerCase()) return null;
    return data;
  } catch {
    return null;
  }
}

export function validateAdminCredentials(email, password) {
  return (
    email?.toLowerCase() === config.admin.email.toLowerCase() &&
    password === config.admin.password
  );
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const session = verifyAdminToken(token);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.admin = session;
  return next();
}
