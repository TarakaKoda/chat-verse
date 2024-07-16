"use client";

import { sendMessage } from "@/lib/firebase";
import React, { useState } from "react";
import Chat from "./Chat";
import { useUserChat } from "@/hooks/useUserChat";

const ChatPage = () => {
  const { handleUserClick, chats, selectedUser, currentUser, users } =
    useUserChat();
  const [messageText, setMessageText] = useState("");
  const currentUserId = currentUser.uid;
  const selectedUserId = selectedUser.uid;
  const chatId =
    currentUserId < selectedUserId
      ? `${currentUserId}_${selectedUserId}`
      : `${selectedUserId}_${currentUserId}`;

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      sendMessage(chatId, currentUserId, selectedUserId, messageText);
      setMessageText("");
    }
  };

  return (
    <div className="bg-zinc-800 rounded-lg w-full h-full flex flex-col justify-between">
      <Chat chatId={chatId} currentUserId={currentUserId} />
      <div className="message-input-container flex justify-around gap-10 p-10">
        <input
          className="w-full text-black"
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
