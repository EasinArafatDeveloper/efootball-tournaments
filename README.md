# 🏆 NEXA Football / eFCOB — Full-Stack eFootball Championship Platform

> **The Premier Esports Ecosystem for eFootball Tournaments, Rankings, Club Franchises, and Athlete Profiles.**

Built with Next.js 15 App Router, TypeScript, Tailwind CSS, Prisma ORM, Framer Motion, and Lucide Icons.

---

## ⚡ Features & Modules

- **🏠 Master Homepage**: Wide hero composition with custom player assets, live match cards, tournament progress tracking, activity feed, weekly stars, top scorers, club rankings, transfer market spotlights, news, events, and community CTA.
- **⚔️ Match Centre (`/matches`)**: Filter by Live, Upcoming, Finished, and Live Stream matches with real-time scorelines and club logos.
- **📺 Match Detail Hub (`/matches/[id]`)**: Embedded live broadcast, score timeline events, radar charts, MOTM award designation, and referee accreditation badges.
- **🏃 Athlete Directory (`/players`)**: Complete search and filters by position, club, rating, market valuation, and dynamic win/loss form.
- **🛡️ Club Hub (`/clubs`)**: Club rosters, franchise market valuations, trophies, manager credentials, and match history.
- **🏆 Tournament Center (`/tournaments`)**: Interactive knockout bracket tree (Quarter-Finals $\rightarrow$ Semi-Finals $\rightarrow$ Finals) with prize pool breakdowns.
- **🥇 Leaderboards (`/rankings`)**: Dedicated rankings for Top Scorers, Assists, Clean Sheets, MOTM honors, and Match Officials.
- **💰 Transfer Market (`/transfer-market`)**: Active athlete listings, buyout proposal modals, and valuation calculators.
- **📡 Live Activity Stream (`/activity`)**: Real-time event log for transfers, registrations, awards, and matches.
- **📰 Editorial & Events (`/news`, `/events`)**: CMS articles, LAN championship schedules, and tournament registration.
- **⚖️ Governance (`/rules`, `/disciplinary`, `/referees`)**: Official rulebook, public disciplinary tribunal, and certified arbiter tier management.
- **🔒 Super Admin Operations Suite (`/admin/*`)**:
  - Live Match Operations & score arbitration
  - Athlete & Club roster management
  - Fixture scheduling & Tournament bracket generation
  - Transfer market moderation & buyout approvals
  - Referee accreditation (Tier 1-3) & Fair Play recalibration
  - Sanction issuance & Tribunal register
  - Immutable audit trail ledger with hash verification

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS Design System
- **Database & ORM**: Prisma ORM
- **Icons & Motion**: Lucide React, Framer Motion, Canvas Confetti

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/EasinArafatDeveloper/efootball-tournaments.git
cd efootball-tournaments
npm install
```

### 2. Environment Setup
Create a `.env` file based on `.env.example`:
```env
DATABASE_URL="your-database-connection-string"
AUTH_SECRET="your-jwt-auth-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@necob.com` | `Admin@Password2026!` |
| **Club Manager** | `manager.dhaka@efcobbd.com` | `Admin@Password2026!` |
| **Player Athlete** | `mahim@efcobbd.com` | `Admin@Password2026!` |

---

## 📄 License
MIT License. © 2025 NEXA Football / eFCOB. All rights reserved.
