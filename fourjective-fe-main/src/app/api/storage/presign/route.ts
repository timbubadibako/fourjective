import { NextRequest, NextResponse } from "next/server";
import { createR2PresignedUrl } from "@/lib/r2";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, fileType } = body;

    if (!key) {
      return NextResponse.json({ error: "Key file wajib diisi" }, { status: 400 });
    }

    // Generate pre-signed URL untuk upload (PUT) berlaku 1 jam
    const uploadUrl = createR2PresignedUrl({
      key,
      method: "PUT",
      expiresIn: 3600,
    });

    // Generate pre-signed URL untuk download (GET) berlaku 24 jam
    const downloadUrl = createR2PresignedUrl({
      key,
      method: "GET",
      expiresIn: 86400,
    });

    return NextResponse.json({
      success: true,
      key,
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
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Parameter ?key wajib diisi" }, { status: 400 });
    }

    const downloadUrl = createR2PresignedUrl({
      key,
      method: "GET",
      expiresIn: 86400,
    });

    return NextResponse.json({
      success: true,
      key,
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
