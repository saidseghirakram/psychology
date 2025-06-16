import type { NextApiRequest, NextApiResponse } from 'next';
import {  supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import { requireAuth } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  

  
  // Require JWT auth for all requests
  const user = await requireAuth(req, res);
  if (!user) return;

  /* get all doctors */
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error) return handleApiError(res, error);
    return res.status(200).json({ doctors: data });
  }


 

  return res.status(405).end();
}
