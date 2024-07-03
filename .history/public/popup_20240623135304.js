import { supabase } from "../lib/supabaseClient"; // Ensure the path is correct

document
  .getElementById("loginButton")
  .addEventListener("click", loginWithGoogle);

async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: chrome.identity.getRedirectURL(),
    },
  });
  if (error) throw error;

  await chrome.tabs.create({ url: data.url });
}

document.addEventListener("DOMContentLoaded", async () => {
  const { session } = await chrome.storage.local.get("session");
  if (session) {
    const { error: supaAuthError } = await supabase.auth.setSession(session);
    if (supaAuthError) {
      throw supaAuthError;
    }

    navigate("/home");
  }
});

function navigate(path) {
  // Implement your navigation logic here
  console.log(`Navigating to ${path}`);
}
