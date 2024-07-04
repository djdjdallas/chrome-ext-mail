"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Header({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching user session:", error.message);
      } else {
        setUser(session?.user || null);
      }
    };

    getUser();
  }, [supabase, setUser]);

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
    } else {
      setUser(null);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 border-b-2 text-black bg-white fixed w-full top-0 z-50">
      <Link href="/" prefetch={false}>
        <h1 className="text-3xl font-bold tracking-tighter cursor-pointer">
          Mail Blitz
        </h1>
      </Link>
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
            className={`block w-6 h-0.5 bg-current rounded-full my-1.5 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <Link href="/" passHref>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                Home
              </div>
            </Link>
            <Link href="/new" passHref>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                New
              </div>
            </Link>
            <Link href="/template" passHref>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                Email Templates
              </div>
            </Link>
            {!user ? (
              <div
                onClick={handleLogin}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer w-full text-left"
              >
                Login with Google
              </div>
            ) : (
              <div
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer w-full text-left"
              >
                Logout
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
