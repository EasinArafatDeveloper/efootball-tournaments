import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin privileges required" } }, { status: 403 });
  }

  const referees = db.getReferees();
  return NextResponse.json({ success: true, data: referees });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin privileges required" } }, { status: 403 });
  }

  try {
    const body = await req.json();
    if (!body.name || !body.tier) {
      return NextResponse.json({ success: false, error: { message: "Name and Tier are required" } }, { status: 400 });
    }

    const newRef = db.createReferee({
      name: body.name,
      avatar: body.avatar,
      tier: body.tier,
      matchesOfficiated: Number(body.matchesOfficiated) || 0,
      rating: Number(body.rating) || 4.5,
      fairPlayScore: Number(body.fairPlayScore) || 95,
      bio: body.bio,
    });

    return NextResponse.json({ success: true, data: newRef });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message || "Failed to create match official" } }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin privileges required" } }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: { message: "Referee ID is required" } }, { status: 400 });
    }

    const updated = db.updateReferee(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: { message: "Official not found" } }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message || "Failed to update match official" } }, { status: 500 });
  }
}
