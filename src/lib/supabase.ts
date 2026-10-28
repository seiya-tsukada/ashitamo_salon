import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only the RPC functions in ashitamo_api are exposed; tables live in the private ashitamo schema.
// Supabase Auth is not used (login is custom), so its session handling is turned off.
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        db: { schema: 'ashitamo_api' },
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      })
    : null;
