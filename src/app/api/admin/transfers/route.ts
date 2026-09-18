import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin access required" } }, { status: 403 });
  }

  const listings = db.getTransferListings();
  const history = db.getTransferHistory();
  const clubs = db.getClubs();

  return NextResponse.json({
    success: true,
    data: {
      listings,
      history,
      clubs
    }
  });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin access required" } }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { action, listingId, buyerClubId, playerId, askingPrice } = body;

    if (action === "APPROVE") {
      if (!listingId || !buyerClubId) {
        return NextResponse.json({ success: false, error: { message: "Listing ID and Buyer Club ID are required" } }, { status: 400 });
      }
      const record = db.approveTransfer(listingId, buyerClubId);
      if (!record) {
        return NextResponse.json({ success: false, error: { message: "Transfer execution failed" } }, { status: 400 });
      }
      return NextResponse.json({ success: true, data: record });
    }

    if (action === "LIST") {
      if (!playerId || !askingPrice) {
        return NextResponse.json({ success: false, error: { message: "Player ID and asking price are required" } }, { status: 400 });
      }
      const listing = db.createTransferListing({ playerId, askingPrice: Number(askingPrice) });
      return NextResponse.json({ success: true, data: listing });
    }

    return NextResponse.json({ success: false, error: { message: "Invalid action" } }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message || "Failed to process transfer action" } }, { status: 500 });
  }
}
