import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import bcrypt from 'bcrypt';

const INTERNAL_EMAIL = process.env.SUPABASE_EMAIL;
const INTERNAL_PASSWORD = process.env.SUPABASE_PASSWORD;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check internal credentials (from env or headers)
  let internalEmail = INTERNAL_EMAIL;
  let internalPassword = INTERNAL_PASSWORD;

  if ((!internalEmail || !internalPassword) && req) {
    internalEmail = req.headers['x-supabase-email'] as string | undefined;
    internalPassword = req.headers['x-supabase-password'] as string | undefined;
  }

  if (!internalEmail || !internalPassword) {
    return handleApiError(res, 'Missing internal credentials', 401);
  }

  if (
    req.headers['x-supabase-email'] !== internalEmail ||
    req.headers['x-supabase-password'] !== internalPassword
  ) {
    return handleApiError(res, 'Unauthorized: Invalid internal credentials', 401);
  }

  if (req.method !== 'POST') return res.status(405).end();

  const { fullName, email, password, type } = req.body;

  if (!fullName || !email || !password || !type) {
    return handleApiError(res, 'fullName, email, password, and type are required', 400);
  }

  const trimmedEmail = email.trim().toLowerCase();

  let tableName = '';
  if (type === 'doctor') tableName = 'doctors';
  else if (type === 'patient') tableName = 'patients';
  else return handleApiError(res, 'Invalid type. Must be doctor or patient.', 400);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabaseAdmin
    .from(tableName)
    .insert([{ fullName, email: trimmedEmail, password: hashedPassword }])
    .select()
    .single();

  if (error) return handleApiError(res, error);

  return res.status(201).json({
    message: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`,
    [type]: data,
  });
}
