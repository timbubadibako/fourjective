/**
 * Supabase Data Client (Native Fetch - Zero Dependency)
 * Project: Fourjectiv (ycazsdouyfcniybpprzz)
 */

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ycazsdouyfcniybpprzz.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljYXpzZG91eWZjbml5YnBwcnp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NTY4MDIsImV4cCI6MjEwODIzMjgwMn0.yzO5t0B2VsBPDQb9KUCX45av3KW7xzWM9f_X0A6xROA";

export interface ProjectMilestone {
  id: string;
  project_id: string;
  step_number: number;
  title: string;
  description: string;
  status: "done" | "active" | "pending";
  target_date: string;
}

export interface PaymentInstallment {
  id: string;
  project_id: string;
  installment_number: number;
  title: string;
  amount: number;
  status: "paid" | "pending";
  due_date: string;
  receipt_number: string;
  notes: string;
}

export interface ProjectDeliverable {
  id: string;
  project_id: string;
  file_type: "master_pdf" | "zip_photos" | "video_4k" | "flipbook";
  file_name: string;
  file_size: string;
  r2_key: string;
  is_ready: boolean;
  download_count: number;
}

export interface ProjectData {
  id: string;
  access_code: string;
  school_name: string;
  graduation_year: number;
  city: string;
  package_name: string;
  student_count: number;
  page_count: number;
  cover_type: "hardcover" | "leather" | "acrylic";
  status: "prospect" | "active" | "completed" | "archived";
  current_stage: number;
  target_graduation: string;
  pic_name: string;
  pic_whatsapp: string;
  pm_assigned: string;
  created_at: string;
  updated_at: string;
  project_milestones?: ProjectMilestone[];
  payment_installments?: PaymentInstallment[];
  project_deliverables?: ProjectDeliverable[];
}

/**
 * Fetch data angkatan sekolah berdasarkan kode akses unik
 */
export async function getProjectByAccessCode(accessCode: string): Promise<ProjectData | null> {
  const cleanCode = accessCode.trim().toUpperCase();
  if (!cleanCode) return null;

  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/projects?access_code=eq.${encodeURIComponent(
      cleanCode
    )}&select=*,project_milestones(*),payment_installments(*),project_deliverables(*)`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 }, // ISR 30 detik
    });

    if (!res.ok) {
      console.error("Supabase fetch failed:", res.status, res.statusText);
      return null;
    }

    const data: ProjectData[] = await res.json();
    if (!data || data.length === 0) return null;

    const project = data[0];

    // Urutkan milestones & installments secara ascending
    if (project.project_milestones) {
      project.project_milestones.sort((a, b) => a.step_number - b.step_number);
    }
    if (project.payment_installments) {
      project.payment_installments.sort((a, b) => a.installment_number - b.installment_number);
    }

    return project;
  } catch (err) {
    console.error("Error getProjectByAccessCode:", err);
    return null;
  }
}

/**
 * Simpan data pengajuan estimator kas / order baru
 */
export async function submitProspectOrder(payload: {
  projectId?: string;
  picName: string;
  picWhatsapp: string;
  studentCount: number;
  pageCount: number;
  coverType: string;
  addons: string[];
  estimatedPricePerStudent: number;
  totalEstimatedPrice: number;
  targetGraduation?: string;
}): Promise<boolean> {
  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/prospect_orders`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        project_id: payload.projectId || null,
        pic_name: payload.picName,
        pic_whatsapp: payload.picWhatsapp,
        student_count: payload.studentCount,
        page_count: payload.pageCount,
        cover_type: payload.coverType,
        addons: payload.addons,
        estimated_price_per_student: payload.estimatedPricePerStudent,
        total_estimated_price: payload.totalEstimatedPrice,
        target_graduation: payload.targetGraduation || null,
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("Error submitProspectOrder:", err);
    return false;
  }
}
