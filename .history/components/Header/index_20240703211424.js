import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 border-b-2 text-white">
      <h1 className="text-xl font-bold">Mail Blitz</h1>
      <div className="relative">
        <button
          className={`flex flex-col items-center justify-center w-10 h-10 rounded-md transition-all duration-300 focus:outline-none ${
            isOpen
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-muted"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current rounded-full my-1.5 transition-all duration-300 bg-black ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 bg-black ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <a
              href="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Home
            </a>
            <a
              href="/new"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              New
            </a>
            <a
              href="/email-templates"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Email Templates
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
