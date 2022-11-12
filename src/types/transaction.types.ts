export type TransactionType = "INCOME" | "EXPENSE";

export type Transaction = {
  id?: string;
  user_id?: string;
  transaction_type: TransactionType;
  amount: number;
  description: string;
  notes: string;
  posted_at?: any; // datetime
  // TODO category
};

type TransactionDay = {
  label: string;
  transactions: Transaction[];
};

export type TransactionMonth = {
  label: string;
  days: TransactionDay[];
};
