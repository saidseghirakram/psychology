'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function PatientChatPage() {
  const { patientId } = useParams() as { patientId: string };
  const [messages, setMessages] = useState([
    { from: 'patient', text: 'Hello doctor!' },
    { from: 'doctor', text: 'Hello, how can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: 'doctor', text: input }]);
    setInput('');
  };

  return (
    <div className="flex flex-col justify-center items-center h-full  sm:h-[80vh] w-full px-0 ">
      <Card className="w-full h-full flex flex-col shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4 bg-background/80 rounded-xl shadow-md px-6 py-4 mb-4">
            <Avatar className="w-12 h-12 shadow ring-2 ring-primary/20">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${decodeURIComponent(patientId as string).split(' ').join('+')}`}
                alt={decodeURIComponent(patientId as string)}
              />
              <AvatarFallback>
                <UserCircle2 className="w-8 h-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm text-muted-foreground font-medium">
                Chat with
              </div>
              <CardTitle className="text-2xl font-bold text-primary drop-shadow">
                {decodeURIComponent(patientId as string)}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col gap-3 mb-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === 'doctor' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[70%] ${
                    msg.from === 'doctor'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-200 dark:text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
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