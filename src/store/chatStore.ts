import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "@/lib/firebase";

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
        console.log('selected User', user)
      set({ selectedUser: user });
      get().fetchChats(user.uid);
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
            console.log('hereelllllllllllllllllllllllll')
          set({
            users: usersList.filter((user) => user.id !== currentUser.uid),
            
          });
          console.log(usersList)
        } else {
          set({ users: usersList });
        }
      });
    },

    fetchChats: (userId) => {
      const currentUser = get().currentUser;
      const chatsRef = ref(database, `chats/${currentUser?.uid}/${userId}`);
      onValue(chatsRef, (snapshot) => {
        const data = snapshot.val();
        const chatsList = data ? Object.values(data) : [];
        set({ chats: chatsList });
        console.log(currentUser, chatsList)
      });
    },

    initializeAuth: () => {
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        set({ currentUser: user });
        console.log('CurrentUser here|||', user)
        if (user) {
          get().fetchUsers();
        }
      });

      
      return () => {
        unsubscribeAuth();
      };
    },
    
  }))
);

export default useChatStore;
