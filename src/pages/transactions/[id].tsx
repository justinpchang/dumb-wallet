import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/library";
import TransactionInput from "../../components/TransactionInput";
import { useTransactionQuery } from "../../hooks/transactions/useTransactionQuery";
import { useUpdateTransactionMutation } from "../../hooks/transactions/useUpdateTransactionMutation";
import { XButton } from "../../components/library/XButton";

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
    <div>
      <Link href="/">
        <a>
          <XButton size={6} className="mb-4" />
        </a>
      </Link>
      <TransactionInput
        initialTransaction={transactionData}
        handleSubmit={updateTransaction}
        isSubmitLoading={isUpdateLoading}
      />
    </div>
  );
};

export default EditTransaction;
