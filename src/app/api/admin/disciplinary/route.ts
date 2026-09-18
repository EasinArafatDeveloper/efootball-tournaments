import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const records = db.getDisciplinaryRecords();
  return NextResponse.json({ success: true, data: records });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN" && session.role !== "SENIOR_REFEREE")) {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin/Senior Official privileges required" } }, { status: 403 });
  }

  const body = await req.json();
  const record = db.issueDisciplinaryAction({
    ...body,
    issuedBy: session.fullName,
  });

  return NextResponse.json({ success: true, data: record }, { status: 201 });
}
