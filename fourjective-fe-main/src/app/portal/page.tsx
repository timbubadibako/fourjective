"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, KeyRound, ShieldCheck, ArrowLeft, MessageCircle } from "lucide-react";
import { WA_MESSAGES, waLink } from "@/lib/site";

/* ================= HALAMAN PORTAL (GATE) =================
   Halaman tunggal dua jalur:
   1. KLIEN — kode akses dari admin → /track/[kode]
   2. ADMIN — password saja (tanpa email) → /dashboard
      NOTE: submit admin masih POST ke endpoint lama
      /api/auth/login (email diisi konstanta) — TEMP
      sampai backend switch ke password-only. */

const ADMIN_EMAIL_DEFAULT = "admin@fourjectiv.com";

function PortalGateInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"kode" | "admin">("kode");
  const [kode, setKode] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [detectedKode, setDetectedKode] = useState<string | null>(null);

  /* Permalink: ?kode=ABC123 → auto-fill, tandai "terdeteksi dari link" */
  useEffect(() => {
    const k = (searchParams.get("kode") || "").trim().toUpperCase();
    if (k) {
      setKode(k);
      setDetectedKode(k);
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
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      /* TEMP: backend masih email+password — email dipbundle konstanta
         sampai /api/auth/login menerima password-only */
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: ADMIN_EMAIL_DEFAULT,
          password: adminPassword,
        }),
      });
      if (!res.ok) {
        setAdminError("Password salah. Coba lagi.");
        setAdminLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch {
      setAdminError("Gagal terhubung ke server.");
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
          {/* Headline — 2 BARIS TEGAS, box lega biar nowrap nggak overflow */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="font-playtimes text-[2.4rem] sm:text-5xl md:text-6xl leading-[1.02] whitespace-nowrap">
              Portal Akses,
              <br />
              <span className="text-orange">Satu Kode Saja.</span>
            </h1>
            <p className="font-mono text-[11px] sm:text-xs text-white/55 mt-4 font-semibold tracking-wide">
              Kode didapat dari PM Fourjective.
            </p>
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-white/70 border-2 border-white/15 hover:border-orange hover:text-orange px-4 py-2.5 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Minta Kode via WA</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card ramping di bawah headline besar */}
          <div className="max-w-md mx-auto">
          {mode === "kode" ? (
            /* ---------- KARTU KODE AKSES (klien) ---------- */
            <form
              onSubmit={submitKode}
              className="bg-white text-dark border-4 border-dark rounded-xl shadow-[8px_10px_0px_#FF4D00]"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-1">
                  <KeyRound className="w-4 h-4 text-orange" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-dark/50">
                    kode akses
                  </span>
                </div>

                {detectedKode ? (
                  <p className="text-[11px] font-mono text-orange font-bold mb-3">
                    → kode terdeteksi dari link
                  </p>
                ) : null}

                <input
                  autoFocus
                  value={kode}
                  onChange={(e) =>
                    setKode(e.target.value.toUpperCase())
                  }
                  placeholder="XXXX-XXXX"
                  className="w-full bg-paper border-3 border-dark/20 focus:border-orange outline-none px-4 py-3.5 font-mono font-black text-lg sm:text-xl tracking-[0.25em] text-center uppercase text-dark placeholder:text-dark/25 transition-colors rounded-lg"
                  maxLength={12}
                />

                <button
                  type="submit"
                  disabled={!kode.trim()}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-sm uppercase tracking-widest px-5 py-3.5 border-3 border-dark rounded-lg shadow-[4px_4px_0px_#14161C] hover:shadow-[2px_2px_0px_#14161C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <span>Masuk Tracker</span>
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
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-orange" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    admin — password
                  </span>
                </div>

                <input
                  autoFocus
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#101116] border-3 border-white/10 focus:border-orange outline-none px-4 py-3.5 font-mono font-black text-lg tracking-[0.3em] text-white placeholder:text-white/20 transition-colors rounded-lg"
                />

                {adminError ? (
                  <p className="mt-3 text-[11px] font-mono text-orange font-bold">
                    ! {adminError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={adminLoading || !adminPassword.trim()}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-sm uppercase tracking-widest px-5 py-3.5 border-3 border-white/15 shadow-[4px_4px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <span>{adminLoading ? "Masuk..." : "Masuk Dashboard"}</span>
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
                onClick={() => setMode("admin")}
                className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-orange transition-colors cursor-pointer"
              >
                Masuk sebagai admin →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode("kode")}
                className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-orange transition-colors cursor-pointer"
              >
                ← Punya kode akses? Masuk sini
              </button>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* Footer mini */}
      <div className="relative z-10 pb-6 text-center">
        <p className="font-mono text-[10px] text-white/25 font-bold tracking-widest uppercase">
          © Fourjective 2025
        </p>
      </div>
    </main>
  );
}

export default function PortalPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#101116] flex items-center justify-center">
          <span className="font-mono text-white/40 text-xs font-bold uppercase tracking-widest">
            memuat portal...
          </span>
        </main>
      }
    >
      <PortalGateInner />
    </Suspense>
  );
}
