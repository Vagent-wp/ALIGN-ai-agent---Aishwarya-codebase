import axios from 'axios';
import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';

// ============================================================
// WHATSAPP BUSINESS API — MESSAGE SENDER
// ============================================================

const WA_API_URL = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;

function getHeaders() {
  return {
    Authorization: `Bearer ${config.whatsapp.accessToken}`,
    'Content-Type': 'application/json',
  };
}

// Core send function
export async function sendWhatsAppMessage(to, text, retries = 3) {
  // Normalize phone number — ensure it starts with country code, no +
  const phone = to.replace(/\D/g, '');

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phone,
    type: 'text',
    text: {
      preview_url: false,
      body: text,
    },
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(WA_API_URL, payload, {
        headers: getHeaders(),
        timeout: 10000,
      });

      logger.info('WhatsApp message sent', {
        to: phone.slice(-4).padStart(phone.length, '*'), // mask number in logs
        messageId: response.data?.messages?.[0]?.id,
      });

      return response.data;
    } catch (err) {
      const status = err.response?.status;
      const errData = err.response?.data;

      logger.error('WhatsApp send failed', {
        attempt,
        status,
        error: errData?.error?.message || err.message,
      });

      // Don't retry on auth errors or invalid number
      if (status === 401 || status === 400) break;

      // Exponential backoff
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  return null;
}

// Send typing indicator (shows "typing..." in WhatsApp)
export async function sendTypingIndicator(to) {
  const phone = to.replace(/\D/g, '');
  try {
    await axios.post(WA_API_URL.replace('/messages', '/messages'), {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: 'placeholder',
    }, { headers: getHeaders() });
  } catch {
    // Non-critical, ignore
  }
}

// Mark message as read
export async function markAsRead(messageId) {
  try {
    await axios.post(WA_API_URL.replace('/messages', '/messages'), {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    }, { headers: getHeaders() });
  } catch {
    // Non-critical, ignore
  }
}
