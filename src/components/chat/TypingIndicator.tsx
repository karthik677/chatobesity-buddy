
export const TypingIndicator = () => {
  return (
    <div className="flex animate-fade-in items-center gap-1 rounded-full bg-chat-bubble-ai px-4 py-2 text-chat-mint">
      <div className="h-2 w-2 animate-pulse rounded-full bg-current"></div>
      <div className="h-2 w-2 animate-pulse rounded-full bg-current [animation-delay:0.2s]"></div>
      <div className="h-2 w-2 animate-pulse rounded-full bg-current [animation-delay:0.4s]"></div>
    </div>
  );
};
