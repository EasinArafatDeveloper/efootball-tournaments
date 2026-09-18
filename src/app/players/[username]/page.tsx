"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Trophy,
  Target,
  Zap,
  Award,
  Calendar,
  Smartphone,
  Globe,
  ArrowLeft,
  ArrowRight,
  Flame,
  CheckCircle2,
  DollarSign,
  Clock,
} from "lucide-react";
import { formatCurrency, getFormColor, formatDate } from "@/lib/utils";

export default function PlayerProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const res = await fetch(`/api/players/${username}`);
        const json = await res.json();
        if (json.success) {
          setPlayer(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayer();
  }, [username]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-600 font-bold animate-pulse text-xs">
        Loading Athlete Profile...
      </div>
    );
  }

  if (!player) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-black">Athlete not found</h2>
        <Link href="/players" className="text-black font-bold hover:underline">
          Return to Athlete Database
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/players"
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Athlete Registry</span>
      </Link>

      {/* Athlete Profile Banner & Header Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-300 p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Avatar & Main Credentials */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-300 shadow-md flex-shrink-0 p-1">
              <img src={player.avatar} alt={player.fullName} className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-black border border-slate-300">
                  {player.preferredPosition}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {player.playStyle}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {player.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
                {player.fullName}
              </h1>

              <div className="text-xs sm:text-sm text-slate-500 font-mono font-medium">
                @{player.username} • Konami UID: <strong className="text-black">{player.konamiId}</strong>
              </div>

              <p className="text-xs text-slate-600 max-w-lg leading-relaxed pt-1">
                {player.bio || "Professional eFootball athlete registered under eFCOB Bangladesh Championship Circuit."}
              </p>

              {/* Club & Device Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5 text-slate-800">
                  <Shield className="w-4 h-4 text-black" />
                  <span>Club: <strong className="text-black">{player.club?.name || "Unattached Free Agent"}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-800">
                  <Smartphone className="w-4 h-4 text-black" />
                  <span>{player.deviceModel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating & Market Valuation Tile */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
              <div className="text-[10px] text-amber-800 uppercase font-bold">Official Elo Rating</div>
              <div className="text-3xl font-black text-amber-900 font-mono">{player.rating}</div>
              <div className="text-[10px] text-amber-800 font-bold">Tier 1 Elite</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <div className="text-[10px] text-emerald-800 uppercase font-bold">Virtual Market Value</div>
              <div className="text-3xl font-black text-emerald-900 font-mono">{formatCurrency(player.marketValue)}</div>
              <div className="text-[10px] text-emerald-800 font-medium">{player.contract?.status || "UNDER_CONTRACT"}</div>
            </div>

            {/* Form */}
            <div className="col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Recent Match Form:</span>
              <div className="flex items-center space-x-1.5">
                {player.form?.map((r: string, fIdx: number) => (
                  <span
                    key={fIdx}
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center border ${getFormColor(
                      r
                    )}`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        {["overview", "matches", "trophies", "contract"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === t
                ? "bg-black text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Career Statistics */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase">Matches & Win Rate</div>
            <div className="text-3xl font-black text-black font-mono">
              {player.stats?.matchesPlayed || 0}{" "}
              <span className="text-sm font-normal text-slate-500">({player.stats?.winRate || 0}%)</span>
            </div>
            <div className="text-xs text-slate-600">
              {player.stats?.wins || 0} Wins • {player.stats?.draws || 0} Draws • {player.stats?.losses || 0} Losses
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase">Goals Scored</div>
            <div className="text-3xl font-black text-emerald-700 font-mono">
              {player.stats?.goalsScored || 0}
            </div>
            <div className="text-xs text-slate-600">
              {player.stats?.matchesPlayed ? ((player.stats.goalsScored / player.stats.matchesPlayed).toFixed(2)) : 0} Goals / Match
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase">Assists & Playmaking</div>
            <div className="text-3xl font-black text-black font-mono">
              {player.stats?.assists || 0}
            </div>
            <div className="text-xs text-slate-600">Key chance creation</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase">Man of the Match (MOTM)</div>
            <div className="text-3xl font-black text-amber-700 font-mono">
              {player.motmCount || 0}
            </div>
            <div className="text-xs text-slate-600">Official tournament awards</div>
          </div>
        </div>
      )}

      {/* Tab 2: Match History */}
      {activeTab === "matches" && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider">
            Matchday Fixture History
          </h3>
          {player.fixtures && player.fixtures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {player.fixtures.map((f: any) => (
                <div
                  key={f.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-black">{f.tournamentName}</div>
                    <div className="text-sm font-bold text-black mt-1">
                      {f.homePlayer?.fullName || f.homeClub?.shortName} vs {f.awayPlayer?.fullName || f.awayClub?.shortName}
                    </div>
                    <div className="text-[11px] text-slate-500">{formatDate(f.scheduledDate)} • {f.venue}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-lg font-black text-black font-mono">
                      {f.result ? `${f.result.homeScore} - ${f.result.awayScore}` : "VS"}
                    </div>
                    <Link href={`/matches/${f.id}`} className="text-xs text-black font-bold hover:underline block">
                      Match Report →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
              No recent matches on record for this athlete.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Trophies & Achievements */}
      {activeTab === "trophies" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-black">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-black">eFCOB Golden Boot 2025</div>
              <div className="text-[11px] text-slate-500">Season 3 National Top Scorer</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-black font-black">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-black">50+ Career Wins Badge</div>
              <div className="text-[11px] text-slate-500">Division 1 Mastery</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 font-black">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-black">Clutch Performer</div>
              <div className="text-[11px] text-slate-500">10+ Official MOTM Honors</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Contract & Transfer Market */}
      {activeTab === "contract" && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider">
            Player Contract & Transfer Eligibility
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-slate-500 font-semibold">Contract Status</div>
              <div className="text-sm font-bold text-black mt-1">{player.contract?.status || "UNDER_CONTRACT"}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-slate-500 font-semibold">Contract Remaining</div>
              <div className="text-sm font-bold text-emerald-700 mt-1">
                {player.contract?.daysRemaining ? `${player.contract.daysRemaining} Days` : "Unrestricted Free Agent"}
              </div>
            </div>
          </div>
          <div className="pt-2">
            <Link
              href="/transfer-market"
              className="px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs inline-flex items-center space-x-2 shadow-sm"
            >
              <span>Submit Transfer Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
