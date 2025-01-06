"use client";
import { supabase } from "@/lib/supabase";
import { useAuthState } from "@/zustand/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerConfirmPassword, setRegisterConfirmPassword] =
    useState<string>("");
  const [loading, setLoading] = useState(false);
  const login = useAuthState((state) => state.login);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Signing In...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error || !data.user) {
      toast.error(error?.message ?? "Error while signing In", { id: toastId });
      return;
    }
    login(data.user);
    toast.success("Signed in successfully", { id: toastId });
    router.push("/browse");
  };

  const router = useRouter();

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Signing Up...");
    const { data, error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
    });
    setLoading(false);
    if (error || !data.user) {
      toast.error(error?.message ?? "Error while signing up", { id: toastId });
      return;
    }
    login(data.user);
    toast.success("Signed up successfully", { id: toastId });
    router.push("/browse");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent to-accent-darker">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 grid">
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 font-semibold rounded-t-lg ${
              isLogin ? "bg-accent text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 font-semibold rounded-t-lg ${
              !isLogin ? "bg-accent text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-darker"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="register-confirm-password"
                  type="password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-darker"
                disabled={loading}
              >
                Register
              </button>
            </form>
          </div>
        )}
        <Link href="/" className="my-2 underline text-center mx-auto">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
