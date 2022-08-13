import type { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import {
  updateUser as _updateUser,
  getUser as _getUser,
} from "../requests/user.requests";
import { User } from "../types/user.types";
import { supabase } from "../utils/supabaseClient";

interface AccountProps {
  session: Session | null;
}

export default function Account({ session }: AccountProps) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const user: User = await _getUser();

        setFirstName(user.first_name);
        setLastName(user.last_name);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  const updateUser = async ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => {
    try {
      setLoading(true);
      await _updateUser({
        first_name: firstName,
        last_name: lastName,
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl">Profile Page</h1>
      {!loading ? (
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser({ firstName, lastName });
          }}
        >
          <label>
            Email
            <input type="email" value={session?.user?.email} disabled />
          </label>
          <label>
            First name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Update"}
          </button>
          <br />
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </form>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
