"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Radio, Swords, Trophy, Activity } from "lucide-react";
import { homepageData, LiveMatchItem } from "@/lib/homepageData";

export function LiveMatches() {
  const { liveMatches } = homepageData;

  return (
    <section className="w-full py-6 sm:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-5">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-rose-50 border border-rose-200">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-[#111111] tracking-tight flex items-center">
                Live Matches
                <span className="ml-2.5 px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-50 text-rose-600 border border-rose-200 font-mono">
                  {liveMatches.length} ON AIR
                </span>
              </h2>
              <p className="text-xs text-[#5F6368] mt-0.5 hidden xs:block">
                Real-time tournament scoreboards & broadcast match streams
              </p>
            </div>
          </div>

          <Link
            href="/matches"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#111111] hover:text-black hover:bg-[#F7F8FA] border border-[#E5E7EB] hover:border-[#111111] transition-all shadow-sm shrink-0"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive Container: Enlarged Cards with Snap Scroll on Mobile, 3-Cols on Desktop */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 sm:gap-5 no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
          {liveMatches.map((match: LiveMatchItem) => (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className="group w-[300px] xs:w-[330px] sm:w-[350px] shrink-0 md:w-auto md:shrink snap-start bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle card top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-rose-500 via-[#C79A3B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card Header: Tournament & Live Status */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#F7F8FA]">
                <div className="flex items-center space-x-1.5 min-w-0 pr-2">
                  <Trophy className="w-3.5 h-3.5 text-[#5F6368] shrink-0" />
                  <span className="text-xs font-bold text-[#111111] truncate max-w-[150px] sm:max-w-[170px]">
                    {match.tournament}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1 animate-pulse"></span>
                    LIVE
                  </span>
                  <span className="text-xs font-mono font-black text-[#111111] bg-[#F7F8FA] px-2 py-0.5 rounded-md border border-[#E5E7EB]">
                    {match.minute}
                  </span>
                </div>
              </div>

              {/* Match Teams & Scoreline (Centerpiece) */}
              <div className="py-5 grid grid-cols-5 items-center justify-between gap-2">
                {/* Home Club */}
                <div className="col-span-2 flex flex-col items-center space-y-2 min-w-0 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F7F8FA] relative shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 p-0.5">
                    <Image
                      src={match.homeClub.logo}
                      alt={match.homeClub.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="w-full">
                    <div className="text-xs sm:text-sm font-black text-[#111111] truncate group-hover:text-[#C79A3B] transition-colors">
                      {match.homeClub.name}
                    </div>
                    <div className="text-[10px] text-[#5F6368] font-mono font-bold mt-0.5 uppercase tracking-wider">
                      {match.homeClub.shortName} • HOME
                    </div>
                  </div>
                </div>

                {/* Prominent Scorebox */}
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <div className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#111111] text-white font-mono font-black text-base sm:text-lg tracking-widest shadow-md group-hover:scale-105 transition-transform">
                    {match.homeScore} - {match.awayScore}
                  </div>
                  <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest mt-1 animate-pulse">
                    Live Score
                  </span>
                </div>

                {/* Away Club */}
                <div className="col-span-2 flex flex-col items-center space-y-2 min-w-0 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F7F8FA] relative shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 p-0.5">
                    <Image
                      src={match.awayClub.logo}
                      alt={match.awayClub.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="w-full">
                    <div className="text-xs sm:text-sm font-black text-[#111111] truncate group-hover:text-[#C79A3B] transition-colors">
                      {match.awayClub.name}
                    </div>
                    <div className="text-[10px] text-[#5F6368] font-mono font-bold mt-0.5 uppercase tracking-wider">
                      {match.awayClub.shortName} • AWAY
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Server & Watch Indicator */}
              <div className="pt-3 flex items-center justify-between text-xs text-[#5F6368] border-t border-[#F7F8FA]">
                <div className="flex items-center space-x-1.5 font-medium truncate max-w-[160px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] text-[#5F6368]">Konami BD-01 • Official Match</span>
                </div>
                
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#F7F8FA] group-hover:bg-[#111111] group-hover:text-white transition-all text-[11px] font-bold text-[#111111] shadow-xs shrink-0">
                  <Play className="w-3 h-3 fill-rose-600 text-rose-600 group-hover:fill-rose-500" />
                  <span>Watch Stream</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
