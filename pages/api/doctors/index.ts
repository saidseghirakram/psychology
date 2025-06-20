import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import { requireAuth } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireAuth(req, res);
  if (!user) return;

  // ✅ Cast the JWT payload to a known type
  const { id } = user as { id: number };

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('doctor_id', id); // fetch patients assigned to this doctor

    if (error) return handleApiError(res, error);
    return res.status(200).json({ patients: data });
  }

  return res.status(405).end();
}
