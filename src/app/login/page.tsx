"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function MemberLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <PageHeader title="Member Login" breadcrumb={[{ label: "Login" }]} />
      
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-12 px-6 shadow-2xl shadow-gray-200 rounded-3xl border border-gray-100 sm:px-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600 font-medium">Log in to your member account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700 rounded-r-xl">
                  {error}
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full bg-gray-50 border border-gray-200 py-4 pl-12 pr-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full bg-gray-50 border border-gray-200 py-4 pl-12 pr-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-500 text-white py-4 rounded-xl font-black hover:bg-cyan-600 transition-all flex items-center justify-center shadow-xl shadow-cyan-100 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : (
                    <><ArrowRight className="mr-2" size={20} /> Sign In</>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-8 text-center border-t border-gray-100 pt-8">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <a href="/membership/individual" className="text-cyan-500 font-bold hover:underline">
                  Join as a Member
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}