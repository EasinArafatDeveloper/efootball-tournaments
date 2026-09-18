import Link from "next/link";
import { Calendar, MapPin, Users, Ticket, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { formatDate, formatTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = db.getEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
          <Calendar className="w-4 h-4 text-black" />
          <span>Esports Arenas & Meetups</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Official LAN <span className="text-slate-500">Stages & Events</span>
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-xl">
          Grand Finals arena stages, divisional community meetups, and open 1v1 gauntlets across Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-black p-6 flex flex-col justify-between space-y-5 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
                <img src={ev.banner} alt={ev.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/90 text-white text-xs font-bold shadow-sm">
                  {ev.capacity} Capacity Seats
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-950 group-hover:text-black transition-colors">
                  {ev.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{ev.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{formatDate(ev.eventDate)} at {formatTime(ev.eventDate)}</span>
                </div>
                <div className="text-emerald-700 font-bold text-xs pt-1">
                  ✓ {ev.registeredCount} / {ev.capacity} Attendees Registered
                </div>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-black text-white font-black text-xs hover:bg-zinc-800 shadow-sm transition-all">
              RSVP & Reserve Free Spectator Pass
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
