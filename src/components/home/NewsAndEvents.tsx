"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Swords, Users, Shield } from "lucide-react";
import { homepageData, NewsItem, EventItem } from "@/lib/homepageData";

export function NewsAndEvents() {
  const { news, events } = homepageData;

  const renderEventBadge = (badgeType?: string) => {
    switch (badgeType) {
      case "gold":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#2A1D06] border border-[#F59E0B]/30 flex items-center justify-center text-[#FBBF24] shrink-0 shadow-inner">
            <Trophy className="w-4.5 h-4.5" />
          </div>
        );
      case "purple":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#220B2E] border border-[#A855F7]/30 flex items-center justify-center text-[#C084FC] shrink-0 shadow-inner">
            <Swords className="w-4.5 h-4.5" />
          </div>
        );
      case "blue":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#0B1E38] border border-[#3B82F6]/30 flex items-center justify-center text-[#60A5FA] shrink-0 shadow-inner">
            <Users className="w-4.5 h-4.5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center text-white shrink-0">
            <Shield className="w-4.5 h-4.5" />
          </div>
        );
    }
  };

  return (
    <section className="w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Latest News (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                Latest News
              </h2>
              <Link
                href="/news"
                className="inline-flex items-center space-x-1 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3 News Cards in 1 row on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 flex-1 items-stretch">
              {news.map((item: NewsItem) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group bg-white border border-[#E5E7EB] hover:border-[#111111] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md h-full"
                >
                  {/* News Image */}
                  <div className="relative aspect-[16/10] w-full bg-[#F7F8FA] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* News Content */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-xs sm:text-sm font-black text-[#111111] leading-snug line-clamp-2 group-hover:text-black transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-[11px] text-[#6B7280] font-medium pt-3 mt-auto">
                      {item.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Upcoming Events (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                Upcoming Events
              </h2>
              <Link
                href="/events"
                className="inline-flex items-center space-x-1 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors shrink-0"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Upcoming Events Box - Matches Height with News Cards */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-sm divide-y divide-[#F1F3F5] flex-1 flex flex-col justify-between">
              {events.map((ev: EventItem) => (
                <div key={ev.id} className="py-3 sm:py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0">
                    {renderEventBadge(ev.badgeType)}
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-[#111111] truncate leading-tight">
                        {ev.title}
                      </div>
                      <div className="text-[11px] text-[#6B7280] font-medium leading-tight mt-1">
                        {ev.date}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={ev.actionText === "Register" ? "/register" : `/events`}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] border border-[#E5E7EB] transition-colors shrink-0"
                  >
                    {ev.actionText || "Details"}
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
