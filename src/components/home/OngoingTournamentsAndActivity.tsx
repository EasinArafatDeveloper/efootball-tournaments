"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Users, Swords, Award, Flame, UserPlus, ChevronRight } from "lucide-react";
import { homepageData, TournamentItem, ActivityItem } from "@/lib/homepageData";

export function OngoingTournamentsAndActivity() {
  const { featuredTournament, tournamentsList, activities } = homepageData;

  return (
    <section className="w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Ongoing Tournaments (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-[#111111] flex items-center">
                Ongoing Tournaments
              </h2>
              <Link
                href="/tournaments"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
              >
                <span>View All Tournaments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Featured Tournament Card */}
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:border-[#111111] transition-all">
              <div className="relative h-44 sm:h-52 w-full">
                <Image
                  src={featuredTournament.image}
                  alt={featuredTournament.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-[#111111] text-white border border-white/20">
                    {featuredTournament.season}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#C79A3B] text-black">
                    Official Tier 1
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {featuredTournament.name}
                  </h3>
                  <p className="text-xs text-slate-200 mt-0.5">{featuredTournament.subtitle}</p>
                </div>
              </div>

              {/* Progress & Quick Metrics */}
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-[#5F6368]">
                      Tournament Progress ({featuredTournament.playedMatches} / {featuredTournament.totalMatches} matches)
                    </span>
                    <span className="text-[#111111] font-mono">{featuredTournament.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F7F8FA] rounded-full overflow-hidden border border-[#E5E7EB]">
                    <div
                      className="h-full bg-[#111111] rounded-full transition-all duration-500"
                      style={{ width: `${featuredTournament.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center space-x-3 text-[#5F6368] font-medium">
                    <span>{featuredTournament.clubsCount} Clubs</span>
                    <span>•</span>
                    <span>{featuredTournament.groupsCount} Groups</span>
                    <span>•</span>
                    <span className="text-[#C79A3B] font-bold">{featuredTournament.championPill}</span>
                  </div>

                  <Link
                    href={`/tournaments/${featuredTournament.id}`}
                    className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#111111] text-white hover:bg-zinc-800 transition-colors shadow-sm"
                  >
                    <span>View Tournament</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Small Tournament List Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tournamentsList.map((t: TournamentItem) => (
                <Link
                  key={t.id}
                  href={`/tournaments/${t.id}`}
                  className="group bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] rounded-xl p-3.5 flex items-center justify-between transition-all shadow-sm"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors shrink-0">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#111111] truncate">{t.name}</div>
                      <div className="text-[11px] text-[#5F6368] truncate">{t.subtitle}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#5F6368] group-hover:text-[#111111] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: What's Happening (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
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

            {/* Activity Feed Box */}
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-sm divide-y divide-[#F7F8FA]">
              {activities.map((act: ActivityItem) => (
                <div key={act.id} className="py-3 first:pt-0 last:pb-0 flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] relative shrink-0 mt-0.5">
                    <Image
                      src={act.avatar}
                      alt="User avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#111111] font-medium leading-snug">
                      {act.text}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] font-mono text-[#5F6368]">{act.time}</span>
                      <span className="text-[10px] text-[#C79A3B] font-semibold truncate">• {act.highlight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Community Tip / Callout Banner */}
            <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-[#111111]">Want your club featured?</div>
                <div className="text-[11px] text-[#5F6368]">Register your roster for the upcoming season qualifiers.</div>
              </div>
              <Link
                href="/register"
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#111111] text-white hover:bg-zinc-800 transition-colors shrink-0 ml-3"
              >
                Register
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
