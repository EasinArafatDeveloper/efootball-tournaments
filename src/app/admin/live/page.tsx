"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, Play, Swords, CheckCircle2, AlertTriangle, ShieldCheck, Scale, ArrowRight } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

export default function AdminLiveDeskPage() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFixtures() {
      try {
        const res = await fetch("/api/fixtures");
        const json = await res.json();
        if (json.success) setFixtures(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFixtures();
  }, []);

  const liveFixtures = fixtures.filter((f) => f.status === "LIVE");
  const upcomingFixtures = fixtures.filter((f) => f.status === "SCHEDULED");

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
          <span>Competition Operations Control</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Live Match Operations Desk</h1>
        <p className="text-xs text-slate-600 mt-1">Real-time score arbitration, stream link broadcast controls, and referee monitoring.</p>
      </div>

      {/* Live Running Now Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center">
          <Radio className="w-4 h-4 text-rose-600 mr-2 animate-pulse" />
          Active Live Broadcast Ties ({liveFixtures.length})
        </h2>

        {liveFixtures.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center text-slate-500 text-xs">
            No live tournament ties currently active.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveFixtures.map((m) => (
              <div
                key={m.id}
                className="p-6 rounded-3xl bg-white border-2 border-rose-500 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-900 font-bold">{m.tournamentName} • {m.round}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold animate-pulse text-[10px] border border-rose-200">
                    75' LIVE
                  </span>
                </div>

                <div className="grid grid-cols-5 items-center text-center py-2">
                  <div className="col-span-2 text-center">
                    <div className="text-sm font-bold text-slate-950">{m.homePlayer?.fullName || m.homeClub?.shortName}</div>
                    <div className="text-[10px] text-slate-500">{m.homeClub?.shortName}</div>
                  </div>
                  <div className="col-span-1 text-2xl font-black text-slate-950 font-mono bg-slate-100 py-1 rounded-xl border border-slate-200">
                    {m.result?.homeScore ?? 2} - {m.result?.awayScore ?? 1}
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="text-sm font-bold text-slate-950">{m.awayPlayer?.fullName || m.awayClub?.shortName}</div>
                    <div className="text-[10px] text-slate-500">{m.awayClub?.shortName}</div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex items-center justify-between pt-3 border-t border-slate-100">
                  <span>Server: {m.venue}</span>
                  <span>Ref: {m.referee?.name}</span>
                </div>

                <Link
                  href={`/matches/${m.id}`}
                  className="w-full py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs text-center block transition-colors shadow-sm"
                >
                  Open Live Operations Scoreboard →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Scheduled Matches */}
      <div className="space-y-4 pt-4">
        <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
          Next Scheduled Ties ({upcomingFixtures.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingFixtures.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">{m.tournamentName}</div>
                <div className="text-sm font-bold text-slate-950 mt-0.5">
                  {m.homePlayer?.fullName || m.homeClub?.shortName} vs {m.awayPlayer?.fullName || m.awayClub?.shortName}
                </div>
                <div className="text-[11px] text-slate-500">{formatDate(m.scheduledDate)} at {formatTime(m.scheduledDate)}</div>
              </div>
              <Link
                href={`/matches/${m.id}`}
                className="px-3 py-1.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Manage Fixture
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
