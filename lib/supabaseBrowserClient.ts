// lib/supabaseBrowserClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);
