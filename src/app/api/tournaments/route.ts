import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const tournaments = db.getTournaments();
  return NextResponse.json({ success: true, data: tournaments });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN" && session.role !== "TOURNAMENT_OFFICIAL")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin access required" } }, { status: 403 });
  }

  const body = await req.json();
  const tourn = db.createTournament(body);

  return NextResponse.json({ success: true, data: tourn }, { status: 201 });
}
