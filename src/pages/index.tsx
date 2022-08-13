import type { NextPage } from "next";
import { useEffect } from "react";

import { supabase } from "../utils/supabaseClient";
import { useStore } from "../utils/store";

import Auth from "../components/Auth";
import Account from "../components/Account";

const Home: NextPage = () => {
  const { session, setSession } = useStore();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, [setSession]);

  return !session ? <Auth /> : <Account session={session} />;
};

export default Home;
