"use client";

import Link from "next/link";
import { homepageData, PartnerItem } from "@/lib/homepageData";

export function PartnersSection() {
  const { partners } = homepageData;

  return (
    <section className="w-full py-6">
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

        {/* Horizontal Logo Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {partners.map((partner: PartnerItem, idx: number) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all shadow-sm hover:shadow-md group min-h-[90px]"
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
    </section>
  );
}
