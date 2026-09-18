import { NextRequest, NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = RegisterSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validated.error.errors[0]?.message || "Invalid registration fields",
            details: validated.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const data = validated.data;

    // Check existing
    const existing = db.getUserByEmailOrUsername(data.email) || db.getUserByEmailOrUsername(data.username);
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "CONFLICT", message: "Email or username is already registered" },
        },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(data.password);
    const user = db.createUser({
      email: data.email,
      username: data.username,
      fullName: data.fullName,
      passwordHash,
      role: "PLAYER",
    });

    const player = db.createPlayer({
      userId: user.id,
      username: data.username,
      fullName: data.fullName,
      konamiId: data.konamiId,
      deviceModel: data.deviceModel,
      facebookProfile: data.facebookProfile,
      preferredPosition: data.preferredPosition,
      playStyle: data.playStyle,
      bio: data.bio,
      phone: data.phone,
    });

    const sessionPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      avatar: player.avatar,
      playerProfileId: player.id,
    };

    await setSessionCookie(sessionPayload);

    return NextResponse.json(
      {
        success: true,
        data: sessionPayload,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Failed to complete registration" } },
      { status: 500 }
    );
  }
}
