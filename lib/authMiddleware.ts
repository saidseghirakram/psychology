import { NextApiRequest } from 'next';
import { supabase } from './supabaseClient';

export async function verifyToken(req: NextApiRequest) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;

  return data.user;
}