import { Hero } from "@/components/home/Hero";
import { LiveMatches } from "@/components/home/LiveMatches";
import { OngoingTournamentsAndActivity } from "@/components/home/OngoingTournamentsAndActivity";
import { WeeklyStarsSection } from "@/components/home/WeeklyStarsSection";
import { TopScorersAndClubs } from "@/components/home/TopScorersAndClubs";
import { TransferMarketSection } from "@/components/home/TransferMarketSection";
import { NewsAndEvents } from "@/components/home/NewsAndEvents";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CommunityCTA } from "@/components/home/CommunityCta";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen text-[#111111]">
      {/* 1. HERO SECTION (Wide banner with attached image + Stats) */}
      <Hero />

      {/* 2. LIVE MATCHES (3 Horizontal Cards) */}
      <LiveMatches />

      {/* 3. ONGOING TOURNAMENTS + WHAT'S HAPPENING (Two-column section) */}
      <OngoingTournamentsAndActivity />

      {/* 4. WEEKLY STARS (6 Compact Category Cards) */}
      <WeeklyStarsSection />

      {/* 5. TOP SCORERS + CLUB RANKINGS (Two equal-width data table columns) */}
      <TopScorersAndClubs />

      {/* 6. TRANSFER MARKET (Horizontal Player Cards + Find Next Star Promo) */}
      <TransferMarketSection />

      {/* 7. LATEST NEWS + UPCOMING EVENTS (3 News Cards + Event Rows) */}
      <NewsAndEvents />

      {/* 8. OUR PARTNERS (Horizontal Logo Cards) */}
      <PartnersSection />

      {/* 9. COMMUNITY CTA (Wide Dark Movement Banner) */}
      <CommunityCTA />
    </div>
  );
}
