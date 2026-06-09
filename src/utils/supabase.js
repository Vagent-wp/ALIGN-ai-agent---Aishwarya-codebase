import { createClient } from '@supabase/supabase-js';
import { config } from '../../config/index.js';

// Service role client — full DB access, used server-side only
// NEVER expose this key to the frontend
export const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceKey,
  {
    auth: { persistSession: false },
    db: { schema: 'public' },
  }
);
