import { format } from "date-fns";

import type { Transaction } from "../types/transaction.types";

export const groupTransactionsByYearMonthDay = (
  transactions: Transaction[]
) => {
  const uniqueYearMonthDays = Array.from(
    new Set(
      transactions.map((transaction) => transaction.posted_at.substring(0, 10))
    )
  );
  return Array.from(
    new Set(
      transactions.map((transaction) => transaction.posted_at.substring(0, 7))
    )
  ).map((yearMonth) => ({
    label: format(new Date(yearMonth), "MMMM yyyy"),
    days: uniqueYearMonthDays
      .filter((yearMonthDay) => yearMonthDay.startsWith(yearMonth))
      .map((yearMonthDay) => ({
        label: format(new Date(yearMonthDay), "eeee 'the' do"),
        transactions: transactions.filter((transaction) =>
          transaction.posted_at.startsWith(yearMonthDay)
        ),
      })),
  }));
};
