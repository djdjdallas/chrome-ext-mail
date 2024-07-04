// pages/index.js
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/Pages.module.css";

export default function Index({ navigateToPage }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>NEXT-CHROME-STARTER</h1>
        <p className={styles.description}>
          This is an example of a Browser Extension built with NEXT.JS. Please
          refer to the GitHub repo for running instructions and documentation.
        </p>
        <h1 className={styles.code}>Index Page ./components/Index/index.js</h1>
        <p>{"[ - This is Index page content - ]"}</p>
        <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>

        {!user ? (
          <button onClick={handleLogin} className={styles.loginButton}>
            Login with Google
          </button>
        ) : (
          <div>
            <p>Welcome, {user.email}</p>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}