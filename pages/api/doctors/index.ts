import type { NextApiRequest, NextApiResponse } from 'next';
import { SignIn, supabase } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    /* get all doctors */
    if (req.method === 'GET') {
      await SignIn();
      const { data, error } = await supabase.from('doctors').select('*');
      if (error) return handleApiError(res,error)
      return res.status(200).json({ doctors: data });
    }

  /*  insert doctor */
  if (req.method === 'POST') {
    await SignIn();

    const { fullName, email ,password} = req.body;

    if(!fullName || !email || !password){
      return handleApiError(res, 'Missing required fields', 400)
    }


    const { data, error } = await supabase
      .from('doctors')
      .insert([{ fullName, email, password }])
      .select()
      .single()

    if (error) return handleApiError(res,error)
    return res.status(201).json({ message: 'Doctor created successfully', doctor: data });
  }



  return res.status(405).end();
}
