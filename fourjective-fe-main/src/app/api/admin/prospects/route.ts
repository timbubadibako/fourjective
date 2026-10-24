import { NextRequest, NextResponse } from "next/server";
import { getAllProspectOrdersAdmin, markProspectOrderConverted } from "@/lib/supabase-admin";
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = verifyAdminSessionToken(token);

    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await getAllProspectOrdersAdmin();
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch prospect orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = verifyAdminSessionToken(token);

    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, project_id } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "id dan status wajib dikirim" },
        { status: 400 }
      );
    }

    const ok = await markProspectOrderConverted(id, project_id);
    if (!ok) {
      return NextResponse.json(
        { error: "Gagal memperbarui status permohonan" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update prospect order" },
      { status: 500 }
    );
  }
}


