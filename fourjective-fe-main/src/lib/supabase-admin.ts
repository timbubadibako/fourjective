/**
 * Supabase Admin Client (Server-side Only)
 * Uses Service Role Key to bypass RLS for Admin CRUD
 */

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ycazsdouyfcniybpprzz.supabase.co";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljYXpzZG91eWZjbml5YnBwcnp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjY1NjgwMiwiZXhwIjoyMTA4MjMyODAyfQ.g2pvAmC4QF_m0z7bs_hV-eKUqvXFzpAqpzasy1iyji4";

interface CreateProjectMOUInput {
  school_name: string;
  access_code?: string;
  graduation_year?: number;
  city?: string;
  package_name?: string;
  student_count?: number;
  page_count?: number;
  cover_type?: "hardcover" | "leather" | "acrylic";
  target_graduation?: string;
  pic_name: string;
  pic_whatsapp: string;
  pm_assigned?: string;
  estimated_price_per_student?: number;
  prospect_order_id?: string;
  installments?: {
    dp_amount?: number;
    mid_amount?: number;
    final_amount?: number;
  };
}

export async function createProjectWithMOU(input: CreateProjectMOUInput) {
  // 1. Generate access code jika belum ada
  const cleanSchool = input.school_name.trim();
  const gradYear = input.graduation_year || 2026;
  let code = input.access_code?.trim().toUpperCase();

  if (!code) {
    // Generate code seperti: SMAN2-2026 atau 4J-ABC
    const prefix = cleanSchool
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 5)
      .toUpperCase();
    code = `${prefix || "4J"}-${gradYear}`;
  }

  // Cek duplikasi access_code di database, tambahkan suffix acak jika sudah ada
  let checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/projects?access_code=eq.${encodeURIComponent(code)}&select=id`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  if (checkRes.ok) {
    const existing = await checkRes.json();
    if (Array.isArray(existing) && existing.length > 0) {
      code = `${code}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    }
  }

  const studentCount = input.student_count || 150;
  const pageCount = input.page_count || 80;
  const coverType = input.cover_type || "hardcover";
  const pricePerStudent = input.estimated_price_per_student || 165000;
  const totalPrice = studentCount * pricePerStudent;

  const dpAmount = input.installments?.dp_amount ?? Math.round(totalPrice * 0.3);
  const midAmount = input.installments?.mid_amount ?? Math.round(totalPrice * 0.4);
  const finalAmount = input.installments?.final_amount ?? (totalPrice - dpAmount - midAmount);

  // Insert ke tabel projects via REST API dengan Service Role Key
  const projectPayload = {
    access_code: code,
    school_name: cleanSchool,
    graduation_year: gradYear,
    city: input.city || "Jawa Barat",
    package_name: input.package_name || "Yearbook Hardcover Exclusive",
    student_count: studentCount,
    page_count: pageCount,
    cover_type: coverType,
    status: "active",
    current_stage: 2, // Tahap 2: Sesi Foto (karena Tahap 1 MOU sudah lunas)
    target_graduation: input.target_graduation || "Mei 2026",
    pic_name: input.pic_name,
    pic_whatsapp: input.pic_whatsapp,
    pm_assigned: input.pm_assigned || "Venny Meilinda",
  };

  const projectRes = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(projectPayload),
  });

  if (!projectRes.ok) {
    const errText = await projectRes.text();
    throw new Error(`Gagal menyimpan project: ${errText}`);
  }

  const projects = await projectRes.json();
  const createdProject = projects[0];
  const projectId = createdProject.id;

  // 2. Insert 6 Milestones otomatis
  const milestonesPayload = [
    {
      project_id: projectId,
      step_number: 1,
      title: "Penandatanganan Kontrak MOU & DP 30%",
      description: "MOU resmi angkatan telah disepakati dan jadwal photoshoot terkunci.",
      status: "done",
      target_date: "Terkonfirmasi Lunas",
    },
    {
      project_id: projectId,
      step_number: 2,
      title: "Sesi Foto Angkatan & Kelas",
      description: "Pemotretan outdoor tema kelas, sesi studio guru, dan video shoot.",
      status: "active",
      target_date: "Sedang Berlangsung",
    },
    {
      project_id: projectId,
      step_number: 3,
      title: "Desain Layout & Kurasi Halaman",
      description: "Tim desainer grafis Fourjective menata susunan foto & bio siswa.",
      status: "pending",
      target_date: "Est. 3-4 Minggu",
    },
    {
      project_id: projectId,
      step_number: 4,
      title: "Proofing Dummy & Revisi Panitia",
      description: "Pengecekan dummy digital sebelum dokumen naik ke mesin cetak Heidelberg.",
      status: "pending",
      target_date: "Est. Pra-Cetak",
    },
    {
      project_id: projectId,
      step_number: 5,
      title: "Proses Cetak, Jilid Hardcover & QC",
      description: "Pencetakan fisik, laminasi doff/glossy, jilid jahit benang hardcover.",
      status: "pending",
      target_date: "Est. Produksi Cetak",
    },
    {
      project_id: projectId,
      step_number: 6,
      title: "Pengemasan Rapi & Pengiriman ke Sekolah",
      description: "Eksemplar buku dibungkus box rapi dan dikirim sebelum hari wisuda.",
      status: "pending",
      target_date: input.target_graduation || "Mei 2026",
    },
  ];

  const milestonesRes = await fetch(`${SUPABASE_URL}/rest/v1/project_milestones`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(milestonesPayload),
  });

  if (!milestonesRes.ok) {
    const errText = await milestonesRes.text();
    throw new Error(`Gagal menyimpan project milestones: ${errText}`);
  }

  // 3. Insert 3 Termin Kas Otomatis
  const installmentsPayload = [
    {
      project_id: projectId,
      installment_number: 1,
      title: "Termin 1 (DP 30%)",
      amount: dpAmount,
      status: "paid", // Lunas karena sudah MOU
      due_date: "Lunas saat MOU",
      receipt_number: `INV-${gradYear}-${code}-01-LUNAS`,
      notes: "Pembayaran kas DP 30% terverifikasi kontrak",
    },
    {
      project_id: projectId,
      installment_number: 2,
      title: "Termin 2 (40%)",
      amount: midAmount,
      status: "pending",
      due_date: "Saat ACC Dummy Cetak",
      receipt_number: `INV-${gradYear}-${code}-02-PENDING`,
      notes: "Jatuh tempo saat dummy digital disetujui",
    },
    {
      project_id: projectId,
      installment_number: 3,
      title: "Termin 3 (Pelunasan 30%)",
      amount: finalAmount,
      status: "pending",
      due_date: "Sebelum Buku Dikirim",
      receipt_number: `INV-${gradYear}-${code}-03-PENDING`,
      notes: "Pelunasan sebelum pengiriman ekspedisi",
    },
  ];

  const installmentsRes = await fetch(`${SUPABASE_URL}/rest/v1/payment_installments`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(installmentsPayload),
  });

  if (!installmentsRes.ok) {
    const errText = await installmentsRes.text();
    throw new Error(`Gagal menyimpan payment installments: ${errText}`);
  }

  // 4. Update status prospect_orders jika berasal dari konversi
  if (input.prospect_order_id) {
    const markSuccess = await markProspectOrderConverted(input.prospect_order_id, projectId);
    if (!markSuccess) {
      console.warn(`Gagal memperbarui prospect_order ${input.prospect_order_id}`);
    }
  }

  return {
    success: true,
    project: createdProject,
    access_code: code,
    shareUrl: `/track/${code}`,
  };
}

export async function markProspectOrderConverted(prospectOrderId: string, projectId?: string) {
  const updatePayload: Record<string, any> = {
    status: "converted",
  };
  if (projectId) {
    updatePayload.project_id = projectId;
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/prospect_orders?id=eq.${encodeURIComponent(prospectOrderId)}`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    }
  );

  return res.ok;
}

/**
 * Ambil daftar semua projects untuk Admin Cloud Dock
 */
export async function getAllProjectsAdmin() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/projects?select=*,project_milestones(*),payment_installments(*),project_deliverables(*)&order=created_at.desc`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return await res.json();
}

/**
 * Ambil daftar permohonan pesanan masuk dari tamu/prospek
 */
export async function getAllProspectOrdersAdmin() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/prospect_orders?select=*&order=created_at.desc`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return await res.json();
}
