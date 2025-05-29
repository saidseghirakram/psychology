import type { NextApiRequest, NextApiResponse } from 'next';
import { SignIn, supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid doctor id' });
  }

  // Get doctor by ID
  if (req.method === 'GET') {
    await SignIn();

    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return handleApiError(res,error)
    return res.status(200).json({ message: 'Doctor fetched successfully', doctor: data });
  }


  // Update doctor
  if (req.method === 'PATCH' || req.method === 'PUT') {
    await SignIn();

    const updates = req.body;
    const { data, error } = await supabase
      .from('doctors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return handleApiError(res , error)
    return res.status(200).json({ message: 'Doctor updated successfully', doctor: data });
  }

  // Delete doctor
  if (req.method === 'DELETE') {
    await SignIn();


    const {data ,  error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) return handleApiError(res , error)
    return res.status(200).json({message: 'Doctor deleted successfully', doctor: data})
  }




  return res.status(405).end();
}
