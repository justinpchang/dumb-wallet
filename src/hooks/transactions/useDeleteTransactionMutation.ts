import { useMutation, useQueryClient } from "react-query";
import { deleteTransaction } from "../../requests/transaction.requests";
import { USE_GROUPED_TRANSACTIONS_QUERY_KEY } from "./useGroupedTransactionsQuery";

export const useDeleteTrasactionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GROUPED_TRANSACTIONS_QUERY_KEY],
      });
    },
  });
};
