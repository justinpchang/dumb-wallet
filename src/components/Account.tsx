import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  updateUser as _updateUser,
  getUser as _getUser,
} from "../requests/user.requests";
import { User } from "../types/user.types";
import { useStore } from "../utils/store";
import { supabase } from "../utils/supabaseClient";

export default function Account() {
  const { session } = useStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const user: User = await _getUser();

        setFirstName(user?.first_name);
        setLastName(user?.last_name);
        updateUser({ firstName: user?.first_name, lastName: user?.last_name });
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (session) getUser();
  }, [session]);

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
        <>
          <div className="py-4" />
          <button onClick={() => router.push("/transactions")}>
            Go to Transactions
          </button>
          <div className="py-4" />
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
          </form>
          <div className="py-4" />
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
