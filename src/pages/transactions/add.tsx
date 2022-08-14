import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { createTransaction } from "../../requests/transaction.requests";
import { TransactionType } from "../../types/transaction.types";

const AddTransaction: NextPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await createTransaction({
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
      <h1 className="text-3xl">Add Transaction</h1>
      <div className="py-4" />
      <button onClick={() => router.push("/transactions")}>Go back</button>
      <div className="py-4" />
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
          {isLoading ? "Loading" : "Update"}
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
