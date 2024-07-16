
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

interface Message {
  senderId: string;
  recipientId: string;
  text: string;
  timestamp: number;
  status: string;
}

interface ChatProps {
  chatId: string;
  currentUserId: string;
}

const Chat = ({ chatId, currentUserId }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = ref(database, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setMessages(messagesList);
    });
  }, [chatId]);

  return (
    <div className="chat-container">
      <ul className="messages-list">
        {messages.map((message) => (
          <li
            key={message.senderId}
            className={`message ${
              message.senderId === currentUserId ? "sent" : "received"
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
