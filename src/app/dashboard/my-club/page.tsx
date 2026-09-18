"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Users, Trophy, ArrowRightLeft, Swords, Plus, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function MyClubDashboard() {
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClub() {
      try {
        const res = await fetch("/api/clubs/dhaka-dominators");
        const json = await res.json();
        if (json.success) setClub(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadClub();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-600 font-bold animate-pulse">
        Loading Club Management Portal...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={club?.logo || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200"}
              alt=""
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[10px] font-bold uppercase mb-1">
                <span>Manager Desk</span>
                <span>•</span>
                <span>Division 1</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950">{club?.name}</h1>
              <div className="text-xs text-slate-500">{club?.location} • Manager: Rahim Chowdhury</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold">League Points</div>
              <div className="text-2xl font-black text-slate-950 font-mono">{club?.points} PTS</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Club Value</div>
              <div className="text-2xl font-black text-emerald-700 font-mono">{formatCurrency(club?.marketValue || 480)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Squad Management List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center">
            <Users className="w-4 h-4 text-black mr-2" />
            Active Squad Lineup ({club?.squad?.length || 0} Athletes)
          </h2>
          <Link
            href="/transfer-market"
            className="px-4 py-2 rounded-xl bg-black text-white font-bold text-xs hover:bg-zinc-800 shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Scout / Sign Player</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {club?.squad?.map((p: any) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between hover:border-black transition-all"
            >
              <div className="flex items-center space-x-3">
                <img src={p.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div>
                  <div className="text-xs font-bold text-slate-950 truncate max-w-[120px]">{p.fullName}</div>
                  <div className="text-[11px] text-slate-500">{p.preferredPosition} • UID: {p.konamiId}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">{p.contract?.status || "Under Contract"}</div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">{p.rating} ELO</div>
                <Link href={`/players/${p.username}`} className="text-[10px] text-slate-950 font-bold hover:underline block">
                  Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
