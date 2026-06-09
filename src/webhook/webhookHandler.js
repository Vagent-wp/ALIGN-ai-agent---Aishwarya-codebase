import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';
import { verifyWebhookSignature } from '../utils/crypto.js';
import { processMessage } from './conversationEngine.js';
import { sendWhatsAppMessage, markAsRead } from '../notifications/whatsapp.js';

// ============================================================
// WEBHOOK HANDLER
// Receives all incoming WhatsApp events from Meta
// ============================================================

// GET /webhook/whatsapp — Meta verification handshake
export function verifyWebhook(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === config.whatsapp.verifyToken) {
    logger.info('WhatsApp webhook verified successfully');
    return res.status(200).send(challenge);
  }

  logger.warn('Webhook verification failed', { mode, token });
  return res.status(403).json({ error: 'Verification failed' });
}

// POST /webhook/whatsapp — incoming messages
export async function receiveWebhook(req, res) {
  // Verify Meta signature
  const signature = req.headers['x-hub-signature-256'];
  const rawBody = req.rawBody; // set by express middleware

  if (signature && rawBody) {
    const isValid = verifyWebhookSignature(rawBody, signature, config.whatsapp.appSecret);
    if (!isValid) {
      logger.warn('Invalid webhook signature — request rejected');
      return res.status(401).json({ error: 'Invalid signature' });
    }
  }

  // Always respond 200 immediately — Meta requires this within 5 seconds
  res.status(200).json({ status: 'received' });

  // Process asynchronously
  try {
    const body = req.body;

    if (body.object !== 'whatsapp_business_account') return;

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== 'messages') continue;

        const value = change.value;
        const messages = value?.messages || [];
        const contacts = value?.contacts || [];

        for (const message of messages) {
          await handleIncomingMessage(message, contacts, value);
        }
      }
    }
  } catch (err) {
    logger.error('Webhook processing error', { error: err.message, stack: err.stack });
  }
}

// ============================================================
// INCOMING MESSAGE HANDLER
// ============================================================

async function handleIncomingMessage(message, contacts, value) {
  // Only handle text messages for now
  if (message.type !== 'text') {
    await sendWhatsAppMessage(
      message.from,
      `I currently work with text messages only. Please type your request and I'll help you right away! 😊`
    );
    return;
  }

  const fromPhone = message.from;
  const messageText = message.text?.body?.trim();
  const messageId = message.id;

  if (!messageText) return;

  // Mark as read
  await markAsRead(messageId);

  logger.info('Incoming message', {
    from: fromPhone.slice(-4).padStart(fromPhone.length, '*'),
    preview: messageText.substring(0, 60),
  });

  try {
    // Process through Aishwarya's conversation engine
    const reply = await processMessage(fromPhone, messageText, messageId);

    if (reply) {
      await sendWhatsAppMessage(fromPhone, reply);
    }
  } catch (err) {
    logger.error('Message processing failed', {
      error: err.message,
      from: fromPhone.slice(-4).padStart(fromPhone.length, '*'),
    });
    await sendWhatsAppMessage(fromPhone, `I ran into a small issue. Please try again in a moment!`);
  }
}
