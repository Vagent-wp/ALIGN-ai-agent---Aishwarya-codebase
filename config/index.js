import dotenv from 'dotenv';
dotenv.config();

const required = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};

export const config = {
  server: {
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
  },
  supabase: {
    url: required('SUPABASE_URL'),
    serviceKey: required('SUPABASE_SERVICE_KEY'),
  },
  gemini: {
    apiKey: required('GEMINI_API_KEY'),
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    embeddingModel: process.env.GEMINI_EMBEDDING_MODEL || 'text-embedding-004',
  },
  whatsapp: {
    accessToken: required('WHATSAPP_ACCESS_TOKEN'),
    phoneNumberId: required('WHATSAPP_PHONE_NUMBER_ID'),
    businessAccountId: required('WHATSAPP_BUSINESS_ACCOUNT_ID'),
    verifyToken: required('WHATSAPP_VERIFY_TOKEN'),
    appSecret: required('WHATSAPP_APP_SECRET'),
    apiVersion: process.env.WHATSAPP_API_VERSION || 'v25.0',
    get apiBase() {
      return `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}`;
    },
  },
  security: {
    encryptionKey: required('ENCRYPTION_KEY'),
  },
  agent: {
    name: process.env.AGENT_NAME || 'Aishwarya',
    appName: process.env.APP_NAME || 'StartupHub AI',
    maxSearchResults: parseInt(process.env.MAX_SEARCH_RESULTS || '50'),
    shownResultsCount: parseInt(process.env.SHOWN_RESULTS_COUNT || '3'),
    sessionTimeoutMinutes: parseInt(process.env.SESSION_TIMEOUT_MINUTES || '30'),
    leadExpiryHours: parseInt(process.env.LEAD_EXPIRY_HOURS || '48'),
    maxClarificationTurns: parseInt(process.env.MAX_CLARIFICATION_TURNS || '2'),
    maxMessagesPerMinute: parseInt(process.env.MAX_MESSAGES_PER_MINUTE || '20'),
  },
};
