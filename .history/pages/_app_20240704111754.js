// pages/_app.js
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { TemplateProvider } from "../context/TemplateContext"; // Import the TemplateProvider
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

function MyApp({ Component, pageProps }) {
  const supabase = createServerComponentClient({ cookies });

  return (
    <TemplateProvider>
      {" "}
      {/* Wrap the application with TemplateProvider */}
      <>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </>
    </TemplateProvider>
  );
}

export default MyApp;
