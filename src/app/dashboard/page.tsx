"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Trophy,
  Swords,
  Award,
  ArrowRight,
  Clock,
  Flame,
  Calendar,
  Settings,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency, getFormColor, formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const authRes = await fetch("/api/auth/me");
        const authJson = await authRes.json();
        if (authJson.success && authJson.data) {
          setUser(authJson.data);
          const pRes = await fetch(`/api/players/${authJson.data.username}`);
          const pJson = await pRes.json();
          if (pJson.success) {
            setPlayer(pJson.data);
          }
        }

        const fixRes = await fetch("/api/fixtures");
        const fixJson = await fixRes.json();
        if (fixJson.success) {
          setFixtures(fixJson.data.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-600 font-bold animate-pulse">
        Loading Athlete Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3.5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
              <img
                src={player?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[10px] font-bold uppercase mb-1">
                <span>Certified Athlete</span>
                <span>•</span>
                <span>{player?.preferredPosition || "CF"}</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950">
                Welcome, {user?.fullName || "Athlete"}!
              </h1>
              <div className="text-xs text-slate-500 font-mono">
                @{user?.username || "athlete"} • Konami UID: <strong className="text-slate-900">{player?.konamiId || "984-721-032"}</strong>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Elo Rating</div>
              <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono">{player?.rating || 750}</div>
              <div className="text-[10px] text-emerald-700 font-semibold">Tier 1 Rank #1</div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Market Value</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">{formatCurrency(player?.marketValue || 50)}</div>
              <div className="text-[10px] text-slate-500">{player?.contract?.status || "Free Agent"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Matches Played</div>
          <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono">{player?.stats?.matchesPlayed || 48}</div>
          <div className="text-[10px] sm:text-[11px] text-emerald-700 font-bold">{player?.stats?.winRate || 81.3}% Win Rate</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Goals Scored</div>
          <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono">{player?.stats?.goalsScored || 64}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-700 font-semibold">{player?.stats?.assists || 19} Assists</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">MOTM Awards</div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono">{player?.motmCount || 14}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-500">Accredited Honors</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Current Club</div>
          <div className="text-xs sm:text-sm font-black text-slate-950 truncate">{player?.club?.name || "Dhaka Dominators"}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-700 font-semibold">Active Starting XI</div>
        </div>
      </div>

      {/* Upcoming Matches & Action Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Scheduled Fixtures */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center">
              <Swords className="w-4 h-4 text-black mr-2" />
              Your Upcoming Tournament Matches
            </h2>
            <Link href="/matches" className="text-xs text-black font-bold hover:underline">
              Match Centre →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {fixtures.map((f) => (
              <div
                key={f.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col xs:flex-row xs:items-center justify-between gap-3 hover:border-black transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{f.tournamentName} • {f.round}</div>
                  <div className="text-sm font-bold text-slate-950 mt-1">
                    {f.homePlayer?.fullName || f.homeClub?.shortName} vs {f.awayPlayer?.fullName || f.awayClub?.shortName}
                  </div>
                  <div className="text-[11px] text-slate-500">{formatDate(f.scheduledDate)} at {f.venue}</div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    f.status === "LIVE" ? "bg-rose-50 text-rose-700 border border-rose-200 animate-pulse" : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}>
                    {f.status}
                  </span>
                  <Link
                    href={`/matches/${f.id}`}
                    className="px-3.5 py-2 rounded-xl bg-black text-white font-bold text-xs hover:bg-zinc-800 transition-colors shadow-sm min-h-[44px] flex items-center justify-center"
                  >
                    Match Hub
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links & Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href={`/players/${user?.username || "mahim_striker"}`}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-black block space-y-1 transition-all"
            >
              <div className="text-xs font-bold text-slate-950 flex items-center justify-between">
                <span>View Public Esports Athlete Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </div>
              <div className="text-[11px] text-slate-500">See your public rating, match radar, and trophy cabinet</div>
            </Link>

            <Link
              href="/transfer-market"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-black block space-y-1 transition-all"
            >
              <div className="text-xs font-bold text-slate-950 flex items-center justify-between">
                <span>Transfer Market Negotiations</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="text-[11px] text-slate-500">Review incoming club contract offers and market value</div>
            </Link>

            <Link
              href="/notifications"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-black block space-y-1 transition-all"
            >
              <div className="text-xs font-bold text-slate-950 flex items-center justify-between">
                <span>Referee Result Alerts</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </div>
              <div className="text-[11px] text-slate-500">Check referee certifications and match score confirmations</div>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
