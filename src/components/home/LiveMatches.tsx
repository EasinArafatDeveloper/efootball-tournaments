"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { homepageData, LiveMatchItem } from "@/lib/homepageData";

export function LiveMatches() {
  const { liveMatches } = homepageData;

  return (
    <section className="w-full py-4 sm:py-5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <h2 className="text-base sm:text-lg font-bold text-[#111111] tracking-tight">
              Live Matches
            </h2>
          </div>

          <Link
            href="/matches"
            className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors shrink-0 py-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Live Match Cards */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-3.5 sm:gap-4 no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {liveMatches.map((match: LiveMatchItem) => (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className="w-[285px] sm:w-[320px] shrink-0 md:w-auto md:shrink snap-start bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all shadow-xs"
            >
              {/* Card Header: Red LIVE Capsule (Left) + Tournament Name (Right) */}
              <div className="flex items-center justify-between pb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DC2626] text-white tracking-wide">
                  LIVE • {match.minute}
                </span>

                <span className="text-xs font-medium text-[#5F6368] truncate max-w-[160px]">
                  {match.tournament}
                </span>
              </div>

              {/* Card Body: Home Team + Score Pill + Away Team */}
              <div className="py-2 grid grid-cols-5 items-center justify-between gap-2">
                {/* Home Club */}
                <div className="col-span-2 flex flex-col items-center text-center space-y-1.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] relative shrink-0 p-0.5">
                    <Image
                      src={match.homeClub.logo}
                      alt={match.homeClub.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-tight truncate w-full">
                    {match.homeClub.name}
                  </span>
                </div>

                {/* Score Pill */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] text-[#111111] font-mono font-black text-base sm:text-lg tracking-wider whitespace-nowrap min-w-[72px] text-center">
                    {match.homeScore} - {match.awayScore}
                  </div>
                </div>

                {/* Away Club */}
                <div className="col-span-2 flex flex-col items-center text-center space-y-1.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] relative shrink-0 p-0.5">
                    <Image
                      src={match.awayClub.logo}
                      alt={match.awayClub.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-tight truncate w-full">
                    {match.awayClub.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
