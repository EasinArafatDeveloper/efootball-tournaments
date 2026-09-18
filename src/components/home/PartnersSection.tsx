"use client";

import Link from "next/link";
import { homepageData, PartnerItem } from "@/lib/homepageData";

export function PartnersSection() {
  const { partners } = homepageData;

  // Duplicate items to ensure a perfectly seamless loop
  const marqueePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="w-full py-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-1 pb-6">
          <h2 className="text-base sm:text-lg font-bold text-[#111111]">
            Our Partners
          </h2>
          <p className="text-xs text-[#5F6368]">
            Together for a stronger eFootball community
          </p>
        </div>

        {/* Infinite Looping Marquee Track */}
        <div className="relative w-full overflow-hidden">
          {/* Left & Right Smooth Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling Marquee Container */}
          <div className="animate-marquee flex items-center space-x-3 sm:space-x-4 py-1">
            {marqueePartners.map((partner: PartnerItem, idx: number) => (
              <div
                key={idx}
                className="w-[160px] sm:w-[190px] h-[85px] sm:h-[90px] shrink-0 bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] rounded-xl px-4 py-3 flex flex-col items-center justify-center text-center transition-all shadow-sm hover:shadow-md group select-none cursor-pointer"
              >
                <span className="font-black text-xs sm:text-sm tracking-wider text-[#111111] group-hover:text-[#C79A3B] transition-colors">
                  {partner.logo}
                </span>
                <span className="text-[10px] text-[#5F6368] font-medium mt-1">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
