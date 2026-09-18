"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Search, Filter, Shield, Trophy, Target, ArrowRight, DollarSign, Smartphone } from "lucide-react";
import { PLAYER_POSITIONS } from "@/lib/constants";
import { formatCurrency, getFormColor } from "@/lib/utils";

export default function PlayersPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPos, setSelectedPos] = useState("ALL");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    async function loadPlayers() {
      try {
        const res = await fetch(`/api/players?sortBy=${sortBy}`);
        const json = await res.json();
        if (json.success) {
          setPlayers(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPlayers();
  }, [sortBy]);

  const filtered = players.filter((p) => {
    if (selectedPos !== "ALL" && p.preferredPosition !== selectedPos) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchName = p.fullName.toLowerCase().includes(q);
      const matchUser = p.username.toLowerCase().includes(q);
      const matchUid = p.konamiId.toLowerCase().includes(q);
      const matchClub = p.club?.name?.toLowerCase().includes(q);
      if (!matchName && !matchUser && !matchUid && !matchClub) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">
            <User className="w-4 h-4 text-black" />
            <span>National Athlete Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            eFootball <span className="text-slate-500">Athlete Database</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Verified esports athletes across Bangladesh with official Konami UIDs, Elo ratings, market values, and career statistics.
          </p>
        </div>
        <div className="text-xs font-bold text-black mt-3 md:mt-0">
          Showing {filtered.length} Athletes
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Position Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedPos("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPos === "ALL"
                ? "bg-black text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Positions
          </button>
          {PLAYER_POSITIONS.map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPos(pos)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPos === pos
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search athlete, UID, club..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-black"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-black focus:outline-none focus:border-black font-medium"
          >
            <option value="rating">Sort by Rating (Elo)</option>
            <option value="goals">Sort by Goals</option>
            <option value="winRate">Sort by Win Rate %</option>
            <option value="marketValue">Sort by Market Value</option>
            <option value="motm">Sort by MOTM Awards</option>
          </select>
        </div>
      </div>

      {/* Athlete Cards Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-600 font-bold animate-pulse text-xs">
          Loading athlete rosters...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs">
          No athletes found matching the filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-white border border-slate-200 hover:border-black hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {p.preferredPosition}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-mono">
                      {p.rating} ELO
                    </span>
                  </div>
                </div>

                {/* Avatar & Profile */}
                <div className="flex items-center space-x-3.5 my-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 p-0.5 flex-shrink-0">
                    <img src={p.avatar} alt={p.fullName} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/players/${p.username}`}
                      className="text-sm font-bold text-black group-hover:underline transition-colors block truncate"
                    >
                      {p.fullName}
                    </Link>
                    <div className="text-xs text-slate-500">@{p.username}</div>
                    <div className="text-[11px] text-slate-700 truncate mt-0.5 font-medium">
                      {p.club?.name || "Free Agent"}
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="space-y-1 text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center justify-between">
                    <span>Konami UID:</span>
                    <span className="font-mono text-black font-semibold">{p.konamiId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Device:</span>
                    <span className="text-slate-700 truncate max-w-[130px]">{p.deviceModel}</span>
                  </div>
                </div>
              </div>

              {/* Stats & Form Bar */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-1 text-center text-xs">
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <div className="text-[10px] text-slate-500">Win Rate</div>
                    <div className="font-bold text-emerald-700">{p.stats?.winRate || 0}%</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <div className="text-[10px] text-slate-500">Goals</div>
                    <div className="font-bold text-black">{p.stats?.goalsScored || 0}</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <div className="text-[10px] text-slate-500">MOTM</div>
                    <div className="font-bold text-amber-700">{p.motmCount || 0}</div>
                  </div>
                </div>

                {/* Form Badges */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500 font-medium">Form:</span>
                  <div className="flex items-center space-x-1">
                    {p.form?.map((r: string, fIdx: number) => (
                      <span
                        key={fIdx}
                        className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center border ${getFormColor(
                          r
                        )}`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <Link
                href={`/players/${p.username}`}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-xs font-bold text-slate-800 text-center transition-all flex items-center justify-center space-x-1"
              >
                <span>View Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
