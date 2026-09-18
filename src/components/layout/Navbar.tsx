"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  SlidersHorizontal,
  ChevronDown,
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
} from "lucide-react";
import { CommandSearch } from "./CommandSearch";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#111111] flex items-center justify-center shadow-sm group-hover:bg-zinc-800 transition-colors">
              <span className="font-black text-white text-base tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-[#111111] flex items-center leading-none">
                NEXA<span className="text-[#C79A3B] ml-0.5">.</span>
                <span className="ml-1 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                  FOOTBALL
                </span>
              </span>
              <span className="text-[9px] text-[#5F6368] font-medium tracking-wider uppercase">
                eFootball Community
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Navigation */}
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
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-[#5F6368] hover:text-[#111111] hover:bg-[#F7F8FA] transition-colors"
              title="Search (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Settings/Theme Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-[#5F6368] hover:text-[#111111] hover:bg-[#F7F8FA] transition-colors"
              title="Settings"
              aria-label="Settings"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* User Profile or Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#111111] transition-all bg-white"
                >
                  <div className="w-7 h-7 rounded bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                    {user.fullName?.charAt(0) || "U"}
                  </div>
                  <span className="text-xs font-semibold text-[#111111] hidden md:inline max-w-[100px] truncate">
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
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] hover:bg-[#F7F8FA] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#111111] text-white hover:bg-zinc-800 shadow-sm transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#111111] hover:bg-[#F7F8FA] border border-[#E5E7EB]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#E5E7EB] px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top duration-200">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-lg text-sm font-semibold ${
                    active
                      ? "text-[#111111] bg-[#F7F8FA] border-l-4 border-[#111111]"
                      : "text-[#5F6368] hover:text-[#111111] hover:bg-[#F7F8FA]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#E5E7EB] space-y-1">
              <div className="px-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">More Portals</div>
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2 rounded-lg text-xs font-medium text-[#5F6368] hover:text-[#111111] hover:bg-[#F7F8FA]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Global Command Search */}
      <CommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

