"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swords, Plus, Calendar, Clock, CheckCircle2, AlertTriangle, Scale } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

export default function AdminFixturesPage() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [homePlayerId, setHomePlayerId] = useState("");
  const [awayPlayerId, setAwayPlayerId] = useState("");
  const [round, setRound] = useState("Semi Final 2");
  const [venue, setVenue] = useState("Server BD-Championship-01");
  const [isOnStream, setIsOnStream] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [fRes, pRes] = await Promise.all([
          fetch("/api/fixtures"),
          fetch("/api/players"),
        ]);
        const [fJson, pJson] = await Promise.all([fRes.json(), pRes.json()]);
        if (fJson.success) setFixtures(fJson.data);
        if (pJson.success) setPlayers(pJson.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateFixture = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/fixtures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homePlayerId,
          awayPlayerId,
          round,
          venue,
          isOnStream,
          scheduledDate: new Date().toISOString(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFixtures([json.data, ...fixtures]);
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Fixtures & Competition Scheduling</h1>
          <p className="text-xs text-slate-600 mt-1">Schedule tournament ties, assign match referees, and verify official scorelines.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Match</span>
        </button>
      </div>

      {/* Fixtures List */}
      <div className="space-y-4">
        {fixtures.map((f) => (
          <div
            key={f.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-black shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
          >
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-900 font-bold">
                <span>{f.tournamentName}</span>
                <span>•</span>
                <span className="text-slate-500">{f.round}</span>
                {f.isOnStream && (
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">STREAM</span>
                )}
              </div>

              <div className="text-base font-bold text-slate-950 mt-1">
                {f.homePlayer?.fullName || f.homeClub?.shortName} vs {f.awayPlayer?.fullName || f.awayClub?.shortName}
              </div>

              <div className="text-xs text-slate-500 flex items-center space-x-4 mt-1">
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-black" /> {formatDate(f.scheduledDate)}</span>
                <span>Server: {f.venue}</span>
                <span>Ref: {f.referee?.name}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                f.status === "FINISHED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                f.status === "LIVE" ? "bg-rose-50 text-rose-700 border border-rose-200 animate-pulse" :
                "bg-slate-100 text-slate-700 border border-slate-200"
              }`}>
                {f.status} {f.result ? `(${f.result.homeScore} - ${f.result.awayScore})` : ""}
              </span>

              <Link
                href={`/matches/${f.id}`}
                className="px-3.5 py-1.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition-colors shadow-sm"
              >
                Arbitrate Score
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-950">Schedule Fixture Tie</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-800">✕</button>
            </div>

            <form onSubmit={handleCreateFixture} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Home Athlete</label>
                <select
                  value={homePlayerId}
                  onChange={(e) => setHomePlayerId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                >
                  <option value="">Select Home Athlete...</option>
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>{p.fullName} (@{p.username}) - {p.rating} Elo</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Away Athlete</label>
                <select
                  value={awayPlayerId}
                  onChange={(e) => setAwayPlayerId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                >
                  <option value="">Select Away Athlete...</option>
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>{p.fullName} (@{p.username}) - {p.rating} Elo</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Round / Competition Stage</label>
                <input
                  type="text"
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Konami Server Room / Venue</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="streamCheck"
                  checked={isOnStream}
                  onChange={(e) => setIsOnStream(e.target.checked)}
                  className="rounded border-slate-300 text-black focus:ring-black"
                />
                <label htmlFor="streamCheck" className="text-slate-700">Feature on Live Broadcast Stream</label>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold shadow-sm"
                >
                  Schedule Tie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
