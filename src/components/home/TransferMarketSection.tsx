"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, DollarSign, TrendingUp, Sparkles, UserCheck } from "lucide-react";
import { homepageData, TransferPlayerItem } from "@/lib/homepageData";

export function TransferMarketSection() {
  const { transferPlayers } = homepageData;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "FREE AGENT":
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            FREE AGENT
          </span>
        );
      case "TRANSFER LISTED":
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            LISTED
          </span>
        );
      case "UNDER TERMINATION":
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            EXPIRING
          </span>
        );
      default:
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <section className="w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center space-x-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[#111111]">
              Transfer Market
            </h2>
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Open Now</span>
            </div>
          </div>

          <Link
            href="/transfer-market"
            className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Section Content: Player Cards (Left) + Promo Banner (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Player Cards (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {transferPlayers.slice(0, 6).map((player: TransferPlayerItem) => (
              <div
                key={player.id}
                className="bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] rounded-xl p-3.5 flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] relative shrink-0">
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111111] flex items-center space-x-1">
                        <span className="truncate max-w-[100px]">{player.name}</span>
                        <span>{player.flag}</span>
                      </div>
                      <div className="text-[10px] text-[#5F6368] font-medium truncate max-w-[120px]">
                        {player.position}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#F7F8FA] flex items-center justify-between">
                  <div>{getStatusBadge(player.status)}</div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#5F6368] block leading-none">Valuation</span>
                    <span className="text-xs font-black text-[#111111] font-mono">{player.marketValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Large Promo Card (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#111111] text-white p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-md">
            {/* Subtle background graphic */}
            <div className="absolute right-0 bottom-0 opacity-20 w-48 h-48 pointer-events-none">
              <Image
                src="/images/hero-banner-dark.png"
                alt="Transfer Star"
                fill
                className="object-cover object-right"
              />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-white/10 text-slate-200 border border-white/20">
                <Sparkles className="w-3 h-3 text-[#C79A3B]" />
                <span>Squad Building</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Find Your <br />
                <span className="text-[#C79A3B]">Next Star</span>
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed max-w-xs">
                Search verified athlete portfolios, compare market valuations, and negotiate buyout proposals.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/transfer-market"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-white text-[#111111] hover:bg-slate-100 transition-all shadow-sm"
              >
                <span>Browse Transfer Market</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
