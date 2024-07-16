import { auth, database } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { ChatStore } from "@/lib/types";

const useChatStore = create<ChatStore>()(
  devtools((set, get) => ({
    users: [],
    currentUser: null,
    selectedUser: null,
    chats: [],
    setUsers: (users) => set({ users }),
    setCurrentUser: (user) => set({ currentUser: user }),
    setSelectedUser: (user) => {
      set({ selectedUser: user });
      get().fetchChats(user.id);
    },
    setChats: (chats) => set({ chats }),

    fetchUsers: () => {
      const usersRef = ref(database, "users/");
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const usersList = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        const currentUser = get().currentUser;
        if (currentUser) {
          set({
            users: usersList.filter((user) => user.id !== currentUser.uid),
          });
        } else {
          set({ users: usersList });
        }
      });
    },
    initializeAuth: () => {
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        set({ currentUser: user });
        if (user) {
          get().fetchUsers();
        }
      });

      return () => {
        unsubscribeAuth();
      };
    },

    fetchChats: (userId) => {
      const currentUser = get().currentUser;
      const messagesRef = ref(database, `messages/`);

      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const chatsList = [];

        if (data) {
          for (const key in data) {
            const message = data[key];
            if (
              (message.senderId === currentUser?.uid &&
                message.recipientId === userId) ||
              (message.recipientId === currentUser?.uid &&
                message.senderId === userId)
            ) {
              chatsList.push(message);
            }
          }
        }

        set({ chats: chatsList });
      });
    },
  }))
);

export default useChatStore;
