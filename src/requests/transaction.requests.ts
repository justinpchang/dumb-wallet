import type { Transaction } from "../types/transaction.types";
import { supabase } from "../utils/supabaseClient";
import { checkUser } from "../utils/requests";

export const getTransactions = async (): Promise<Transaction[]> => {
  const user = checkUser();

  let { data, error, status } = await supabase
    .from("transactions")
    .select("id, transaction_type, amount, description, notes, posted_at")
    .eq("user_id", user.id);

  if (error && status !== 406) throw error;

  return data as Transaction[];
};
