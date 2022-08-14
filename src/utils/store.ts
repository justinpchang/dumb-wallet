import create, { StateCreator } from "zustand";
import type { Session } from "@supabase/supabase-js";
import { Transaction } from "../types/transaction.types";

interface AuthSlice {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

const createAuthSlice: StateCreator<State, [], [], AuthSlice> = (set) => ({
  session: null,
  setSession: (newSession: Session | null) =>
    set(() => ({ session: newSession })),
});

type State = AuthSlice;

export const useStore = create<State>()((...a) => ({
  ...createAuthSlice(...a),
}));
