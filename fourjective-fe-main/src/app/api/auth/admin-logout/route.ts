import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Admin berhasil logout.",
  });

  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
  const isValid = verifyAdminSessionToken(cookie?.value);

  return NextResponse.json({
    authenticated: isValid,
  });
}
