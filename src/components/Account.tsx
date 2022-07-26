import type { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

interface AccountProps {
  session: Session | null;
}

export default function Account({ session }: AccountProps) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from("profiles")
          .select("username, website, avatar_url")
          .eq("id", user!.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, []);

  async function updateProfile({
    username,
    website,
    avatarUrl,
  }: {
    username: string;
    website: string;
    avatarUrl: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user!.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });

      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={(e) => {
        e.preventDefault();
        updateProfile({ username, website, avatarUrl });
      }}
    >
      <label>
        Email
        <input type="email" value={session?.user?.email} disabled />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Website
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Loading" : "Update"}
      </button>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </form>
  );
}
