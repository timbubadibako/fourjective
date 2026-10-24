"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Coins,
  TrendingUp,
  Inbox,
  Users,
  ArrowRight,
} from "lucide-react";
import { AdminProject } from "./MOUProjectManager";

interface ExecutiveCockpitProps {
  projects: AdminProject[];
  onNavigateTab: (tab: "overview" | "mou" | "handoff" | "prospects" | "timeline") => void;
}

export function ExecutiveCockpit({ projects, onNavigateTab }: ExecutiveCockpitProps) {
  const [prospectCount, setProspectCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/admin/prospects")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json?.data) {
          const pending = json.data.filter((item: any) => item.status !== "converted");
          setProspectCount(pending.length);
        }
      })
      .catch((err) => console.error("Gagal load prospek di ExecutiveCockpit:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const totalProjects = projects.length;

  const criticalProjects = projects.filter((p) => {
    const hasUnpaid = p.payment_installments?.some((i) => i.status === "pending");
    return p.current_stage === 1 || (p.current_stage >= 4 && hasUnpaid);
  });

  const attentionProjects = projects.filter(
    (p) => p.current_stage >= 2 && p.current_stage <= 4 && !criticalProjects.includes(p)
  );

  const smoothProjects = projects.filter(
    (p) => (p.current_stage >= 5 || p.status === "completed") && !criticalProjects.includes(p)
  );

  let totalContractValue = 0;
  let totalCashVerified = 0;

  projects.forEach((p) => {
    const studentPrice = 165000;
    const projectTotal = (p.student_count || 150) * studentPrice;
    totalContractValue += projectTotal;

    p.payment_installments?.forEach((inst) => {
      if (inst.status === "paid") {
        totalCashVerified += Number(inst.amount) || 0;
      }
    });
  });

  const pendingCash = totalContractValue - totalCashVerified;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-dark/15 p-5 sm:p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-orange">
              RINGKASAN STATUS STUDIO
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#18181B] text-white border border-dark/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live PostgreSQL
            </span>
          </div>
          <h2 className="font-headline font-black text-2xl text-dark mt-1">
            Ringkasan Studio &amp; Arus Kas
          </h2>
          <p className="font-sans text-xs font-semibold text-dark/70 mt-1">
            Pantau arus kas termin, pengerjaan buku sekolah, dan permohonan baru secara ringkas.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab("mou")}
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-orange/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <span>Kelola Proyek Sekolah</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* 3 Status Utama: Berjalan Lancar, Perlu Pengecekan, Kritis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Normal */}
        <div className="bg-white border-2 border-emerald-600/20 hover:border-emerald-600/40 rounded-2xl p-5 sm:p-6 shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-black uppercase tracking-wider bg-emerald-950/5 text-emerald-900 border border-emerald-900/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Berjalan Lancar
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-headline font-black text-4xl text-dark">
                {smoothProjects.length}
              </span>
              <span className="font-headline font-bold text-sm text-dark/60 uppercase">sekolah</span>
            </div>
            <p className="font-sans text-xs font-semibold text-dark/75 mt-2 leading-relaxed">
              {smoothProjects.length > 0
                ? "Tahap percetakan & pengiriman berjalan sesuai target wisuda."
                : "Belum ada proyek yang memasuki tahap cetak akhir."}
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-dark/10 flex items-center justify-between font-mono text-[11px] text-dark/70 font-black">
            <span>Status Jadwal</span>
            <span className="font-mono text-[10px] font-bold text-dark/70 bg-[#FAF6F0] px-2 py-0.5 rounded border border-dark/10">
              {smoothProjects.length > 0 ? "Tepat Waktu" : "Standby"}
            </span>
          </div>
        </div>

        {/* Perlu Perhatian */}
        <div className="bg-white border-2 border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Perlu Pengecekan
              </span>
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-headline font-black text-4xl text-dark">
                {attentionProjects.length}
              </span>
              <span className="font-headline font-bold text-sm text-dark/60 uppercase">sekolah</span>
            </div>
            <p className="font-sans text-xs font-semibold text-dark/75 mt-2 leading-relaxed">
              {attentionProjects.length > 0
                ? "Tahap layouting & menunggu acc dummy dari panitia/sekolah."
                : "Tidak ada proyek tertunda di tahap desain & dummy."}
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-dark/10 flex items-center justify-between font-mono text-[11px] text-dark/70 font-black">
            <span>Status Proses</span>
            <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {attentionProjects.length > 0 ? "Menunggu ACC" : "Aman"}
            </span>
          </div>
        </div>

        {/* Kritis */}
        <div className="bg-white border-2 border-rose-500/20 hover:border-rose-500/40 rounded-2xl p-5 sm:p-6 shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-950 border border-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                Perlu Tindakan
              </span>
              <AlertCircle className="w-5 h-5 text-rose-600" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-headline font-black text-4xl text-dark">
                {criticalProjects.length}
              </span>
              <span className="font-headline font-bold text-sm text-dark/60 uppercase">sekolah</span>
            </div>
            <p className="font-sans text-xs font-semibold text-dark/75 mt-2 leading-relaxed">
              {criticalProjects.length > 0
                ? "Ada termin pembayaran panitia yang tertahan sebelum naik cetak."
                : "Semua termin kas dan alur pengerjaan saat ini aman."}
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-dark/10 flex items-center justify-between font-mono text-[11px] text-dark/70 font-black">
            <span>Prioritas</span>
            <span className={criticalProjects.length > 0 ? "text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200" : "text-dark/60"}>
              {criticalProjects.length > 0 ? "Follow-up PIC" : "Nol Kendala"}
            </span>
          </div>
        </div>
      </div>

      {/* Ringkasan Finansial & Permohonan Calon Sekolah */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Arus Kas (7 Kolom) */}
        <div className="lg:col-span-7 bg-white border border-dark/15 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-dark/10">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-orange" />
                <h3 className="font-headline font-black text-lg text-dark">
                  Ringkasan Arus Kas Masuk
                </h3>
              </div>
              <span className="font-mono text-[11px] font-black text-dark/70 bg-slate-100 px-2.5 py-0.5 rounded border border-dark/10">
                Musim 2026
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-dark/15">
                <span className="font-mono text-[11px] font-black uppercase tracking-wider text-dark/60">Total Kontrak</span>
                <div className="font-headline font-black text-2xl text-dark mt-1">
                  Rp {totalContractValue.toLocaleString("id-ID")}
                </div>
                <span className="font-sans text-xs font-semibold text-dark/60">Nilai kontrak MOU</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-dark/15">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="font-mono text-[11px] font-black uppercase tracking-wider text-dark/70">Sudah Diterima</span>
                </div>
                <div className="font-headline font-black text-2xl text-dark mt-1">
                  Rp {totalCashVerified.toLocaleString("id-ID")}
                </div>
                <span className="font-sans text-xs font-semibold text-dark/60">DP &amp; termin lunas</span>
              </div>

              <div className="p-4 rounded-xl bg-orange/10 border border-orange/30">
                <span className="font-mono text-[11px] font-black uppercase tracking-wider text-orange">Sisa Piutang</span>
                <div className="font-headline font-black text-2xl text-orange mt-1">
                  Rp {pendingCash.toLocaleString("id-ID")}
                </div>
                <span className="font-sans text-xs font-semibold text-dark/60">Jadwal cetak/kirim</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-dark/10 flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-dark/70">
              Proteksi: Buku tidak dikirim ke percetakan sebelum Termin 2 selesai
            </span>
            <button
              onClick={() => onNavigateTab("mou")}
              className="text-orange hover:text-orange/80 font-mono text-xs font-black inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Audit Pembayaran</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Calon Sekolah & Permohonan (5 Kolom) */}
        <div className="lg:col-span-5 bg-white border border-dark/15 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-dark/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange" />
                <h3 className="font-headline font-black text-lg text-dark">
                  Calon Sekolah Baru
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#18181B] text-white border border-dark/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Online Live
              </span>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF6F0] border border-dark/15 hover:border-dark/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-dark/10 text-dark flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-sm text-dark">Tamu Aktif Pegang Token</div>
                    <div className="font-sans text-xs font-semibold text-dark/60">Melihat katalog &amp; kalkulator</div>
                  </div>
                </div>
                <span className="font-headline font-black text-base px-3 py-1 rounded-lg bg-white border border-dark/20 text-dark shadow-sm">
                  5
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF6F0] border border-dark/15 hover:border-dark/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange/10 text-orange flex items-center justify-center font-bold">
                    <Inbox className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-sm text-dark">Permohonan Masuk</div>
                    <div className="font-sans text-xs font-semibold text-dark/60">Minta sampel buku / meeting</div>
                  </div>
                </div>
                <span className="font-headline font-black text-xs px-3 py-1.5 rounded-lg bg-orange text-white shadow-sm">
                  {prospectCount > 0 ? `${prospectCount} baru` : "0 baru"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-dark/10 flex items-center justify-between font-mono text-xs">
            <span className="text-dark/60 text-[11px] font-bold">Sinkron real-time</span>
            <button
              onClick={() => onNavigateTab("prospects")}
              className="text-dark hover:text-orange font-black text-xs inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Inbox Permohonan</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
