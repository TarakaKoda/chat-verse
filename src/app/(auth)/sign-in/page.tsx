import SignInForm from "@/components/forms/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Verse - Sign in",
  description:
    "Sign in to Chat Verse and reconnect with your community. Access your messages, stay updated with online friends, and engage in real-time conversations.",
};

const SignInPage = () => {
  return <SignInForm />;
};

export default SignInPage;
