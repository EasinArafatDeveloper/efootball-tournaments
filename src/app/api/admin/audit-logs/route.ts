import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin privileges required" } }, { status: 403 });
  }

  const logs = db.getAuditLogs();
  return NextResponse.json({
    success: true,
    data: logs
  });
}
