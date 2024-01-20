import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Transaction } from "../types/transaction.types";
import { Button, List } from "./library";
import { createEmptyTransaction } from "../utils/transaction.utils";
import {
  Form,
  Heading,
  Label,
  Subheading,
  TextInput,
  WhiteBackground,
} from "./library/Form";
import clsx from "clsx";
import Link from "next/link";
import { XButton } from "./library/XButton";

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

  const isSaveButtonDisabled =
    isSubmitLoading ||
    !transaction_type ||
    !amount ||
    isNaN(parseFloat(amount)) ||
    !posted_at ||
    !description;

  return (
    <>
      <WhiteBackground />
      <Form onSubmit={handleFormSubmit} className="mx-4 md:m-auto md:w-80">
        <Link href="/">
          <a>
            <XButton size={6} className="mb-4" />
          </a>
        </Link>
        <Heading>
          {isEditing ? "Edit " : "Add a new "}
          <select
            name="transaction_type"
            value={transaction_type}
            onChange={handleChange}
            className={clsx(
              "bg-white text-xl font-semibold mt-2 ml-2 px-2 rounded-md ring-1",
              transaction_type === "EXPENSE"
                ? "text-red-500 ring-red-300"
                : "text-green-500 ring-green-300"
            )}
          >
            <option value="EXPENSE">expense</option>
            <option value="INCOME">income</option>
          </select>
        </Heading>
        <Subheading>
          Enter the details of your transaction to help you track your spending.
        </Subheading>
        <Label>
          Amount
          <TextInput
            type="text"
            name="amount"
            value={amount}
            onChange={handleChange}
            placeholder="$123.45"
          />
        </Label>
        <Label>
          Description
          <TextInput
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Add a description"
          />
        </Label>
        <Label>
          Date
          <DatePicker
            selected={posted_at}
            onChange={handleDatePickerChange}
            dateFormat="MMM d, yyyy"
            className="rounded-md py-1.5 px-3 w-full bg-background shadow-sm ring-1 ring-inset ring-gray-300 font-normal"
          />
        </Label>
        {/*
        <Label>
          Note (optional)
          <textarea
            placeholder="Add a note"
            name="notes"
            value={notes}
            onChange={handleChange}
            className="rounded-md py-1.5 px-3 w-full bg-background shadow-sm ring-1 ring-inset ring-gray-300 font-normal"
          />
        </Label>
            */}
        <div className="flex flex-col gap-4 mt-4">
          <Button theme="primary" type="submit" disabled={isSaveButtonDisabled}>
            {isSubmitLoading ? "Loading" : "Save transaction"}
          </Button>
          <Button
            theme="secondary"
            type="submit"
            disabled={isSaveButtonDisabled}
          >
            {isSubmitLoading ? "Loading" : "Save and add another"}
          </Button>
        </div>
      </Form>
    </>
  );

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
    </form>
  );
};

export default TransactionInput;
