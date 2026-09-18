import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const club = db.getClubBySlug(slug);

  if (!club) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Club not found" } }, { status: 404 });
  }

  // Get club fixtures
  const allFixtures = db.getFixtures();
  const clubFixtures = allFixtures.filter(
    (f) => f.homeClub?.id === club.id || f.awayClub?.id === club.id
  );

  return NextResponse.json({
    success: true,
    data: {
      ...club,
      fixtures: clubFixtures,
    },
  });
}
