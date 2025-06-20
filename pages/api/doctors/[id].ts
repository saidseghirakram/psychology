import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import { requireAuth } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Authenticate the user
  const user = await requireAuth(req, res);
  if (!user) return;

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid doctor id' });
  }

  // GET doctor by ID
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return handleApiError(res, error);
    return res.status(200).json({ message: 'Doctor fetched successfully', doctor: data });
  }

  // UPDATE doctor
  if (req.method === 'PATCH' || req.method === 'PUT') {
    const updates = req.body;

    const { data, error } = await supabase
      .from('doctors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return handleApiError(res, error);
    return res.status(200).json({ message: 'Doctor updated successfully', doctor: data });
  }

  // DELETE doctor
  if (req.method === 'DELETE') {
    const { data, error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) return handleApiError(res, error);
    return res.status(200).json({ message: 'Doctor deleted successfully', doctor: data });
  }

  return res.status(405).end();
}
