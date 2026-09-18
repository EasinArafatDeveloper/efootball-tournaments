import Link from "next/link";
import { MailCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-8 shadow-sm text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700 shadow-sm">
          <MailCheck className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-black text-slate-950">Email Verification</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          Your athlete account email address has been verified for official eFCOB National Circuit competitions.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-black text-white font-bold text-xs hover:bg-zinc-800 shadow-sm transition-all"
        >
          <span>Go to Athlete Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
