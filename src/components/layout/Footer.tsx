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

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "https://discord.com",
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-white border-t border-[#E5E7EB] pt-12 pb-10 text-[#111111] safe-bottom-padding">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP 5-COLUMN LAYOUT (Hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* Column 1: Brand Info (takes 4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-[#111111] flex items-center justify-center text-white shadow-sm group-hover:bg-zinc-800 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M4 4h4.5l7 10.5V4H20v16h-4.5l-7-10.5V20H4V4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-[#111111] leading-none">NEXA</span>
                <span className="text-sm font-black tracking-wider text-[#111111] leading-none mt-0.5">FOOTBALL</span>
              </div>
            </Link>

            <div className="pt-1">
              <div className="text-sm font-black text-[#111111]">
                Play. Compete. Belong.
              </div>
              <p className="text-xs text-[#5F6368] font-normal mt-1">
                The official home of competitive eFootball.
              </p>
            </div>
          </div>

          {/* Column 2: Platform (takes 2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#111111]">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              {platformLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#111111] transition-colors block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (takes 2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#111111]">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#111111] transition-colors block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal (takes 2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#111111]">
              Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#111111] transition-colors block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Follow Us (takes 2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#111111]">
              Follow Us
            </h4>
            <div className="flex items-center space-x-3.5 text-[#111111] pt-0.5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-[#111111] hover:text-[#C79A3B] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* MOBILE LAYOUT: Accordion System (Visible on mobile only) */}
        <div className="md:hidden space-y-4 pb-6">
          {/* Brand Info */}
          <div className="space-y-2.5">
            <Link href="/" className="inline-flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4 4h4.5l7 10.5V4H20v16h-4.5l-7-10.5V20H4V4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-wider text-[#111111] leading-none">NEXA</span>
                <span className="text-xs font-black tracking-wider text-[#111111] leading-none mt-0.5">FOOTBALL</span>
              </div>
            </Link>
            <div className="text-xs font-bold text-[#111111]">
              Play. Compete. Belong.
            </div>
            <p className="text-xs text-[#5F6368]">
              The official home of competitive eFootball.
            </p>
          </div>

          {/* Collapsible Section: Platform */}
          <div className="border-t border-[#E5E7EB] pt-2.5">
            <button
              onClick={() => toggleSection("platform")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-[#111111] min-h-[44px]"
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
                  className="overflow-hidden space-y-2 py-2 pl-1 text-xs text-[#5F6368]"
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
          <div className="border-t border-[#E5E7EB] pt-2.5">
            <button
              onClick={() => toggleSection("company")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-[#111111] min-h-[44px]"
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
                  className="overflow-hidden space-y-2 py-2 pl-1 text-xs text-[#5F6368]"
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
          <div className="border-t border-[#E5E7EB] pt-2.5">
            <button
              onClick={() => toggleSection("legal")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-[#111111] min-h-[44px]"
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
                  className="overflow-hidden space-y-2 py-2 pl-1 text-xs text-[#5F6368]"
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
            <div className="text-xs font-bold text-[#111111] mb-2.5">
              Follow Us
            </div>
            <div className="flex items-center space-x-4 text-[#111111]">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-[#111111] hover:text-[#C79A3B] transition-colors p-1"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: Copyright & Slogan */}
        <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between text-xs text-[#5F6368] gap-2.5">
          <div>
            © 2025 Nexa Football. All rights reserved.
          </div>
          <div className="font-semibold text-[#111111]">
            More Than A Game. A Community.
          </div>
        </div>

      </div>
    </footer>
  );
}
