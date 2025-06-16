import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET!;
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

  // Only allow access if correct internal credentials are provided
  if (
    req.headers['x-supabase-email'] !== internalEmail ||
    req.headers['x-supabase-password'] !== internalPassword
  ) {
    return handleApiError(res, 'Unauthorized: Invalid internal credentials', 401);
  }

  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, type } = req.body;

  if (!email || !password || !type) {
    return handleApiError(res, 'Email, password, and type are required', 400);
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Choose table based on type
  let tableName = '';
  if (type === 'doctor') tableName = 'doctors';
  else if (type === 'patient') tableName = 'patients';
  else return handleApiError(res, 'Invalid type. Must be doctor or patient.', 400);

  const { data: user, error } = await supabaseAdmin
    .from(tableName)
    .select('*')
    .eq('email', trimmedEmail)
    .maybeSingle();

  if (error) {
    console.error("DB Error:", error);
    return handleApiError(res, 'Database error', 500);
  }

  if (!user) {
    return handleApiError(res, `${type.charAt(0).toUpperCase() + type.slice(1)} not found. Please sign up.`, 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return handleApiError(res, 'Invalid password', 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      type,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.status(200).json({ message: 'Login successful', token, user });
}
