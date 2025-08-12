import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Mode switch: 'mock' or 'live'
const MODE = process.env.DATA_MODE || 'mock';

let client = null;

if (MODE === 'live') {
  client = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("Running in MOCK mode — no live DB calls");
  client = {
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: [], error: null }),
    }),
  };
}

export default client;
