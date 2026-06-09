import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from '../config/index.js';
import { logger } from './utils/logger.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { verifyWebhook, receiveWebhook } from './webhook/webhookHandler.js';

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(helmet());
app.use(cors());

// Capture raw body for Meta signature verification BEFORE json parser
app.use((req, res, next) => {
  let data = '';
  req.on('data', chunk => { data += chunk; });
  req.on('end', () => { req.rawBody = data; next(); });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.server.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: { write: msg => logger.info(msg.trim()) },
  }));
}

app.use('/api', apiLimiter);

// ============================================================
// ROUTES
// ============================================================

// Health check — Railway uses this
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    agent: config.agent.name,
    app: config.agent.appName,
    timestamp: new Date().toISOString(),
  });
});

// WhatsApp webhook
app.get('/webhook/whatsapp', verifyWebhook);
app.post('/webhook/whatsapp', receiveWebhook);

// Internal API routes (for admin dashboard & ops)
app.get('/api/status', (req, res) => {
  res.json({ status: 'running', agent: config.agent.name });
});

// Future: profiles, leads, analytics routes go here

// ============================================================
// 404 & ERROR HANDLERS
// ============================================================

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================================
// START
// ============================================================

app.listen(config.server.port, () => {
  logger.info(`${config.agent.name} is live`, {
    port: config.server.port,
    env: config.server.nodeEnv,
    app: config.agent.appName,
  });
});

export default app;
