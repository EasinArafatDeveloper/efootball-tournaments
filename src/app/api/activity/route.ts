import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const activities = db.getActivityEvents(category);
  return NextResponse.json({ success: true, data: activities });
}
