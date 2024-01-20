import type { RawTransaction, Transaction } from "../types/transaction.types";
import { supabase } from "../utils/supabase.utils";
import { checkUser } from "../utils/request.utils";

export const getTransactions = async (): Promise<RawTransaction[]> => {
  const user = await checkUser();

  let { data, error, status } = await supabase
    .from("transactions")
    .select("id, transaction_type, amount, description, notes, posted_at")
    .eq("user_id", user.id)
    .is("deleted_at", null)
    .order("posted_at", { ascending: false });

  if (error && status !== 406) throw error;

  return data ?? [];
};

export const getTransaction = async (
  id: string
): Promise<RawTransaction | null> => {
  await checkUser();

  let { data, error, status } = await supabase
    .from("transactions")
    .select("id, transaction_type, amount, description, notes, posted_at")
    .eq("id", id)
    .single();

  if (error && status !== 406) throw error;

  return data;
};

export const createTransaction = async (transaction: Transaction) => {
  const user = await checkUser();

  let { error, status } = await supabase.from("transactions").insert([
    {
      user_id: user.id,
      amount: transaction.amount,
      transaction_type: transaction.transaction_type,
      posted_at: transaction.posted_at,
      description: transaction.description,
      notes: transaction.notes,
    },
  ]);

  if (error && status !== 406) throw error;
};

export const updateTransaction = async (
  id: string,
  transaction: Transaction
): Promise<void> => {
  await checkUser();

  let { error, status } = await supabase
    .from("transactions")
    .update({
      transaction_type: transaction.transaction_type,
      amount: transaction.amount,
      posted_at: transaction.posted_at,
      description: transaction.description,
      notes: transaction.notes,
    })
    .eq("id", id);

  if (error && status !== 406) throw error;
};

export const deleteTransaction = async (id: string) => {
  await checkUser();

  let { error, status } = await supabase
    .from("transactions")
    .update({
      deleted_at: new Date(),
    })
    .eq("id", id);

  if (error && status !== 406) throw error;
};
