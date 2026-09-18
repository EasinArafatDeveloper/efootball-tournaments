"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Shield,
  Trophy,
  Users,
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Flame,
  Award,
} from "lucide-react";
import { formatCurrency, getFormColor, formatDate } from "@/lib/utils";

export default function ClubDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("squad");

  useEffect(() => {
    async function fetchClub() {
      try {
        const res = await fetch(`/api/clubs/${slug}`);
        const json = await res.json();
        if (json.success) {
          setClub(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchClub();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-600 font-bold animate-pulse text-xs">
        Loading Club Organization Hub...
      </div>
    );
  }

  if (!club) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-black">Club not found</h2>
        <Link href="/clubs" className="text-black font-bold hover:underline">
          Return to Clubs Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/clubs"
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Clubs Directory</span>
      </Link>

      {/* Hero Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-300 p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-slate-100 border border-slate-300 shadow-md flex-shrink-0 p-1">
              <img src={club.logo} alt={club.name} className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-slate-100 text-black border border-slate-300 text-xs font-bold uppercase">
                <span>{club.shortName}</span>
                <span>•</span>
                <span>Division 1</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
                {club.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1 font-medium">
                <span className="flex items-center text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-black mr-1" />
                  {club.location}
                </span>
                <span>Manager: <strong className="text-black">{club.managerName}</strong></span>
              </div>

              <p className="text-xs text-slate-600 max-w-xl leading-relaxed pt-1">
                {club.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold">League Points</div>
              <div className="text-3xl font-black text-black font-mono">{club.points} PTS</div>
              <div className="text-[10px] text-slate-500">{club.stats?.matches || 16} Played</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <div className="text-[10px] text-emerald-800 uppercase font-bold">Club Valuation</div>
              <div className="text-3xl font-black text-emerald-800 font-mono">{formatCurrency(club.marketValue)}</div>
              <div className="text-[10px] text-emerald-800 font-medium">{club.squadCount} Squad Athletes</div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        {["squad", "fixtures", "trophies"].map((t) => (
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

      {/* Tab 1: Squad Roster */}
      {activeTab === "squad" && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider">
            Active Squad Roster ({club.squad?.length || 0} Athletes)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {club.squad?.map((p: any) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between group hover:border-black hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 p-0.5">
                    <img src={p.avatar} alt={p.fullName} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <Link
                      href={`/players/${p.username}`}
                      className="text-xs font-bold text-black group-hover:underline transition-colors block truncate max-w-[130px]"
                    >
                      {p.fullName}
                    </Link>
                    <div className="text-[11px] text-slate-500">
                      {p.preferredPosition} • UID: {p.konamiId}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-mono">{p.rating} OVR</div>
                  <Link href={`/players/${p.username}`} className="text-[10px] text-black font-bold hover:underline mt-1 block">
                    Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Club Fixtures */}
      {activeTab === "fixtures" && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider">
            Club Matchday Schedule & Results
          </h3>
          {club.fixtures && club.fixtures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.fixtures.map((f: any) => (
                <div
                  key={f.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-black">{f.tournamentName}</div>
                    <div className="text-sm font-bold text-black mt-1">
                      {f.homePlayer?.fullName || f.homeClub?.shortName} vs {f.awayPlayer?.fullName || f.awayClub?.shortName}
                    </div>
                    <div className="text-[11px] text-slate-500">{formatDate(f.scheduledDate)}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-base font-black text-black font-mono">
                      {f.result ? `${f.result.homeScore} - ${f.result.awayScore}` : "SCHEDULED"}
                    </div>
                    <Link href={`/matches/${f.id}`} className="text-xs text-black font-bold hover:underline block">
                      Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
              No recent fixtures on record.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Trophies */}
      {activeTab === "trophies" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm font-bold text-black">eFCOB Premier Division S3</div>
              <div className="text-xs text-slate-500">Champions Trophy 2025</div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-black">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm font-bold text-black">National Cup Finalists</div>
              <div className="text-xs text-slate-500">Silver Cup 2024</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
