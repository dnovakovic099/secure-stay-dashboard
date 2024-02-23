//Supa base
import { createClient } from '@supabase/supabase-js';

//Environment
import { envConfig } from './environment';

const envconfig = envConfig;

export const supabase = createClient(
  envconfig.supabaseUrl,
  envconfig.supabaseApi,
);
