import { createClient } from '@supabase/supabase-js';
import { NextApiRequest } from 'next';

// URLs and keys
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_KEY!; // anon/public key
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // admin key

// Public client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (used for secure admin tasks like creating users)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Optional internal sign-in (use this only if you want to query as a logged-in user)
export async function SignIn(req?: NextApiRequest) {
  // Try env first
  let email = process.env.SUPABASE_EMAIL;
  let password = process.env.SUPABASE_PASSWORD;

  // If not set, try headers (for production/fallback)
  if ((!email || !password) && req) {
    email = req.headers['x-supabase-email'] as string | undefined;
    password = req.headers['x-supabase-password'] as string | undefined;
  }

  if (!email || !password) {
    console.error("❌ SignIn error: Missing Supabase credentials (env or headers)");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("❌ SignIn error:", error.message);
    return;
  }

  console.log("✅ AUTH SUCCESS with internal credentials");
}
