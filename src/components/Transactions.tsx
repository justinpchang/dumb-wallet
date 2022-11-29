import React, { useEffect, useState } from "react";
import Link from "next/link";

import useStore from "../store/useStore";
import { formatAsCurrency } from "../utils/format.utils";
import { Animated, Button, List } from "./library";
import { deleteTransaction } from "../requests/transaction.requests";
import { useRouter } from "next/router";

const Transactions = () => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();

  const { groupedTransactions, refreshTransactions } = useStore();
  const router = useRouter();

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

  const handleEditButtonClick =
    (transactionId: string | undefined) => (ev: React.MouseEvent) => {
      ev.preventDefault();
      router.push(`/transactions/${transactionId}`);
    };

  const handleDeleteButtonClick =
    (transactionId: string | undefined) => (ev: React.MouseEvent) => {
      ev.preventDefault();
      if (
        transactionId &&
        confirm("Are you sure you want to delete this transaction?")
      )
        deleteTransaction(transactionId).then(refreshTransactions);
    };

  return (
    <>
      <div className="flex mb-6 gap-3">
        <Button theme="primary" onClick={() => refreshTransactions()}>
          Refresh
        </Button>
        <Link href="/transactions/add">
          <a>
            <Button theme="primary">Add Transaction</Button>
          </a>
        </Link>
      </div>
      {groupedTransactions.map((month) => (
        <List.Container key={`tm-${month.label}`}>
          <List.Header key={`tm-header-${month.label}`}>
            {month.label}
          </List.Header>
          {month.days.map((day) => (
            <div key={`tmd-cont-${month.label}-${day.label}`}>
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
                      {formatAsCurrency(parseFloat(transaction.amount))}
                    </div>
                  </div>
                  <Animated.Collapsible
                    open={selectedTransactionId === transaction.id}
                  >
                    <div className="pt-1">
                      <hr />
                      <div className="pl-3">
                        <Button
                          theme="ghost"
                          onClick={handleEditButtonClick(transaction.id)}
                        >
                          Edit
                        </Button>
                        <br />
                        <Button
                          theme="ghost"
                          onClick={handleDeleteButtonClick(transaction.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <hr />
                      <div className="pl-3 cursor-default">
                        Description: {transaction.description}
                        <br />
                        Notes: {transaction.notes}
                        <br />
                        Posted:{" "}
                        {transaction.posted_at.toString().substring(0, 10)}
                      </div>
                    </div>
                  </Animated.Collapsible>
                </List.Item>
              ))}
            </div>
          ))}
        </List.Container>
      ))}
    </>
  );
};

export default Transactions;
