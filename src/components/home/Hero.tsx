"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Users, Shield, Swords } from "lucide-react";
import { homepageData } from "@/lib/homepageData";

export function Hero() {
  const { hero } = homepageData;

  return (
    <section className="relative w-full pt-4 pb-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wide Hero Banner Container */}
        <div className="relative w-full min-h-[360px] md:min-h-[400px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF] shadow-sm flex items-center">
          
          {/* Background Image Composition */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-banner.png"
              alt="The Home of eFootball - United by Passion"
              fill
              priority
              className="object-cover object-right lg:object-center select-none pointer-events-none"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
            {/* Soft left gradient overlay to guarantee perfect text readability on all viewports without obscuring the player */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-45% to-transparent z-10 sm:via-white/80"></div>
          </div>

          {/* Left Text Content Area */}
          <div className="relative z-20 max-w-2xl px-6 py-10 sm:px-10 lg:px-14 space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#C79A3B]"></span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#5F6368]">
                {hero.eyebrow}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#111111] tracking-tight leading-[1.08]">
              {hero.headingLine1} <br />
              <span>
                {hero.headingLine2}{" "}
                <span className="text-[#C79A3B]">{hero.highlightWord}</span>
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-sm sm:text-base text-[#5F6368] font-normal max-w-lg leading-relaxed">
              {hero.supportingText}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/register"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-bold bg-[#111111] text-white hover:bg-zinc-800 transition-all shadow-sm"
              >
                <span>{hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tournaments"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold bg-white text-[#111111] border border-[#111111] hover:bg-[#F7F8FA] transition-all"
              >
                <span>{hero.ctaSecondary}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Stats Grid Underneath */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4 sm:p-5 flex flex-col justify-center items-center sm:items-start transition-all hover:border-[#111111] shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-sans">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-[#5F6368] uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
