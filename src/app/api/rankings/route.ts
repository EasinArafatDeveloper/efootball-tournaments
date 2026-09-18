import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "players"; // players, clubs, scorers, assists, clean-sheets, motm, referees

  const allPlayers = db.getPlayers();
  const allClubs = db.getClubs();
  const allReferees = db.getReferees();

  if (type === "clubs") {
    const clubsSorted = [...allClubs].sort((a, b) => (b.points || 0) - (a.points || 0));
    return NextResponse.json({ success: true, data: clubsSorted });
  }

  if (type === "scorers") {
    const scorers = [...allPlayers]
      .sort((a, b) => (b.stats?.goalsScored || 0) - (a.stats?.goalsScored || 0))
      .slice(0, 50);
    return NextResponse.json({ success: true, data: scorers });
  }

  if (type === "assists") {
    const assists = [...allPlayers]
      .sort((a, b) => (b.stats?.assists || 0) - (a.stats?.assists || 0))
      .slice(0, 50);
    return NextResponse.json({ success: true, data: assists });
  }

  if (type === "clean-sheets") {
    const cleanSheets = [...allPlayers]
      .sort((a, b) => (b.stats?.cleanSheets || 0) - (a.stats?.cleanSheets || 0))
      .filter((p) => (p.stats?.cleanSheets || 0) > 0);
    return NextResponse.json({ success: true, data: cleanSheets });
  }

  if (type === "motm") {
    const motmList = [...allPlayers]
      .sort((a, b) => (b.motmCount || 0) - (a.motmCount || 0))
      .slice(0, 50);
    return NextResponse.json({ success: true, data: motmList });
  }

  if (type === "referees") {
    const refs = [...allReferees].sort((a, b) => b.rating - a.rating);
    return NextResponse.json({ success: true, data: refs });
  }

  // Default: overall players ranking by Elo rating
  const playersSorted = [...allPlayers].sort((a, b) => b.rating - a.rating);
  return NextResponse.json({ success: true, data: playersSorted });
}
