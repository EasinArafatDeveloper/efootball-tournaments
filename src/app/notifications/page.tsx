"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Swords, ArrowRightLeft, Trophy, AlertTriangle, ArrowRight } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Quarter Final 1 Result Certified",
      message: "Head Referee Tanzid Hasan Joy has verified your 3-1 match victory against Easin Arafat.",
      time: "15 minutes ago",
      type: "SUCCESS",
      link: "/matches/fix-fin-1",
      isRead: false,
    },
    {
      id: "notif-2",
      title: "Official Transfer Bid Received",
      message: "Dhaka Dominators Esports has submitted a transfer request of $115M for contract extension.",
      time: "2 hours ago",
      type: "TRANSFER",
      link: "/transfer-market",
      isRead: false,
    },
    {
      id: "notif-3",
      title: "Upcoming Semi Final Fixture Scheduled",
      message: "National Championship Semi-Final vs Prasen Jit Sarker is scheduled for 18:30 BST.",
      time: "Yesterday",
      type: "FIXTURE",
      link: "/matches/fix-live-1",
      isRead: true,
    },
    {
      id: "notif-4",
      title: "Championship Prize Pool Update",
      message: "eFCOB Governance has expanded the National Championship Grand Prize to 100,000 BDT.",
      time: "3 days ago",
      type: "INFO",
      link: "/tournaments",
      isRead: true,
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
            <Bell className="w-4 h-4 text-black" />
            <span>Alerts & Notifications</span>
          </div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">
            Notification <span className="text-slate-500">Center</span>
          </h1>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 flex items-center space-x-1.5 transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-2xl border transition-all flex items-start justify-between space-x-4 shadow-sm ${
              !n.isRead
                ? "bg-white border-black"
                : "bg-slate-50 border-slate-200 text-slate-500"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.type === "SUCCESS"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : n.type === "TRANSFER"
                    ? "bg-slate-100 text-slate-900 border border-slate-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {n.type === "SUCCESS" ? (
                  <Swords className="w-5 h-5" />
                ) : n.type === "TRANSFER" ? (
                  <ArrowRightLeft className="w-5 h-5" />
                ) : (
                  <Trophy className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-slate-950">{n.title}</h3>
                  {!n.isRead && (
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                <div className="text-[10px] text-slate-400 font-mono mt-1.5">{n.time}</div>
              </div>
            </div>

            {n.link && (
              <Link
                href={n.link}
                className="px-3 py-1.5 rounded-lg bg-black hover:bg-zinc-800 text-xs font-bold text-white flex-shrink-0 transition-all shadow-sm"
              >
                View
              </Link>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
