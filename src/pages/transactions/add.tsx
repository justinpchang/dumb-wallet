import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import TransactionInput from "../../components/TransactionInput";
import { useAddTransactionMutation } from "../../hooks/transactions/useAddTransactionMutation";
import { XButton } from "../../components/library/XButton";

const AddTransaction: NextPage = () => {
  const router = useRouter();

  const { mutate: addTransaction, isLoading: isAddLoading } =
    useAddTransactionMutation({
      onSuccess: () => {
        router.push("/");
      },
    });

  return (
    <div>
      <TransactionInput
        handleSubmit={addTransaction}
        isSubmitLoading={isAddLoading}
      />
    </div>
  );
};

export default AddTransaction;
