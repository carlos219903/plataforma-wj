import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) return false;

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function createSessionToken(password: string) {
  return crypto
    .createHmac("sha256", password)
    .update("groupwj-admin-session-v1")
    .digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_ANALYTICS_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_ANALYTICS_PASSWORD no configurada");

      return NextResponse.json(
        { ok: false, error: "Configuración del servidor incompleta" },
        { status: 500 }
      );
    }

    if (
      typeof password !== "string" ||
      !safeEqual(password, adminPassword)
    ) {
      return NextResponse.json(
        { ok: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      ok: true,
    });

    response.cookies.set(
      "gw_admin_session",
      createSessionToken(adminPassword),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 12,
      }
    );

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { ok: false, error: "No se pudo iniciar sesión" },
      { status: 500 }
    );
  }
}
