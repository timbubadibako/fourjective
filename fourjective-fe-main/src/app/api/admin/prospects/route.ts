import { NextRequest, NextResponse } from "next/server";
import { getAllProspectOrdersAdmin } from "@/lib/supabase-admin";
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

