import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/library";
import TransactionInput from "../../components/TransactionInput";
import { useTransactionQuery } from "../../hooks/transactions/useTransactionQuery";
import { useUpdateTransactionMutation } from "../../hooks/transactions/useUpdateTransactionMutation";

const EditTransaction: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: transactionData, isLoading } = useTransactionQuery(
    id as string
  );

  const { mutate: updateTransaction, isLoading: isUpdateLoading } =
    useUpdateTransactionMutation(id as string, {
      onSuccess: () => {
        router.push("/");
      },
    });

  if (isLoading || !transactionData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TransactionInput
        initialTransaction={transactionData}
        handleSubmit={updateTransaction}
        isSubmitLoading={isUpdateLoading}
      />
      <Link href="/">
        <a>
          <Button theme="primary">Go back</Button>
        </a>
      </Link>
    </>
  );
};

export default EditTransaction;
