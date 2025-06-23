import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { requireAuth } from '@/lib/authMiddleware';
import { handleApiError } from '@/lib/errorHandler';

type AuthUser = {
  id: number;
  type: 'doctor' | 'patient';
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireAuth(req, res);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { type: userType } = user as AuthUser;

  // Only allow doctors to access this endpoint
  if (userType !== 'doctor') {
    return res.status(403).json({ error: 'Access denied: only doctors allowed' });
  }

  const { id } = req.query;

  // Validate patient ID
  const patientId = parseInt(id as string, 10);
  if (isNaN(patientId)) {
    return res.status(400).json({ error: 'Invalid patient ID' });
  }

  // GET moods for a specific patient
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('patient_id', patientId)
      .order('day', { ascending: false });

    if (error) return handleApiError(res, error);
    return res.status(200).json({ moods: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
