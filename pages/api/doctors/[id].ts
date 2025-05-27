import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid doctor id' });
  }

  // Update doctor
  if (req.method === 'PATCH' || req.method === 'PUT') {
    const updates = req.body;
    const { data, error } = await supabase
      .from('doctors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(400).json({ error });
    return res.status(200).json({ doctor: data });
  }

  // Delete doctor
  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id);

    if (error) return res.status(400).json({ error });
    return res.status(204).end();
  }

  return res.status(405).end();
}