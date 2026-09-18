import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Login required" } }, { status: 401 });
  }

  const fixture = db.getFixtureById(id);
  if (!fixture) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Fixture not found" } }, { status: 404 });
  }

  const body = await req.json();

  // If MOTM is provided, lookup player details
  let motmPlayerName = body.motmPlayerName;
  let motmPlayerAvatar = body.motmPlayerAvatar;
  if (body.motmPlayerId) {
    const p = db.getPlayerById(body.motmPlayerId);
    if (p) {
      motmPlayerName = p.fullName;
      motmPlayerAvatar = p.avatar;
    }
  }

  const updated = db.submitMatchResult(id, {
    homeScore: Number(body.homeScore) || 0,
    awayScore: Number(body.awayScore) || 0,
    homePenalties: body.homePenalties ? Number(body.homePenalties) : undefined,
    awayPenalties: body.awayPenalties ? Number(body.awayPenalties) : undefined,
    motmPlayerId: body.motmPlayerId,
    motmPlayerName,
    motmPlayerAvatar,
    motmReason: body.motmReason || "Outstanding match performance",
  });

  // Add audit log
  db.addAuditLog({
    adminId: session.id,
    adminName: session.fullName,
    action: "SUBMITTED_AND_APPROVED_RESULT",
    target: `Fixture #${id}`,
    details: `Score: ${body.homeScore} - ${body.awayScore}, MOTM: ${motmPlayerName || "None"}`
  });

  return NextResponse.json({ success: true, data: updated });
}
