import type { NextApiRequest, NextApiResponse } from 'next';
import { SignIn, supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';

export default async function handler(req:NextApiRequest , res:NextApiResponse){

  const {id} = req.query

  if(typeof id !== 'string'){
    return res.status(400).json({err: 'Invalid Patient Id'})
  }
  /* GET Patient By ID */
  if(req.method === 'GET'){
    await SignIn()
    const {data,error} = await supabase
    .from('patients')
    .select('*')
    .eq('id',id)
    .single()
    if(error) return handleApiError(res,error)
    return res.status(200).json({message: 'Patient fetched successfully', patients: data})
  }

  /* Update Patient By Id */
  if(req.method === 'PATCH' || req.method ==='PUT'){
    const updates = req.body
    const {data, error} =await supabase
    .from('patients')
    .update(updates)
    .eq('id',id)
    .select()
    .single()
    if(error) return handleApiError(res,error)
    return res.status(200).json({message: 'Patient updated successfully', patients: data})
  }

  /* Delete Patient By Id */
  if(req.method === 'DELETE'){
    await SignIn()
  
    const {data , error } = await supabase 
    .from('patients')
    .delete()
    .eq('id',id)
    .select()
    .single()
    if(error) return handleApiError(res , error)
    return res.status(200).json({message : 'Patient deleted successfully', patients: data})
  }


  /* asssign patient */
  if (req.method === 'POST') {
    await SignIn();
    const { doctor_id } = req.body;
    const { id } = req.query;
  
    // 1. Get current patient
    const { data: patient, error: fetchError } = await supabase
      .from('patients')
      .select('doctor_id')
      .eq('id', id)
      .single();
  
    if (fetchError) return handleApiError(res, fetchError);
  
    // 2. Check if already assigned
    if (patient?.doctor_id !== null) {
      return res.status(400).json({ message: 'You cannot assign a doctor to a patient, already exists' });
    }
  
    // 3. Update patient with new doctor
    const { data, error } = await supabase
      .from('patients')
      .update({ doctor_id })
      .eq('id', id)
      .select()
      .single();
  
    if (error) return handleApiError(res, error);
  
    return res.status(200).json({
      message: 'Patient assigned to doctor successfully',
      doctor_patient: data
    });
  }
  


  return res.status(405).json({message: 'Method not allowed'})
}
