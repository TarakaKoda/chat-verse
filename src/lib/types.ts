import { User } from "firebase/auth";
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

export interface SelectedUser {
  id: string;
  username: string;
  online: string;
}

export interface ChatStore {
  users: SelectedUser[];
  currentUser: User | null;
  selectedUser: SelectedUser | null;
  chats: any[];
  setUsers: (users: SelectedUser[]) => void;
  setCurrentUser: (user: User | null) => void;
  setSelectedUser: (user: SelectedUser) => void;
  setChats: (chats: any[]) => void;
  fetchUsers: () => void;
  fetchChats: (userId: string) => void;
  initializeAuth: () => () => void;
}
