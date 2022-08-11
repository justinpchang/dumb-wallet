import create, { StateCreator } from "zustand";
import type { Session } from "@supabase/supabase-js";

interface AuthSlice {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

type State = AuthSlice;

const createAuthSlice: StateCreator<State, [], [], AuthSlice> = (set) => ({
  session: null,
  setSession: (newSession: Session | null) =>
    set(() => ({ session: newSession })),
});

export const useStore = create<State>()((...a) => ({
  ...createAuthSlice(...a),
}));
