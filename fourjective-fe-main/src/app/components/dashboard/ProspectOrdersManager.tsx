"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Clock, Users, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { waLink } from "@/lib/site";

interface ProspectOrder {
  id: string;
  project_id?: string;
  pic_name: string;
  pic_whatsapp: string;
  student_count: number;
  page_count: number;
  cover_type: string;
  addons?: string[] | string;
  estimated_price_per_student: number;
  total_estimated_price: number;
  target_graduation?: string;
  created_at?: string;
}

export function ProspectOrdersManager() {
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
                <th className="pb-3 font-bold uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark/5 font-sans">
              {orders.map((o) => {
                const addonsList = Array.isArray(o.addons)
                  ? o.addons
                  : typeof o.addons === "string"
                  ? [o.addons]
                  : [];

                return (
                  <tr key={o.id} className="hover:bg-[#FAF6F0] transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-sans font-bold text-dark">{o.pic_name}</div>
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
                    <td className="py-3.5 text-right">
                      <a
                        href={waLink(
                          `Halo Kak ${o.pic_name}, kami dari Fourjective Studio menindaklanjuti permohonan estimasi buku tahunan (${o.student_count} siswa, cover ${o.cover_type}). Apakah jadwal meeting panitia bisa diatur minggu ini?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange hover:bg-orange/90 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Follow Up WA</span>
                      </a>
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
