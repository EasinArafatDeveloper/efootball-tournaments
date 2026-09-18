import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const position = searchParams.get("position") || undefined;
  const clubId = searchParams.get("clubId") || undefined;
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;
  const sortBy = searchParams.get("sortBy") || "rating"; // rating, goals, winRate, marketValue

  let players = db.getPlayers({ position, clubId, status, search });

  // Sorting
  players.sort((a, b) => {
    if (sortBy === "goals") {
      return (b.stats?.goalsScored || 0) - (a.stats?.goalsScored || 0);
    }
    if (sortBy === "winRate") {
      return (b.stats?.winRate || 0) - (a.stats?.winRate || 0);
    }
    if (sortBy === "marketValue") {
      return (b.marketValue || 0) - (a.marketValue || 0);
    }
    if (sortBy === "motm") {
      return (b.motmCount || 0) - (a.motmCount || 0);
    }
    return (b.rating || 0) - (a.rating || 0);
  });

  return NextResponse.json({
    success: true,
    data: players,
    count: players.length,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin access required" } }, { status: 403 });
  }

  const body = await req.json();
  const player = db.createPlayer(body);
  return NextResponse.json({ success: true, data: player }, { status: 201 });
}
