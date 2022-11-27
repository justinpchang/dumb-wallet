import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { createTransaction } from "../../requests/transaction.requests";
import { Button } from "../../components/library";
import TransactionInput from "../../components/TransactionInput";
import { createEmptyTransaction } from "../../utils/transaction.utils";

const AddTransaction: NextPage = () => {
  const router = useRouter();

  const [transaction, setTransaction] = useState(createEmptyTransaction());

  const handleSubmit = async () => {
    try {
      await createTransaction(transaction);
      router.push("/transactions");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TransactionInput
        transaction={transaction}
        setTransaction={setTransaction}
        handleSubmit={handleSubmit}
      />
      <Link href="/transactions">
        <Button theme="primary">Go back</Button>
      </Link>
    </>
  );
};

export default AddTransaction;
