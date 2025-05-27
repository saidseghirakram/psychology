import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /*  insert doctor */
  if (req.method === 'POST') {
    const { fullName, email ,password} = req.body;

    const { data, error } = await supabase
      .from('doctors')
      .insert([{ fullName, email, password }]);

    if (error) return res.status(400).json({ error });
    return res.status(201).json({ doctor: data });
  }

  /* get all doctors */
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error) return res.status(400).json({ error });
    return res.status(200).json({ doctors: data });
  }

  return res.status(405).end();
}
