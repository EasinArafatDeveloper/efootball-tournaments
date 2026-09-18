"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRightLeft,
  Plus,
  Search,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminTransfersPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [isWindowOpen, setIsWindowOpen] = useState(true);

  // Listing modal
  const [listModalOpen, setListModalOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [askingPrice, setAskingPrice] = useState("85.0");

  // Approval modal
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [activeListing, setActiveListing] = useState<any>(null);
  const [buyerClubId, setBuyerClubId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [transRes, pRes] = await Promise.all([
          fetch("/api/admin/transfers"),
          fetch("/api/players"),
        ]);
        const [transJson, pJson] = await Promise.all([transRes.json(), pRes.json()]);
        if (transJson.success) {
          setListings(transJson.data.listings || []);
          setHistory(transJson.data.history || []);
          setClubs(transJson.data.clubs || []);
        }
        if (pJson.success) {
          setPlayers(pJson.data || []);
        }
      } catch (err) {
        console.error("Error fetching transfer data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlayerId || !askingPrice) return;

    try {
      const res = await fetch("/api/admin/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "LIST",
          playerId: selectedPlayerId,
          askingPrice,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setListings([json.data, ...listings]);
        setListModalOpen(false);
        setSelectedPlayerId("");
      }
    } catch (err) {
      console.error("Failed to list player:", err);
    }
  };

  const handleApproveTransfer = async () => {
    if (!activeListing || !buyerClubId) return;
    setProcessing(true);

    try {
      const res = await fetch("/api/admin/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "APPROVE",
          listingId: activeListing.id,
          buyerClubId,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setHistory([json.data, ...history]);
        setListings(listings.filter((l) => l.id !== activeListing.id));
        setApproveModalOpen(false);
        setActiveListing(null);
        setBuyerClubId("");
      }
    } catch (err) {
      console.error("Failed to approve transfer:", err);
    } finally {
      setProcessing(false);
    }
  };

  const filteredListings = listings.filter((l) =>
    l.player?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    l.player?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-950 flex items-center space-x-2">
            <span>Transfer Market Operations Desk</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
              isWindowOpen ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}>
              {isWindowOpen ? "Window Open" : "Window Closed"}
            </span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Oversee player market listings, approve club buyouts, contract transfers, and official market valuations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsWindowOpen(!isWindowOpen)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              isWindowOpen
                ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            {isWindowOpen ? "Close Market Window" : "Open Market Window"}
          </button>
          <button
            onClick={() => setListModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>List Athlete</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Active Listings</div>
          <div className="text-2xl font-black text-slate-950 mt-1">{listings.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Players on trade list</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[10px] font-mono text-emerald-700 uppercase font-bold">Total Completed Deals</div>
          <div className="text-2xl font-black text-slate-950 mt-1">{history.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Approved transfers in 2026</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[10px] font-mono text-amber-700 uppercase font-bold">Total Market Volume</div>
          <div className="text-2xl font-black text-slate-950 mt-1">
            ${history.reduce((acc, h) => acc + (Number(h.fee) || 0), 0) + listings.reduce((acc, l) => acc + (Number(l.askingPrice) || 0), 0)}M
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Circulating valuation</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[10px] font-mono text-purple-700 uppercase font-bold">Buyer Clubs Active</div>
          <div className="text-2xl font-black text-slate-950 mt-1">{clubs.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Registered franchises</div>
        </div>
      </div>

      {/* Active Listings Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-950 flex items-center space-x-2">
            <ArrowRightLeft className="w-5 h-5 text-black" />
            <span>Active Transfer Listings ({filteredListings.length})</span>
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search listed athletes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-black shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading transfer market data...</div>
        ) : filteredListings.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-sm">
            No active transfer listings found. Click &quot;List Athlete&quot; above to place a player on the market.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-black shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative flex-shrink-0">
                      <Image
                        src={item.player?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                        alt={item.player?.fullName || "Player"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-950">{item.player?.fullName || "Unknown Athlete"}</div>
                      <div className="text-xs text-slate-500">@{item.player?.username}</div>
                      <div className="text-[10px] text-slate-800 font-mono font-bold mt-0.5">
                        {item.player?.club?.name || "Free Agent"}
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500">Rating</div>
                    <div className="font-bold text-slate-950 font-mono">{item.player?.rating || 750}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Asking Price</div>
                    <div className="font-bold text-emerald-700 font-mono">${item.askingPrice}M</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    UID: {item.player?.konamiId || "N/A"}
                  </span>
                  <button
                    onClick={() => {
                      setActiveListing(item);
                      setApproveModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition-colors shadow-sm flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Transfer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Transfer History Ledger */}
      <div className="space-y-4 pt-6">
        <h2 className="text-lg font-bold text-slate-950 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-black" />
          <span>Official Transfer Registry & Ledger ({history.length})</span>
        </h2>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Athlete</th>
                  <th className="p-3.5">From Club</th>
                  <th className="p-3.5">To Club</th>
                  <th className="p-3.5">Transfer Fee</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      No recorded transfers yet.
                    </td>
                  </tr>
                ) : (
                  history.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-950">{record.playerName}</td>
                      <td className="p-3.5 text-slate-600">{record.previousClubName}</td>
                      <td className="p-3.5 font-bold text-slate-950">{record.newClubName}</td>
                      <td className="p-3.5 font-bold text-emerald-700 font-mono">${record.fee}M</td>
                      <td className="p-3.5 text-slate-500 font-mono">{new Date(record.transferDate).toLocaleDateString()}</td>
                      <td className="p-3.5 text-slate-900 font-mono text-[11px] font-semibold">{record.approvedBy}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* List Player Modal */}
      {listModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-950">Place Athlete on Transfer Market</h3>
              <button
                onClick={() => setListModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Select Athlete</label>
                <select
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(e.target.value)}
                  required
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                >
                  <option value="">-- Choose Athlete --</option>
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} (@{p.username}) - {p.club?.name || "Free Agent"} - Rating: {p.rating}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Asking Price ($ Millions)</label>
                <input
                  type="number"
                  step="0.5"
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(e.target.value)}
                  required
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
                  placeholder="e.g. 75.0"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setListModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Execution & Approval Modal */}
      {approveModalOpen && activeListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-950">Execute Player Transfer</h3>
                <p className="text-xs text-slate-500">Transfer rights approval and roster migration</p>
              </div>
              <button
                onClick={() => setApproveModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs text-slate-500">Athlete:</div>
              <div className="text-sm font-black text-slate-950">{activeListing.player?.fullName}</div>
              <div className="text-xs text-slate-500">Current Club: <span className="text-slate-900 font-semibold">{activeListing.player?.club?.name || "Free Agent"}</span></div>
              <div className="text-xs text-slate-500">Agreed Fee: <span className="text-emerald-700 font-bold">${activeListing.askingPrice}M</span></div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Assign To Buyer Club</label>
              <select
                value={buyerClubId}
                onChange={(e) => setBuyerClubId(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white"
              >
                <option value="">-- Choose Purchasing Club --</option>
                {clubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setApproveModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApproveTransfer}
                disabled={processing || !buyerClubId}
                className="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 disabled:opacity-50 text-white font-bold text-xs shadow-sm"
              >
                {processing ? "Processing..." : "Authorize & Sign Transfer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
