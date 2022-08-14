import { format } from "date-fns";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTransactions } from "../requests/transaction.requests";
import type { Transaction } from "../types/transaction.types";

const Transactions: NextPage = () => {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions().then((transactions) => setTransactions(transactions));
  }, []);

  return (
    <>
      <h1 className="text-3xl">Transactions</h1>
      <div className="py-4" />
      <button onClick={() => router.push("/")}>Go to Profile</button>
      <div className="py-4" />
      <button onClick={() => router.push("/transactions/add")}>
        Add new transaction
      </button>
      <div className="py-4" />
      <ul className="list-disc">
        {transactions.map((transaction: Transaction) => (
          <li key={transaction.id}>
            {transaction.transaction_type === "EXPENSE" ? "-" : "+"}$
            {transaction.amount} - {transaction.description} (
            {format(new Date(transaction.posted_at), "MM/dd/yyyy")})
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
