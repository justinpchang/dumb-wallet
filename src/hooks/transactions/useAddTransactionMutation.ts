import { useMutation, useQueryClient } from "react-query";
import { Transaction } from "../../types/transaction.types";
import { createTransaction } from "../../requests/transaction.requests";
import { USE_GROUPED_TRANSACTIONS_QUERY_KEY } from "./useGroupedTransactionsQuery";

export const useAddTransactionMutation = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (transaction: Transaction) => createTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GROUPED_TRANSACTIONS_QUERY_KEY],
      });
      onSuccess?.();
    },
  });
};
