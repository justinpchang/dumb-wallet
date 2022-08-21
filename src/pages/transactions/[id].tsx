import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { updateTransaction } from "../../requests/transaction.requests";
import type { TransactionType } from "../../types/transaction.types";

const EditTransaction: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { getTransactionById } = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (id) {
      const transaction = getTransactionById(id as string);

      if (!transaction) {
        router.push("/transactions");
        return;
      }

      setType(transaction.transaction_type);
      setAmount(transaction.amount.toString());
      setDescription(transaction.description);
      setNotes(transaction.notes);
      setIsLoading(false);
    }
  }, [id, getTransactionById, router]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await updateTransaction(id as string, {
        transaction_type: type,
        amount: parseFloat(amount),
        description,
        notes,
      });
      router.push("/transactions");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl">View Transaction</h1>
      <div className="py-4" />
      <Link href="/transactions">Go back</Link>
      <div className="py-4" />
      {!isLoading && (
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <select
            className="bg-gray-400"
            onChange={(e) => setType(e.target.value as TransactionType)}
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
          <label>
            Amount
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Notes
            <input
              type="textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={
              isLoading ||
              !amount ||
              isNaN(parseFloat(amount)) ||
              !type ||
              !description
            }
          >
            {isLoading ? "Loading" : "Update Transaction"}
          </button>
        </form>
      )}
    </>
  );
};

export default EditTransaction;
