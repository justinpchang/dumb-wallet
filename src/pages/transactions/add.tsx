import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createTransaction } from "../../requests/transaction.requests";
import { TransactionType } from "../../types/transaction.types";
import { Button, List } from "../../components/library";

const AddTransaction: NextPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [postedAt, setPostedAt] = useState(new Date());
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await createTransaction({
        amount: parseFloat(amount),
        transaction_type: type,
        posted_at: postedAt,
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col"
      >
        <List.Container>
          <List.Header>Add transaction</List.Header>
          <List.Item>
            <div className="w-full h-full">
              <div className="absolute">Amount</div>
              <input
                type="text"
                placeholder="$123.45"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-full text-right outline-none"
              />
            </div>
          </List.Item>
          <List.Item>
            <div className="w-full h-full">
              <div className="absolute">Type</div>
              <select
                className="bg-white float-right"
                onChange={(e) => setType(e.target.value as TransactionType)}
              >
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
              </select>
            </div>
          </List.Item>
          <List.Item>
            <div className="w-full h-full">
              <div className="absolute z-10">Date</div>
              <DatePicker
                selected={postedAt}
                onChange={setPostedAt}
                className="w-full text-right outline-none"
              />
            </div>
          </List.Item>
          <List.Item>
            <input
              type="text"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-full outline-none"
            />
          </List.Item>
          <List.Item>
            <textarea
              placeholder="Add a note"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-full outline-none"
            />
          </List.Item>
        </List.Container>
        <div className="flex flex-col gap-3">
          <Button
            theme="primary"
            type="submit"
            disabled={
              isLoading ||
              !type ||
              !amount ||
              isNaN(parseFloat(amount)) ||
              !postedAt ||
              !description
            }
          >
            {isLoading ? "Loading" : "Add Transaction"}
          </Button>
          <Link href="/transactions">
            <Button theme="primary">Go back</Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default AddTransaction;
