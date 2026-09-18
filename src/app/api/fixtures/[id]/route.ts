import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const fixture = db.getFixtureById(id);

  if (!fixture) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Fixture not found" } }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: fixture });
}
