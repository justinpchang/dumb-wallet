import type { NextPage } from "next";
import { useEffect } from "react";

import { supabase } from "../utils/supabase.utils";
import useStore from "../store/useStore";

import Auth from "../components/Auth";
import Transactions from "../components/transactions";

const Home: NextPage = () => {
  const { session, setSession } = useStore();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, [setSession]);

  return !session ? <Auth /> : <Transactions />;
};

export default Home;
