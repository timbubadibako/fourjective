"use client";

import { useState } from "react";
import { Save, Check, Eye, Type, PhoneCall, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CmsSandbox() {
  const [heroTitle, setHeroTitle] = useState("BUKU TAHUNAN DIGITAL INTERAKTIF & EKSKLUSIF");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Abadikan momen kenangan sekolah terbaikmu dengan perpaduan cetak fisik premium, animasi majalah 3D flipbook, dan video aftermovie berkualitas tinggi."
  );
  const [ctaText, setCtaText] = useState("Konsultasi & Penawaran Gratis");
  const [whatsappNumber, setWhatsappNumber] = useState("+62 812-3456-7890");
  const [emailContact, setEmailContact] = useState("hello@fourjectiv.com");
  const [livePreview, setLivePreview] = useState(true);
  const [saved, setSaved] = useState(false);

  const [testimonials, setTestimonials] = useState([
    { id: 1, name: "Komite SMAN 1 Jakarta", text: "Hasil flipbook digital sangat memuaskan dan memudahkan siswa membaca kenangan di mana saja!", school: "Angkatan 2025" },
    { id: 2, name: "Ketua OSIS Taruna Nusantara", text: "Kualitas cetak fisik dan hard cover sangat mewah, pengerjaan tepat waktu.", school: "Angkatan 2025" },
  ]);

  const handleSaveCMS = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900">CMS Landing Page & Sandbox</h2>
          <p className="text-xs text-slate-500">Kelola konten judul hero, penawaran layanan, kontak, dan testimoni.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setLivePreview(!livePreview)}
            className="flex items-center gap-1.5 text-xs font-semibold"
          >
            <Eye className="h-3.5 w-3.5" />
            {livePreview ? "Sembunyikan Live Preview" : "Tampilkan Live Preview"}
          </Button>

          <Button
            onClick={handleSaveCMS}
            className="flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold"
          >
            {saved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Save className="h-3.5 w-3.5" />}
            {saved ? "Disimpan!" : "Simpan Perubahan"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5 text-slate-800">
              <Type className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Hero Banner & Teks Utama</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Utama Hero (Headline)
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-900 focus:border-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi / Subtitle Hero
                </label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-700 focus:border-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teks Tombol CTA
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5 text-slate-800">
              <PhoneCall className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Informasi Kontak</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Official
                </label>
                <input
                  type="email"
                  value={emailContact}
                  onChange={(e) => setEmailContact(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5 text-slate-800">
              <MessageSquare className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Testimoni Klien</h3>
            </div>

            <div className="space-y-3">
              {testimonials.map((t, idx) => (
                <div key={t.id} className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800">Testimoni #{idx + 1}</span>
                    <span className="text-[10px] font-semibold text-slate-500">{t.school}</span>
                  </div>
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => {
                      const updated = [...testimonials];
                      updated[idx].name = e.target.value;
                      setTestimonials(updated);
                    }}
                    className="w-full mb-2 rounded border border-slate-300 px-2 py-1 text-xs font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={t.text}
                    onChange={(e) => {
                      const updated = [...testimonials];
                      updated[idx].text = e.target.value;
                      setTestimonials(updated);
                    }}
                    className="w-full rounded border border-slate-300 px-2 py-1 text-xs text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {livePreview && (
          <div className="lg:col-span-6">
            <div className="sticky top-6 rounded-xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl">
              <div className="mb-4 border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-400">Live Sandbox Preview</span>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h1 className="text-lg font-bold leading-tight text-white">{heroTitle}</h1>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{heroSubtitle}</p>

                <div className="mt-5 flex items-center gap-2">
                  <button className="rounded-lg bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900">
                    {ctaText}
                  </button>
                  <button className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-bold text-slate-300">
                    Lihat Galeri 3D
                  </button>
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-slate-800 pt-4">
                <p className="text-[11px] font-bold text-slate-400">Preview Testimoni</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {testimonials.map((t) => (
                    <div key={t.id} className="rounded-md border border-slate-800 bg-slate-900/60 p-2.5">
                      <p className="text-[10px] italic text-slate-300">"{t.text}"</p>
                      <p className="mt-1.5 text-[11px] font-bold text-white">{t.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-slate-800 pt-3 flex items-center justify-between text-[10px] text-slate-400">
                <span>WhatsApp: <strong className="text-white">{whatsappNumber}</strong></span>
                <span>Email: <strong className="text-white">{emailContact}</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
