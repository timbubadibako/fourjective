import https from 'node:https';

const token = 'REDACTED_SUPABASE_TOKEN';
const projectRef = 'ycazsdouyfcniybpprzz';

const sql = `
-- 1. Tabel Utama Angkatan
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_code VARCHAR(32) UNIQUE NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    graduation_year INT NOT NULL DEFAULT 2026,
    city VARCHAR(100),
    package_name VARCHAR(100) DEFAULT 'Standard',
    student_count INT DEFAULT 0,
    page_count INT DEFAULT 80,
    cover_type VARCHAR(50) DEFAULT 'hardcover',
    status VARCHAR(50) DEFAULT 'active',
    current_stage INT DEFAULT 3,
    target_graduation VARCHAR(100),
    pic_name VARCHAR(150),
    pic_whatsapp VARCHAR(50),
    pm_assigned VARCHAR(150) DEFAULT 'Venny Meilinda',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Tahapan Produksi (Stepper 6 Tahap)
CREATE TABLE IF NOT EXISTS project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    target_date VARCHAR(100),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Termin Kas (Dinamis Bebas)
CREATE TABLE IF NOT EXISTS payment_installments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    installment_number INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    amount BIGINT NOT NULL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    due_date VARCHAR(100),
    receipt_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel Berkas & Arsip Cloudflare R2
CREATE TABLE IF NOT EXISTS project_deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    file_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size VARCHAR(50),
    r2_key TEXT NOT NULL,
    is_ready BOOLEAN DEFAULT FALSE,
    download_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabel Pengajuan Estimator / Form Order
CREATE TABLE IF NOT EXISTS prospect_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    pic_name VARCHAR(150) NOT NULL,
    pic_whatsapp VARCHAR(50) NOT NULL,
    student_count INT NOT NULL,
    page_count INT NOT NULL,
    cover_type VARCHAR(50) NOT NULL,
    addons JSONB DEFAULT '[]'::jsonb,
    estimated_price_per_student BIGINT NOT NULL,
    total_estimated_price BIGINT NOT NULL,
    target_graduation VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeks Pencarian Cepat
CREATE INDEX IF NOT EXISTS idx_projects_access_code ON projects(access_code);
CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_installments_project_id ON payment_installments(project_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_project_id ON project_deliverables(project_id);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_orders ENABLE ROW LEVEL SECURITY;

-- Policy Publik: Read-only untuk data project via access_code & insert prospect orders
DROP POLICY IF EXISTS "Public can view projects by access code" ON projects;
CREATE POLICY "Public can view projects by access code" ON projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view milestones" ON project_milestones;
CREATE POLICY "Public can view milestones" ON project_milestones FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view installments" ON payment_installments;
CREATE POLICY "Public can view installments" ON payment_installments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view deliverables" ON project_deliverables;
CREATE POLICY "Public can view deliverables" ON project_deliverables FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can submit prospect orders" ON prospect_orders;
CREATE POLICY "Public can submit prospect orders" ON prospect_orders FOR INSERT WITH CHECK (true);
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
    console.log('Migration Response Status:', res.statusCode);
    console.log('Body:', d);
  });
});

req.on('error', (e) => console.error('Migration Error:', e));
req.write(JSON.stringify({ query: sql }));
req.end();
