import { Router } from 'express';
import { chatWithEcho } from '../ai/echo.js';
import { logger } from '../utils/logger.js';

const router = Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, userName, history } = req.body ?? {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    const safeHistory = Array.isArray(history)
      ? history.filter(
          (m) =>
            m &&
            typeof m === 'object' &&
            (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string'
        )
      : [];

    const reply = await chatWithEcho({
      message: message.trim(),
      userName: typeof userName === 'string' ? userName.trim().slice(0, 64) : undefined,
      history: safeHistory,
    });

    res.json({ reply });
  } catch (err) {
    logger.error('Echo API error', { error: err.message });
    res.status(503).json({
      error: 'Echo is briefly unavailable. Please try again or contact us at /contact.',
    });
  }
});

export default router;
