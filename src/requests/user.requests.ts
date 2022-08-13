import { User } from "../types/user.types";
import { supabase } from "../utils/supabaseClient";

const checkUser = () => {
  const user = supabase.auth.user();

  if (!user) throw "Please log in.";

  return user;
};

export const getUser = async (): Promise<User> => {
  const user = checkUser();

  let { data, error, status } = await supabase
    .from("users")
    .select("id, first_name, last_name")
    .eq("id", user.id)
    .single();

  if (error && status !== 406) throw error;

  return data as User;
};

export const updateUser = async ({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) => {
  const user = checkUser();

  const updates = {
    id: user.id,
    first_name,
    last_name,
    updated_at: new Date(),
  };

  let { error } = await supabase.from("users").upsert(updates, {
    returning: "minimal",
  });

  if (error) throw error;
};
