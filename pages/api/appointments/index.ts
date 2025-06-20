import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import { requireAuth } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireAuth(req, res);
  if (!user || typeof user !== 'object' || !('id' in user) || !('type' in user)) return;

  const { id: userId, type } = user as { id: string, type: string };

  // GET all appointments for current user
  if (req.method === 'GET') {
    const column = type === 'doctor' ? 'doctor_id' : 'patient_id';
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq(column, userId);

    if (error) return handleApiError(res, error);
    return res.status(200).json({ appointments: data });
  }

  // POST: create new appointment
  if (req.method === 'POST') {
    if (type !== 'doctor') {
      return res.status(403).json({ error: 'Only doctors can create appointments' });
    }

    const { patient_id, date, hour } = req.body;

    if (!patient_id || !date || !hour) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert([{ doctor_id: userId, patient_id, date, hour }])
      .select()
      .single();

    if (error) return handleApiError(res, error);
    return res.status(201).json({ message: 'Appointment created', appointment: data });
  }

  return res.status(405).end();
}
