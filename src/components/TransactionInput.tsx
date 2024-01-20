import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Transaction } from "../types/transaction.types";
import { Button, List } from "./library";
import { createEmptyTransaction } from "../utils/transaction.utils";

interface Props {
  initialTransaction?: Transaction;
  handleSubmit: (transaction: Transaction) => any;
  isSubmitLoading: boolean;
}

const TransactionInput = ({
  initialTransaction,
  handleSubmit,
  isSubmitLoading,
}: Props) => {
  const [transaction, setTransaction] = useState<Transaction>(
    initialTransaction ?? createEmptyTransaction()
  );

  const isEditing = Boolean(initialTransaction);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit(transaction);
  };

  const handleChange = (e: React.ChangeEvent<any>) =>
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });

  const handleDatePickerChange = (date: Date) =>
    setTransaction({
      ...transaction,
      posted_at: date,
    });

  const { transaction_type, amount, posted_at, description, notes } =
    transaction;

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col">
      <List.Container>
        <List.Header>{isEditing ? "Edit" : "Add"} transaction</List.Header>
        <List.Item>
          <div className="w-full h-full">
            <div className="absolute">Type</div>
            <select
              name="transaction_type"
              value={transaction_type}
              onChange={handleChange}
              className="bg-white float-right"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>
        </List.Item>
        <List.Item>
          <div className="w-full h-full">
            <div className="absolute">Amount</div>
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="$123.45"
              className="w-full h-full text-right outline-none"
            />
          </div>
        </List.Item>
        <List.Item>
          <div className="w-full h-full">
            <div className="absolute z-10">Date</div>
            <DatePicker
              selected={posted_at}
              onChange={handleDatePickerChange}
              className="w-full text-right outline-none"
            />
          </div>
        </List.Item>
        <List.Item>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Add a description"
            className="w-full h-full outline-none"
          />
        </List.Item>
        <List.Item>
          <textarea
            placeholder="Add a note"
            name="notes"
            value={notes}
            onChange={handleChange}
            className="w-full h-full outline-none"
          />
        </List.Item>
      </List.Container>
      <div className="flex flex-col gap-3">
        <Button
          theme="primary"
          type="submit"
          disabled={
            isSubmitLoading ||
            !transaction_type ||
            !amount ||
            isNaN(parseFloat(amount)) ||
            !posted_at ||
            !description
          }
        >
          {isSubmitLoading ? "Loading" : "Add Transaction"}
        </Button>
      </div>
    </form>
  );
};

export default TransactionInput;
