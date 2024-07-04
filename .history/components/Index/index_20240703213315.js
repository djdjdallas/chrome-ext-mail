import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/Pages.module.css";

export default function Index({ navigateToPage }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
      if (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();

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
      authListener.subscription.unsubscribe();
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
    <div className={container}>
      <main className={styles.main}>
        <h1 className={styles.title}>NEXT-CHROME-STARTER</h1>
        <p className={styles.description}>
          This is an example of a Browser Extension built with NEXT.JS. Please
          refer to the GitHub repo for running instructions and documentation.
        </p>
        <h1 className={styles.code}>Index Page ./components/Index/index.js</h1>
        <p>{"[ - This is Index page content - ]"}</p>
        <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>
        <p onClick={() => navigateToPage("email-templates")}>
          {"Go to Email Templates Page >"}
        </p>{" "}
        {/* Add this line */}
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
