import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";

import { format } from "date-fns";

import { getTransactions } from "../requests/transaction.requests";
import useStore from "../store/useStore";
import { formatAsCurrency } from "../utils/formatters";
import type { TransactionMonth } from "../types/transaction.types";
import { Animated, List } from "../components/library";

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
        <List.Container key={`tm-${month.label}`}>
          <List.Header>{month.label}</List.Header>
          {month.days.map((day) => (
            <>
              <List.Subheader key={`tmd-${month.label}-${day.label}`}>
                {day.label}
              </List.Subheader>
              {day.transactions.map((transaction) => (
                <List.Item
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
                    <div
                      className={
                        transaction.transaction_type === "EXPENSE"
                          ? "text-black"
                          : "text-emerald-500"
                      }
                    >
                      {transaction.transaction_type === "EXPENSE" ? "-" : "+"}
                      {formatAsCurrency(transaction.amount)}
                    </div>
                  </div>
                  <Animated.Collapsible
                    open={selectedTransactionId === transaction.id}
                  >
                    <div className="pointer-events-none"
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
                    </div>
                  </Animated.Collapsible>
                </List.Item>
              ))}
            </>
          ))}
        </List.Container>
      ))}
    </>
  );
};

export default Home;
