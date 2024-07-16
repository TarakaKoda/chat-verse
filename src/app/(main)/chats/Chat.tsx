"use client";

import { database, markMessagesAsSeen } from "@/lib/firebase";
import useChatStore from "@/store/chatStore";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkDone, IoCheckmarkDoneSharp } from "react-icons/io5";

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  timestamp: number;
  status: string;
}

const Chat = () => {
  const { selectedUser, currentUser } = useChatStore((state) => ({
    selectedUser: state.selectedUser,
    currentUser: state.currentUser,
    chats: state.chats,
  }));

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const chatId = [currentUser.uid, selectedUser.id].sort().join("_");

    const messagesRef = ref(database, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setMessages(messagesList);
    });
  }, [selectedUser, currentUser]);

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const chatId = [currentUser.uid, selectedUser.id].sort().join("_");

    // Mark messages as seen when the component mounts or selectedUser/currentUser changes
    markMessagesAsSeen(chatId, currentUser.uid);

    // Set an interval to periodically mark messages as seen
    const intervalId = setInterval(() => {
      markMessagesAsSeen(chatId, currentUser.uid);
    }, 5000); // Check every 5 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Clear interval on cleanup
  }, [selectedUser, currentUser]);

  return (
    <div className=" custom-scrollbar max-h-[37rem] overflow-y-scroll">
      <ul className="flex flex-col p-5 gap-5">
        {messages.map((message) => (
          <li
            key={message.id}
            className={`bg-zinc-800 rounded-lg p-5 ${
              message.senderId === currentUser?.uid
                ? "text-green-500 self-end"
                : "text-red-500 self-start"
            }`}>
            <p>{message.text}</p>
            <p className="flex justify-between">
              <small className="text-xsm">
                {new Date(message.timestamp).toLocaleTimeString()}
              </small>
              {message.senderId === currentUser?.uid && (
                <>
                  {message.status === "sent" ? (
                    <IoMdCheckmark className="text-gray-500" />
                  ) : message.status === "delivered" ? (
                    <IoCheckmarkDone className="text-gray-500" />
                  ) : (
                    <IoCheckmarkDoneSharp className="text-blue-500" />
                  )}
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
