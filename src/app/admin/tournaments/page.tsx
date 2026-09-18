"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Plus, Calendar, CheckCircle2, GitFork } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminTournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [prizePool, setPrizePool] = useState("50,000 BDT");
  const [maxParticipants, setMaxParticipants] = useState(16);
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadTournaments() {
      try {
        const res = await fetch("/api/tournaments");
        const json = await res.json();
        if (json.success) setTournaments(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTournaments();
  }, []);

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          prizePool,
          maxParticipants: Number(maxParticipants),
          description,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 14 * 86400000).toISOString(),
          registrationDeadline: new Date(Date.now() + 7 * 86400000).toISOString(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setTournaments([json.data, ...tournaments]);
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Championship & Bracket Publishing</h1>
          <p className="text-xs text-slate-600 mt-1">Generate new tournament stages, publish dynamic brackets, and configure prize rewards.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Tournament</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-black shadow-sm p-6 flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {t.prizePool}
                </span>
                <span className="text-xs font-mono text-slate-900 font-semibold">{t.status}</span>
              </div>

              <h3 className="text-base font-bold text-slate-950 mb-1">{t.name}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{t.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Progress: <strong className="text-slate-950">{t.progressPercent}%</strong></span>
              <Link href={`/tournaments/${t.slug}`} className="text-slate-950 font-bold hover:underline">
                Bracket Hub →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-950">Create Championship Stage</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-800">✕</button>
            </div>

            <form onSubmit={handleCreateTournament} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Tournament Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka Premier Invitational 2026"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Prize Pool *</label>
                <input
                  type="text"
                  placeholder="e.g. 75,000 BDT"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Max Participant Slots</label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description & Tournament Rules</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                ></textarea>
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
                  Publish Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
