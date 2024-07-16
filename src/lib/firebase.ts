import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { AddUserProps } from "./types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const database = getDatabase();

export const addUser = ({ userId, username }: AddUserProps) => {
  set(ref(database, `users/${userId}`), {
    username: username,
    online: false, // Initial online status
  })
    .then(() => {
      console.log("User added successfully.");
    })
    .catch((error) => {
      console.error("Error adding user: ", error);
    });
};

export const onLogin = async (userId: string) => {
  // Set user as online
  set(ref(database, `users/${userId}/online`), true);
};
export const onLogout = async (userId: string) => {
  // Set user as offline
  set(ref(database, `users/${userId}/online`), false);
};

export const fetchUsers = (callback: (users: any[]) => void) => {
  const usersRef = ref(database, "users/");
  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    const usersList = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
    callback(usersList);
  });
};

export const sendMessage = (
  chatId: string,
  senderId: string,
  recipientId: string,
  messageText: string
) => {
  const newMessageRef = push(ref(database, `messages/${chatId}`));
  const messageId = newMessageRef.key;
  set(newMessageRef, {
    senderId: senderId,
    recipientId: recipientId,
    text: messageText,
    timestamp: Date.now(),
    status: "sent", // Initial status
  })
    .then(() => {
      console.log("Message sent successfully.");
      updateMessageStatus(chatId, messageId, "delivered");
    })
    .catch((error) => {
      console.error("Error sending message: ", error);
    });
};

// Function to update the message status
const updateMessageStatus = (
  chatId: string,
  messageId: string | null,
  status: string
) => {
  if (messageId) {
    const messageRef = ref(database, `messages/${chatId}/${messageId}`);
    update(messageRef, {
      status: status,
    })
      .then(() => {
        console.log(`Message status updated to ${status}.`);
      })
      .catch((error) => {
        console.error("Error updating message status: ", error);
      });
  } else {
    console.error("Error: Invalid message ID");
  }
};

export const markMessagesAsSeen = (chatId: string, recipientId: string) => {
  const messagesRef = ref(database, `messages/${chatId}`);

  get(messagesRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          if (
            message.recipientId === recipientId &&
            message.status !== "seen"
          ) {
            update(ref(database, `messages/${chatId}/${childSnapshot.key}`), {
              status: "seen",
            })
              .then(() => {
                console.log(`Message ${childSnapshot.key} marked as seen.`);
              })
              .catch((error) => {
                console.error("Error updating message status: ", error);
              });
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error retrieving messages: ", error);
    });
};

export const getUserByUid = async (uid: string) => {
  const userRef = ref(database, `users/${uid}`);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No user found with UID: ${uid}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error;
  }
};
