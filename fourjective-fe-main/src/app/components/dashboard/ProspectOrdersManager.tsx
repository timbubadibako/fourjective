"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, CheckCircle2, ArrowRight, Clock, FileCheck } from "lucide-react";
import { waLink } from "@/lib/site";

export interface ProspectOrder {
  id: string;
  project_id?: string;
  school_name?: string;
  pic_name: string;
  pic_whatsapp: string;
  student_count: number;
  page_count: number;
  cover_type: string;
  addons?: string[] | string;
  estimated_price_per_student: number;
  total_estimated_price: number;
  target_graduation?: string;
  status?: string;
  created_at?: string;
}

interface ProspectOrdersManagerProps {
  onConvertToMOU?: (order: ProspectOrder) => void;
}

export function ProspectOrdersManager({ onConvertToMOU }: ProspectOrdersManagerProps) {
  const [orders, setOrders] = useState<ProspectOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/prospects");
      if (res.ok) {
        const json = await res.json();
        setOrders(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="rounded-xl border border-dark/15 bg-white p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark/10 pb-4">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
            Kalkulator Tamu / Guest
          </span>
          <h3 className="font-headline font-black text-xl text-dark mt-0.5">
            Daftar Permohonan Penawaran Masuk
          </h3>
          <p className="font-sans text-xs text-dark/70 font-semibold mt-0.5">
            Data kalkulasi anggaran yang diajukan panitia sekolah melalui kalkulator kas portal.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-3 py-1 bg-[#FAF6F0] border border-dark/15 rounded-lg text-dark">
            {orders.length} Permohonan
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs font-mono text-dark/40">
          Memuat data permohonan...
        </div>
      ) : orders.length === 0 ? (
        <div className="py-12 text-center space-y-2">
          <p className="font-sans text-sm text-dark/70 font-semibold">
            Belum ada permohonan estimasi yang masuk.
          </p>
          <p className="font-mono text-xs text-dark/40">
            Form estimasi dari tamu di portal klien akan muncul otomatis di sini.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark/10 font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70">
                <th className="pb-3 font-bold uppercase tracking-wider">Nama PIC / Sekolah</th>
                <th className="pb-3 font-bold uppercase tracking-wider">WhatsApp</th>
                <th className="pb-3 font-bold uppercase tracking-wider">Spesifikasi</th>
                <th className="pb-3 font-bold uppercase tracking-wider">Estimasi Kas</th>
                <th className="pb-3 font-bold uppercase tracking-wider">Target Wisuda</th>
                <th className="pb-3 font-bold uppercase tracking-wider">Status</th>
                <th className="pb-3 font-bold uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark/5 font-sans">
              {orders.map((o) => {
                const isConverted = o.status === "converted";

                return (
                  <tr key={o.id} className="hover:bg-[#FAF6F0] transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-sans font-bold text-dark">
                        {o.school_name ? o.school_name : o.pic_name}
                      </div>
                      {o.school_name && (
                        <div className="font-sans text-[11px] text-dark/70">PIC: {o.pic_name}</div>
                      )}
                      <div className="font-mono text-[10px] font-bold text-dark/50">
                        {o.created_at ? new Date(o.created_at).toLocaleDateString("id-ID") : "Baru saja"}
                      </div>
                    </td>
                    <td className="py-3.5 font-mono text-dark font-bold">
                      {o.pic_whatsapp}
                    </td>
                    <td className="py-3.5">
                      <div className="font-sans font-bold text-dark">
                        {o.student_count} Siswa • {o.page_count} Hal
                      </div>
                      <div className="font-mono text-[10px] font-bold text-dark/70 uppercase">
                        Cover: {o.cover_type}
                      </div>
                    </td>
                    <td className="py-3.5">
                      <div className="font-mono font-bold text-dark">
                        Rp {o.estimated_price_per_student?.toLocaleString("id-ID")}/siswa
                      </div>
                      <div className="font-mono text-[10px] text-orange font-bold">
                        Total: Rp {o.total_estimated_price?.toLocaleString("id-ID")}
                      </div>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-dark">
                      {o.target_graduation || "Mei 2026"}
                    </td>
                    <td className="py-3.5 font-mono">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          isConverted
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {isConverted ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Converted</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            <span>Pending MOU</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {onConvertToMOU && !isConverted && (
                          <button
                            onClick={() => onConvertToMOU(o)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-dark hover:bg-orange text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                            title="Konversi jadi MOU Resmi"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>Konversi MOU</span>
                          </button>
                        )}

                        <a
                          href={waLink(
                            `Halo Kak ${o.pic_name}, kami dari Fourjective Studio menindaklanjuti permohonan estimasi buku tahunan (${o.student_count} siswa, cover ${o.cover_type}). Apakah jadwal meeting panitia bisa diatur minggu ini?`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange hover:bg-orange/90 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WA</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
