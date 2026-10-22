import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ycazsdouyfcniybpprzz.supabase.co";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljYXpzZG91eWZjbml5YnBwcnp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjY1NjgwMiwiZXhwIjoyMTA4MjMyODAyfQ.g2pvAmC4QF_m0z7bs_hV-eKUqvXFzpAqpzasy1iyji4";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
    if (!verifyAdminSessionToken(cookie?.value)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { installment_id, status } = body;

    if (!installment_id || !status) {
      return NextResponse.json(
        { error: "installment_id dan status wajib dikirim" },
        { status: 400 }
      );
    }

    const updatePayload: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (status === "paid") {
      updatePayload.receipt_number = `INV-${new Date().getFullYear()}-${installment_id.slice(
        0,
        6
      ).toUpperCase()}-LUNAS`;
    }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/payment_installments?id=eq.${encodeURIComponent(
        installment_id
      )}&project_id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(updatePayload),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Gagal memperbarui status termin" },
        { status: 500 }
      );
    }

    const updated = await res.json();
    return NextResponse.json({
      success: true,
      installment: updated[0],
      message: `Status termin berhasil diubah menjadi ${status}`,
    });
  } catch (err: any) {
    console.error("PATCH installment error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
