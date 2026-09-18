"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Crown, Sparkles, Trophy, ShieldCheck, Award } from "lucide-react";
import { homepageData, WeeklyStarItem } from "@/lib/homepageData";

export function WeeklyStarsSection() {
  const { weeklyStars } = homepageData;

  const renderCategoryIcon = (iconType?: string) => {
    switch (iconType) {
      case "crown-gold":
      case "crown-motm":
        return <Crown className="w-4 h-4 text-[#EAB308] fill-[#EAB308] shrink-0" />;
      case "diamond-blue":
        return <Sparkles className="w-4 h-4 text-[#0EA5E9] fill-[#0EA5E9] shrink-0" />;
      case "trophy-green":
        return <Trophy className="w-4 h-4 text-[#16A34A] fill-[#16A34A] shrink-0" />;
      case "shield-blue":
        return <ShieldCheck className="w-4 h-4 text-[#2563EB] fill-[#2563EB] shrink-0" />;
      case "star-orange":
        return <Award className="w-4 h-4 text-[#EA580C] fill-[#EA580C] shrink-0" />;
      default:
        return <Crown className="w-4 h-4 text-[#EAB308] fill-[#EAB308] shrink-0" />;
    }
  };

  const renderClubBadge = (clubName: string) => {
    switch (clubName) {
      case "NEXA FC":
        return (
          <div className="w-6 h-6 rounded-md bg-[#111111] border border-white/20 flex items-center justify-center text-white text-[9px] font-black shrink-0 shadow-sm">
            N
          </div>
        );
      case "TITANS":
        return (
          <div className="w-6 h-6 rounded-md bg-[#B45309] border border-amber-400/30 flex items-center justify-center text-white text-[9px] font-black shrink-0 shadow-sm">
            T
          </div>
        );
      case "RISING BD":
        return (
          <div className="w-6 h-6 rounded-md bg-[#065F46] border border-emerald-400/30 flex items-center justify-center text-white text-[9px] font-black shrink-0 shadow-sm">
            R
          </div>
        );
      case "LEGION":
        return (
          <div className="w-6 h-6 rounded-md bg-[#1F2937] border border-gray-400/30 flex items-center justify-center text-[#10B981] text-[9px] font-black shrink-0 shadow-sm">
            L
          </div>
        );
      case "DHAKA XI":
        return (
          <div className="w-6 h-6 rounded-md bg-[#312E81] border border-indigo-400/30 flex items-center justify-center text-white text-[9px] font-black shrink-0 shadow-sm">
            D
          </div>
        );
      case "CHITTAGONG":
        return (
          <div className="w-6 h-6 rounded-md bg-[#991B1B] border border-rose-400/30 flex items-center justify-center text-white text-[9px] font-black shrink-0 shadow-sm">
            C
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-md bg-[#111111] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
            ★
          </div>
        );
    }
  };

  return (
    <section className="w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight flex items-center gap-1.5">
              <span>Weekly Stars</span>
              <span className="w-2 h-2 rounded-full bg-[#0284C7] inline-block"></span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6368] font-medium mt-0.5">
              This week&apos;s top performers
            </p>
          </div>

          <Link
            href="/rankings"
            className="inline-flex items-center space-x-1 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors shrink-0 py-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6-Card Grid: Horizontal Scroll on Mobile, 3 Cols on Tablet, 6 Cols on Desktop */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {weeklyStars.map((star: WeeklyStarItem) => (
            <Link
              key={star.id}
              href={`/players/${star.playerName.toLowerCase().replace(/\s+/g, "_")}`}
              className="group w-[165px] sm:w-[185px] shrink-0 md:w-auto md:shrink snap-start bg-white border border-[#E5E7EB] hover:border-[#111111] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#111111] mb-2.5">
                {renderCategoryIcon(star.iconType)}
                <span className="truncate">{star.category}</span>
              </div>

              {/* Player Portrait Container */}
              <div className="relative w-full h-32 sm:h-36 rounded-2xl overflow-hidden bg-gradient-to-b from-[#F3F4F6] to-[#E5E7EB] flex items-end justify-center mb-3">
                <Image
                  src={star.avatar}
                  alt={star.playerName}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Player & Club Info */}
              <div className="flex items-center space-x-2 min-w-0 mb-3">
                {renderClubBadge(star.clubName)}
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-bold text-[#111111] group-hover:text-black truncate leading-tight">
                    {star.playerName}
                  </div>
                  <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider truncate leading-tight mt-0.5">
                    {star.clubName}
                  </div>
                </div>
              </div>

              {/* Bottom Main Metric / Stat */}
              <div className="pt-2.5 border-t border-[#F3F4F6] flex items-baseline space-x-1">
                <span className="text-xl sm:text-2xl font-black text-[#111111] font-mono tracking-tight leading-none">
                  {star.statValue}
                </span>
                {star.statUnit && (
                  <span className="text-xs font-semibold text-[#6B7280]">
                    {star.statUnit}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
