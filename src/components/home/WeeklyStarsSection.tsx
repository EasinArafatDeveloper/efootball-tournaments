"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Flame, Trophy, Award, Zap, Sparkles } from "lucide-react";
import { homepageData, WeeklyStarItem } from "@/lib/homepageData";

export function WeeklyStarsSection() {
  const { weeklyStars } = homepageData;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Player of the Week":
        return <Star className="w-3.5 h-3.5 text-[#C79A3B] fill-[#C79A3B]" />;
      case "Top Scorer":
        return <Flame className="w-3.5 h-3.5 text-rose-500" />;
      case "Most Wins":
        return <Trophy className="w-3.5 h-3.5 text-[#111111]" />;
      case "Best Win Rate":
        return <Award className="w-3.5 h-3.5 text-emerald-600" />;
      case "Man of the Match":
        return <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <section className="w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#111111] flex items-center">
              Weekly Stars
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">This week&apos;s top performers</p>
          </div>

          <Link
            href="/rankings"
            className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Compact Player Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {weeklyStars.map((star: WeeklyStarItem) => (
            <Link
              key={star.id}
              href={`/players/${star.playerName.toLowerCase().replace(/\s+/g, "_")}`}
              className="group bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] rounded-xl p-3.5 flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
            >
              {/* Category Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                  {getCategoryIcon(star.category)}
                  <span className="truncate max-w-[90px]">{star.categoryPill}</span>
                </div>
              </div>

              {/* Player Avatar */}
              <div className="my-3 flex justify-center">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden bg-[#F7F8FA] border-2 border-[#E5E7EB] group-hover:border-[#111111] relative transition-all shadow-sm">
                  <Image
                    src={star.avatar}
                    alt={star.playerName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Player Info & Main Metric */}
              <div className="text-center space-y-1">
                <div className="text-xs font-bold text-[#111111] truncate group-hover:text-[#C79A3B] transition-colors">
                  {star.playerName}
                </div>
                <div className="text-[10px] font-semibold text-[#5F6368] truncate">
                  {star.clubShort} • {star.clubName}
                </div>
                <div className="pt-2 border-t border-[#F7F8FA]">
                  <div className="text-[11px] font-black text-[#111111] tracking-tight bg-[#F7F8FA] rounded-md py-1 px-1.5 border border-[#E5E7EB]">
                    {star.statValue}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
