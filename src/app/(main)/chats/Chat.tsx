"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import useChatStore from "@/store/chatStore";

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  timestamp: number;
  status: string;
}

const Chat = () => {
  const { selectedUser, currentUser, chats } = useChatStore((state) => ({
    selectedUser: state.selectedUser,
    currentUser: state.currentUser,
    chats: state.chats,
  }));

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const chatId = [currentUser.uid, selectedUser.uid].sort().join("-");
    const messagesRef = ref(database, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setMessages(messagesList);
    });
  }, [selectedUser, currentUser]);

  return (
    <div className="chat-container">
      <ul className="messages-list">
        {messages.map((message) => (
          <li
            key={message.id}
            className={`message ${
              message.senderId === currentUser?.uid ? "sent" : "received"
            }`}>
            <span>{message.text}</span>
            <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
            <small>{message.status}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
