import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { createProjectWithMOU, getAllProjectsAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
    if (!verifyAdminSessionToken(cookie?.value)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await getAllProjectsAdmin();
    return NextResponse.json({ success: true, projects });
  } catch (err: any) {
    console.error("GET admin projects error:", err);
    return NextResponse.json(
      { error: "Gagal mengambil data proyek" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
    if (!verifyAdminSessionToken(cookie?.value)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      school_name,
      access_code,
      graduation_year,
      city,
      package_name,
      student_count,
      page_count,
      cover_type,
      target_graduation,
      pic_name,
      pic_whatsapp,
      pm_assigned,
    } = body;

    if (!school_name || !pic_name || !pic_whatsapp) {
      return NextResponse.json(
        { error: "Nama sekolah, nama PIC, dan nomor WhatsApp wajib diisi" },
        { status: 400 }
      );
    }

    const result = await createProjectWithMOU({
      school_name,
      access_code,
      graduation_year: Number(graduation_year) || 2026,
      city,
      package_name,
      student_count: Number(student_count) || 150,
      page_count: Number(page_count) || 80,
      cover_type,
      target_graduation,
      pic_name,
      pic_whatsapp,
      pm_assigned,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("POST admin project error:", err);
    return NextResponse.json(
      { error: err.message || "Gagal membuat proyek angkatan baru" },
      { status: 500 }
    );
  }
}
