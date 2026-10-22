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
    const { stage } = body;
    const stageNum = Number(stage);

    if (!stageNum || stageNum < 1 || stageNum > 6) {
      return NextResponse.json(
        { error: "Stage harus bernilai antara 1 dan 6" },
        { status: 400 }
      );
    }

    // 1. Update project current_stage
    const updateProjectRes = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          current_stage: stageNum,
          updated_at: new Date().toISOString(),
        }),
      }
    );

    if (!updateProjectRes.ok) {
      return NextResponse.json(
        { error: "Gagal memperbarui status proyek" },
        { status: 500 }
      );
    }

    // 2. Update status masing-masing milestone:
    // < stageNum = done
    // = stageNum = active
    // > stageNum = pending
    for (let step = 1; step <= 6; step++) {
      const status =
        step < stageNum ? "done" : step === stageNum ? "active" : "pending";

      await fetch(
        `${SUPABASE_URL}/rest/v1/project_milestones?project_id=eq.${encodeURIComponent(
          id
        )}&step_number=eq.${step}`,
        {
          method: "PATCH",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            updated_at: new Date().toISOString(),
          }),
        }
      );
    }

    return NextResponse.json({
      success: true,
      stage: stageNum,
      message: `Proyek berhasil digeser ke Tahap ${stageNum}`,
    });
  } catch (err: any) {
    console.error("PATCH stage error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}
