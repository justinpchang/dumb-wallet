import type { NextPage } from "next";
import { useEffect } from "react";

import { supabase } from "../utils/supabase.utils";
import useStore from "../store/useStore";

import Auth from "../components/Auth";
import Transactions from "../components/Transactions";

const Home: NextPage = () => {
  const { session, setSession } = useStore();

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    })();

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, [setSession]);

  return !session ? <Auth /> : <Transactions />;
};

export default Home;
