"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ShieldAlert, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const json = await res.json();
      if (json.success) {
        if (json.data.role === "SUPER_ADMIN" || json.data.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        setError(json.error?.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (user: string, pass: string) => {
    setEmailOrUsername(user);
    setPassword(pass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-black p-0.5 mx-auto flex items-center justify-center shadow-sm">
            <span className="font-black text-white text-xl tracking-tighter">
              eF
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-950">Sign In to eFCOB</h1>
          <p className="text-xs text-slate-500">Access your athlete profile, match reports & club portal</p>
        </div>

        {/* Demo Quick Fill Pills */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider text-center">
            ⚡ Quick Demo Accounts
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo("admin@necob.com", "Admin@Password2026!")}
              className="px-2 py-1.5 rounded-lg bg-white hover:bg-slate-100 hover:border-black text-[10px] font-bold text-amber-700 border border-slate-200 truncate transition-colors shadow-sm"
            >
              👑 Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("mahim@efcobbd.com", "Admin@Password2026!")}
              className="px-2 py-1.5 rounded-lg bg-white hover:bg-slate-100 hover:border-black text-[10px] font-bold text-slate-900 border border-slate-200 truncate transition-colors shadow-sm"
            >
              ⚽ Top Athlete
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("manager.dhaka@efcobbd.com", "Admin@Password2026!")}
              className="px-2 py-1.5 rounded-lg bg-white hover:bg-slate-100 hover:border-black text-[10px] font-bold text-emerald-700 border border-slate-200 truncate transition-colors shadow-sm"
            >
              🛡️ Club Manager
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Email or Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="admin@necob.com or mahim_striker"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-700 font-bold">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-slate-600 hover:text-black hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white text-xs"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-black text-white font-bold text-xs hover:bg-zinc-800 shadow-sm transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Don't have an athlete profile yet?{" "}
            <Link href="/register" className="text-slate-950 font-bold hover:underline">
              Register Athlete
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
