import create from "zustand";
import createAuthSlice, { AuthSlice } from "./createAuthSlice";
import createTransactionSlice, {
  TransactionSlice,
} from "./createTransactionSlice";

export type State = AuthSlice & TransactionSlice;

const useStore = create<State>()((...a) => ({
  ...createAuthSlice(...a),
  ...createTransactionSlice(...a),
}));

export default useStore;
