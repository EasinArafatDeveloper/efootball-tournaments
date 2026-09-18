"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Home as HomeIcon,
  User,
  Shield,
  Trophy,
  Swords,
  Flame,
  Scale,
  Newspaper,
  Calendar,
  LogOut,
  LayoutDashboard,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Info as InfoIcon,
  Handshake,
} from "lucide-react";
import { CommandSearch } from "./CommandSearch";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Players", href: "/players" },
    { label: "Clubs", href: "/clubs" },
    { label: "Matches", href: "/matches" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Rankings", href: "/rankings" },
    { label: "Transfer Market", href: "/transfer-market" },
    { label: "News", href: "/news" },
  ];

  const drawerAllLinks = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Players", href: "/players", icon: User },
    { label: "Clubs", href: "/clubs", icon: Shield },
    { label: "Matches", href: "/matches", icon: Swords },
    { label: "Tournaments", href: "/tournaments", icon: Trophy },
    { label: "Rankings", href: "/rankings", icon: Flame },
    { label: "Transfer Market", href: "/transfer-market", icon: Sparkles },
    { label: "News", href: "/news", icon: Newspaper },
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Referees", href: "/referees", icon: Scale },
    { label: "Partners", href: "/partners", icon: Handshake },
    { label: "About", href: "/about", icon: InfoIcon },
  ];

  const moreLinks = [
    { label: "LAN & Online Events", href: "/events" },
    { label: "Match Officials", href: "/referees" },
    { label: "Disciplinary Tribunal", href: "/disciplinary" },
    { label: "Official Rulebook", href: "/rules" },
    { label: "Activity Feed", href: "/activity" },
    { label: "Partners & Sponsors", href: "/partners" },
    { label: "About NEXA / eFCOB", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenDrawerEvent = () => setMobileDrawerOpen(true);
    window.addEventListener("open-mobile-menu", handleOpenDrawerEvent);
    return () => window.removeEventListener("open-mobile-menu", handleOpenDrawerEvent);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // Check local session
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const json = await res.json();
        if (json.success && json.data) {
          setUser(json.data);
        }
      } catch (err) {
        // Not logged in
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E5E7EB] transition-all duration-200 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* LEFT: Logo & Brand Identity */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0 min-h-[44px] min-w-[44px]">
            <div className="w-9 h-9 rounded-lg bg-[#111111] flex items-center justify-center shadow-sm group-hover:bg-zinc-800 transition-colors">
              <span className="font-black text-white text-base tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-tight text-[#111111] flex items-center leading-none">
                NEXA<span className="text-[#C79A3B] ml-0.5">.</span>
                <span className="ml-1 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                  FOOTBALL
                </span>
              </span>
              <span className="text-[9px] text-[#5F6368] font-medium tracking-wider uppercase hidden xs:block">
                eFootball Community
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Navigation (Hidden below xl) */}
          <nav className="hidden xl:flex items-center space-x-1 h-full">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 h-full flex items-center text-[13px] font-medium tracking-tight transition-colors ${
                    active
                      ? "text-[#111111] font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#111111]"
                      : "text-[#5F6368] hover:text-[#111111]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                className="flex items-center px-3 text-[13px] font-medium text-[#5F6368] hover:text-[#111111] transition-colors"
                aria-label="More navigation links"
              >
                More <ChevronDown className="w-3.5 h-3.5 ml-1 text-[#5F6368]" />
              </button>
              {moreDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-white border border-[#E5E7EB] shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-xs font-medium text-[#111111] hover:bg-[#F7F8FA]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT: Action Icons & Auth */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Search Icon Button (min 44x44 touch target) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-lg text-[#5F6368] hover:text-[#111111] hover:bg-[#F7F8FA] transition-colors min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px]"
              title="Search (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Desktop Settings Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-[#5F6368] hover:text-[#111111] hover:bg-[#F7F8FA] transition-colors"
              title="Settings"
              aria-label="Settings"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Desktop Auth or Profile Dropdown */}
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#111111] transition-all bg-white min-h-[44px]"
                >
                  <div className="w-7 h-7 rounded bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                    {user.fullName?.charAt(0) || "U"}
                  </div>
                  <span className="text-xs font-semibold text-[#111111] max-w-[100px] truncate">
                    {user.username}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#5F6368]" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-[#E5E7EB] shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-[#E5E7EB]">
                      <div className="text-xs font-bold text-[#111111] truncate">{user.fullName}</div>
                      <div className="text-[10px] text-[#5F6368] uppercase font-mono">{user.role}</div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-xs font-medium text-[#111111] hover:bg-[#F7F8FA]"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 mr-2" /> Athlete Dashboard
                    </Link>
                    {user.clubId && (
                      <Link
                        href="/dashboard/my-club"
                        className="flex items-center px-4 py-2 text-xs font-medium text-[#111111] hover:bg-[#F7F8FA]"
                      >
                        <Shield className="w-3.5 h-3.5 mr-2" /> My Club Management
                      </Link>
                    )}
                    {user.role === "SUPER_ADMIN" || user.role === "ADMIN" ? (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-xs text-amber-800 hover:bg-amber-50 font-semibold"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 mr-2 text-amber-600" /> Admin Command Center
                      </Link>
                    ) : null}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] hover:bg-[#F7F8FA] transition-colors min-h-[40px] flex items-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#111111] text-white hover:bg-zinc-800 shadow-sm transition-all min-h-[40px] flex items-center"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Drawer Hamburger Button (min 44x44px touch target) */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="xl:hidden flex items-center justify-center w-11 h-11 rounded-lg text-[#111111] hover:bg-[#F7F8FA] border border-[#E5E7EB] min-h-[44px] min-w-[44px]"
              aria-label="Open navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            {/* Translucent Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-in Drawer from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, duration: 0.35 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto safe-bottom-padding"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
                  <Link
                    href="/"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center space-x-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center text-white font-black text-sm">
                      N
                    </div>
                    <span className="font-black text-sm text-[#111111] tracking-tight">
                      NEXA<span className="text-[#C79A3B]">.</span>FOOTBALL
                    </span>
                  </Link>

                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center justify-center w-11 h-11 rounded-lg text-[#5F6368] hover:text-[#111111] hover:bg-[#F7F8FA] min-h-[44px] min-w-[44px]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Search Bar inside Drawer */}
                <div className="p-4 border-b border-[#E5E7EB]">
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      setSearchOpen(true);
                    }}
                    className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] text-[#5F6368] text-xs font-medium text-left min-h-[44px]"
                  >
                    <Search className="w-4 h-4 text-[#5F6368]" />
                    <span>Search athletes, clubs, fixtures...</span>
                  </button>
                </div>

                {/* All Navigation Links */}
                <div className="px-3 py-3 space-y-1">
                  {drawerAllLinks.map((link) => {
                    const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[44px] ${
                          active
                            ? "bg-[#F3F4F6] text-[#111111] font-bold"
                            : "text-[#4B5563] hover:text-[#111111] hover:bg-[#F7F8FA]"
                        }`}
                      >
                        <Icon className={`w-4.5 h-4.5 ${active ? "text-[#111111]" : "text-[#6B7280]"}`} />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Actions & Auth */}
              <div className="p-5 border-t border-[#E5E7EB] space-y-3 bg-white">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2.5 pb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                        {user.fullName?.charAt(0) || "U"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#111111] truncate">{user.fullName}</div>
                        <div className="text-[10px] text-[#5F6368] uppercase">{user.role}</div>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="block w-full py-2.5 text-center text-xs font-bold bg-[#111111] text-white rounded-xl min-h-[44px] flex items-center justify-center"
                    >
                      Athlete Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full py-2 text-center text-xs font-semibold text-rose-600 hover:underline min-h-[44px] flex items-center justify-center"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <Link
                      href="/login"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="block w-full py-2.5 text-center text-xs font-bold text-[#111111] border border-[#E5E7EB] bg-white rounded-xl hover:bg-[#F7F8FA] min-h-[44px] flex items-center justify-center transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="block w-full py-2.5 text-center text-xs font-bold bg-[#111111] text-white rounded-xl hover:bg-zinc-800 shadow-sm min-h-[44px] flex items-center justify-center transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Follow Us social links */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-[#6B7280] mb-2">
                    Follow Us
                  </div>
                  <div className="flex items-center space-x-4 text-[#111111]">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C79A3B] transition-colors p-1" aria-label="Facebook">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C79A3B] transition-colors p-1" aria-label="X">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C79A3B] transition-colors p-1" aria-label="YouTube">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C79A3B] transition-colors p-1" aria-label="Instagram">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C79A3B] transition-colors p-1" aria-label="Discord">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Command Search */}
      <CommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
