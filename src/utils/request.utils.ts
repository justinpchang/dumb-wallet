import { supabase } from "./supabase.utils";

export const checkUser = () => {
  const user = supabase.auth.user();

  if (!user) throw "Please log in.";

  return user;
};
