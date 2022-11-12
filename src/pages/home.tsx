import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";

import { format } from "date-fns";

import { getTransactions } from "../requests/transaction.requests";
import useStore from "../store/useStore";
import { formatAsCurrency } from "../utils/formatters";
import type { TransactionMonth } from "../types/transaction.types";
import Link from "next/link";

const Home: NextPage = () => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();

  const { transactions, setTransactions } = useStore();

  useEffect(() => {
    getTransactions().then((transactions) => setTransactions(transactions));
  }, [setTransactions]);

  const groupedTransactions: TransactionMonth[] = useMemo(() => {
    const uniqueYearMonthDays = Array.from(
      new Set(
        transactions.map((transaction) =>
          transaction.posted_at.substring(0, 10)
        )
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
  }, [transactions]);

  return (
    <>
      <button className="px-3 py-2 mb-6 bg-amber-50 border shadow hover:bg-amber-100 active:shadow-inner">
        Add Transaction
      </button>
      {groupedTransactions.map((month) => (
        <div
          className="mb-6 bg-slate-200 drop-shadow-sm w-80"
          key={`transaction-month-${month.label}`}
        >
          <div className="text-lg font-normal mx-3 mt-2 mb-3">
            {month.label}
          </div>
          {month.days.map((day) => (
            <>
              <div
                key={`transaction-month-${month.label}-day-${day.label}`}
                className="mx-4 text-xs"
              >
                {day.label}
              </div>
              {day.transactions.map((transaction) => (
                <div
                  className="bg-white text-sm p-2 m-2 drop-shadow flex flex-col"
                  id={`transaction-${transaction.id}`}
                  key={`transaction-${transaction.id}`}
                  onClick={(ev: React.MouseEvent) => {
                    if (ev.type === "click") {
                      setSelectedTransactionId(
                        selectedTransactionId === transaction.id
                          ? undefined
                          : transaction.id
                      );
                    }
                  }}
                  onBlur={(ev: React.FocusEvent) => {
                    if (ev.target.id.startsWith("transaction")) {
                      setSelectedTransactionId(ev.target.id.split("-")[1]);
                    } else {
                      setSelectedTransactionId(undefined);
                    }
                  }}
                  tabIndex={0}
                >
                  <div className="w-full flex justify-between">
                    <div>{transaction.description}</div>
                    <div>
                      {transaction.transaction_type === "EXPENSE" ? "-" : "+"}
                      {formatAsCurrency(transaction.amount)}
                    </div>
                  </div>
                  {selectedTransactionId === transaction.id && (
                    <>
                      <hr />
                      <div className="pl-3">
                        Edit
                        <br />
                        Delete
                      </div>
                      <hr />
                      <div className="pl-3">
                        Description: {transaction.notes}
                        <br />
                        Posted: {transaction.posted_at.substring(0, 10)}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      ))}
    </>
  );
};

export default Home;
