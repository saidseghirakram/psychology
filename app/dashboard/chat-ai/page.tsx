"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

export default function ChatAiPage() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newUserMessage: Message = { text: input, sender: 'user' };
      setMessages([...messages, newUserMessage]);
      setTimeout(() => {
        const aiResponse: Message = { text: `Echo: ${input}`, sender: 'ai' };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 500);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background   my-2 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-3 max-w-[70%]',
              message.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            )}
          >
            <div
              className={cn(
                'p-3 rounded-lg',
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground'
              )}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> 
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            className="flex-1 text-black"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSend} disabled={!input.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
} 