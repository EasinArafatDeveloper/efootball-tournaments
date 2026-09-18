"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Flame, Shield } from "lucide-react";
import { homepageData, TopScorerItem, ClubRankingItem } from "@/lib/homepageData";

export function TopScorersAndClubs() {
  const { topScorers, clubRankings } = homepageData;

  return (
    <section className="w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN: Top Scorers */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-rose-500" />
                <h2 className="text-base sm:text-lg font-bold text-[#111111]">
                  Top Scorers
                </h2>
              </div>
              <Link
                href="/rankings/scorers"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F8FA] text-[#5F6368] font-bold uppercase text-[10px] tracking-wider border-b border-[#E5E7EB]">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-8">#</th>
                      <th className="py-2.5 px-3">Player</th>
                      <th className="py-2.5 px-3">Club</th>
                      <th className="py-2.5 px-3 text-right font-black text-[#111111]">Goals</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F7F8FA]">
                    {topScorers.map((s: TopScorerItem) => (
                      <tr
                        key={s.rank}
                        className="hover:bg-[#F7F8FA]/70 transition-colors group"
                      >
                        <td className="py-2.5 px-3 text-center font-bold text-[#5F6368] group-hover:text-[#111111]">
                          {s.rank === 1 ? (
                            <span className="inline-flex w-5 h-5 rounded-full bg-[#F59E0B] text-black text-[10px] font-black items-center justify-center shadow-xs">
                              1
                            </span>
                          ) : s.rank === 2 ? (
                            <span className="inline-flex w-5 h-5 rounded-full bg-[#E5E7EB] text-black text-[10px] font-black items-center justify-center shadow-xs">
                              2
                            </span>
                          ) : s.rank === 3 ? (
                            <span className="inline-flex w-5 h-5 rounded-full bg-[#D97706] text-white text-[10px] font-black items-center justify-center shadow-xs">
                              3
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-[#6B7280]">{s.rank}</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-[#111111]">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] relative shrink-0">
                              <Image
                                src={s.avatar}
                                alt={s.playerName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="truncate max-w-[120px] sm:max-w-[160px]">{s.playerName}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-[#5F6368] font-bold text-[11px]">{s.clubShort}</td>
                        <td className="py-2.5 px-3 text-right font-black text-[#111111] font-mono text-sm">
                          {s.goals}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Club Rankings */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-[#111111]" />
                <h2 className="text-base sm:text-lg font-bold text-[#111111]">
                  Club Rankings
                </h2>
              </div>
              <Link
                href="/rankings"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors shrink-0 py-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs min-w-[440px]">
                  <thead className="bg-[#F7F8FA] text-[#5F6368] font-bold uppercase text-[10px] tracking-wider border-b border-[#E5E7EB]">
                    <tr>
                      <th className="py-2.5 px-3.5 text-center w-10">#</th>
                      <th className="py-2.5 px-3.5">Club</th>
                      <th className="py-2.5 px-3 text-center">P</th>
                      <th className="py-2.5 px-3 text-center">W</th>
                      <th className="py-2.5 px-3 text-center">D</th>
                      <th className="py-2.5 px-3 text-center">L</th>
                      <th className="py-2.5 px-3.5 text-right font-black text-[#111111]">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F7F8FA]">
                    {clubRankings.map((c: ClubRankingItem) => (
                      <tr
                        key={c.rank}
                        className="hover:bg-[#F7F8FA]/70 transition-colors group"
                      >
                        <td className="py-2.5 px-3.5 text-center font-bold text-[#5F6368] group-hover:text-[#111111]">
                          {c.rank === 1 ? (
                            <span className="inline-flex w-5 h-5 rounded-full bg-[#111111] text-white text-[10px] font-black items-center justify-center">
                              1
                            </span>
                          ) : (
                            c.rank
                          )}
                        </td>
                        <td className="py-2.5 px-3.5 font-bold text-[#111111]">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-6 h-6 rounded-md overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] relative shrink-0">
                              <Image
                                src={c.logo}
                                alt={c.clubName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="truncate max-w-[130px] sm:max-w-[170px]">{c.clubName}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center text-[#5F6368] font-mono">{c.played}</td>
                        <td className="py-2.5 px-3 text-center text-[#5F6368] font-mono">{c.won}</td>
                        <td className="py-2.5 px-3 text-center text-[#5F6368] font-mono">{c.draw}</td>
                        <td className="py-2.5 px-3 text-center text-[#5F6368] font-mono">{c.lost}</td>
                        <td className="py-2.5 px-3.5 text-right font-black text-[#111111] font-mono text-sm">
                          {c.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
