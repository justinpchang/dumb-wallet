import { supabase } from "../utils/supabaseClient";

export const checkUser = () => {
  const user = supabase.auth.user();

  if (!user) throw "Please log in.";

  return user;
};
