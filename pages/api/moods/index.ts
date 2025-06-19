import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { requireAuth } from '@/lib/authMiddleware'
import { handleApiError } from '@/lib/errorHandler'


type AuthUser = {
  id: number
  type: 'doctor' | 'patient'
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireAuth(req, res)
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }


  const { id: patientId, type: userType } = user as AuthUser


  //  allow patients
  if (userType !== 'patient') {
    return res.status(403).json({ error: 'Access denied: only patients allowed' })
  }

  // Get all moods 
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('patient_id', patientId)
      .order('day', { ascending: false })

    if (error) return handleApiError(res, error)
    return res.status(200).json({ moods: data })
  }

  // POST: Add new mood 
  if (req.method === 'POST') {
    const { day, times, overall_mood } = req.body

    if (!day || !Array.isArray(times) || times.length !== 5) {
      return res.status(400).json({ error: 'Invalid input: require day + 5 times' })
    }

    const { data, error } = await supabase
      .from('moods')
      .insert([{ patient_id: patientId, day, times, overall_mood }])
      .select('*')
      .single()

    if (error) return handleApiError(res, error)
    return res.status(201).json({ mood: data })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
