"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  Users,
  Shield,
  Swords,
  Trophy,
  ArrowRightLeft,
  Scale,
  AlertTriangle,
  FileText,
  Settings,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Live Match Ops Desk", href: "/admin/live", icon: Radio },
  { label: "Athletes & Players", href: "/admin/players", icon: Users },
  { label: "Clubs & Squads", href: "/admin/clubs", icon: Shield },
  { label: "Fixtures & Results", href: "/admin/fixtures", icon: Swords },
  { label: "Tournaments & Brackets", href: "/admin/tournaments", icon: Trophy },
  { label: "Transfer Market Hub", href: "/admin/transfers", icon: ArrowRightLeft },
  { label: "Match Officials & Tiers", href: "/admin/referees", icon: Scale },
  { label: "Disciplinary & Bans", href: "/admin/disciplinary", icon: AlertTriangle },
  { label: "Immutable Audit Logs", href: "/admin/audit-logs", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col md:flex-row">
      
      {/* Admin Sidebar / Mobile Header */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 md:p-5 space-y-4 md:space-y-6 flex-shrink-0">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-black p-0.5 shadow-sm flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs md:text-sm font-black text-slate-950">NEXA Admin</div>
              <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">Command Center</div>
            </div>
          </div>

          {/* Exit back to public platform */}
          <Link
            href="/"
            className="md:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-black bg-slate-100 border border-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit</span>
          </Link>
        </div>

        {/* Navigation Items: Horizontal scroll on mobile, Vertical on md+ */}
        <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-x-visible no-scrollbar pb-1 md:pb-0">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 md:shrink ${
                  active
                    ? "bg-black text-white shadow-sm"
                    : "text-slate-600 hover:text-black hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Exit back to public platform (Desktop) */}
        <div className="hidden md:block pt-4 border-t border-slate-100">
          <Link
            href="/"
            className="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-black hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
