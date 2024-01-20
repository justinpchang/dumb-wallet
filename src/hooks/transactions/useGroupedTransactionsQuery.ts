import { useQuery } from "react-query";
import { getTransactions } from "../../requests/transaction.requests";
import {
  transformRawTransaction,
  groupTransactionsByYearMonthDay,
} from "../../utils/transaction.utils";

export const USE_GROUPED_TRANSACTIONS_QUERY_KEY = "useGroupedTransactionsQuery";

export const useGroupedTransactionsQuery = () => {
  const query = useQuery({
    queryKey: [USE_GROUPED_TRANSACTIONS_QUERY_KEY],
    queryFn: getTransactions,
    select: (transactions) =>
      groupTransactionsByYearMonthDay(
        transactions.map((transaction) => transformRawTransaction(transaction))
      ),
  });

  return query;
};
