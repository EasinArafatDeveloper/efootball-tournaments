import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  if (!q) {
    return NextResponse.json({
      success: true,
      data: { players: [], clubs: [], tournaments: [], matches: [], news: [] },
    });
  }

  const allPlayers = db.getPlayers();
  const allClubs = db.getClubs();
  const allTournaments = db.getTournaments();
  const allFixtures = db.getFixtures();
  const allNews = db.getNews();

  const players = allPlayers
    .filter(
      (p) =>
        p.fullName.toLowerCase().includes(q) ||
        p.username.toLowerCase().includes(q) ||
        p.konamiId.toLowerCase().includes(q)
    )
    .slice(0, 6);

  const clubs = allClubs
    .filter((c) => c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q))
    .slice(0, 5);

  const tournaments = allTournaments
    .filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    .slice(0, 4);

  const matches = allFixtures
    .filter(
      (f) =>
        f.homePlayer?.fullName.toLowerCase().includes(q) ||
        f.awayPlayer?.fullName.toLowerCase().includes(q) ||
        f.homeClub?.name.toLowerCase().includes(q) ||
        f.awayClub?.name.toLowerCase().includes(q) ||
        f.tournamentName?.toLowerCase().includes(q)
    )
    .slice(0, 5);

  const news = allNews
    .filter((n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q))
    .slice(0, 4);

  return NextResponse.json({
    success: true,
    data: { players, clubs, tournaments, matches, news },
  });
}
