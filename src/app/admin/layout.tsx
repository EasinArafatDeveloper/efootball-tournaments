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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col md:flex-row -mt-20">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 space-y-6 flex-shrink-0">
        
        {/* Brand Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-black p-0.5 shadow-sm flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-black text-slate-950">eFCOB Admin</div>
            <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">Command Desk</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
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

        {/* Exit back to public platform */}
        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/"
            className="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-black hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 min-w-0 p-6 md:p-10 space-y-8 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}
