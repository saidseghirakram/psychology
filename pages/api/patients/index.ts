import type { NextApiRequest, NextApiResponse } from 'next';
import { SignIn, supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await SignIn();

    if (req.method === 'GET') {
      await SignIn()
      const { data, error } = await supabase.from('patients').select('*');
      if (error) throw error;
      return res.status(200).json({ patients: data });
    }

    if (req.method === 'POST') {
      await SignIn();
      const { fullName, email, password } = req.body;

      if (!fullName || !email || !password) {
        return handleApiError(res, 'Missing required fields', 400);
      }

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      const { data, error } = await supabase
        .from('patients')
        .insert([{ fullName, email, password: hashedPassword }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ message: 'Patient created successfully', patients: data });
    }

    return handleApiError(res, 'Method Not Allowed', 405);
  } catch (error) {
    return handleApiError(res, error);
  }
}
