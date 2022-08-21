import type { StateCreator } from "zustand";
import { State } from "./useStore";
import type { Session } from "@supabase/supabase-js";

export interface AuthSlice {
  session: Session | null;
  setSession: (newSession: Session | null) => any;
}

const createAuthSlice: StateCreator<State, [], [], AuthSlice> = (set) => ({
  session: null,
  setSession: (newSession: Session | null) =>
    set(() => ({ session: newSession })),
});

export default createAuthSlice;
