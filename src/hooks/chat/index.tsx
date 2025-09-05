/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useChat.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../auth";
import { useAtom } from "jotai";
import { messagesAtom } from "@/src/jotai/message";
import { useRequest } from "ahooks";
import { getMessages } from "@/src/services/chat";

export function useChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { userInfo } = useAuth();
  const [messages, setMessages] = useAtom(messagesAtom);

  useEffect(() => {
    if (!userInfo?.token) return;

    const socket = io("http://localhost:3001", {
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
    setMessages((prev) => [
      ...prev,
      { from: "me", to: toUserId, text, createdAt: Date.now() },
    ]);
  };

  const requestGetMessages = useRequest(
    (peerUserId) => getMessages(peerUserId, userInfo?.token as string),
    {
      manual: true,
      onSuccess: (res: any) => {
        setMessages(res?.messages || []);
      },
      onError: (err: any) => {
        console.log("Lỗi lấy tin nhắn:", err);
      },
    }
  );

  return { messages, setMessages, sendMessage, requestGetMessages };
}
