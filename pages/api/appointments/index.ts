import type { NextApiRequest, NextApiResponse } from 'next';
import { SignIn, supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  /* get all appointments */

  if (req.method === 'GET') {
     await SignIn();
    

    const { data, error } = await supabase.from('appointments').select('*');
    console.log(data);
    
    if (error) return res.status(400).json({ error });
    return res.status(200).json({ appointments: data });
  }

  
}
