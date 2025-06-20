import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import { requireAuth } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireAuth(req, res);
  if (!user) return;


  const { id } = user as { id: number };
/* getAll patient of the doctor */
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('doctor_id', id); 

    if (error) return handleApiError(res, error);
    return res.status(200).json({ patients: data });
  }

  return res.status(405).end();
}
