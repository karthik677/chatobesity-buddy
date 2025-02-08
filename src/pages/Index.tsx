
import { useState } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  text: string;
  isAi: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  text: "Hello! I'm your obesity reduction assistant. Feel free to ask me any questions about weight management, healthy lifestyle choices, or obesity-related topics.",
  isAi: true,
  timestamp: new Date(),
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      text,
      isAi: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: text }
      });

      if (error) {
        throw error;
      }

      const aiMessage: Message = {
        text: data.answer,
        isAi: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        isAi: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-chat-sage/30 to-white">
      <div className="container mx-auto flex max-w-2xl flex-1 flex-col">
        <header className="py-6 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800">
            Obesity Reduction Assistant
          </h1>
          <p className="text-sm text-gray-600">
            Ask questions about weight management and healthy living
          </p>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto rounded-t-2xl bg-white/50 p-4 backdrop-blur-sm">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;
