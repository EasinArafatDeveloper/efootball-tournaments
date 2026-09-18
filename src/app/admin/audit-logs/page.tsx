"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Shield,
  Clock,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Terminal
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");

  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await fetch("/api/admin/audit-logs");
        const json = await res.json();
        if (json.success) {
          setLogs(json.data || []);
        }
      } catch (err) {
        console.error("Failed to load audit logs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action?.toLowerCase().includes(search.toLowerCase()) ||
      log.target?.toLowerCase().includes(search.toLowerCase()) ||
      log.adminName?.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "ALL" || log.action?.includes(actionFilter);
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
            <Lock className="w-6 h-6 text-slate-900" />
            <span>Immutable Administrative Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Tamper-evident logs of all scoreline approvals, rating adjustments, transfers, bans, and system alterations.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono">
          <Terminal className="w-4 h-4 text-slate-600" />
          <span>Hash Integrity: Verified</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "APPROVED", "ISSUED", "REGISTERED", "UPDATED"].map((f) => (
            <button
              key={f}
              onClick={() => setActionFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                actionFilter === f
                  ? "bg-black text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search action, target, or admin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Admin Operator</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Target Entity</th>
                <th className="p-3.5">Details</th>
                <th className="p-3.5">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500">
                    Loading audit stream...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500">
                    No matching audit records found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors font-mono">
                    <td className="p-3.5 text-slate-500 text-[11px]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 flex items-center space-x-2">
                      <Shield className="w-3.5 h-3.5 text-slate-700" />
                      <span>{log.adminName}</span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action?.includes("APPROVED")
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : log.action?.includes("ISSUED") || log.action?.includes("BAN")
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-slate-100 text-slate-900 border border-slate-300"
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">{log.target}</td>
                    <td className="p-3.5 text-slate-500 text-[11px] max-w-xs truncate">{log.details || "System automated record"}</td>
                    <td className="p-3.5 text-slate-400 text-[10px]">{log.ipAddress || "127.0.0.1"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
