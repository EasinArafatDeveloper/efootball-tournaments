import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const tournamentId = searchParams.get("tournamentId") || undefined;
  const clubId = searchParams.get("clubId") || undefined;
  const onStream = searchParams.get("onStream") === "true";

  const fixtures = db.getFixtures({ status, tournamentId, clubId, onStream });

  return NextResponse.json({
    success: true,
    data: fixtures,
    count: fixtures.length,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN" && session.role !== "TOURNAMENT_OFFICIAL")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Official or Admin permission required" } }, { status: 403 });
  }

  const body = await req.json();
  const fixture = db.createFixture(body);

  return NextResponse.json({ success: true, data: fixture }, { status: 201 });
}
