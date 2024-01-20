import { format } from "date-fns";

import type { RawTransaction, Transaction } from "../types/transaction.types";

export const createEmptyTransaction = (): Transaction => ({
  transaction_type: "EXPENSE",
  amount: "",
  posted_at: new Date(),
  description: "",
  notes: "",
});

export const transformRawTransaction = (
  rawTransaction: RawTransaction
): Transaction => ({
  ...rawTransaction,
  posted_at: new Date(rawTransaction.posted_at),
});

export const groupTransactionsByYearMonthDay = (
  transactions: Transaction[]
): {
  label: string;
  days: { label: string; transactions: Transaction[] }[];
}[] => {
  const uniqueYearMonthDays = Array.from(
    new Set(
      transactions.map((transaction) =>
        transaction.posted_at.toISOString().substring(0, 10)
      )
    )
  );
  return Array.from(
    new Set(
      transactions.map((transaction) =>
        transaction.posted_at.toISOString().substring(0, 7)
      )
    )
  ).map((yearMonth) => ({
    label: format(new Date(yearMonth + "T00:00"), "MMMM yyyy"),
    days: uniqueYearMonthDays
      .filter((yearMonthDay) => yearMonthDay.startsWith(yearMonth))
      .map((yearMonthDay) => ({
        label: format(new Date(yearMonthDay + "T00:00"), "eeee 'the' do"),
        transactions: transactions.filter((transaction) =>
          transaction.posted_at.toISOString().startsWith(yearMonthDay)
        ),
      })),
  }));
};
