/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useChat.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../auth";

export function useChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { userInfo } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!userInfo?.token) return;

    const socket = io("http://localhost:3001", {
      // đổi sang URL backend của bạn
      auth: { token: userInfo?.token },
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [userInfo?.token]);

  const sendMessage = (toUserId: string, text: string) => {
    if (!socket) return;
    socket.emit("send_message", { toUserId, text });
    // Optionally: tự thêm vào UI ngay
    setMessages((prev) => [
      ...prev,
      { from: "me", to: toUserId, text, createdAt: Date.now() },
    ]);
  };

  return { messages, sendMessage };
}
