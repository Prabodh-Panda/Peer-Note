"use client";
import { supabase } from "@/lib/supabase";
import { useAuthState } from "@/zustand/auth";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = useAuthState((state) => state.user);
  const login = useAuthState((state) => state.login);
  const logout = useAuthState((state) => state.logout);

  useEffect(() => {
    const getUser = async () => {
      supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          login(session.user);
        } else {
          logout();
        }
      });
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    logout();
  };
  return (
    <header className="bg-accent text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">PeerNotes</h1>
        <nav className="space-x-6">
          <Link href="/" className="hover:underline text-lg">
            Home
          </Link>
          <Link href="/browse" className="hover:underline text-lg">
            Browse Notes
          </Link>
          {!user ? (
            <Link href="/login" className="hover:underline text-lg">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
