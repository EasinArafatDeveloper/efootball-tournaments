"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Swords } from "lucide-react";
import { homepageData, LiveMatchItem } from "@/lib/homepageData";

export function LiveMatches() {
  const { liveMatches } = homepageData;

  return (
    <section className="w-full py-4">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3.5">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
            </span>
            <h2 className="text-sm sm:text-base font-bold text-[#111111] flex items-center">
              Live Matches
              <span className="ml-2 text-xs font-medium text-[#5F6368] hidden sm:inline">
                ({liveMatches.length} matches live right now)
              </span>
            </h2>
          </div>

          <Link
            href="/matches"
            className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Horizontal Match Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {liveMatches.map((match: LiveMatchItem) => (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className="group block bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] rounded-xl p-4 transition-all shadow-sm hover:shadow-md"
            >
              {/* Card Header: Tournament & Live Status */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F7F8FA]">
                <span className="text-[11px] font-semibold text-[#5F6368] truncate max-w-[180px]">
                  {match.tournament}
                </span>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-50 text-rose-600 border border-rose-200">
                    LIVE
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#111111]">
                    {match.minute}
                  </span>
                </div>
              </div>

              {/* Match Teams & Scoreline */}
              <div className="py-3 flex items-center justify-between">
                {/* Home Club */}
                <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E5E7EB] bg-[#F7F8FA] relative shrink-0">
                    <Image
                      src={match.homeClub.logo}
                      alt={match.homeClub.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#111111] truncate">
                    {match.homeClub.name}
                  </span>
                </div>

                {/* Score */}
                <div className="px-3 py-1 rounded bg-[#F7F8FA] border border-[#E5E7EB] font-black text-sm text-[#111111] tracking-wider shrink-0 mx-2">
                  {match.homeScore} - {match.awayScore}
                </div>

                {/* Away Club */}
                <div className="flex items-center justify-end space-x-2.5 min-w-0 flex-1 text-right">
                  <span className="text-xs font-bold text-[#111111] truncate">
                    {match.awayClub.name}
                  </span>
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E5E7EB] bg-[#F7F8FA] relative shrink-0">
                    <Image
                      src={match.awayClub.logo}
                      alt={match.awayClub.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer: Watch link indicator */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#5F6368] border-t border-[#F7F8FA]">
                <span className="font-medium">Konami Server BD-01</span>
                <span className="font-bold text-[#111111] group-hover:underline flex items-center">
                  Watch Stream <Play className="w-2.5 h-2.5 ml-1 fill-[#111111]" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
