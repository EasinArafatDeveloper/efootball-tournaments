import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const listings = db.getTransferListings();
  const history = db.getTransferHistory();
  return NextResponse.json({
    success: true,
    data: {
      listings,
      history,
      windowStatus: {
        isOpen: true,
        name: "eFCOB Summer 2026 Transfer Window",
        daysRemaining: 42,
        closesAt: "2026-10-31T23:59:59Z",
      },
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Login required" } }, { status: 401 });
  }

  const body = await req.json();
  const request = db.createTransferRequest({
    ...body,
    requesterUserId: session.id,
  });

  return NextResponse.json({ success: true, data: request }, { status: 201 });
}
