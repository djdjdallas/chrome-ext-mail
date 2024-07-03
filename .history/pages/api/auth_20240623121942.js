import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.redirect("/");
}
