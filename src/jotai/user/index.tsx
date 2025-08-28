import { atom } from "jotai";

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status?: "active" | "pending";
  role: "teacher" | "student";
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}


export const authAtom = atom<AuthState>({
  token: null,
  user: null,
  isAuthenticated: false,
});

export const studentListAtom = atom<User[]>([]);
export const selectedStudentAtom = atom<User | null>(null);


