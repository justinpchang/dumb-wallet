import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useStore from "../../store/useStore";
import {
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../../requests/transaction.requests";
import { createEmptyTransaction } from "../../utils/transaction.utils";
import { Button } from "../../components/library";
import TransactionInput from "../../components/TransactionInput";

const EditTransaction: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { getTransactionById } = useStore();

  const [transaction, setTransaction] = useState(createEmptyTransaction());

  useEffect(() => {
    async function fetchTransaction(id: string) {
      let _transaction = getTransactionById(id);
      if (!_transaction) {
        _transaction = await getTransaction(id);
        await getTransactions();
      }
      if (!_transaction) {
        router.push("/transactions");
        return;
      }
      _transaction.posted_at = new Date(_transaction.posted_at);
      setTransaction(_transaction);
    }

    if (id) {
      fetchTransaction(id as string);
    }
  }, [id, getTransactionById, router]);

  const handleSubmit = async () => {
    try {
      await updateTransaction(id as string, transaction);
      router.push("/transactions");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TransactionInput
        isEditing
        transaction={transaction}
        setTransaction={setTransaction}
        handleSubmit={handleSubmit}
      />
      <Link href="/transactions">
        <a>
          <Button theme="primary">Go back</Button>
        </a>
      </Link>
    </>
  );
};

export default EditTransaction;
