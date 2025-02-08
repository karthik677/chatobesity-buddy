
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessageProps {
  text: string;  // Changed from 'message' to 'text' to match the data structure
  isAi: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ text, isAi, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
          isAi
            ? "bg-chat-bubble-ai border border-chat-mint/20"
            : "bg-chat-bubble border border-white/20"
        )}
      >
        <p className="text-sm text-gray-800">{text}</p>
        <time className="mt-1 text-xs text-gray-500">
          {format(timestamp, "HH:mm")}
        </time>
      </div>
    </div>
  );
};
