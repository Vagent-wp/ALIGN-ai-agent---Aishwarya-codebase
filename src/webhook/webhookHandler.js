import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';
import { verifyWebhookSignature } from '../utils/crypto.js';
import { processMessage } from './conversationEngine.js';
import { sendWhatsAppMessage, markAsRead } from '../notifications/whatsapp.js';

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
  // Always respond 200 immediately — Meta requires this within 5 seconds
  // Do this FIRST before any processing
  res.status(200).json({ status: 'received' });

  try {
    // Signature verification — skip if app secret not configured
    const signature = req.headers['x-hub-signature-256'];
    if (signature && req.rawBody && config.whatsapp.appSecret) {
      try {
        const isValid = verifyWebhookSignature(
          req.rawBody,
          signature,
          config.whatsapp.appSecret
        );
        if (!isValid) {
          logger.warn('Invalid webhook signature — ignoring request');
          return;
        }
      } catch (sigErr) {
        logger.warn('Signature verification error — proceeding anyway', {
          error: sigErr.message,
        });
      }
    }

    const body = req.body;

    // Log the raw incoming payload for debugging
    logger.info('Webhook received', {
      object: body?.object,
      entryCount: body?.entry?.length,
    });

    if (!body || body.object !== 'whatsapp_business_account') {
      logger.info('Non-WhatsApp webhook payload, ignoring');
      return;
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        logger.info('Webhook change', { field: change.field });

        if (change.field !== 'messages') continue;

        const value = change.value;
        const messages = value?.messages || [];

        logger.info('Messages in payload', { count: messages.length });

        for (const message of messages) {
          await handleIncomingMessage(message, value).catch(err => {
            logger.error('handleIncomingMessage crashed', {
              error: err.message,
              stack: err.stack,
              messageId: message?.id,
            });
          });
        }
      }
    }
  } catch (err) {
    logger.error('receiveWebhook top-level error', {
      error: err.message,
      stack: err.stack,
    });
  }
}

// ============================================================
// INCOMING MESSAGE HANDLER
// ============================================================

async function handleIncomingMessage(message, value) {
  logger.info('Processing message', {
    type: message.type,
    from: message.from,
    id: message.id,
  });

  // Only handle text messages
  if (message.type !== 'text') {
    logger.info('Non-text message received', { type: message.type });
    await sendWhatsAppMessage(
      message.from,
      `I currently work with text messages only. Just type your request and I'll help! 😊`
    ).catch(e => logger.error('sendWhatsAppMessage failed', { error: e.message }));
    return;
  }

  const fromPhone = message.from;
  const messageText = message.text?.body?.trim();
  const messageId = message.id;

  if (!messageText) {
    logger.warn('Empty message text received');
    return;
  }

  logger.info('Incoming text message', {
    from: `***${fromPhone.slice(-4)}`,
    text: messageText.substring(0, 80),
  });

  // Mark as read (non-critical — don't let failure block processing)
  markAsRead(messageId).catch(() => {});

  // Process through Aishwarya
  try {
    logger.info('Calling processMessage...');
    const reply = await processMessage(fromPhone, messageText, messageId);
    logger.info('processMessage returned', { replyLength: reply?.length });

    if (reply) {
      await sendWhatsAppMessage(fromPhone, reply);
      logger.info('Reply sent successfully');
    }
  } catch (err) {
    logger.error('processMessage failed', {
      error: err.message,
      stack: err.stack,
    });
    await sendWhatsAppMessage(
      fromPhone,
      `Hi! I'm Aishwarya from ALIGN Network. I ran into a small issue — please try again in a moment!`
    ).catch(() => {});
  }
}
