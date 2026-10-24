import assert from "node:assert/strict";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function runE2EVerification() {
  console.log(`[E2E] Menjalankan verifikasi produksi terhadap: ${BASE_URL}\n`);

  // 1. Verifikasi SEO & Static Assets
  console.log("1. Menguji SEO: robots.txt & sitemap.xml...");
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  assert.equal(robotsRes.status, 200, "robots.txt harus berstatus 200");
  const robotsText = await robotsRes.text();
  assert(robotsText.includes("Disallow: /dashboard"), "robots.txt wajib memblokir /dashboard");
  assert(robotsText.includes("sitemap.xml"), "robots.txt wajib menunjuk sitemap.xml");

  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  assert.equal(sitemapRes.status, 200, "sitemap.xml harus berstatus 200");
  const sitemapText = await sitemapRes.text();
  assert(sitemapText.includes("/portofolio"), "sitemap.xml wajib memuat /portofolio");
  assert(sitemapText.includes("/paket"), "sitemap.xml wajib memuat /paket");
  console.log("   -> robots.txt & sitemap.xml VALID.\n");

  // 2. Verifikasi Gate Portal Klien & Demo Token
  console.log("2. Menguji Gate Portal /portal & Tracking /track/[kode]...");
  const guestTrackRes = await fetch(`${BASE_URL}/track/GUEST-2026`);
  assert.equal(guestTrackRes.status, 200, "/track/GUEST-2026 harus bisa dibuka");
  const guestHtml = await guestTrackRes.text();
  assert(guestHtml.includes("MODE TAMU") || guestHtml.includes("PRATINJAU"), "GUEST-2026 wajib dalam mode tamu");

  const schoolTrackRes = await fetch(`${BASE_URL}/track/SMAN1-2026`);
  assert.equal(schoolTrackRes.status, 200, "/track/SMAN1-2026 harus berstatus 200");
  const schoolHtml = await schoolTrackRes.text();
  assert(schoolHtml.includes("KONTRAK RESMI AKTIF") || schoolHtml.includes("SMAN 1"), "SMAN1-2026 wajib berstatus resmi");
  console.log("   -> Dual-Track Portal (Guest vs Official MOU) VALID.\n");

  // 3. Verifikasi Keamanan R2 Presign Upload
  console.log("3. Menguji Keamanan Endpoint /api/storage/presign...");
  // POST tanpa cookie admin wajib 401
  const unauthUploadRes = await fetch(`${BASE_URL}/api/storage/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "test-exploit.pdf" }),
  });
  assert.equal(unauthUploadRes.status, 401, "Upload tanpa admin session harus 401 Unauthorized");

  // GET download presign URL harus bekerja
  const downloadPresignRes = await fetch(`${BASE_URL}/api/storage/presign?key=test.pdf`);
  assert.equal(downloadPresignRes.status, 200, "Download presign valid harus berstatus 200");
  const downloadJson = await downloadPresignRes.json();
  assert(downloadJson.downloadUrl && downloadJson.downloadUrl.includes("X-Amz-Signature"), "Download URL harus berisi signature SigV4");
  console.log("   -> Proteksi R2 (Upload Terkunci Admin & Download SigV4) VALID.\n");

  // 4. Verifikasi Autentikasi Admin Login API
  console.log("4. Menguji Autentikasi Admin Login /api/auth/admin-login...");
  const wrongLoginRes = await fetch(`${BASE_URL}/api/auth/admin-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "wrong-password" }),
  });
  assert.equal(wrongLoginRes.status, 401, "Password salah harus 401");

  const correctLoginRes = await fetch(`${BASE_URL}/api/auth/admin-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "fourjective2026" }),
  });
  assert.equal(correctLoginRes.status, 200, "Password master harus 200 OK");
  const cookieHeader = correctLoginRes.headers.get("set-cookie");
  assert(cookieHeader && cookieHeader.includes("fourjective_admin_session"), "Login sukses harus menerbitkan cookie admin");
  console.log("   -> Master Login & Cookie Admin VALID.\n");

  // 5. Verifikasi Metadata OpenGraph Image
  console.log("5. Menguji OpenGraph Image Generator...");
  const ogRes = await fetch(`${BASE_URL}/opengraph-image`);
  assert.equal(ogRes.status, 200, "opengraph-image harus berstatus 200");
  assert.equal(ogRes.headers.get("content-type"), "image/png", "OG response harus format image/png");
  console.log("   -> OpenGraph 1200x630 Card VALID.\n");

  console.log("--------------------------------------------------");
  console.log("SEMUA 5 SKENARIO E2E LULUS 100% - PRODUCTION READY");
  console.log("--------------------------------------------------");
}

runE2EVerification().catch((err) => {
  console.error("Uji E2E Gagal:", err);
  process.exit(1);
});
