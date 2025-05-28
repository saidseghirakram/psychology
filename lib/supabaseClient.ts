import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export async function SignIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "fettah@gmail.com",
    password: "123",
  });
  if (error) return console.error(error);
  return console.log("signed in successfully ", data);
}
export const supabase = createClient(supabaseUrl, supabaseKey);
