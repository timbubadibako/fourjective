import https from 'node:https';

const token = 'REDACTED_SUPABASE_TOKEN';
const projectRef = 'ycazsdouyfcniybpprzz';

const sql = `
DO $$
DECLARE
    v_project_id UUID;
BEGIN
    SELECT id INTO v_project_id FROM projects WHERE access_code = 'GUEST-2026';

    IF v_project_id IS NULL THEN
        INSERT INTO projects (
            access_code,
            school_name,
            graduation_year,
            city,
            package_name,
            student_count,
            page_count,
            cover_type,
            status,
            current_stage,
            target_graduation,
            pic_name,
            pic_whatsapp,
            pm_assigned
        ) VALUES (
            'GUEST-2026',
            'SMA Bina Bangsa (Guest Demo)',
            2026,
            'Jakarta Selatan',
            'Yearbook Interactive Showcase',
            120,
            64,
            'hardcover',
            'prospect',
            2,
            'Juni 2026',
            'Tamu Penjelajah',
            '+62 812-0000-0000',
            'Venny Meilinda'
        ) RETURNING id INTO v_project_id;

        -- Milestones
        INSERT INTO project_milestones (project_id, step_number, title, description, status, target_date) VALUES
        (v_project_id, 1, 'Konsultasi Konsep & Penawaran MOU', 'Diskusi konsep tema yearbook dan simulasi estimasi anggaran.', 'done', 'Selesai'),
        (v_project_id, 2, 'Simulasi Sesi Foto & Demo Studio', 'Uji coba moodboard konsep foto outdoor dan kurasi portofolio.', 'active', 'Sedang Berjalan'),
        (v_project_id, 3, 'Draf Layout 64 Halaman Sample', 'Pratinjau struktur buku dan grid tipografi khas Fourjective.', 'pending', 'Est. November 2026'),
        (v_project_id, 4, 'Proofing Virtual Flipbook 3D', 'Simulasi interaktif bolak-balik halaman di layar tablet / laptop.', 'pending', 'Est. Desember 2026'),
        (v_project_id, 5, 'Spesifikasi Mesin Cetak Heidelberg', 'Pilihan laminasi doff halus, spot UV glossy, dan jahit benang.', 'pending', 'Est. Januari 2027'),
        (v_project_id, 6, 'Unboxing & Ekspedisi Contoh Sampel', 'Pengiriman dummy fisik sampel langsung ke panitia sekolah.', 'pending', 'Est. Februari 2027');

        -- Installments demo
        INSERT INTO payment_installments (project_id, installment_number, title, amount, status, due_date, receipt_number, notes) VALUES
        (v_project_id, 1, 'Termin 1 (DP 30%)', 5400000, 'pending', 'Saat Penandatanganan MOU', 'INV-DEMO-001', 'Simulasi DP setelah MOU disepakati'),
        (v_project_id, 2, 'Termin 2 (40%)', 7200000, 'pending', 'Saat ACC Dummy Cetak', 'INV-DEMO-002', 'Termin pertengahan saat layout disetujui'),
        (v_project_id, 3, 'Termin 3 (Pelunasan 30%)', 5400000, 'pending', 'Sebelum Pengiriman', 'INV-DEMO-003', 'Pelunasan akhir sebelum buku dikirim');

        -- Deliverables demo
        INSERT INTO project_deliverables (project_id, file_type, file_name, file_size, r2_key, is_ready) VALUES
        (v_project_id, 'master_pdf', 'Sample Dummy Katalog 64 Halaman.pdf', '68 MB', 'demo/sample-dummy-64p.pdf', true),
        (v_project_id, 'zip_photos', 'Sample Moodboard & Color Grading.zip', '1.4 GB', 'demo/sample-moodboard.zip', true);
    END IF;
END $$;
`;

const req = https.request({
  hostname: 'api.supabase.com',
  path: `/v1/projects/${projectRef}/database/query`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'NodeJS'
  }
}, (res) => {
  let d = '';
  res.on('data', chunk => d += chunk);
  res.on('end', () => {
    console.log('Seed Guest Status:', res.statusCode);
  });
});

req.on('error', (e) => console.error('Seed Error:', e));
req.write(JSON.stringify({ query: sql }));
req.end();
