"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/lib/firebase";
import useChatStore from "@/store/chatStore";
import { useState } from "react";
import Chat from "./Chat";
import { NoUser } from "./NoUser";

const ChatPage = () => {
  const { selectedUser, currentUser, handleUserClick, chats } = useChatStore(
    (state) => ({
      users: state.users,
      selectedUser: state.selectedUser,
      currentUser: state.currentUser,
      handleUserClick: state.setSelectedUser,
      chats: state.chats,
    })
  );

  const [messageText, setMessageText] = useState("");

  if (!currentUser || !selectedUser) {
    return <NoUser />;
  }

  const currentUserId = currentUser.uid;
  const selectedUserId = selectedUser.id;

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
    <div className="bg-black rounded-lg w-full min-h-[40.5rem] max-h-[40.5rem] flex flex-col gap-3 justify-between">
      <Chat />
      <div className="message-input-container flex justify-between w-full gap-10 p-5">
        <Input
          className="text-white w-[50rem] bg-zinc-800"
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <Button className="bg-zinc-800" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
