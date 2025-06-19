import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { handleApiError } from '@/lib/errorHandler'
import { requireAuth } from '@/lib/authMiddleware'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireAuth(req, res)
  if (!user || typeof user !== 'object' || !('id' in user) || !('type' in user)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const userId = (user as any).id
  const userType = (user as any).type 

  // Fetch All history for doctor OR patient
  if (req.method === 'GET') {
    // build base query
    let query = supabase
      .from('history')
      .select('*')

    // filtre role
    if (userType === 'doctor') {
      query = query.eq('doctor_id', userId)
    } else if (userType === 'patient') {
      query = query.eq('patient_id', userId)
    } else {
      return res.status(403).json({ error: 'Access denied' })
    }

    const { data, error } = await query
    if (error) return handleApiError(res, error)
    return res.status(200).json({ history: data })
  }

  // Insert new history (doctor or patient) ──────────────────────────
  if (req.method === 'POST') {
    const { doctor_id, patient_id, messages } = req.body
    if (!doctor_id || !patient_id || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing doctor_id, patient_id, or messages[]' })
    }

    // only allow writing own history
    if (userType === 'doctor' && userId !== doctor_id) {
      return res.status(403).json({ error: 'Doctors can only write their own history' })
    }
    if (userType === 'patient' && userId !== patient_id) {
      return res.status(403).json({ error: 'Patients can only write their own history' })
    }

    const { data, error } = await supabase
      .from('history')
      .insert([{ doctor_id, patient_id, messages }])
      .select('*')
      .single()

    if (error) return handleApiError(res, error)
    return res.status(201).json({ history: data })
  }

  // ─── PUT: Only doctors can update ──────────────────────────────────────────
 /*  if (req.method === 'PUT' && userType === 'doctor') {
    const { id, messages } = req.body
    if (!id || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing id or messages' })
    }

    const { data, error } = await supabase
      .from('history')
      .update({ messages })
      .eq('id', id)
      .eq('doctor_id', userId)
      .select('*')
      .single()

    if (error) return handleApiError(res, error)
    return res.status(200).json({ history: data })
  } */

  // ─── DELETE: Only doctors can delete ───────────────────────────────────────
/*   if (req.method === 'DELETE' && userType === 'doctor') {
    const { id } = req.body
    if (!id) {
      return res.status(400).json({ error: 'Missing id' })
    }

    const { error } = await supabase
      .from('history')
      .delete()
      .eq('id', id)
      .eq('doctor_id', userId)

    if (error) return handleApiError(res, error)
    return res.status(200).json({ message: 'History deleted successfully' })
  } */

  return res.status(405).json({ error: 'Method not allowed or unauthorized user' })
}
