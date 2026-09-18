"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Search, Plus, ShieldAlert, CheckCircle2, Download, Edit2, Ban } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  useEffect(() => {
    async function loadPlayers() {
      try {
        const res = await fetch("/api/players");
        const json = await res.json();
        if (json.success) setPlayers(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPlayers();
  }, []);

  const handleToggleStatus = (p: any) => {
    const newStatus = p.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    setPlayers(
      players.map((item) => (item.id === p.id ? { ...item, status: newStatus } : item))
    );
    setActionSuccess(`Updated ${p.fullName} status to ${newStatus}`);
    setTimeout(() => setActionSuccess(""), 3000);
  };

  const handleExportCSV = () => {
    const header = "ID,Full Name,Username,Konami UID,Device,Position,Rating,Market Value,Status\n";
    const rows = players
      .map(
        (p) =>
          `"${p.id}","${p.fullName}","${p.username}","${p.konamiId}","${p.deviceModel}","${p.preferredPosition}",${p.rating},${p.marketValue},"${p.status}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `efcob_athletes_export_${Date.now()}.csv`;
    a.click();
  };

  const filtered = players.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      return p.fullName.toLowerCase().includes(q) || p.username.toLowerCase().includes(q) || p.konamiId.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Athlete Database Administration</h1>
          <p className="text-xs text-slate-600 mt-1">Manage verified players, review Konami UIDs, issue status updates, and export rosters.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-900 flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search athlete by name, UID, username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black shadow-sm"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-slate-600 font-bold animate-pulse">Loading athlete rosters...</div>
      ) : (
        <div className="overflow-x-auto rounded-3xl bg-white border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-4 px-5">Athlete</th>
                <th className="py-4 px-5">Konami UID</th>
                <th className="py-4 px-5">Club</th>
                <th className="py-4 px-5 text-center">Elo Rating</th>
                <th className="py-4 px-5 text-center">Market Value</th>
                <th className="py-4 px-5 text-center">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <img src={p.avatar} alt="" className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-950">{p.fullName}</div>
                        <div className="text-[10px] text-slate-500">@{p.username} • {p.preferredPosition}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-900 font-bold">{p.konamiId}</td>
                  <td className="py-4 px-5 text-slate-600">{p.club?.name || "Free Agent"}</td>
                  <td className="py-4 px-5 text-center font-mono font-bold text-slate-950">{p.rating}</td>
                  <td className="py-4 px-5 text-center font-mono text-emerald-700 font-bold">{formatCurrency(p.marketValue)}</td>
                  <td className="py-4 px-5 text-center">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      p.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(p)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        p.status === "ACTIVE" ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200" : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {p.status === "ACTIVE" ? "Suspend" : "Activate"}
                    </button>
                    <Link
                      href={`/players/${p.username}`}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-900 hover:bg-black hover:text-white inline-block border border-slate-200 transition-colors"
                    >
                      Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
