import axios from 'axios';
import { config } from '../../config/index.js';
import { logger } from '../utils/logger.js';

export async function sendWhatsAppMessage(to, text, retries = 3) {
  // Normalize: strip all non-digits
  let phone = to.replace(/\D/g, '');

  // If Indian number without country code (10 digits starting with 6-9), add 91
  if (phone.length === 10 && /^[6-9]/.test(phone)) {
    phone = '91' + phone;
  }

  const url = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;

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

  logger.info('Sending WhatsApp message', {
    to: `***${phone.slice(-4)}`,
    length: text.length,
    url: url,
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${config.whatsapp.accessToken}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      });

      logger.info('WhatsApp message sent successfully', {
        to: `***${phone.slice(-4)}`,
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
        code: errData?.error?.code,
        details: JSON.stringify(errData || {}),
        phone: `***${phone.slice(-4)}`,
      });

      // Don't retry on auth or bad request errors
      if (status === 401 || status === 400) {
        logger.error('Non-retryable error — stopping', { status });
        break;
      }

      if (attempt < retries) {
        const delay = 1000 * attempt;
        logger.info(`Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  return null;
}

export async function markAsRead(messageId) {
  try {
    const url = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;
    await axios.post(url, {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    }, {
      headers: {
        Authorization: `Bearer ${config.whatsapp.accessToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });
  } catch {
    // Non-critical
  }
}
