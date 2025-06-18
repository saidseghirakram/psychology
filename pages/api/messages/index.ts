import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { sender_id, receiver_id, sender_type, receiver_type, content } = req.body;
    // Save to DB
    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id, receiver_id, sender_type, receiver_type, content }])
      .select()
      .single();
    if (error) return res.status(400).json({ error });

    // Use a unique channel per chat (e.g., chat-DOCTORID-PATIENTID)
    const channel = `chat-${[sender_id, receiver_id].sort().join('-')}`;
    await pusher.trigger(channel, 'new-message', { message: data });

    return res.status(201).json({ message: 'Message sent', data });
  }

  if (req.method === 'GET') {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) {
      return res.status(400).json({ error: 'Missing user IDs' });
    }
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${user1},receiver_id.eq.${user2}),and(sender_id.eq.${user2},receiver_id.eq.${user1})`)
      .order('created_at', { ascending: true });
    if (error) return res.status(400).json({ error });
    return res.status(200).json({ messages: data });
  }

  return res.status(405).end();
}

