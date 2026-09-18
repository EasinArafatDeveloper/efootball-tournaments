"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, CheckCircle2, ArrowRight } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-slate-950">Create New Password</h1>
          <p className="text-xs text-slate-500">Secure your eFCOB athlete credentials</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-5">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-slate-950">Password Updated Successfully</div>
              <p className="text-xs text-slate-600">You can now sign in with your updated credentials.</p>
              <Link
                href="/login"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs shadow-sm hover:bg-zinc-800 transition-all mt-3"
              >
                <span>Proceed to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-black text-white font-bold text-xs hover:bg-zinc-800 shadow-sm flex items-center justify-center space-x-2 transition-all"
              >
                <span>Update Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
