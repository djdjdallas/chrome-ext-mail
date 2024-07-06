import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qdzmjvbpmotfvaparejj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkem1qdmJwbW90ZnZhcGFyZWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwODM1MDYsImV4cCI6MjAzNDY1OTUwNn0.szAZS_2ZDR9goI0yRjD4F8ijjzEKKBJY6qfDNkBvJag";

const supabase = createClient(supabaseUrl, supabaseKey);

chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker installed");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url?.startsWith(chrome.identity.getRedirectURL())) {
    finishUserOAuth(changeInfo.url);
  }
});

async function finishUserOAuth(url) {
  try {
    console.log(`Handling user OAuth callback...`);

    const hashMap = parseUrlHash(url);
    const access_token = hashMap.get("access_token");
    const refresh_token = hashMap.get("refresh_token");
    if (!access_token || !refresh_token) {
      throw new Error(`No Supabase tokens found in URL hash`);
    }

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;

    await chrome.storage.local.set({ session: data.session });

    chrome.tabs.update({ url: "https://myapp.com/user-login-success/" });

    console.log(`Finished handling user OAuth callback`);
  } catch (error) {
    console.error(error);
  }
}

function parseUrlHash(url) {
  const hashParts = new URL(url).hash.slice(1).split("&");
  const hashMap = new Map(
    hashParts.map((part) => {
      const [name, value] = part.split("=");
      return [name, value];
    })
  );

  return hashMap;
}
