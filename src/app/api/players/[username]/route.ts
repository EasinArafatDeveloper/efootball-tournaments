import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const player = db.getPlayerByUsername(username);

  if (!player) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Player not found" } }, { status: 404 });
  }

  // Get player fixtures
  const allFixtures = db.getFixtures();
  const playerFixtures = allFixtures.filter(
    (f) => f.homePlayer?.id === player.id || f.awayPlayer?.id === player.id
  );

  return NextResponse.json({
    success: true,
    data: {
      ...player,
      fixtures: playerFixtures,
    },
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Login required" } }, { status: 401 });
  }

  const player = db.getPlayerByUsername(username);
  if (!player) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Player not found" } }, { status: 404 });
  }

  // Check ownership or admin
  const isOwner = session.username.toLowerCase() === username.toLowerCase();
  const isAdmin = session.role === "ADMIN" || session.role === "SUPER_ADMIN";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Cannot edit this player" } }, { status: 403 });
  }

  const body = await req.json();
  const updated = db.updatePlayer(player.id, body);

  return NextResponse.json({ success: true, data: updated });
}
