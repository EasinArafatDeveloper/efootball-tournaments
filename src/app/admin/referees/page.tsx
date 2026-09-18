"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Scale,
  Plus,
  Search,
  Star,
  ShieldCheck,
  Award,
  Edit2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function AdminRefereesPage() {
  const [referees, setReferees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Create Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("TIER_2");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  // Edit/Promote Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRef, setSelectedRef] = useState<any>(null);
  const [editTier, setEditTier] = useState("");
  const [editRating, setEditRating] = useState(4.8);
  const [editFairPlay, setEditFairPlay] = useState(95);

  useEffect(() => {
    async function loadReferees() {
      try {
        const res = await fetch("/api/admin/referees");
        const json = await res.json();
        if (json.success) {
          setReferees(json.data || []);
        }
      } catch (err) {
        console.error("Error loading referees:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReferees();
  }, []);

  const handleCreateReferee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/referees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          tier,
          bio,
          avatar: avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
          rating: 4.5,
          fairPlayScore: 98,
          matchesOfficiated: 0,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setReferees([...referees, json.data]);
        setCreateModalOpen(false);
        setName("");
        setBio("");
      }
    } catch (err) {
      console.error("Failed to create referee:", err);
    }
  };

  const handleUpdateReferee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRef) return;

    try {
      const res = await fetch("/api/admin/referees", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedRef.id,
          tier: editTier,
          rating: Number(editRating),
          fairPlayScore: Number(editFairPlay),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setReferees(referees.map((r) => (r.id === selectedRef.id ? json.data : r)));
        setEditModalOpen(false);
        setSelectedRef(null);
      }
    } catch (err) {
      console.error("Failed to update referee:", err);
    }
  };

  const filteredReferees = referees.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.tier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
            <Scale className="w-6 h-6 text-slate-900" />
            <span>Match Officials & Accreditations</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Certify official eFCOB arbiters, manage tier rankings (Tier 1-3), Fair Play scores, and match assignments.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Accredit New Official</span>
        </button>
      </div>

      {/* Tier Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Tier 1: Senior Elite</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {referees.filter((r) => r.tier === "TIER_1").length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">National finals & live broadcast certified</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Tier 2: National Official</span>
            <ShieldCheck className="w-4 h-4 text-slate-900" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {referees.filter((r) => r.tier === "TIER_2").length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Division 1 & championship group stages</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">Tier 3: Academy Arbiter</span>
            <Scale className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {referees.filter((r) => r.tier === "TIER_3").length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Open qualifiers & community cups</div>
        </div>
      </div>

      {/* Search and Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">Registered Officials ({filteredReferees.length})</h2>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search officials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading officials directory...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReferees.map((ref) => (
              <div
                key={ref.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-black hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                      <Image
                        src={ref.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"}
                        alt={ref.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{ref.name}</div>
                      <div className="text-xs text-slate-500">{ref.bio || "eFCOB Official"}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        ref.tier === "TIER_1"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : ref.tier === "TIER_2"
                          ? "bg-slate-100 text-slate-900 border border-slate-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200"
                      }`}>
                        {ref.tier.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500">Matches</div>
                    <div className="font-bold text-slate-900 mt-0.5">{ref.matchesOfficiated}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Rating</div>
                    <div className="font-bold text-amber-700 mt-0.5 flex items-center justify-center space-x-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{ref.rating}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Fair Play</div>
                    <div className="font-bold text-emerald-700 mt-0.5">{ref.fairPlayScore}%</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedRef(ref);
                      setEditTier(ref.tier);
                      setEditRating(ref.rating);
                      setEditFairPlay(ref.fairPlayScore);
                      setEditModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Manage Tier & Rating</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accredit Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-900">Accredit Match Official</h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReferee} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Official Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Tanzid Hasan Joy"
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Accreditation Tier</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                >
                  <option value="TIER_1">Tier 1 — Senior Elite Arbiter</option>
                  <option value="TIER_2">Tier 2 — National Official</option>
                  <option value="TIER_3">Tier 3 — Academy Arbiter</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Bio / Credentials</label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. 5+ Years competitive tournament presiding"
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm"
                >
                  Confirm Accreditation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Tier / Rating Modal */}
      {editModalOpen && selectedRef && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-black text-slate-900">Update Official Credentials</h3>
                <p className="text-xs text-slate-500">{selectedRef.name}</p>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateReferee} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Accreditation Tier</label>
                <select
                  value={editTier}
                  onChange={(e) => setEditTier(e.target.value)}
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                >
                  <option value="TIER_1">Tier 1 — Senior Elite Arbiter</option>
                  <option value="TIER_2">Tier 2 — National Official</option>
                  <option value="TIER_3">Tier 3 — Academy Arbiter</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Official Rating (1.0 - 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1.0"
                  max="5.0"
                  value={editRating}
                  onChange={(e) => setEditRating(Number(e.target.value))}
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Fair Play Index Score (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={editFairPlay}
                  onChange={(e) => setEditFairPlay(Number(e.target.value))}
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm"
                >
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
