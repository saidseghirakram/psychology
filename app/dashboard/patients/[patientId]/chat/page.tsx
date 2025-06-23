'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabaseBrowserClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Message = {
  id: number;
  sender: 'doctor' | 'patient';
  content: string;
  created_at: string;
};

export default function PatientChatPage() {
  const { patientId } = useParams() as { patientId: string };
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setDoctorId(parseInt(id, 10));
    }
  }, []);

  // Load messages
  useEffect(() => {
    if (!doctorId) return;

    const fetchMessages = async () => {
      const token = localStorage.getItem('token');

      const res = await fetch(
        `/api/chat?doctor_id=${doctorId}&patient_id=${encodeURIComponent(patientId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      if (res.ok) setMessages(json.messages || []);
      else console.error('Fetch messages failed:', json.error);
    };

    fetchMessages();
  }, [doctorId, patientId]);

  // Realtime updates
  useEffect(() => {
    if (!doctorId) return;

    const channel = supabaseBrowser
      .channel('realtime:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `doctor_id=eq.${doctorId},patient_id=eq.${patientId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [doctorId, patientId]);

  // Send message
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !doctorId) return;

    const optimisticMessage: Message = {
      id: Date.now(), // Use a temporary unique ID
      sender: 'doctor',
      content: input,
      created_at: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
    setInput('');

    const token = localStorage.getItem('token');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        doctor_id: doctorId,
        patient_id: patientId,
        sender: 'doctor',
        content: input,
      }),
    });

    if (!res.ok) {
      // If the API call fails, remove the optimistic message
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== optimisticMessage.id)
      );
      // Optional: show an error toast to the user
      alert('Failed to send message.');
      setInput(input); // Restore the input so the user can retry
      const json = await res.json();
      console.error('Failed to send message:', json.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full sm:h-[80vh] w-full px-0">
      <Card className="w-full h-full flex flex-col shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4 bg-background/80 rounded-xl shadow-md px-6 py-4 mb-4">
            <Avatar className="w-12 h-12 shadow ring-2 ring-primary/20">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${decodeURIComponent(
                  patientId
                ).split(' ').join('+')}`}
                alt={decodeURIComponent(patientId)}
              />
              <AvatarFallback>
                <UserCircle2 className="w-8 h-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm text-muted-foreground font-medium">Chat with</div>
              <CardTitle className="text-2xl font-bold text-primary drop-shadow">
                {decodeURIComponent(patientId)}
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col gap-3 mb-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={msg.id ?? idx}
                className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[70%] ${
                    msg.sender === 'doctor'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-200 dark:text-black'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-background text-foreground"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
