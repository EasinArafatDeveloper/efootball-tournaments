"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Shield,
  Trophy,
  Swords,
  Radio,
  FileText,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      try {
        const res = await fetch("/api/admin/overview");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadOverview();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-slate-600 font-bold animate-pulse">Loading Admin Command Center...</div>;
  }

  const stats = data?.stats;
  const liveMatches = data?.liveFixtures || [];
  const auditLogs = data?.auditLogs || [];

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Super Admin Command Center</h1>
          <p className="text-xs text-slate-600 mt-1">Platform analytics, competition operations, and governance oversight.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/live"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-2 animate-pulse shadow-sm"
          >
            <Radio className="w-4 h-4" />
            <span>Open Live Match Ops ({liveMatches.length} Live)</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Total Athletes</span>
            <Users className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black text-slate-950 font-mono">{stats?.registeredPlayers || 50}</div>
          <div className="text-[11px] text-emerald-700 font-semibold">+14 new this month</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Active Clubs</span>
            <Shield className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black text-slate-950 font-mono">{stats?.activeClubs || 10}</div>
          <div className="text-[11px] text-slate-500">10 Premier Division</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Active Tournaments</span>
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-950 font-mono">{stats?.activeTournaments || 3}</div>
          <div className="text-[11px] text-amber-700 font-semibold">150,000+ BDT Pool</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Completed Matches</span>
            <Swords className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-black text-slate-950 font-mono">{stats?.completedMatches || 24}</div>
          <div className="text-[11px] text-slate-500">100% Score Verified</div>
        </div>
      </div>

      {/* Live Operations & Audit Logs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Live Match Desk Preview */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center">
              <Radio className="w-4 h-4 text-rose-600 mr-2 animate-pulse" />
              Real-Time Matchday Fixtures
            </h2>
            <Link href="/admin/fixtures" className="text-xs text-black font-bold hover:underline">
              All Fixtures →
            </Link>
          </div>

          <div className="space-y-3">
            {liveMatches.map((m: any) => (
              <div
                key={m.id}
                className="p-4 rounded-2xl bg-slate-50 border border-rose-200 flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="text-xs font-bold text-rose-700 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                    <span>LIVE: {m.tournamentName}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-950 mt-1">
                    {m.homePlayer?.fullName || m.homeClub?.shortName} ({m.result?.homeScore || 2}) vs ({m.result?.awayScore || 1}) {m.awayPlayer?.fullName || m.awayClub?.shortName}
                  </div>
                  <div className="text-[11px] text-slate-500">{m.venue} • Referee: {m.referee?.name}</div>
                </div>

                <Link
                  href={`/matches/${m.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Arbitrate Score
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Activity */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center">
              <FileText className="w-4 h-4 text-slate-800 mr-2" />
              Administrative Audit Log
            </h2>
            <Link href="/admin/audit-logs" className="text-xs text-black font-bold hover:underline">
              Full Logs →
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log: any) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 font-mono text-[10px]">{log.action}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{formatTime(log.createdAt)}</span>
                </div>
                <div className="text-slate-950 font-semibold">{log.target}</div>
                <div className="text-[10px] text-slate-500">Admin: {log.adminName} • IP: {log.ipAddress}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
