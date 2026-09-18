"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, ChevronRight, Shield, Target, Crown, Swords } from "lucide-react";
import { homepageData, TournamentItem, ActivityItem } from "@/lib/homepageData";

export function OngoingTournamentsAndActivity() {
  const { featuredTournament, tournamentsList, activities } = homepageData;

  const renderTournamentBadge = (badgeType?: string) => {
    switch (badgeType) {
      case "shield-green":
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0D2218] border border-[#10B981]/30 flex items-center justify-center text-[#34D399] shrink-0 shadow-inner">
            <Shield className="w-4.5 h-4.5 fill-[#34D399]/20" />
          </div>
        );
      case "circle-teal":
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#082226] border border-[#14B8A6]/30 flex items-center justify-center text-[#2DD4BF] shrink-0 shadow-inner">
            <Target className="w-4.5 h-4.5" />
          </div>
        );
      case "trophy-slate":
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1C1F24] border border-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
            <Crown className="w-4.5 h-4.5" />
          </div>
        );
      case "shield-purple":
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1D122C] border border-[#A855F7]/30 flex items-center justify-center text-[#C084FC] shrink-0 shadow-inner">
            <Swords className="w-4.5 h-4.5" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-center text-[#111111] shrink-0">
            <Trophy className="w-4.5 h-4.5" />
          </div>
        );
    }
  };

  return (
    <section className="w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT SECTION: Ongoing Tournaments (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base sm:text-lg font-bold text-[#111111] flex items-center">
                Ongoing Tournaments
              </h2>
              <Link
                href="/tournaments"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Inner 2-column grid: 1 Featured Card + 4 Vertical Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 flex-1 items-stretch">
              
              {/* Column 1: Featured Tournament Dark Trophy Card */}
              <div className="relative overflow-hidden rounded-2xl bg-[#0F1012] text-white p-5 sm:p-6 flex flex-col justify-between shadow-sm border border-white/10 min-h-[340px]">
                {/* 3D Trophy Background on Right */}
                <div className="absolute right-0 bottom-0 top-0 w-[55%] pointer-events-none overflow-hidden flex items-end justify-end">
                  <div className="relative w-full h-full">
                    <Image
                      src={featuredTournament.image || "/images/trophy-gold.jpg"}
                      alt="Championship Trophy"
                      fill
                      className="object-cover object-right opacity-90 mix-blend-lighten"
                      priority
                    />
                  </div>
                  {/* Subtle Dark Gradient Overlay for optimal readability on left */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0F1012] via-[#0F1012]/80 to-transparent"></div>
                </div>

                {/* Card Content - Top */}
                <div className="relative z-10 space-y-1 max-w-[85%]">
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight">
                    {featuredTournament.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    {featuredTournament.season || "Season 1"}
                  </p>
                </div>

                {/* Card Content - Middle (Matches, Progress, Meta) */}
                <div className="relative z-10 space-y-2.5 my-4 max-w-[90%]">
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {featuredTournament.playedMatches} / {featuredTournament.totalMatches} matches
                  </div>
                  
                  {/* Gold Progress Bar */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#D97706] via-[#FBBF24] to-[#FDE047] rounded-full transition-all duration-700"
                        style={{ width: `${featuredTournament.progressPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-zinc-300 font-mono">
                      {featuredTournament.progressPercent}%
                    </span>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs text-zinc-300 font-medium pt-1">
                    <Trophy className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                    <span className="truncate">
                      {featuredTournament.clubsCount} Clubs • {featuredTournament.groupsCount} Groups • {featuredTournament.championPill}
                    </span>
                  </div>
                </div>

                {/* Card Content - Bottom View Button */}
                <div className="relative z-10 pt-1">
                  <Link
                    href={`/tournaments/${featuredTournament.id}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-all shadow-md active:scale-95"
                  >
                    <span>View Tournament</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </Link>
                </div>
              </div>

              {/* Column 2: 4 Vertical Stacked Cards */}
              <div className="flex flex-col justify-between gap-2.5 h-full">
                {tournamentsList.map((t: TournamentItem) => (
                  <Link
                    key={t.id}
                    href={`/tournaments/${t.id}`}
                    className="group bg-white border border-[#E5E7EB] hover:border-[#111111] rounded-xl p-3 sm:p-3.5 flex items-center justify-between transition-all shadow-sm hover:shadow-md flex-1 min-h-[70px]"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      {renderTournamentBadge(t.badgeType)}
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-[#111111] group-hover:text-black truncate leading-tight">
                          {t.name}
                        </div>
                        <div className="text-[11px] text-[#5F6368] truncate leading-tight mt-0.5">
                          {t.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111111] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT SECTION: What's Happening (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base sm:text-lg font-bold text-[#111111] flex items-center">
                What&apos;s Happening
              </h2>
              <Link
                href="/activity"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Activity Feed Box - Full Height matching Left Section */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-sm divide-y divide-[#F1F3F5] flex-1 flex flex-col justify-between">
              {activities.map((act: ActivityItem) => (
                <div key={act.id} className="py-2.5 sm:py-3 first:pt-0 last:pb-0 flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] relative shrink-0">
                    <Image
                      src={act.avatar}
                      alt="Activity avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-[#111111] font-bold leading-snug truncate">
                      {act.text}
                    </p>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-[11px] text-[#6B7280] font-medium">{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
