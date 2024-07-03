"use client";
import { createContext, useContext, useState } from "react";

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  return useContext(TemplateContext);
};
