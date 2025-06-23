"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Message = {
  text: string;
  sender: 'user' | 'ai' | 'error' | 'loader';
};

const LOCAL_STORAGE_KEY = 'chat_messages';

export default function ChatAiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      setMessages([{ text: "Hello! How can I help you today?", sender: 'ai' }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const newUserMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, newUserMessage, { text: 'AI is typing...', sender: 'loader' }]);
    setLoading(true);
  
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch('https://0574-34-105-67-47.ngrok-free.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ prompt: input, role: 'doctor' }),
       });
  
      if (!res.ok) throw new Error('API Error');
  
      const data = await res.json();
  
      setMessages((prev) => [
        ...prev.filter((msg) => msg.sender !== 'loader'),
        {
          text: typeof data.response === 'string' && data.response.trim()
            ? data.response
            : '(AI) No response received.',
          sender: 'ai',
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.filter((msg) => msg.sender !== 'loader'),
        { text: '(AI) Sorry, there was an error.', sender: 'error' },
      ]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };
  

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background my-2 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex items-start gap-3 max-w-[70%]',
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            )}
          >
            <div
              className={cn(
                'p-3 rounded-lg',
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : msg.sender === 'ai'
                  ? 'bg-secondary text-muted-foreground'
                  : msg.sender === 'loader'
                  ? 'bg-gray-200 text-gray-400 italic'
                  : 'bg-red-100 text-red-700 border border-red-300'
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            className="flex-1 text-black"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={!input.trim() || loading}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
