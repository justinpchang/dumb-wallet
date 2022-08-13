import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl">Login</h1>
      <p>Sign in via magic link with your email below</p>
      <div className="p-4" />
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
      >
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="p-2" />
        <button
          className="p-2 border-solid border-2 border-lime-300 rounded-md"
          type="submit"
          disabled={loading}
        >
          <span>{loading ? "Loading" : "Send magic link"}</span>
        </button>
      </form>
    </>
  );
}
