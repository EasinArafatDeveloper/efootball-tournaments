"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Trophy, Users, MapPin, ArrowRight, DollarSign, Search } from "lucide-react";
import { formatCurrency, getFormColor } from "@/lib/utils";

export default function ClubsPage() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadClubs() {
      try {
        const res = await fetch("/api/clubs");
        const json = await res.json();
        if (json.success) {
          setClubs(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadClubs();
  }, []);

  const filtered = clubs.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">
            <Shield className="w-4 h-4 text-black" />
            <span>National League Roster</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            Registered <span className="text-slate-500">Esports Clubs</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Official eFootball organizations competing across the national premier division with full squad rosters and club achievements.
          </p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search club by name or division city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-black"
        />
      </div>

      {/* Club Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-600 font-bold animate-pulse text-xs">
          Loading club registries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500 text-xs">No clubs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((club) => (
            <div
              key={club.id}
              className="rounded-2xl bg-white border border-slate-200 hover:border-black hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-5 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-black border border-slate-300">
                    {club.shortName}
                  </span>
                  <span className="text-xs font-black text-black font-mono">
                    {club.points} PTS
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 p-0.5 shadow-sm"
                  />
                  <div>
                    <Link
                      href={`/clubs/${club.slug}`}
                      className="text-base font-bold text-black group-hover:underline transition-colors"
                    >
                      {club.name}
                    </Link>
                    <div className="flex items-center text-xs text-slate-500 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-black mr-1" />
                      <span>{club.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-2">
                  {club.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Squad</div>
                    <div className="font-bold text-black">{club.squadCount} Athletes</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Trophies</div>
                    <div className="font-bold text-amber-700 flex items-center justify-center">
                      <Trophy className="w-3 h-3 mr-1" /> {club.trophiesCount}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Valuation</div>
                    <div className="font-bold text-emerald-700">{formatCurrency(club.marketValue)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 font-medium">Form:</span>
                  <div className="flex items-center space-x-1">
                    {club.form?.map((r: string, fIdx: number) => (
                      <span
                        key={fIdx}
                        className={`w-5 h-5 rounded text-[10px] font-black flex items-center justify-center border ${getFormColor(
                          r
                        )}`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/clubs/${club.slug}`}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-xs font-bold text-slate-800 text-center transition-all flex items-center justify-center space-x-1"
              >
                <span>Club Hub & Squad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
