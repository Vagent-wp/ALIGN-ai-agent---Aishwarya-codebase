import 'dotenv/config';
import { supabase } from '../src/utils/supabase.js';
import { logger } from '../src/utils/logger.js';

logger.info('Lead expiry job started');

const { data, error } = await supabase.rpc('expire_old_leads');

if (error) {
  logger.error('Lead expiry failed', { error: error.message });
  process.exit(1);
}

logger.info('Leads expired', { count: data });
process.exit(0);
