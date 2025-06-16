import type { NextApiRequest, NextApiResponse } from 'next';
import { SignIn, supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import bcrypt from 'bcrypt';
import { requireAuth } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   /* create patient */
    if (req.method === 'POST') {
    await SignIn();
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return handleApiError(res, 'Missing required fields', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('patients')
      .insert([{ fullName, email, password: hashedPassword }])
      .select()
      .single();
    if (error) return handleApiError(res, error);
    return res.status(201).json({ message: 'Patient created successfully', patient: data });
  }

  // Require JWT auth for all requests
  const user = await requireAuth(req, res);
  if (!user) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) return handleApiError(res, error);
    return res.status(200).json({ patients: data });
  }



  return res.status(405).end();
}
