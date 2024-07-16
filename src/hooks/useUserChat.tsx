"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "@/lib/firebase";

export const useUserChat = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<any>();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const fetchUsers = () => {
      const usersRef = ref(database, "users/");
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const usersList = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        if (currentUser) {
          setUsers(usersList.filter((user) => user.id !== currentUser.uid));
        } else {
          setUsers(usersList);
        }
      });
    };

    fetchUsers();

    return () => {
      unsubscribeAuth();
    };
  }, [currentUser, selectedUser]);

  const fetchChats = (userId: string) => {
    const chatsRef = ref(database, `chats/${currentUser?.uid}/${userId}`);
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      const chatsList = data ? Object.values(data) : [];
      setChats(chatsList);
    });
  };

  const handleUserClick = (user: any) => {
    console.log(currentUser);
    setSelectedUser(user);
    console.log(selectedUser);
    fetchChats(user.id);
  };

  return { users, currentUser, selectedUser, chats, handleUserClick };
};
