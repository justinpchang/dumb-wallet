import type { StateCreator } from "zustand";

import { State } from "./useStore";
import type { Transaction, TransactionMonth } from "../types/transaction.types";
import { groupTransactionsByYearMonthDay } from "../utils/transactions.utils";
import { getTransactions } from "../requests/transaction.requests";

export interface TransactionSlice {
  transactions: Transaction[];
  groupedTransactions: TransactionMonth[];
  getTransactionById: (id: string) => Transaction | undefined;
  setTransactions: (newTransactions: Transaction[]) => any;
  refreshTransactions: () => any;
}

const createTransactionSlice: StateCreator<State, [], [], TransactionSlice> = (
  set,
  get
) => ({
  transactions: [],
  groupedTransactions: [],
  getTransactionById: (id: string) =>
    get().transactions.find((transaction) => String(transaction.id) === id),
  setTransactions: (newTransactions: Transaction[]) =>
    set(() => ({
      transactions: newTransactions,
      groupedTransactions: groupTransactionsByYearMonthDay(newTransactions),
    })),
  refreshTransactions: () => getTransactions().then(get().setTransactions),
});

export default createTransactionSlice;
