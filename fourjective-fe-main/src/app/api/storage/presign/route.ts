import { NextRequest, NextResponse } from "next/server";
import { createR2PresignedUrl } from "@/lib/r2";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";

function sanitizeStorageKey(rawKey: string): string | null {
  const normalized = rawKey.trim().replace(/\\/g, "/");
  // Cegah directory traversal dan null byte
  if (normalized.includes("..") || normalized.includes("\0")) {
    return null;
  }
  const clean = normalized.replace(/^\/+/, "");
  return clean.length > 0 ? clean : null;
}

export async function POST(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get(ADMIN_COOKIE_NAME);
    if (!verifyAdminSessionToken(adminCookie?.value)) {
      return NextResponse.json({ error: "Unauthorized: Sesi admin tidak valid" }, { status: 401 });
    }

    const body = await req.json();
    const { key } = body;

    if (!key) {
      return NextResponse.json({ error: "Key file wajib diisi" }, { status: 400 });
    }

    const safeKey = sanitizeStorageKey(key);
    if (!safeKey) {
      return NextResponse.json({ error: "Format key file tidak valid" }, { status: 400 });
    }

    // Generate pre-signed URL untuk upload (PUT) berlaku 1 jam
    const uploadUrl = createR2PresignedUrl({
      key: safeKey,
      method: "PUT",
      expiresIn: 3600,
    });

    // Generate pre-signed URL untuk download (GET) berlaku 24 jam
    const downloadUrl = createR2PresignedUrl({
      key: safeKey,
      method: "GET",
      expiresIn: 86400,
    });

    return NextResponse.json({
      success: true,
      key: safeKey,
      uploadUrl,
      downloadUrl,
    });
  } catch (error: any) {
    console.error("Presign error:", error);
    return NextResponse.json(
      { error: "Gagal membuat pre-signed URL Cloudflare R2" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawKey = searchParams.get("key");

    if (!rawKey) {
      return NextResponse.json({ error: "Parameter ?key wajib diisi" }, { status: 400 });
    }

    const safeKey = sanitizeStorageKey(rawKey);
    if (!safeKey) {
      return NextResponse.json({ error: "Format key file tidak valid" }, { status: 400 });
    }

    const downloadUrl = createR2PresignedUrl({
      key: safeKey,
      method: "GET",
      expiresIn: 86400,
    });

    return NextResponse.json({
      success: true,
      key: safeKey,
      downloadUrl,
    });
  } catch (error: any) {
    console.error("Presign GET error:", error);
    return NextResponse.json(
      { error: "Gagal membuat URL unduhan Cloudflare R2" },
      { status: 500 }
    );
  }
}
