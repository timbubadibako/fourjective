import https from 'node:https';

const token = 'REDACTED_SUPABASE_TOKEN';
const projectRef = 'ycazsdouyfcniybpprzz';

const sql = `
DO $$
DECLARE
    v_project_id UUID;
BEGIN
    -- Cek jika sudah ada
    SELECT id INTO v_project_id FROM projects WHERE access_code = 'SMAN1-2026';

    IF v_project_id IS NULL THEN
        -- Insert Project Utama
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
            'SMAN1-2026',
            'SMA Negeri 1 Jakarta',
            2026,
            'Jakarta Pusat',
            'Yearbook Hardcover Exclusive',
            180,
            80,
            'hardcover',
            'active',
            3,
            'Mei 2026',
            'Alifia Putri',
            '+62 812-3456-7890',
            'Venny Meilinda'
        ) RETURNING id INTO v_project_id;

        -- Insert 6 Milestones
        INSERT INTO project_milestones (project_id, step_number, title, description, status, target_date) VALUES
        (v_project_id, 1, 'Penandatanganan Kontrak & DP 30%', 'MOU resmi angkatan telah disepakati dan jadwal photoshoot terkunci.', 'done', '10 Sep 2026'),
        (v_project_id, 2, 'Sesi Foto Angkatan & Kelas', 'Pemotretan outdoor tema kelas, sesi studio guru, dan video shoot selesai.', 'done', '04 Okt 2026'),
        (v_project_id, 3, 'Desain Layout & Kurasi 80 Halaman', 'Tim desainer grafis Fourjective sedang menata susunan foto & bio siswa.', 'active', 'Sedang Berlangsung'),
        (v_project_id, 4, 'Proofing Dummy & Revisi Panitia', 'Pengecekan dummy digital sebelum dokumen naik ke mesin cetak Heidelberg.', 'pending', 'Est. 15 Nov 2026'),
        (v_project_id, 5, 'Proses Cetak, Jilid Hardcover & QC', 'Pencetakan fisik, laminasi doff/glossy, jilid jahit benang hardcover kokoh.', 'pending', 'Est. 10 Des 2026'),
        (v_project_id, 6, 'Pengemasan Rapi & Pengiriman ke Sekolah', 'Eksemplar buku dibungkus box rapi dan dikirim tepat waktu sebelum hari wisuda.', 'pending', 'Est. 20 Des 2026');

        -- Insert 3 Installments
        INSERT INTO payment_installments (project_id, installment_number, title, amount, status, due_date, receipt_number, notes) VALUES
        (v_project_id, 1, 'Termin 1 (DP 30%)', 8910000, 'paid', 'Lunas saat MOU', 'INV-2026-001-LUNAS', 'Pembayaran kas DP 30% terverifikasi'),
        (v_project_id, 2, 'Termin 2 (40%)', 11880000, 'pending', 'Saat ACC Dummy Cetak', 'INV-2026-002-PENDING', 'Jatuh tempo saat dummy disetujui'),
        (v_project_id, 3, 'Termin 3 (Pelunasan 30%)', 8910000, 'pending', 'Sebelum Buku Dikirim', 'INV-2026-003-PENDING', 'Pelunasan sebelum pengiriman ekspedisi');

        -- Insert 3 Deliverables
        INSERT INTO project_deliverables (project_id, file_type, file_name, file_size, r2_key, is_ready) VALUES
        (v_project_id, 'zip_photos', 'Galeri Foto Kelas Lengkap (Hi-Res).zip', '3.8 GB', 'schools/SMAN1-2026/photos-hires.zip', true),
        (v_project_id, 'master_pdf', 'Draf Dummy Layout 80 Halaman (Revisi 1).pdf', '184 MB', 'schools/SMAN1-2026/dummy-rev1.pdf', true),
        (v_project_id, 'video_4k', 'Trailer Aftermovie 4K (Rough Cut).mp4', '1.2 GB', 'schools/SMAN1-2026/aftermovie-rough.mp4', false);
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
    console.log('Seed Response Status:', res.statusCode);
    console.log('Body:', d);
  });
});

req.on('error', (e) => console.error('Seed Error:', e));
req.write(JSON.stringify({ query: sql }));
req.end();
