import { NextPage } from "next";
import { useEffect } from "react";
import { supabase } from "../utils/supabase.utils";

const SignOut: NextPage = () => {
  useEffect(() => {
    (async () => {
      await supabase.auth.signOut();
      window.location.href = "/";
    })();
  }, []);

  return null;
};

export default SignOut;
