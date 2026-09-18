"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Plus,
  Search,
  ShieldAlert,
  UserX,
  Clock,
  CheckCircle,
  FileWarning,
  Flame
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminDisciplinaryPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [targetType, setTargetType] = useState("PLAYER");
  const [targetId, setTargetId] = useState("");
  const [penalty, setPenalty] = useState("SUSPENSION_1W");
  const [reason, setReason] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [discRes, pRes, cRes] = await Promise.all([
          fetch("/api/admin/disciplinary"),
          fetch("/api/players"),
          fetch("/api/clubs"),
        ]);
        const [discJson, pJson, cJson] = await Promise.all([
          discRes.json(),
          pRes.json(),
          cRes.json(),
        ]);
        if (discJson.success) setRecords(discJson.data || []);
        if (pJson.success) setPlayers(pJson.data || []);
        if (cJson.success) setClubs(cJson.data || []);
      } catch (err) {
        console.error("Failed to load disciplinary records:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleIssuePenalty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetId || !reason) return;

    try {
      const res = await fetch("/api/admin/disciplinary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetId,
          penalty,
          reason,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setRecords([json.data, ...records]);
        setModalOpen(false);
        setReason("");
        setTargetId("");
      }
    } catch (err) {
      console.error("Failed to issue penalty:", err);
    }
  };

  const filteredRecords = records.filter((r) =>
    r.targetName?.toLowerCase().includes(search.toLowerCase()) ||
    r.reason?.toLowerCase().includes(search.toLowerCase()) ||
    r.penalty?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            <span>Disciplinary & Code of Conduct Tribunal</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Enforce fair play integrity, issue athlete suspensions, club sanctions, and official tournament bans.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Disciplinary Action</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Active Sanctions</span>
            <Flame className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {records.filter((r) => r.status === "ACTIVE").length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Currently serving penalties</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Official Warnings</span>
            <FileWarning className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {records.filter((r) => r.penalty === "WARNING").length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">First-tier conduct cautions</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Fair Play Integrity</span>
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">99.2%</div>
          <div className="text-[11px] text-slate-500 mt-1">National ecosystem compliance rate</div>
        </div>
      </div>

      {/* Records Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">Tribunal Registry ({filteredRecords.length})</h2>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search rulings & targets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Target</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Infraction / Reason</th>
                  <th className="p-3.5">Penalty Enforced</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Issued By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      Loading tribunal register...
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      No disciplinary records match your search.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 flex items-center space-x-2">
                        <UserX className="w-4 h-4 text-rose-600" />
                        <span>{r.targetName}</span>
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono text-[10px]">{r.targetType}</td>
                      <td className="p-3.5 text-slate-700 max-w-xs truncate">{r.reason}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          {r.penalty.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.status === "ACTIVE"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 font-mono text-[11px]">{r.issuedBy}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-900">Issue Official Sanction</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleIssuePenalty} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Target Type</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetType("PLAYER");
                      setTargetId("");
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      targetType === "PLAYER"
                        ? "bg-black text-white border-black"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Athlete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTargetType("CLUB");
                      setTargetId("");
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      targetType === "CLUB"
                        ? "bg-black text-white border-black"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Club / Franchise
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Select Target</label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  required
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                >
                  <option value="">-- Choose {targetType === "PLAYER" ? "Athlete" : "Club"} --</option>
                  {targetType === "PLAYER"
                    ? players.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.fullName} (@{p.username}) - {p.club?.name || "Free Agent"}
                        </option>
                      ))
                    : clubs.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.shortName})
                        </option>
                      ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Sanction Tier</label>
                <select
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                >
                  <option value="WARNING">Official Code of Conduct Warning</option>
                  <option value="SUSPENSION_1W">1-Week Tournament Suspension</option>
                  <option value="SUSPENSION_1M">1-Month Tournament Suspension</option>
                  <option value="SEASON_BAN">Current Season Ban</option>
                  <option value="PERMANENT_BAN">Permanent eFCOB Ban</option>
                  <option value="FINE">Financial Disciplinary Fine</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Detailed Infraction Reason</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  placeholder="State evidence, match timestamp, and violated rule article..."
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm"
                >
                  Publish Sanction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
