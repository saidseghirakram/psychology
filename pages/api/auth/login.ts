import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
