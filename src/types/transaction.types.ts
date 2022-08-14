export type TRANSACTION_TYPE = "INCOME" | "EXPENSE";
export type Transaction = {
  id: string;
  user_id?: string;
  transaction_type: TRANSACTION_TYPE;
  amount: number;
  description: string;
  notes: string;
  posted_at: any; // datetime
  // TODO category
};
