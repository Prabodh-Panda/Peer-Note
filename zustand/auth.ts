import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  user: User | undefined;
  logout: () => void;
  login: (_payload: User) => void;
}

export const useAuthState = create<AuthState>()((set) => ({
  user: undefined,
  login: (payload) => set((_state) => ({ user: payload })),
  logout: () => set((_state) => ({ user: undefined })),
}));
