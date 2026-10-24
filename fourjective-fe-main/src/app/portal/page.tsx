"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  KeyRound,
  ShieldCheck,
  ArrowLeft,
  MessageCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { WA_MESSAGES, waLink } from "@/lib/site";

/* ================= HALAMAN PORTAL (GATE) =================
   Halaman tunggal dua jalur:
   1. KLIEN — kode akses dari admin → /track/[kode]
   2. ADMIN — master password saja (tanpa email) → /dashboard */

function PortalGateInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"kode" | "admin">("kode");
  const [kode, setKode] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [detectedKode, setDetectedKode] = useState<string | null>(null);
  const [hasErrorInvalid, setHasErrorInvalid] = useState(false);

  /* Permalink: ?kode=ABC123 → auto-fill, tandai "terdeteksi dari link" */
  useEffect(() => {
    const k = (searchParams.get("kode") || "").trim().toUpperCase();
    if (k) {
      setKode(k);
      setDetectedKode(k);
    }

    const err = searchParams.get("error");
    if (err === "invalid") {
      setHasErrorInvalid(true);
    }

    const m = searchParams.get("mode");
    if (m === "admin") {
      setMode("admin");
    }
  }, [searchParams]);

  const submitKode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = kode.trim().toUpperCase();
    if (!clean) return;
    router.push(`/track/${encodeURIComponent(clean)}`);
  };

  const submitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword.trim()) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: adminPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAdminError(data.error || "Password admin salah. Coba lagi.");
        setAdminLoading(false);
        return;
      }

      localStorage.setItem("fourjective_admin_session", "true");
      router.push("/dashboard");
    } catch {
      setAdminError("Gagal terhubung ke endpoint autentikasi server.");
      setAdminLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen bg-[#101116] text-white overflow-hidden select-none flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Sunburst ghost oranye */}
      <div
        className="absolute -right-24 -top-24 w-[420px] h-[420px] opacity-15 pointer-events-none"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-orange">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>
      {/* Glow oranye horizon */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(255,77,0,0.18) 0%, rgba(16,17,22,0) 70%)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white font-mono text-[11px] font-bold uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          fourjectiv.com
        </Link>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
          portal akses
        </span>
      </div>

      {/* ============ GATE ============ */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-2xl">
          {/* Headline */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-playtimes text-[2.4rem] sm:text-5xl md:text-6xl leading-[1.02] whitespace-nowrap">
              Portal Akses,
              <br />
              <span className="text-orange">Satu Kode Saja.</span>
            </h1>
            <p className="font-mono text-[11px] sm:text-xs text-white/55 mt-3 font-semibold tracking-wide">
              Kode resmi didapat dari Project Manager Fourjective setelah MOU.
            </p>
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-white/70 border-2 border-white/15 hover:border-orange hover:text-orange px-4 py-2 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Minta Kode via WA</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Banner Peringatan jika Kode Invalid (Redirect Guard) */}
          {hasErrorInvalid && (
            <div className="max-w-md mx-auto mb-5 p-4 rounded-xl bg-red-950/80 border-2 border-red-500/80 text-white shadow-lg animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-headline font-black uppercase tracking-wider text-red-200">
                    Kode Akses Tidak Ditemukan
                  </div>
                  <p className="font-sans text-white/80 mt-1 leading-relaxed">
                    Kode {detectedKode ? <strong className="font-mono text-orange bg-black/40 px-1 py-0.5 rounded border border-white/10">{detectedKode}</strong> : "yang Anda masukkan"} belum terdaftar di database Supabase kami. Silakan cek ulang ejaan atau minta aktivasi ke PM Fourjective.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Card ramping di bawah headline */}
          <div className="max-w-md mx-auto">
            {mode === "kode" ? (
              /* ---------- KARTU KODE AKSES (klien & guest) ---------- */
              <form
                onSubmit={submitKode}
                className="bg-white text-dark border-4 border-dark rounded-xl shadow-[8px_10px_0px_#FF4D00]"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-orange" />
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-dark/50">
                        kode akses sekolah
                      </span>
                    </div>
                    {detectedKode && !hasErrorInvalid ? (
                      <span className="text-[10px] font-mono text-orange font-bold">
                        ● dari tautan
                      </span>
                    ) : null}
                  </div>

                  <input
                    autoFocus
                    value={kode}
                    onChange={(e) => {
                      setKode(e.target.value.toUpperCase());
                      if (hasErrorInvalid) setHasErrorInvalid(false);
                    }}
                    placeholder="SMAN1-2026"
                    className="w-full bg-paper border-3 border-dark/20 focus:border-orange outline-none px-4 py-3.5 font-mono font-black text-lg sm:text-xl tracking-[0.2em] text-center uppercase text-dark placeholder:text-dark/25 transition-colors rounded-lg"
                    maxLength={16}
                  />

                  <button
                    type="submit"
                    disabled={!kode.trim()}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-sm uppercase tracking-widest px-5 py-3.5 border-3 border-dark rounded-lg shadow-[4px_4px_0px_#14161C] hover:shadow-[2px_2px_0px_#14161C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    <span>Masuk Tracker Angkatan</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              /* ---------- KARTU ADMIN (password saja) ---------- */
              <form
                onSubmit={submitAdmin}
                className="bg-[#18191F] border-4 border-dark rounded-xl shadow-[8px_10px_0px_#FF4D00]"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-orange" />
                    <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                      admin fourjective — master key
                    </span>
                  </div>

                  <input
                    autoFocus
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#101116] border-3 border-white/10 focus:border-orange outline-none px-4 py-3.5 font-mono font-black text-lg tracking-[0.3em] text-white placeholder:text-white/20 transition-colors rounded-lg"
                  />

                  {adminError ? (
                    <div className="mt-3 p-2.5 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-[11px] font-mono font-bold flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>{adminError}</span>
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={adminLoading || !adminPassword.trim()}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-sm uppercase tracking-widest px-5 py-3.5 border-3 border-white/15 shadow-[4px_4px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    <span>{adminLoading ? "Memverifikasi..." : "Buka Cloud Dock Admin"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Toggle jalur */}
            <div className="mt-6 text-center">
              {mode === "kode" ? (
                <button
                  type="button"
                  onClick={() => {
                    setMode("admin");
                    setHasErrorInvalid(false);
                  }}
                  className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-orange transition-colors cursor-pointer"
                >
                  Masuk sebagai admin internal →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMode("kode");
                    setAdminError(null);
                  }}
                  className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-orange transition-colors cursor-pointer"
                >
                  ← Kembali ke kode akses sekolah
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#101116] flex items-center justify-center text-white/60 font-mono text-xs">
          Memuat portal...
        </div>
      }
    >
      <PortalGateInner />
    </Suspense>
  );
}
