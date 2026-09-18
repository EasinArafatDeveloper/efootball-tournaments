import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin privileges required" } }, { status: 403 });
  }

  const stats = db.getPlatformStats();
  const auditLogs = db.getAuditLogs();
  const pendingFixtures = db.getFixtures({ status: "SCHEDULED" }).slice(0, 8);
  const liveFixtures = db.getFixtures({ status: "LIVE" });

  return NextResponse.json({
    success: true,
    data: {
      stats,
      auditLogs,
      pendingFixtures,
      liveFixtures,
    },
  });
}
