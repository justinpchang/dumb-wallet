import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import useStore from "../store/useStore";
import { formatAsCurrency } from "../utils/formatters";
import { Animated, Button, List } from "../components/library";

const Home: NextPage = () => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();

  const { groupedTransactions, refreshTransactions } = useStore();

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  const handleListItemClick =
    (transactionId: string | undefined) => (ev: React.MouseEvent) => {
      if (
        ev.type === "click" &&
        window.getSelection()?.toString()?.length === 0
      ) {
        setSelectedTransactionId(
          selectedTransactionId === transactionId ? undefined : transactionId
        );
      }
    };

  const handleListItemBlur = (ev: React.FocusEvent) => {
    if (ev.target.id.startsWith("transaction")) {
      setSelectedTransactionId(ev.target.id.split("-")[1]);
    } else {
      setSelectedTransactionId(undefined);
    }
  };

  return (
    <>
      <div className="flex mb-6 gap-3">
        <Button onClick={() => refreshTransactions()}>Refresh</Button>
        <Button onClick={() => {}}>Add Transaction</Button>
      </div>
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
                  onClick={handleListItemClick(transaction.id)}
                  onBlur={handleListItemBlur}
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
                    <div className="pointer-events-none">
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
