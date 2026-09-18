"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Plus, CheckCircle2, Download, Search, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminClubsPage() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [location, setLocation] = useState("Dhaka, Bangladesh");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadClubs() {
      try {
        const res = await fetch("/api/clubs");
        const json = await res.json();
        if (json.success) setClubs(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadClubs();
  }, []);

  const handleCreateClub = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, shortName, location, description }),
      });
      const json = await res.json();
      if (json.success) {
        setClubs([...clubs, json.data]);
        setCreateModalOpen(false);
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
          <h1 className="text-2xl font-black text-slate-950">Club Organization Management</h1>
          <p className="text-xs text-slate-600 mt-1">Review club registrations, squad rosters, managers, and divisional standings.</p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Club</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-black shadow-sm p-6 flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-900 border border-slate-200">
                  {c.shortName}
                </span>
                <span className="text-xs font-mono font-bold text-slate-950">{c.points} PTS</span>
              </div>

              <div className="flex items-center space-x-3.5 my-2">
                <img src={c.logo} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div>
                  <h3 className="text-sm font-bold text-slate-950">{c.name}</h3>
                  <div className="text-xs text-slate-500">{c.location}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 mt-1">{c.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Valuation: <strong className="text-emerald-700">{formatCurrency(c.marketValue)}</strong></span>
              <Link href={`/clubs/${c.slug}`} className="text-slate-950 font-bold hover:underline">
                Manage Squad →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-950">Create Esports Club</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-800">✕</button>
            </div>

            <form onSubmit={handleCreateClub} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Club Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sylhet Strikers Esports"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Tag (Max 5 chars) *</label>
                <input
                  type="text"
                  placeholder="e.g. SSE"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 uppercase font-mono focus:outline-none focus:border-black focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Division / Base City *</label>
                <input
                  type="text"
                  placeholder="e.g. Sylhet, Bangladesh"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description & Tactical Style</label>
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
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold shadow-sm"
                >
                  Register Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
