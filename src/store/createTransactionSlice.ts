import type { StateCreator } from "zustand";
import { State } from "./useStore";
import type { Transaction } from "../types/transaction.types";

export interface TransactionSlice {
  transactions: Transaction[];
  getTransactionById: (id: string) => Transaction | undefined;
  setTransactions: (newTransactions: Transaction[]) => any;
}

const createTransactionSlice: StateCreator<State, [], [], TransactionSlice> = (
  set,
  get
) => ({
  transactions: [],
  getTransactionById: (id: string) =>
    get().transactions.find((transaction) => String(transaction.id) === id),
  setTransactions: (newTransactions: Transaction[]) =>
    set(() => ({ transactions: newTransactions })),
});

export default createTransactionSlice;
