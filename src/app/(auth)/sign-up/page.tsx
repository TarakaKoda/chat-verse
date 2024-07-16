import SignUpForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Verse - Sign up",
  description: "Create your Chat Verse account today!, Join us.",
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
