import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, ArrowUpCircle } from "lucide-react";

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

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = async (text: string) => {
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
      
      if (error) throw error;
      
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

  const shouldShowDate = (index: number) => {
    if (index === 0) return true;
    const currentDate = new Date(messages[index].timestamp);
    const prevDate = new Date(messages[index - 1].timestamp);
    return currentDate.toDateString() !== prevDate.toDateString();
  };

  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    return messageDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-chat-sage/30 to-white">
      <div className="container mx-auto flex max-w-3xl flex-1 flex-col p-4">
        <header className="relative mb-4 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="absolute -left-2 top-1/2 h-8 w-2 -translate-y-1/2 rounded-r bg-chat-mint/80" />
          <h1 className="mb-2 text-2xl font-semibold text-gray-800">
           WellnessBot
          </h1>
          <p className="text-sm text-gray-600">
            Ask questions about weight management and healthy living
          </p>
        </header>

        <div 
          ref={chatContainerRef}
          className="relative flex-1 space-y-4 overflow-y-auto rounded-2xl bg-white/50 p-4 backdrop-blur-sm"
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="animate-fade-in">
                {shouldShowDate(index) && (
                  <div className="my-4 flex items-center justify-center">
                    <div className="rounded-full bg-gray-100 px-4 py-1 text-xs text-gray-500">
                      {formatMessageDate(message.timestamp)}
                    </div>
                  </div>
                )}
                <ChatMessage {...message} />
              </div>
            ))}
            {isTyping && (
              <div className="flex animate-fade-in justify-start">
                <TypingIndicator />
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-24 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-chat-mint text-white shadow-lg transition-all duration-300 hover:bg-chat-mint/90 hover:shadow-xl"
          >
            <ArrowUpCircle className="h-6 w-6 rotate-180" />
          </button>
        )}

        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        /* Custom scrollbar styles */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default Chat;
