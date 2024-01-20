import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/library";
import TransactionInput from "../../components/TransactionInput";
import { useAddTransactionMutation } from "../../hooks/transactions/useAddTransactionMutation";

const AddTransaction: NextPage = () => {
  const router = useRouter();

  const { mutate: addTransaction, isLoading: isAddLoading } =
    useAddTransactionMutation({
      onSuccess: () => {
        router.push("/");
      },
    });

  return (
    <>
      <TransactionInput
        handleSubmit={addTransaction}
        isSubmitLoading={isAddLoading}
      />
      <Link href="/">
        <a>
          <Button theme="primary">Go back</Button>
        </a>
      </Link>
    </>
  );
};

export default AddTransaction;
