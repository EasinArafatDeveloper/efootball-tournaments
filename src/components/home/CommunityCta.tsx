"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function CommunityCTA() {
  return (
    <section className="w-full py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wide Dark Banner Container */}
        <div className="relative rounded-2xl bg-[#111111] overflow-hidden border border-zinc-800 shadow-xl min-h-[300px] sm:min-h-[340px] flex items-center">
          
          {/* Background Football Player Visual on the Right */}
          <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
            <div className="relative w-full md:w-2/3 h-full">
              <Image
                src="/images/cta-banner.png"
                alt="eFootball Community Movement"
                fill
                className="object-cover object-right opacity-40 md:opacity-65 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent"></div>
            </div>
          </div>

          {/* Left Text Content */}
          <div className="relative z-10 max-w-xl px-6 py-10 sm:px-10 lg:px-14 space-y-4">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-white/10 text-slate-200 border border-white/20 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C79A3B]" />
              <span>National Ecosystem</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Be Part of the <br />
              <span className="text-[#C79A3B]">Movement</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-md">
              Join thousands of players, clubs and fans building a bigger eFootball community. Compete in official leagues and climb national rankings.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-white text-[#111111] hover:bg-slate-100 transition-all shadow-sm"
              >
                Create Account
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-transparent text-white border border-white/40 hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
