
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t bg-white/50 p-4 backdrop-blur-sm"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about obesity reduction..."
        className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm focus:border-chat-mint focus:outline-none focus:ring-1 focus:ring-chat-mint"
        disabled={disabled}
      />
      <Button
        type="submit"
        disabled={disabled || !message.trim()}
        className="rounded-full bg-chat-mint hover:bg-chat-mint/90"
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};
