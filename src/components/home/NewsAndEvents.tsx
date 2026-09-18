"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Newspaper, Clock } from "lucide-react";
import { homepageData, NewsItem, EventItem } from "@/lib/homepageData";

export function NewsAndEvents() {
  const { news, events } = homepageData;

  return (
    <section className="w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Latest News (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-4 h-4 text-[#111111]" />
                <h2 className="text-base sm:text-lg font-bold text-[#111111]">
                  Latest News
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
              >
                <span>View All News</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3 News Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {news.map((item: NewsItem) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] rounded-xl overflow-hidden flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
                >
                  <div className="relative h-32 w-full bg-[#F7F8FA]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#111111] text-white">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-xs font-bold text-[#111111] leading-snug line-clamp-2 group-hover:text-[#C79A3B] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-[#5F6368] pt-1">
                      <span>{item.date}</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Upcoming Events (5 Cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#111111]" />
                <h2 className="text-base sm:text-lg font-bold text-[#111111]">
                  Upcoming Events
                </h2>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#111111] hover:text-[#C79A3B] transition-colors"
              >
                <span>View All Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Event Rows */}
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-4 divide-y divide-[#F7F8FA] shadow-sm space-y-2">
              {events.map((ev: EventItem) => (
                <div key={ev.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#111111] truncate">{ev.title}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#F7F8FA] text-[#5F6368] border border-[#E5E7EB]">
                        {ev.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-[11px] text-[#5F6368]">
                      <span>{ev.date}</span>
                      <span>•</span>
                      <span className="truncate">{ev.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <Link
                      href="/events"
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F7F8FA] hover:bg-[#E5E7EB] text-[#111111] border border-[#E5E7EB] transition-colors"
                    >
                      Details
                    </Link>
                    <Link
                      href="/register"
                      className="px-3 py-1 rounded-md text-[11px] font-bold bg-[#111111] hover:bg-zinc-800 text-white transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
