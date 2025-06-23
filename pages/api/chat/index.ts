// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { requireAuth } from '@/lib/authMiddleware';
import { handleApiError } from '@/lib/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    // Extract raw values
    const doctorIdRaw = req.method === 'GET' ? req.query.doctor_id : req.body.doctor_id;
    const patientIdRaw = req.method === 'GET' ? req.query.patient_id : req.body.patient_id;

    // Ensure they are strings
    const doctor_id_str = Array.isArray(doctorIdRaw) ? doctorIdRaw[0] : doctorIdRaw;
    const patient_id_str = Array.isArray(patientIdRaw) ? patientIdRaw[0] : patientIdRaw;

    // Convert to numbers
    const doctor_id = Number(doctor_id_str);
    const patient_id = Number(patient_id_str);

    if (!doctor_id || !patient_id || isNaN(doctor_id) || isNaN(patient_id)) {
      return res.status(400).json({ error: 'Invalid or missing doctor_id or patient_id' });
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('doctor_id', doctor_id)
        .eq('patient_id', patient_id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('GET messages error:', error);
        return handleApiError(res, error);
      }

      return res.status(200).json({ messages: data });
    }

    if (req.method === 'POST') {
      const { sender, content } = req.body;

      if (!sender || !content) {
        return res.status(400).json({ error: 'Missing sender or content' });
      }

      const { error } = await supabase.from('messages').insert([
        {
          doctor_id,
          patient_id,
          sender,
          content,
        },
      ]);

      if (error) {
        console.error('Insert error:', error);
        return res.status(500).json({ error: 'Insert failed', details: error.message });
      }

      return res.status(201).json({ message: 'Message sent' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: unknown) {
    let message = 'An unexpected error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    return res.status(500).json({ error: message });
  }
}
