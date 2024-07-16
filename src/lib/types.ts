import { z } from "zod";

export const SignUpFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export interface AddUserProps {
  userId: string;
  username: string;
}