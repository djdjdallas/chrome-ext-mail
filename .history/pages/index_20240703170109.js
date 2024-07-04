import React, { useState } from "react";
import Index from "../components/Index";
import New from "../components/New";
import EmailTemplates from "./Template"; // Update the import path to the new location

export default function Home() {
  const [activePage, setActivePage] = useState("index");

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      {activePage === "index" && <Index navigateToPage={navigateToPage} />}
      {activePage === "new" && <New navigateToPage={navigateToPage} />}
      {activePage === "email-templates" && (
        <EmailTemplates navigateToPage={navigateToPage} />
      )}
    </>
  );
}
