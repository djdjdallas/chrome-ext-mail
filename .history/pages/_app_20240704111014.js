// pages/_app.js
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { TemplateProvider } from "../context/TemplateContext"; // Import the TemplateProvider
import { withAuth } from "../lib/withAuth";

function App({ Component, pageProps }) {
  const AuthenticatedComponent = withAuth(Component);

  return (
    <TemplateProvider>
      {" "}
      {/* Wrap the application with TemplateProvider */}
      <>
        <Header />
        <AuthenticatedComponent {...pageProps} />
        <Footer />
      </>
    </TemplateProvider>
  );
}

export default App;
