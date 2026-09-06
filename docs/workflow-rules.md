# Workflow Rules — Fourjective

Aturan kerja dan alur pengembangan proyek Fourjective.

## Pembagian Tugas & Alur Git
- Perubahan kode dilakukan per task kecil dengan commit bertahap yang spesifik.
- **Push Policy**: **JANGAN SEKALIPUN melakukan `git push` otomatis ke `main` / remote**. `git push` dilakukan **HANYA jika diperintahkan secara eksplisit** oleh user.
- Verifikasi lokal (`npx tsc`, `npm run build`, `node --check`) dilakukan sesuai kebutuhan task.

## Commit Strategy
- Commit dibuat per task kecil dengan nama scope yang jelas (contoh: `fix(fe): ...`, `feat(be): ...`).
- Setelah commit, berikan ringkasan singkat perubahan dan file yang terdampak.

## Verifikasi & Komunikasi
- Verifikasi rutin dilakukan seefisien mungkin agar hemat waktu dan token.
- Komunikasi fokus pada poin perubahan utama tanpa penjelasan bertele-tele.
