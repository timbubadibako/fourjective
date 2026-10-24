"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, KeyRound } from "lucide-react";
import { SITE, WA_MESSAGES, waLink } from "@/lib/site";

interface NavItem {
  label: string;
  hash: string;
  route: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Paket", hash: "/paket", route: "/paket" },
  { label: "Layanan", hash: "/services", route: "/services" },
  { label: "Portofolio", hash: "/portofolio", route: "/portofolio" },
  { label: "Testimoni", hash: "/testimoni", route: "/testimoni" },
  { label: "Tentang Kami", hash: "/about", route: "/about" },
];

export default function HeaderPillV2() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 80);

      if (currentY <= 80) {
        setIsScrollingUp(false);
      } else if (currentY < lastY - 6) {
        // Scrolling up by at least 6px
        setIsScrollingUp(true);
      } else if (currentY > lastY + 6) {
        // Scrolling down
        setIsScrollingUp(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isVisible = !isScrolled || isHovered || isScrollingUp || isMobileOpen;

  return (
    <>
      {/* ================= INVISIBLE HOVER TRIGGER ZONE (AREA KOSONG ATAS) ================= */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-0 left-0 right-0 h-24 z-50 pointer-events-auto"
      >
        {/* ================= FLOATING POSTER PILL NAVBAR ================= */}
        <nav
          aria-label="Navigasi Utama"
          className={`mx-auto mt-6 flex items-center justify-between gap-4 sm:gap-6 md:gap-8 bg-ink-soft/95 text-white pl-2 pr-2.5 py-2 sm:py-2.5 rounded-full border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)] select-none max-w-[94vw] sm:max-w-fit whitespace-nowrap backdrop-blur-xl transition-all duration-300 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-6 pointer-events-none"
          }`}
        >
          {/* Left: Brand Badge — ROUND PILL dengan wordmark logo asli FOURJECTIV */}
          <Link
            href={isLanding ? "#hero-fullscreen" : "/"}
            className="flex items-center justify-center shrink-0 bg-white rounded-full pl-3 pr-2.5 py-1.5 sm:py-2 border border-white/20 shadow-sm hover:scale-105 active:scale-95 transition-transform overflow-hidden"
            aria-label="Fourjective Home"
          >
            <Image
              src="/images/fourjective-logo.svg"
              alt="Fourjective"
              width={104}
              height={29}
              priority
              className="w-[82px] sm:w-[98px] h-auto scale-[1.18]"
            />
          </Link>

          {/* Center: Headline Navigation Links */}
          <div className="hidden sm:flex items-center gap-5 md:gap-7 px-1 font-headline font-bold uppercase tracking-wider text-[13px] md:text-[14px] text-zinc-300">
            {NAV_ITEMS.map((item) => {
              const isActive = !isLanding && pathname === item.route;
              return (
                <Link
                  key={item.label}
                  href={isLanding ? item.hash : item.route}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? "text-orange"
                      : "hover:text-white"
                  }`}
                >
                  {item.label}
                  {/* Garis indikator aktif di bawah teks */}
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 -bottom-0.5 h-[3px] rounded-full bg-orange origin-center transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right: SATU pill gabungan — KONSUL (WhatsApp) + PORTAL (akses kode paket) */}
          <span className="hidden md:flex items-center justify-between gap-1 bg-white rounded-full border border-white/20 shadow-sm shrink-0 p-1.5">
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 text-dark font-headline font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full hover:bg-dark hover:text-white transition-all active:scale-95"
            >
              <span>KONSUL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          <Link
              href="/portal"
              className="flex items-center justify-center gap-1 bg-orange text-white font-headline font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full hover:bg-dark transition-all active:scale-95"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>PORTAL</span>
            </Link>
          </span>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="sm:hidden w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center shrink-0"
            aria-label="Menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown Pill */}
      {isMobileOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 sm:hidden w-[88vw] bg-ink-soft text-white p-4 rounded-3xl border border-white/15 shadow-2xl flex flex-col gap-2 font-headline uppercase tracking-wider text-sm font-bold">
          {NAV_ITEMS.map((item) => {
            const isActive = !isLanding && pathname === item.route;
            return (
              <Link
                key={item.label}
                href={isLanding ? item.hash : item.route}
                onClick={() => setIsMobileOpen(false)}
                className={`px-3.5 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-zinc-800/80 text-orange"
                    : "hover:bg-zinc-800/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={waLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-orange text-white text-center py-3 rounded-full font-headline font-bold text-xs uppercase tracking-wider mt-2 border border-white/20"
          >
            <span>KONSULTASI WHATSAPP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <Link
            href="/portal"
            onClick={() => setIsMobileOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 bg-transparent text-white text-center py-3 rounded-full font-headline font-bold text-xs uppercase tracking-wider border border-white/25"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>PORTAL PAKET</span>
          </Link>
        </div>
      )}
    </>
  );
}
