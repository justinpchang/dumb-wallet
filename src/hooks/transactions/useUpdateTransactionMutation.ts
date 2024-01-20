import { useMutation, useQueryClient } from "react-query";
import { updateTransaction } from "../../requests/transaction.requests";
import { USE_GROUPED_TRANSACTIONS_QUERY_KEY } from "./useGroupedTransactionsQuery";
import { Transaction } from "../../types/transaction.types";

export const useUpdateTransactionMutation = (
  id: string,
  { onSuccess }: { onSuccess?: () => void } = {}
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (transaction: Transaction) =>
      updateTransaction(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GROUPED_TRANSACTIONS_QUERY_KEY],
      });
      onSuccess?.();
    },
  });
};
