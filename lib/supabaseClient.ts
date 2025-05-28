import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const email = process.env.SUPABASE_PWS!;
const password = process.env.SUPABASE_EMAIL!;
export async function SignIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) return console.error(error);
  return console.log("signed in successfully ", data);
}
export const supabase = createClient(supabaseUrl, supabaseKey);
