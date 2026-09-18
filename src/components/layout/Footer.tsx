"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const platformLinks = [
    { label: "Players", href: "/players" },
    { label: "Clubs", href: "/clubs" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Matches", href: "/matches" },
    { label: "Rankings", href: "/rankings" },
    { label: "Transfer Market", href: "/transfer-market" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "Partners", href: "/partners" },
    { label: "Rules", href: "/rules" },
    { label: "Contact", href: "/about" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/rules" },
    { label: "Terms of Service", href: "/rules" },
    { label: "Competition Rules", href: "/rules" },
    { label: "Disciplinary Rules", href: "/disciplinary" },
    { label: "Cookie Policy", href: "/rules" },
  ];

  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#E5E7EB] pt-10 sm:pt-14 pb-8 text-[#111111] safe-bottom-padding">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP LAYOUT (Hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#E5E7EB]">
          {/* Brand Column */}
          <div className="col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center shadow-sm">
                <span className="font-black text-white text-sm">N</span>
              </div>
              <span className="text-base font-black tracking-tight text-[#111111]">
                NEXA<span className="text-[#C79A3B]">.</span>FOOTBALL
              </span>
            </Link>

            <div className="text-xs font-bold text-[#111111] tracking-wide">
              Play. Compete. Belong.
            </div>

            <p className="text-xs text-[#5F6368] leading-relaxed max-w-sm">
              The official home of competitive eFootball. Connecting clubs, athletes, and fans across the national tournament circuit.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F7F8FA] text-[#111111] border border-[#E5E7EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                Season 2025 Live Circuit
              </span>
            </div>
          </div>

          {/* Platform Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              {platformLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#111111] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#111111] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Follow Us Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#111111] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <h5 className="text-[11px] font-bold text-[#111111] uppercase tracking-wider mb-2">
                Follow Us
              </h5>
              <div className="flex flex-wrap gap-2 text-xs text-[#5F6368]">
                <a href="#" className="hover:text-[#111111] transition-colors">Facebook</a>
                <span>•</span>
                <a href="#" className="hover:text-[#111111] transition-colors">Discord</a>
                <span>•</span>
                <a href="#" className="hover:text-[#111111] transition-colors">YouTube</a>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT: Accordion System with Framer Motion (Visible on mobile only) */}
        <div className="md:hidden space-y-5 pb-6 border-b border-[#E5E7EB]">
          {/* Brand Info */}
          <div className="space-y-2.5">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center shadow-sm">
                <span className="font-black text-white text-sm">N</span>
              </div>
              <span className="text-base font-black tracking-tight text-[#111111]">
                NEXA<span className="text-[#C79A3B]">.</span>FOOTBALL
              </span>
            </Link>
            <div className="text-xs font-bold text-[#111111]">
              Play. Compete. Belong.
            </div>
            <p className="text-xs text-[#5F6368] leading-relaxed">
              The official home of competitive eFootball. Connecting clubs, athletes, and fans across the national tournament circuit.
            </p>
          </div>

          {/* Collapsible Section: Platform */}
          <div className="border-t border-[#E5E7EB] pt-3">
            <button
              onClick={() => toggleSection("platform")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-[#111111] min-h-[44px]"
              aria-expanded={openSection === "platform"}
            >
              <span>Platform</span>
              <ChevronDown
                className={`w-4 h-4 text-[#5F6368] transition-transform duration-200 ${
                  openSection === "platform" ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openSection === "platform" && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden space-y-2.5 py-2 pl-1 text-xs text-[#5F6368]"
                >
                  {platformLinks.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="block py-1 hover:text-[#111111] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Collapsible Section: Company */}
          <div className="border-t border-[#E5E7EB] pt-3">
            <button
              onClick={() => toggleSection("company")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-[#111111] min-h-[44px]"
              aria-expanded={openSection === "company"}
            >
              <span>Company</span>
              <ChevronDown
                className={`w-4 h-4 text-[#5F6368] transition-transform duration-200 ${
                  openSection === "company" ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openSection === "company" && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden space-y-2.5 py-2 pl-1 text-xs text-[#5F6368]"
                >
                  {companyLinks.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="block py-1 hover:text-[#111111] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Collapsible Section: Legal */}
          <div className="border-t border-[#E5E7EB] pt-3">
            <button
              onClick={() => toggleSection("legal")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-[#111111] min-h-[44px]"
              aria-expanded={openSection === "legal"}
            >
              <span>Legal</span>
              <ChevronDown
                className={`w-4 h-4 text-[#5F6368] transition-transform duration-200 ${
                  openSection === "legal" ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openSection === "legal" && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden space-y-2.5 py-2 pl-1 text-xs text-[#5F6368]"
                >
                  {legalLinks.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="block py-1 hover:text-[#111111] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Follow Us on Mobile */}
          <div className="border-t border-[#E5E7EB] pt-4">
            <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wider mb-2">
              Follow Us
            </div>
            <div className="flex items-center space-x-3 text-xs text-[#5F6368]">
              <a href="#" className="hover:text-[#111111] p-1">Facebook</a>
              <span>•</span>
              <a href="#" className="hover:text-[#111111] p-1">Discord</a>
              <span>•</span>
              <a href="#" className="hover:text-[#111111] p-1">YouTube</a>
            </div>
          </div>
        </div>

        {/* BOTTOM: Copyright & Slogan */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5F6368] gap-3">
          <div>
            © 2025 NEXA Football. All rights reserved.
          </div>
          <div className="font-semibold text-[#111111]">
            More Than A Game. A Community.
          </div>
        </div>
      </div>
    </footer>
  );
}

