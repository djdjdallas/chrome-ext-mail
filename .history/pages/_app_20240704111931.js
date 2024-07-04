import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { TemplateProvider } from "../context/TemplateContext"; // Import the TemplateProvider

export default function App({ Component, pageProps }) {
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
