import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "@/lib/firebase";


import { ChatStore, SelectedUser } from "@/lib/types";

const useChatStore = create<ChatStore>()(
  devtools((set, get) => ({
    users: [],
    currentUser: null,
    selectedUser: null,
    chats: [],
    setUsers: (users) => set({ users }),
    setCurrentUser: (user) => set({ currentUser: user }),
    setSelectedUser: (user) => {
      console.log("selected User", user);
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
          console.log("hereelllllllllllllllllllllllll");
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
        console.log("CurrentUser here|||", user);
        if (user) {
          get().fetchUsers();
        }
      });

      return () => {
        unsubscribeAuth();
      };
    },

    fetchChats: (userId) => {
        console.log(userId)
      const currentUser = get().currentUser;
      console.log(`ppppppppppppppppppppp ${currentUser}`);
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
        console.log(`CurrentUser: ${currentUser} ChatList: ${chatsList}`);
      });
    },
  }))
);

export default useChatStore;
