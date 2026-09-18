import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tourn = db.getTournamentBySlug(slug);

  if (!tourn) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Tournament not found" } }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: tourn });
}
