import { format } from "date-fns";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTransactions } from "../requests/transaction.requests";
import type { Transaction } from "../types/transaction.types";

const Transactions: NextPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions().then((transactions) => setTransactions(transactions));
  }, []);

  return (
    <>
      <h1 className="text-3xl">Transactions</h1>
      <div className="py-4" />
      <Link href="/">Go to Profile</Link>
      <div className="py-4" />
      <Link href="/transactions/add">Add new transaction</Link>
      <div className="py-4" />
      <ul className="list-disc">
        {transactions.map((transaction: Transaction) => (
          <li key={transaction.id}>
            <Link href={`/transactions/${transaction.id}`}>
              <a>
                {transaction.transaction_type === "EXPENSE" ? "-" : "+"}$
                {transaction.amount} - {transaction.description} (
                {format(new Date(transaction.posted_at), "MM/dd/yyyy")})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Transactions;

export async function getServerSideProps() {
  return {
    props: {
      test: "Test",
    },
  };
}
