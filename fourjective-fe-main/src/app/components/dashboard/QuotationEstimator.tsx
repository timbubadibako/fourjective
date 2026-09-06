"use client";

import { useState } from "react";
import { Calculator, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuotationEstimator() {
  const [siswa, setSiswa] = useState<number>(200);
  const [halaman, setHalaman] = useState<number>(100);
  const [coverType, setCoverType] = useState<string>("hardcover");
  const [includeVideo, setIncludeVideo] = useState<boolean>(true);
  const [includeAR, setIncludeAR] = useState<boolean>(false);
  const [includeMerch, setIncludeMerch] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  let basePricePerPage = 1200;
  let coverCost = 40000;

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
📌 ESTIMASI PENAWARAN PAKET BUKU TAHUNAN — FOURJECTIVE
--------------------------------------------------
- Jumlah Siswa: ${siswa} Siswa
- Jumlah Halaman: ${halaman} Halaman
- Jenis Cover: ${coverType.toUpperCase()}
- Add-ons: ${[includeVideo && "Video Aftermovie", includeAR && "AR Interactive", includeMerch && "Merchandise Box"].filter(Boolean).join(", ")}

💰 Estimasi Biaya per Siswa: Rp ${pricePerStudent.toLocaleString("id-ID")}
💵 Total Estimasi Proyek: Rp ${totalProjectPrice.toLocaleString("id-ID")}
--------------------------------------------------
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-900">Kalkulator Estimasi Paket</h2>
        <p className="text-xs text-slate-500">Hitung perkiraan harga paket buku tahunan per siswa secara instan.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jumlah Siswa (Eksemplar)
              </label>
              <input
                type="number"
                min={20}
                max={2000}
                value={siswa}
                onChange={(e) => setSiswa(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-slate-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jumlah Halaman Cetak
              </label>
              <input
                type="number"
                min={20}
                max={500}
                value={halaman}
                onChange={(e) => setHalaman(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Pilihan Cover Buku
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { key: "hardcover", label: "Hardcover Standard", price: "Base" },
                { key: "leather", label: "Leather Premium", price: "+Rp 35rb" },
                { key: "acrylic", label: "Acrylic Luxury", price: "+Rp 70rb" },
              ].map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCoverType(c.key)}
                  className={`rounded-lg border p-2.5 text-left transition-all ${
                    coverType === c.key
                      ? "border-slate-900 bg-slate-900 text-white font-bold"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <p className="text-xs font-semibold">{c.label}</p>
                  <p className={`text-[10px] mt-0.5 ${coverType === c.key ? "text-slate-300" : "text-slate-400"}`}>{c.price}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Fitur Tambahan (Add-ons Digital & Merch)
            </label>
            <div className="space-y-2">
              {[
                { checked: includeVideo, onChange: setIncludeVideo, label: "Video Aftermovie (QR Digital Integration)", price: "Rp 25.000 / siswa" },
                { checked: includeAR, onChange: setIncludeAR, label: "Augmented Reality (AR Experience)", price: "Rp 35.000 / siswa" },
                { checked: includeMerch, onChange: setIncludeMerch, label: "Merchandise Box (Tote Bag & Sticker)", price: "Rp 45.000 / siswa" },
              ].map((addon, i) => (
                <label key={i} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 cursor-pointer hover:bg-slate-100/50">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addon.checked}
                      onChange={(e) => addon.onChange(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                    />
                    <span className="text-xs font-medium text-slate-800">{addon.label}</span>
                  </div>
                  <span className="text-xs text-slate-500">{addon.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-900 p-6 text-white lg:col-span-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ringkasan Estimasi</p>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs text-slate-400">Biaya Paket per Siswa</p>
                <h3 className="text-2xl font-bold text-white">
                  Rp {pricePerStudent.toLocaleString("id-ID")}
                </h3>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <p className="text-xs text-slate-400">Total Proyek ({siswa} Eksemplar)</p>
                <h4 className="text-xl font-bold text-slate-200">
                  Rp {totalProjectPrice.toLocaleString("id-ID")}
                </h4>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button
              onClick={handleCopyQuotation}
              className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 py-2.5"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied ? "Salinan Tersimpan!" : "Salin Ringkasan Penawaran"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
