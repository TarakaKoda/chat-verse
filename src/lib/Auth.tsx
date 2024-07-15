"use client";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface SignInProps {
  email: string;
  password: string;
}

export const signUp = ({ email, password }: SignInProps) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`User successfully sign up!`);
      // Todo: Toast welcome user
    })
    .catch((error) => console.error("Error signing up:", error));
};

export const signIn = ({ email, password }: SignInProps) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`User successfully sign in!`);
      // Todo: Toast welcome user
    })
    .catch((error) => console.error("Error logging in:", error));
};
