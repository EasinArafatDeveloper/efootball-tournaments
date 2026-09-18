import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const clubs = db.getClubs();
  return NextResponse.json({ success: true, data: clubs });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Login required" } }, { status: 401 });
  }

  const body = await req.json();
  const club = db.createClub({
    ...body,
    managerId: session.id,
    managerName: session.fullName,
  });

  return NextResponse.json({ success: true, data: club }, { status: 201 });
}
