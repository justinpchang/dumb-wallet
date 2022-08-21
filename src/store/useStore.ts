import create from "zustand";
import createAuthSlice, { AuthSlice } from "./createAuthSlice";

export type State = AuthSlice;

const useStore = create<State>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useStore;
