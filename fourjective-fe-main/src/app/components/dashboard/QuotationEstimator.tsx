"use client";

import { useState } from "react";
import { Calculator, Copy, Check, Sparkles, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuotationEstimator() {
  const [siswa, setSiswa] = useState<number>(200);
  const [halaman, setHalaman] = useState<number>(100);
  const [coverType, setCoverType] = useState<string>("hardcover");
  const [includeVideo, setIncludeVideo] = useState<boolean>(true);
  const [includeAR, setIncludeAR] = useState<boolean>(false);
  const [includeMerch, setIncludeMerch] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Price Calculation Logic
  let basePricePerPage = 1200; // Rp 1.200 per halaman per siswa
  let coverCost = 40000; // Hardcover base

  if (coverType === "leather") coverCost = 75000;
  if (coverType === "acrylic") coverCost = 110000;

  let addOnPrice = 0;
  if (includeVideo) addOnPrice += 25000;
  if (includeAR) addOnPrice += 35000;
  if (includeMerch) addOnPrice += 45000;

  const pricePerStudent = Math.round((halaman * basePricePerPage) + coverCost + addOnPrice);
  const totalProjectPrice = pricePerStudent * siswa;

  const handleCopyQuotation = () => {
    const summary = `
📌 ESTIKASI PENAWARAN PAKET BUKU TAHUNAN — FOURJECTIVE
--------------------------------------------------
- Jumlah Siswa: ${siswa} Siswa
- Jumlah Halaman: ${halaman} Halaman
- Jenis Cover: ${coverType.toUpperCase()}
- Add-ons: ${[includeVideo && "Video Aftermovie", includeAR && "AR Interactive", includeMerch && "Merchandise Box"].filter(Boolean).join(", ")}

💰 Estimasi Biaya per Siswa: Rp ${pricePerStudent.toLocaleString("id-ID")}
💵 Total Estimasi Proyek: Rp ${totalProjectPrice.toLocaleString("id-ID")}
--------------------------------------------------
*Harga belum termasuk diskon negosiasi komite sekolah.
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Price Estimator & Quotation Generator</h2>
            <p className="text-xs text-slate-500">Hitung estimasi harga penawaran paket buku tahunan secara instan untuk komite sekolah.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Form Inputs */}
        <div className="space-y-5 lg:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Jumlah Siswa (Eksemplar)
              </label>
              <input
                type="number"
                min={20}
                max={2000}
                value={siswa}
                onChange={(e) => setSiswa(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Jumlah Halaman Cetak
              </label>
              <input
                type="number"
                min={20}
                max={500}
                value={halaman}
                onChange={(e) => setHalaman(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Jenis Cover Buku
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "hardcover", label: "Hardcover Standard", price: "Base" },
                { key: "leather", label: "Leather Premium", price: "+Rp 35.000" },
                { key: "acrylic", label: "Acrylic Luxury", price: "+Rp 70.000" },
              ].map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCoverType(c.key)}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    coverType === c.key
                      ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800">{c.label}</p>
                  <p className="text-[10px] text-slate-500">{c.price}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Fitur Tambahan (Add-ons Digital & Merch)
            </label>
            <div className="space-y-2">
              {[
                { checked: includeVideo, onChange: setIncludeVideo, label: "Video Aftermovie & Teaser (Digital QR Integration)", price: "Rp 25.000 / siswa" },
                { checked: includeAR, onChange: setIncludeAR, label: "Interactive Augmented Reality (AR Experience)", price: "Rp 35.000 / siswa" },
                { checked: includeMerch, onChange: setIncludeMerch, label: "Exclusive Merchandise Box (Tote Bag & Sticker Pack)", price: "Rp 45.000 / siswa" },
              ].map((addon, i) => (
                <label key={i} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addon.checked}
                      onChange={(e) => addon.onChange(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">{addon.label}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">{addon.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Estimation Summary Box */}
        <div className="flex flex-col justify-between rounded-xl bg-slate-900 p-6 text-white lg:col-span-5">
          <div>
            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Hasil Estimasi Penawaran</span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-slate-400">Estimasi Biaya Paket per Siswa</p>
                <h3 className="text-3xl font-extrabold text-white">
                  Rp {pricePerStudent.toLocaleString("id-ID")}
                </h3>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <p className="text-xs text-slate-400">Total Proyek ({siswa} Eksemplar)</p>
                <h4 className="text-2xl font-bold text-blue-400">
                  Rp {totalProjectPrice.toLocaleString("id-ID")}
                </h4>
              </div>

              <div className="space-y-1 text-xs text-slate-400 border-t border-slate-800 pt-3">
                <p>✓ Termasuk cetak full color & jilid premium</p>
                <p>✓ Termasuk lisensi Virtual Flipbook 3D Online</p>
                <p>✓ Bebas revisi layout 2x</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4">
            <Button
              onClick={handleCopyQuotation}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-center gap-2 py-3"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "Penawaran Berhasil Disalin!" : "Salin Ringkasan Penawaran"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
