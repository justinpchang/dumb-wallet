import { useState } from "react";
import useStore from "../store/useStore";
import { supabase } from "../utils/supabase.utils";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [hasRequestedOtp, setHasRequestedOtp] = useState(false);
  const [token, setToken] = useState("");

  const { setSession } = useStore();

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the one-time-password!");
      setHasRequestedOtp(true);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (email: string, token: string) => {
    try {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "magiclink",
      });
      if (error) throw error;
      alert("Success!");
      setSession(session);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl">Login</h1>
      <p>Sign in via one-time-password with your email below</p>
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
          <span>{loading ? "Loading" : "Send password"}</span>
        </button>
      </form>
      <div className="p-4" />
      {hasRequestedOtp && (
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(email, token);
          }}
        >
          <input
            type="text"
            placeholder="Your password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <div className="p-2" />
          <button
            className="p-2 border-solid border-2 border-lime-300 rounded-md"
            type="submit"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Verify"}</span>
          </button>
        </form>
      )}
    </>
  );
}
