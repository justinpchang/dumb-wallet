import { useQuery } from "react-query";
import { getTransaction } from "../../requests/transaction.requests";
import { transformRawTransaction } from "../../utils/transaction.utils";

export const USE_TRANSACTION_QUERY_KEY = "useTransactionQuery";

export const useTransactionQuery = (id: string) => {
  return useQuery({
    queryKey: [USE_TRANSACTION_QUERY_KEY],
    queryFn: () => getTransaction(id),
    select: (transaction) =>
      transaction ? transformRawTransaction(transaction) : null,
    enabled: Boolean(id),
  });
};
