"use client";

import { useState } from "react";
import { Calculator, Copy, Check, Sliders, ShieldCheck, PieChart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuotationEstimator() {
  const [siswa, setSiswa] = useState<number>(200);
  const [halaman, setHalaman] = useState<number>(100);
  const [coverType, setCoverType] = useState<string>("hardcover");
  const [includeVideo, setIncludeVideo] = useState<boolean>(true);
  const [includeAR, setIncludeAR] = useState<boolean>(false);
  const [includeMerch, setIncludeMerch] = useState<boolean>(true);
  const [targetMargin, setTargetMargin] = useState<number>(35); // Margin 35% default
  const [copied, setCopied] = useState<boolean>(false);

  // Breakdown HPP Riil Produksi Buku Tahunan Fourjective
  const basePrintCostPerPage = 750; // Biaya cetak isi art paper per halaman
  const bindingFinishingCost = 15000; // Jilid lem panas, jahit benang, laminasi doff/glossy

  let coverHppCost = 28000;
  if (coverType === "leather") coverHppCost = 55000;
  if (coverType === "acrylic") coverHppCost = 85000;

  let addonHppCost = 0;
  if (includeVideo) addonHppCost += 12000; // QR Cloud + hosting video 5 tahun
  if (includeAR) addonHppCost += 18000;    // Target AR marker cloud license
  if (includeMerch) addonHppCost += 25000; // Tote bag kanvas sablon + sticker pack vinyl

  // HPP Total per Siswa
  const printCostPerBook = halaman * basePrintCostPerPage;
  const hppPerStudent = printCostPerBook + bindingFinishingCost + coverHppCost + addonHppCost;
  const totalHppProject = hppPerStudent * siswa;

  // Harga Jual Penawaran Berdasarkan Target Margin Kas
  // Rumus: Harga Jual = HPP / (1 - Margin%)
  const marginDecimal = Math.min(Math.max(targetMargin, 10), 70) / 100;
  const pricePerStudent = Math.round(hppPerStudent / (1 - marginDecimal) / 1000) * 1000;
  const totalProjectPrice = pricePerStudent * siswa;
  const totalGrossProfit = totalProjectPrice - totalHppProject;

  const handleCopyQuotation = () => {
    const summary = `
📌 ESTIMASI PENAWARAN PAKET BUKU TAHUNAN — FOURJECTIVE
--------------------------------------------------
- Jumlah Siswa: ${siswa} Siswa
- Jumlah Halaman: ${halaman} Halaman Cetak
- Jenis Cover: ${coverType.toUpperCase()}
- Add-ons: ${[includeVideo && "Video Aftermovie (QR)", includeAR && "AR Interactive 3D", includeMerch && "Merchandise Exclusive Box"].filter(Boolean).join(", ") || "Standar"}

💰 Estimasi Biaya per Siswa: Rp ${pricePerStudent.toLocaleString("id-ID")}
💵 Total Estimasi Proyek: Rp ${totalProjectPrice.toLocaleString("id-ID")}
--------------------------------------------------
*Estimasi resmi Fourjective Creative Lab. Harga final mengikuti kesepakatan MoU & spesifikasi layout.*
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-dark/15 p-5 sm:p-6 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange/10 border border-orange/20 text-orange">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-headline font-black text-dark uppercase tracking-wide">
                Kalkulator Estimasi Kas & HPP
              </h2>
              <p className="font-sans font-semibold text-xs text-dark/60">
                Simulasi presisi komponen HPP cetak, add-on digital, dan margin penawaran resmi sekolah.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-3 py-1 bg-[#FAF6F0] border border-dark/15 rounded-lg text-dark">
            {siswa} Siswa • {halaman} Hal
          </span>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
            Margin {targetMargin}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Input Controls & Sliders */}
        <div className="space-y-5 lg:col-span-7 bg-white border border-dark/15 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between pb-3.5 border-b border-dark/10">
            <h3 className="font-headline font-black text-base text-dark uppercase tracking-tight flex items-center gap-2">
              <Sliders className="w-4 h-4 text-orange" />
              <span>Parameter & Skala Volume</span>
            </h3>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dark/40">
              Cetak & Spesifikasi
            </span>
          </div>

          {/* Sliders & Numeric Inputs */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="bg-[#FAF6F0] p-4 rounded-xl border border-dark/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70">
                  Jumlah Siswa (Eksemplar)
                </label>
                <span className="font-mono text-xs font-black text-orange bg-white px-2 py-0.5 rounded border border-dark/15">
                  {siswa} Siswa
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={1000}
                step={10}
                value={siswa}
                onChange={(e) => setSiswa(Number(e.target.value) || 30)}
                className="w-full accent-orange cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] font-bold text-dark/40">
                <span>30 Min</span>
                <span>500 Mid</span>
                <span>1000 Max</span>
              </div>
            </div>

            <div className="bg-[#FAF6F0] p-4 rounded-xl border border-dark/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70">
                  Jumlah Halaman Cetak
                </label>
                <span className="font-mono text-xs font-black text-dark bg-white px-2 py-0.5 rounded border border-dark/15">
                  {halaman} Hal
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={300}
                step={8}
                value={halaman}
                onChange={(e) => setHalaman(Number(e.target.value) || 40)}
                className="w-full accent-orange cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] font-bold text-dark/40">
                <span>40 Hal</span>
                <span>160 Hal</span>
                <span>300 Hal</span>
              </div>
            </div>
          </div>

          {/* Cover Selection */}
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70 mb-2">
              Pilihan Material Cover Buku
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { key: "hardcover", label: "Hardcover Standard", desc: "Board tebal laminasi doff", price: "HPP Base" },
                { key: "leather", label: "Leather Premium", desc: "Kulit sintetis emboss emas", price: "+Rp 27rb HPP" },
                { key: "acrylic", label: "Acrylic Luxury", desc: "Akrilik grafir laser kustom", price: "+Rp 57rb HPP" },
              ].map((c) => {
                const isSelected = coverType === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCoverType(c.key)}
                    className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-orange bg-orange/10 shadow-sm"
                        : "border-dark/15 bg-white hover:border-dark/30 hover:bg-[#FAF6F0]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-headline font-bold text-xs uppercase tracking-wide text-dark">
                        {c.label}
                      </p>
                      {isSelected && <ShieldCheck className="w-3.5 h-3.5 text-orange shrink-0" />}
                    </div>
                    <p className="font-sans font-semibold text-[10px] text-dark/60 mt-1 leading-snug">
                      {c.desc}
                    </p>
                    <p className={`font-mono text-[10px] font-black uppercase tracking-wider mt-2 ${
                      isSelected ? "text-orange" : "text-dark/40"
                    }`}>
                      {c.price}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons Digital & Merchandise */}
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70 mb-2">
              Fitur Tambahan Digital & Merchandise
            </label>
            <div className="space-y-2">
              {[
                {
                  checked: includeVideo,
                  onChange: setIncludeVideo,
                  label: "Video Aftermovie & QR Cloud Integration",
                  sublabel: "Akses streaming cloud aktif 5 tahun terintegrasi halaman flipbook",
                  price: "+Rp 12.000 HPP",
                },
                {
                  checked: includeAR,
                  onChange: setIncludeAR,
                  label: "Augmented Reality (AR 3D Interactive)",
                  sublabel: "Scan foto kelas memunculkan video motion animasi 3D live",
                  price: "+Rp 18.000 HPP",
                },
                {
                  checked: includeMerch,
                  onChange: setIncludeMerch,
                  label: "Merchandise Box Set (Tote Bag + Stiker)",
                  sublabel: "Packaging box eksklusif Fourjective untuk setiap siswa",
                  price: "+Rp 25.000 HPP",
                },
              ].map((addon, i) => (
                <label
                  key={i}
                  className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                    addon.checked
                      ? "border-orange/60 bg-orange/5"
                      : "border-dark/15 bg-white hover:bg-[#FAF6F0]/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={addon.checked}
                      onChange={(e) => addon.onChange(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-dark/20 text-orange accent-orange focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="font-sans font-bold text-xs text-dark block">
                        {addon.label}
                      </span>
                      <span className="font-sans font-semibold text-[10px] text-dark/50 block mt-0.5">
                        {addon.sublabel}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-dark/60 bg-[#FAF6F0] px-2 py-1 rounded border border-dark/10 shrink-0 ml-2">
                    {addon.price}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Margin Slider */}
          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-dark/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70">
                Target Margin Keuntungan Bersih
              </label>
              <span className="font-mono text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {targetMargin}% Gross Margin
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={60}
              step={5}
              value={targetMargin}
              onChange={(e) => setTargetMargin(Number(e.target.value) || 30)}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] font-bold text-dark/40">
              <span>15% Ramah Sekolah</span>
              <span>35% Standar Industri</span>
              <span>60% Premium High-End</span>
            </div>
          </div>
        </div>

        {/* Right Column: HPP Breakdown & Final Quote Output */}
        <div className="space-y-6 lg:col-span-5 flex flex-col">
          {/* Card 1: HPP Cost Structure Breakdown */}
          <div className="rounded-2xl border border-dark/15 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dark/10">
              <p className="font-headline font-black text-xs uppercase tracking-wider text-dark flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5 text-dark/60" />
                <span>Rincian Komponen HPP Riil</span>
              </p>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dark/50 bg-[#FAF6F0] px-2 py-0.5 rounded border border-dark/10">
                Internal Kas
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-dark/70">
                <span className="font-sans font-semibold">Cetak Isi ({halaman} hal × Rp 750)</span>
                <span className="font-bold text-dark">Rp {printCostPerBook.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center justify-between text-dark/70">
                <span className="font-sans font-semibold">Finishing Jilid & Laminasi</span>
                <span className="font-bold text-dark">Rp {bindingFinishingCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center justify-between text-dark/70">
                <span className="font-sans font-semibold">Material Cover ({coverType})</span>
                <span className="font-bold text-dark">Rp {coverHppCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center justify-between text-dark/70">
                <span className="font-sans font-semibold">Add-on Digital & Merch</span>
                <span className="font-bold text-dark">Rp {addonHppCost.toLocaleString("id-ID")}</span>
              </div>

              <div className="pt-3 border-t border-dark/10 flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-dark uppercase font-black">HPP Dasar / Siswa</span>
                <span className="text-dark font-black text-sm">Rp {hppPerStudent.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-dark/60">
                <span>Total Modal Produksi ({siswa} Eks)</span>
                <span className="font-bold">Rp {totalHppProject.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Official Quote Display & Action */}
          <div className="flex-1 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121318] p-6 text-white shadow-xl">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange" />
                  <span>Rekomendasi Penawaran Klien</span>
                </p>
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Margin {targetMargin}%
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Harga Penawaran per Siswa
                  </p>
                  <h3 className="text-3xl font-headline font-black text-orange mt-1 tracking-tight">
                    Rp {pricePerStudent.toLocaleString("id-ID")}
                    <span className="font-mono text-xs text-white/40 font-normal"> / siswa</span>
                  </h3>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Total Nilai Kontrak Proyek ({siswa} Eksemplar)
                  </p>
                  <h4 className="text-2xl font-headline font-black text-white mt-0.5 tracking-tight">
                    Rp {totalProjectPrice.toLocaleString("id-ID")}
                  </h4>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60 font-semibold font-sans">Estimasi Laba Kotor Kas</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    +Rp {totalGrossProfit.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Button
                onClick={handleCopyQuotation}
                className="w-full bg-orange hover:bg-orange/90 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 py-3 rounded-xl shadow-lg cursor-pointer transition-all active:scale-[0.98]"
              >
                {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
                {copied ? "Ringkasan Tersalin!" : "Salin Format Penawaran"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
