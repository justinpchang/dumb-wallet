export type TransactionType = "INCOME" | "EXPENSE";

export type Transaction = {
  id?: string;
  user_id?: string;
  transaction_type: TransactionType;
  amount: string;
  description: string;
  notes: string;
  posted_at: Date;
  // TODO category
};

export type RawTransaction = Transaction & {
  posted_at: string;
};

type TransactionDay = {
  label: string;
  transactions: Transaction[];
};

export type TransactionMonth = {
  label: string;
  days: TransactionDay[];
};
