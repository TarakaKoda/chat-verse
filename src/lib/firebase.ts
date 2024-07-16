import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
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
  set(newMessageRef, {
    senderId: senderId,
    recipientId: recipientId,
    text: messageText,
    timestamp: Date.now(),
    status: "sent", // Initial status
  })
    .then(() => {
      console.log("Message sent successfully.");
    })
    .catch((error) => {
      console.error("Error sending message: ", error);
    });
};
