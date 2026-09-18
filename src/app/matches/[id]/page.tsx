"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Swords,
  Play,
  Calendar,
  Clock,
  Shield,
  Trophy,
  Award,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Flame,
  Scale,
} from "lucide-react";
import { formatTime, formatDate } from "@/lib/utils";

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [motmPlayerId, setMotmPlayerId] = useState("");
  const [motmReason, setMotmReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchMatch() {
      try {
        const res = await fetch(`/api/fixtures/${id}`);
        const json = await res.json();
        if (json.success) {
          setMatch(json.data);
          if (json.data.result) {
            setHomeScore(json.data.result.homeScore || 0);
            setAwayScore(json.data.result.awayScore || 0);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatch();
  }, [id]);

  const handleScoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/fixtures/${id}/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeScore: Number(homeScore),
          awayScore: Number(awayScore),
          motmPlayerId,
          motmReason,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setMatch(json.data);
        setScoreModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-slate-600 font-bold animate-pulse text-xs">
        Loading Matchday Intelligence...
      </div>
    );
  }

  if (!match) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-black">Match not found</h2>
        <Link href="/matches" className="text-black font-bold hover:underline">
          Return to Match Centre
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/matches"
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Match Centre</span>
      </Link>

      {/* Main Broadcast Scoreboard */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-300 p-8 md:p-12 shadow-xl">
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-black text-xs font-bold uppercase tracking-wider border border-slate-300">
            <span>{match.tournamentName}</span>
            <span>•</span>
            <span>{match.round}</span>
          </div>

          <div className="text-xs text-slate-500 flex items-center space-x-3 pt-1">
            <span>{formatDate(match.scheduledDate)} at {formatTime(match.scheduledDate)}</span>
            <span>•</span>
            <span className="text-black font-mono font-bold">{match.venue}</span>
          </div>
        </div>

        {/* 2-Player / 2-Club Face-Off */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          
          {/* Home Athlete */}
          <div className="md:col-span-2 flex flex-col items-center md:items-end text-center md:text-right space-y-3">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 overflow-hidden border border-slate-300 shadow-md p-1">
              <img
                src={match.homePlayer?.avatar || match.homeClub?.logo || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200"}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <Link
                href={match.homePlayer ? `/players/${match.homePlayer.username}` : `/clubs/${match.homeClub?.id}`}
                className="text-lg sm:text-2xl font-black text-black hover:underline transition-colors"
              >
                {match.homePlayer?.fullName || match.homeClub?.name}
              </Link>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                {match.homeClub?.name || "Free Agent"} • {match.homePlayer?.rating ? `${match.homePlayer.rating} Elo OVR` : ""}
              </div>
            </div>
          </div>

          {/* Central Score Node */}
          <div className="md:col-span-1 flex flex-col items-center justify-center space-y-2 py-4">
            {match.status === "FINISHED" || match.status === "LIVE" ? (
              <div className="text-4xl sm:text-6xl font-black text-black px-5 py-2 rounded-2xl bg-slate-100 border border-slate-300 font-mono shadow-sm">
                {match.result?.homeScore ?? 0} : {match.result?.awayScore ?? 0}
              </div>
            ) : (
              <div className="text-2xl font-black text-slate-600 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200">
                VS
              </div>
            )}

            {match.status === "LIVE" ? (
              <span className="px-3 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 animate-pulse">
                75&apos; LIVE
              </span>
            ) : match.status === "FINISHED" ? (
              <span className="px-3 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                FINAL SCORE
              </span>
            ) : (
              <span className="text-xs text-black font-mono font-bold">COUNTDOWN</span>
            )}
          </div>

          {/* Away Athlete */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 overflow-hidden border border-slate-300 shadow-md p-1">
              <img
                src={match.awayPlayer?.avatar || match.awayClub?.logo || "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200"}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <Link
                href={match.awayPlayer ? `/players/${match.awayPlayer.username}` : `/clubs/${match.awayClub?.id}`}
                className="text-lg sm:text-2xl font-black text-black hover:underline transition-colors"
              >
                {match.awayPlayer?.fullName || match.awayClub?.name}
              </Link>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                {match.awayClub?.name || "Free Agent"} • {match.awayPlayer?.rating ? `${match.awayPlayer.rating} Elo OVR` : ""}
              </div>
            </div>
          </div>

        </div>

        {/* MOTM Callout */}
        {match.result?.motmPlayerName && (
          <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-black">
                ★
              </div>
              <div>
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Official Man of the Match (MOTM)
                </div>
                <div className="text-sm font-black text-black">
                  {match.result.motmPlayerName}
                </div>
              </div>
            </div>
            <div className="text-xs text-amber-900 italic max-w-md text-center sm:text-right">
              &quot;{match.result.motmReason}&quot;
            </div>
          </div>
        )}

        {/* Action button bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-slate-600">
            {match.referee && (
              <span className="flex items-center">
                <Scale className="w-4 h-4 text-black mr-1.5" />
                Ref: <strong className="text-black ml-1">{match.referee.name}</strong> ({match.referee.tier})
              </span>
            )}
          </div>

          <button
            onClick={() => setScoreModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-black text-white font-bold text-xs shadow-sm hover:bg-zinc-800 transition-all"
          >
            Submit / Update Score Result
          </button>
        </div>
      </div>

      {/* Embedded Live Video Stream */}
      {match.isOnStream && (
        <div className="rounded-3xl bg-white border border-rose-200 overflow-hidden shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
              <span className="text-sm font-black text-black uppercase tracking-wider">
                Official Live Broadcast Stream
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Platform: {match.streamPlatform || "YouTube Live"}</span>
          </div>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
            <div className="text-center space-y-3 p-6">
              <div className="w-16 h-16 rounded-full bg-rose-600/20 border border-rose-500 flex items-center justify-center mx-auto animate-pulse">
                <Play className="w-8 h-8 text-rose-400 fill-rose-400 ml-1" />
              </div>
              <div className="text-base font-bold text-white">Live Broadcast Channel Active</div>
              <div className="text-xs text-slate-400 max-w-sm mx-auto">
                Watch live commentary, stadium chat, and instant replays for this tournament tie.
              </div>
              <a
                href={match.streamUrl || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors"
              >
                <span>Open Live Player Stream</span>
                <Play className="w-3.5 h-3.5 fill-white" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Match Events Timeline & Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Timeline Events (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center space-x-2 text-sm font-bold text-black uppercase tracking-wider border-b border-slate-100 pb-3">
            <Clock className="w-4 h-4 text-black" />
            <span>Match Event Timeline</span>
          </div>

          <div className="relative pl-6 space-y-6 border-l-2 border-slate-200">
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-black border-2 border-white"></div>
              <div className="text-xs font-mono font-bold text-black">00&apos; Kickoff</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Match officially underway</div>
              <div className="text-[11px] text-slate-500">{match.venue}</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white"></div>
              <div className="text-xs font-mono font-bold text-emerald-700">34&apos; Goal (1 - 0)</div>
              <div className="text-xs font-bold text-black mt-0.5">
                {match.homePlayer?.fullName || match.homeClub?.shortName}
              </div>
              <div className="text-[11px] text-slate-500">Clinical bottom-corner finish following 1-2 counter pass.</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white"></div>
              <div className="text-xs font-mono font-bold text-emerald-700">52&apos; Goal (1 - 1)</div>
              <div className="text-xs font-bold text-black mt-0.5">
                {match.awayPlayer?.fullName || match.awayClub?.shortName}
              </div>
              <div className="text-[11px] text-slate-500">Equalizer scored with curl shot from edge of the penalty box.</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white"></div>
              <div className="text-xs font-mono font-bold text-emerald-700">68&apos; Goal (2 - 1)</div>
              <div className="text-xs font-bold text-black mt-0.5">
                {match.homePlayer?.fullName || match.homeClub?.shortName}
              </div>
              <div className="text-[11px] text-slate-500">Winning header into top right corner.</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white"></div>
              <div className="text-xs font-mono font-bold text-amber-700">90&apos; Final Whistle</div>
              <div className="text-xs font-bold text-black mt-0.5">Official result certified by Referee</div>
            </div>
          </div>
        </div>

        {/* Match Statistics & Tactical Radar (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center space-x-2 text-sm font-bold text-black uppercase tracking-wider border-b border-slate-100 pb-3">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Match Statistics</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Possession */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>56%</span>
                <span className="text-slate-500 font-medium">Ball Possession</span>
                <span>44%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex">
                <div className="bg-black h-full" style={{ width: "56%" }}></div>
                <div className="bg-slate-400 h-full" style={{ width: "44%" }}></div>
              </div>
            </div>

            {/* Total Shots */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>8 (5)</span>
                <span className="text-slate-500 font-medium">Total Shots (On Target)</span>
                <span>5 (3)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex">
                <div className="bg-black h-full" style={{ width: "62%" }}></div>
                <div className="bg-slate-400 h-full" style={{ width: "38%" }}></div>
              </div>
            </div>

            {/* Pass Accuracy */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>89%</span>
                <span className="text-slate-500 font-medium">Pass Accuracy</span>
                <span>84%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex">
                <div className="bg-black h-full" style={{ width: "52%" }}></div>
                <div className="bg-slate-400 h-full" style={{ width: "48%" }}></div>
              </div>
            </div>

            {/* Interceptions & Tackles */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>14</span>
                <span className="text-slate-500 font-medium">Tackles & Interceptions</span>
                <span>11</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex">
                <div className="bg-black h-full" style={{ width: "56%" }}></div>
                <div className="bg-slate-400 h-full" style={{ width: "44%" }}></div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-black">Referee Assessment Notes</div>
            <div>&quot;Clean tactical match without connection lag or disciplinary violations. Proof screenshots logged into database.&quot;</div>
          </div>
        </div>

      </div>

      {/* Modal Dialog for Result Submission */}
      {scoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-300 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-black">
                Submit / Approve Match Score
              </h3>
              <button onClick={() => setScoreModalOpen(false)} className="text-slate-500 hover:text-black">
                ✕
              </button>
            </div>

            <form onSubmit={handleScoreSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {match.homePlayer?.fullName || match.homeClub?.name} Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={homeScore}
                    onChange={(e) => setHomeScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-black font-mono font-bold text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {match.awayPlayer?.fullName || match.awayClub?.name} Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={awayScore}
                    onChange={(e) => setAwayScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-black font-mono font-bold text-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Select Man of the Match (MOTM)
                </label>
                <select
                  value={motmPlayerId}
                  onChange={(e) => setMotmPlayerId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-black font-medium"
                >
                  <option value="">None / Default</option>
                  {match.homePlayer && (
                    <option value={match.homePlayer.id}>{match.homePlayer.fullName} (Home)</option>
                  )}
                  {match.awayPlayer && (
                    <option value={match.awayPlayer.id}>{match.awayPlayer.fullName} (Away)</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">MOTM Reason & Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Scored 2 clutch goals in second half"
                  value={motmReason}
                  onChange={(e) => setMotmReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-black"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setScoreModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-black text-white font-bold hover:bg-zinc-800 shadow-sm"
                >
                  {submitting ? "Updating Database..." : "Save & Recalculate Ratings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
