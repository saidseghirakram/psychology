import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {




  /* get all patients */
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) return res.status(400).json({ error });
    return res.status(200).json({ patients: data });
  }

  return res.status(405).end();
}
