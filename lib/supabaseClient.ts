import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const email = process.env.SUPABASE_EMAIL!;
const password = process.env.SUPABASE_PASSWORD!;


export async function SignIn() {
  
  const {  error } = await supabase.auth.signInWithPassword({
    email: email ,
    password: password,
  });
  if (error) return  console.log(error);
  ;
  return console.log("AUTH SUCESS");
  
}



export const supabase = createClient(supabaseUrl, supabaseKey);

