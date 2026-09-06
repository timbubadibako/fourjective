"use client";

import { useState } from "react";
import {
  Sparkles,
  Save,
  Check,
  Eye,
  Type,
  FileText,
  MessageSquare,
  PhoneCall,
  Layout,
  RefreshCw,
} from "lucide-react";
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

  // Testimonials Sandbox state
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: "Komite SMAN 1 Jakarta", text: "Hasil flipbook digital sangat keren dan memudahkan siswa membaca kenangan di mana saja!", school: "Angkatan 2025" },
    { id: 2, name: "Ketua OSIS Taruna Nusantara", text: "Kualitas cetak fisik dan cetak hard cover sangat mewah, pengerjaan cepat dan tepat waktu.", school: "Angkatan 2025" },
  ]);

  const handleSaveCMS = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
            <Layout className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">CMS Landing Page & Content Sandbox</h2>
            <p className="text-xs text-slate-500">Kelola teks hero, penawaran layanan, kontak, dan isi testimoni untuk tampilan halaman depan.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setLivePreview(!livePreview)}
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <Eye className="h-4 w-4" />
            {livePreview ? "Sembunyikan Live Preview" : "Tampilkan Live Preview"}
          </Button>

          <Button
            onClick={handleSaveCMS}
            className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 text-xs font-bold"
          >
            {saved ? <Check className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4" />}
            {saved ? "Konten Disimpan!" : "Simpan Perubahan CMS"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Editor Form Column */}
        <div className="space-y-6 lg:col-span-6">
          {/* Section 1: Hero Banner Settings */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-purple-700 border-b pb-3">
              <Type className="h-5 w-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Hero Banner & Headline</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Utama Hero (Headline)
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-800 focus:border-purple-500 focus:outline-none"
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
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teks Tombol Aksi (CTA)
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Social Info */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-purple-700 border-b pb-3">
              <PhoneCall className="h-5 w-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Kontak & Telepon Agensi</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp Resmi
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Agensi
                </label>
                <input
                  type="email"
                  value={emailContact}
                  onChange={(e) => setEmailContact(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Testimonial Editor */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-purple-700 border-b pb-3">
              <MessageSquare className="h-5 w-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Testimoni Klien Sekolah</h3>
            </div>

            <div className="space-y-3">
              {testimonials.map((t, idx) => (
                <div key={t.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">Testimoni #{idx + 1}</span>
                    <span className="text-[10px] font-semibold text-purple-600">{t.school}</span>
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

        {/* Live Preview Column */}
        {livePreview && (
          <div className="lg:col-span-6">
            <div className="sticky top-6 rounded-2xl border border-slate-200/80 bg-slate-950 p-6 text-white shadow-xl">
              <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                  <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                  <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                  <span className="ml-2 text-xs font-bold text-slate-400">Live Sandbox Preview (Tampilan Halaman Depan)</span>
                </div>
                <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
              </div>

              {/* Simulated Hero Component */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm">
                <span className="inline-block rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-bold tracking-wider text-purple-300 uppercase mb-3">
                  ★ Fourjective Creative Studio
                </span>

                <h1 className="text-xl font-extrabold leading-tight text-white">{heroTitle}</h1>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">{heroSubtitle}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-500/30">
                    {ctaText}
                  </button>
                  <button className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300">
                    Lihat Galeri 3D
                  </button>
                </div>
              </div>

              {/* Simulated Testimonials Carousel */}
              <div className="mt-6 space-y-3 border-t border-slate-800 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Preview Testimoni Klien</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {testimonials.map((t) => (
                    <div key={t.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                      <p className="text-[11px] italic text-slate-300">"{t.text}"</p>
                      <p className="mt-2 text-xs font-bold text-purple-400">{t.name}</p>
                      <p className="text-[9px] text-slate-500">{t.school}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Footer Contacts */}
              <div className="mt-6 border-t border-slate-800 pt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>WhatsApp: <strong className="text-emerald-400">{whatsappNumber}</strong></span>
                <span>Email: <strong className="text-indigo-400">{emailContact}</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
