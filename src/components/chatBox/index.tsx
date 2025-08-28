/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useChat } from "@/src/hooks/chat";
import { useState, useEffect, useRef } from "react";

const ChatBox = ({
  currentUser,
  peerUser,
}: {
  currentUser: any;
  peerUser: any;
}) => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(peerUser.id, input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Tự động scroll xuống tin mới
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full border rounded-lg shadow bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m, idx) => {
          const isMe = m.from === currentUser.id;
          return (
            <div
              key={idx}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs break-words text-sm shadow-sm ${
                  isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t p-3 bg-white rounded-b-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-full px-4 py-2 text-sm 
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow transition"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
