import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { verifyPassword, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = LoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Invalid input fields", details: validated.error.flatten() } },
        { status: 400 }
      );
    }

    const { emailOrUsername, password } = validated.data;
    const user = db.getUserByEmailOrUsername(emailOrUsername);

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email/username or password" } },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email/username or password" } },
        { status: 401 }
      );
    }

    const player = db.getPlayerByUsername(user.username);

    const sessionPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      avatar: user.avatar,
      playerProfileId: player?.id,
      clubId: user.clubId || player?.club?.id,
    };

    await setSessionCookie(sessionPayload);

    return NextResponse.json({
      success: true,
      data: sessionPayload,
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "An unexpected error occurred" } },
      { status: 500 }
    );
  }
}
