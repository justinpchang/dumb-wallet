import { supabase } from "./supabase.utils";

export const checkUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { user } = session!;

  if (!user) throw "Please log in.";

  return user;
};
