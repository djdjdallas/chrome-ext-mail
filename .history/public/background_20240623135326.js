import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseKey = "your-anon-key";

const supabase = createClient(supabaseUrl, supabaseKey);

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
