"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Users,
  GitFork,
  ArrowLeft,
  ArrowRight,
  Shield,
  CheckCircle2,
  Swords,
  Award,
  Sparkles,
  Play,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function TournamentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [tourn, setTourn] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bracket");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    async function fetchTourn() {
      try {
        const res = await fetch(`/api/tournaments/${slug}`);
        const json = await res.json();
        if (json.success) {
          setTourn(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTourn();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-600 font-bold animate-pulse text-xs">
        Loading Tournament Bracket & Fixtures...
      </div>
    );
  }

  if (!tourn) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-black">Tournament not found</h2>
        <Link href="/tournaments" className="text-black font-bold hover:underline">
          Return to Tournaments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/tournaments"
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Tournaments Directory</span>
      </Link>

      {/* Hero Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-300 p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-black border border-slate-300 text-xs font-bold uppercase">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>{tourn.gameCategory} • {tourn.format}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
              {tourn.name}
            </h1>

            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              {tourn.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 pt-2 font-medium">
              <div className="flex items-center space-x-1.5 text-slate-800">
                <Calendar className="w-4 h-4 text-black" />
                <span>{formatDate(tourn.startDate)} – {formatDate(tourn.endDate)}</span>
              </div>
              <div>Prize Pool: <strong className="text-amber-800">{tourn.prizePool}</strong></div>
              <div>Status: <strong className="text-emerald-800">{tourn.status}</strong></div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="text-xs text-slate-500 uppercase font-bold">Championship Registration</div>
            <div className="text-2xl font-black text-black">
              {tourn.currentParticipants} / {tourn.maxParticipants} Slots
            </div>
            <div className="text-[11px] text-slate-500">Deadline: {formatDate(tourn.registrationDeadline)}</div>
            <button
              onClick={() => setRegistered(true)}
              className="w-full py-3 rounded-xl bg-black text-white font-bold text-xs hover:bg-zinc-800 shadow-sm transition-all"
            >
              {registered ? "✓ Registered Successfully" : "Register / Entry Request"}
            </button>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        {[
          { id: "bracket", label: "Dynamic Knockout Bracket", icon: GitFork },
          { id: "fixtures", label: "Tournament Fixtures", icon: Swords },
          { id: "rules", label: "Rulebook & Format", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white shadow-sm font-bold"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Dynamic Interactive Knockout Bracket */}
      {activeTab === "bracket" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider flex items-center">
              <Sparkles className="w-4 h-4 text-amber-600 mr-2" />
              Live Tournament Knockout Bracket
            </h3>
            <span className="text-xs text-slate-600 font-mono font-bold">Live Interactive Tree</span>
          </div>

          <div className="overflow-x-auto pb-6">
            <div className="min-w-[850px] grid grid-cols-3 gap-8 items-center relative py-6">
              
              {/* Column 1: Quarter Finals */}
              <div className="space-y-6">
                <div className="text-xs font-black text-black uppercase tracking-widest text-center pb-2 border-b border-slate-300">
                  Quarter Finals (Best of 3)
                </div>

                {/* Match 1 */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-black flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5"></span>
                      Mahim Haider (DDE)
                    </span>
                    <span className="font-mono text-emerald-700 text-sm font-black">3</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-t border-slate-100 pt-1.5">
                    <span>Easin Arafat (RRF)</span>
                    <span className="font-mono text-slate-500">1</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono pt-1 text-center font-medium">
                    Match Finished • FT 3-1
                  </div>
                </div>

                {/* Match 2 */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-black flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5"></span>
                      Prasen Jit (CCK)
                    </span>
                    <span className="font-mono text-emerald-700 text-sm font-black">2</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-t border-slate-100 pt-1.5">
                    <span>Shakib Al Hasan (SSE)</span>
                    <span className="font-mono text-slate-500">0</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono pt-1 text-center font-medium">
                    Match Finished • FT 2-0
                  </div>
                </div>

                {/* Match 3 */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-black flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5"></span>
                      Tanvir Ahmed (DDE)
                    </span>
                    <span className="font-mono text-emerald-700 text-sm font-black">2</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-t border-slate-100 pt-1.5">
                    <span>Mustafizur (RRF)</span>
                    <span className="font-mono text-slate-500">1</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono pt-1 text-center font-medium">
                    Match Finished • FT 2-1
                  </div>
                </div>

                {/* Match 4 */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-black flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5"></span>
                      Fahim Shahriar (CCK)
                    </span>
                    <span className="font-mono text-emerald-700 text-sm font-black">3</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-t border-slate-100 pt-1.5">
                    <span>Sabbir Hossain (BBL)</span>
                    <span className="font-mono text-slate-500">2</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono pt-1 text-center font-medium">
                    Match Finished • FT 3-2
                  </div>
                </div>
              </div>

              {/* Column 2: Semi Finals */}
              <div className="space-y-12">
                <div className="text-xs font-black text-rose-700 uppercase tracking-widest text-center pb-2 border-b border-rose-200">
                  Semi Finals (Live & Next)
                </div>

                {/* SF 1 Live */}
                <div className="p-4 rounded-2xl bg-white border-2 border-rose-300 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                      ● LIVE (75&apos;)
                    </span>
                    <Link href="/matches/fix-live-1" className="text-[10px] text-black font-bold hover:underline">
                      Watch Live →
                    </Link>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold pt-1">
                    <span className="text-black">Mahim Haider</span>
                    <span className="font-mono text-black text-lg font-black">2</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 border-t border-slate-100 pt-1.5">
                    <span>Prasen Jit</span>
                    <span className="font-mono text-slate-600 text-lg font-black">1</span>
                  </div>
                </div>

                {/* SF 2 Scheduled */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="text-[10px] text-slate-500 font-mono">Tomorrow • 19:30 PM</div>
                  <div className="flex items-center justify-between text-xs font-bold pt-1">
                    <span className="text-black">Tanvir Ahmed</span>
                    <span className="font-mono text-slate-400">-</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 border-t border-slate-100 pt-1.5">
                    <span>Fahim Shahriar</span>
                    <span className="font-mono text-slate-400">-</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Grand Finals & Championship Trophy */}
              <div className="space-y-6">
                <div className="text-xs font-black text-amber-700 uppercase tracking-widest text-center pb-2 border-b border-amber-300">
                  Grand Finals (Championship)
                </div>

                <div className="p-6 rounded-3xl bg-white border border-amber-300 shadow-lg text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto text-amber-800">
                    <Trophy className="w-9 h-9" />
                  </div>

                  <div>
                    <div className="text-sm font-black text-black">National Trophy Match</div>
                    <div className="text-xs text-slate-500 mt-1">Winner SF 1 vs Winner SF 2</div>
                    <div className="text-[11px] text-slate-700 font-mono font-bold mt-1">Sept 28, 2026 • 20:00 BST</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Grand Prize</div>
                    <div className="text-base font-black text-amber-800 font-mono">100,000 BDT + Trophy</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tournament Fixtures */}
      {activeTab === "fixtures" && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider">
            All Fixtures for {tourn.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tourn.fixtures?.map((f: any) => (
              <div
                key={f.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-black">{f.round}</div>
                  <div className="text-sm font-bold text-black mt-1">
                    {f.homePlayer?.fullName || f.homeClub?.shortName} vs {f.awayPlayer?.fullName || f.awayClub?.shortName}
                  </div>
                  <div className="text-[11px] text-slate-500">{formatDate(f.scheduledDate)} • {f.venue}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-base font-black text-black font-mono">
                    {f.result ? `${f.result.homeScore} - ${f.result.awayScore}` : "VS"}
                  </div>
                  <Link href={`/matches/${f.id}`} className="text-xs text-black font-bold hover:underline block">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Rulebook */}
      {activeTab === "rules" && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 max-w-3xl text-xs leading-relaxed text-slate-700">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider">
            Tournament Official Rules & Regulations
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Matches are played on standard Konami eFootball Mobile Authentic Match mode (10 minutes duration).</li>
            <li>Double elimination bracket for knockout rounds; Extra time and Penalties enabled for ties.</li>
            <li>Both athletes must submit screenshot proof to the assigned Tier-1 Match Referee within 15 minutes of match completion.</li>
            <li>Disputes or connection lag claims must be submitted to the Disciplinary Register with video evidence.</li>
          </ul>
        </div>
      )}

    </div>
  );
}
