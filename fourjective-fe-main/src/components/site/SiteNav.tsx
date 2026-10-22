"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE, resolveNavHref } from "@/lib/site";

/**
 * Navigasi tunggal untuk seluruh situs publik.
 * - Pill hitam melayang + zona hover kosong di bagian atas layar.
 * - Link otomatis menyesuaikan konteks: hash anchor di landing, route absolut di sub-page.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isVisible = !isScrolled || isHovered || isMobileOpen;
  const isLanding = pathname === "/";

  return (
    <>
      {/* ===== ZONA HOVER KOSONG DI ATAS LAYAR ===== */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-0 left-0 right-0 h-24 z-50 pointer-events-auto"
      >
        <nav
          aria-label="Navigasi Utama"
          className={`mx-auto mt-6 flex items-center justify-between gap-5 sm:gap-8 md:gap-10 bg-ink-soft text-white pl-2.5 pr-2.5 py-2 sm:py-2.5 rounded-full border border-white/15 shadow-[0_25px_50px_rgba(0,0,0,0.5)] select-none max-w-[94vw] sm:max-w-fit whitespace-nowrap backdrop-blur-xl transition-all duration-300 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-6 pointer-events-none"
          }`}
        >
          {/* Brand */}
          <Link
            href={isLanding ? "#hero-fullscreen" : "/"}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-700 text-white flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform shadow-sm border-2 border-white/20"
            aria-label="Fourjective Home"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="7" />
              <path d="M4 12c0-3.87 3.58-7 8-7 1.8 0 3.47.53 4.8 1.45" />
              <path d="M2 14c2.5 3 6 4.5 10 4.5 4.5 0 8.5-2 10-5" />
            </svg>
          </Link>

          {/* Links desktop */}
          <div className="hidden sm:flex items-center gap-6 md:gap-8 px-2 text-[14px] md:text-[15px] font-semibold text-zinc-300">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={resolveNavHref(pathname, link)}
                className="hover:text-brand-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Aksi kontak */}
          <a
            href={`mailto:${SITE.email}`}
            className="hidden md:inline-flex items-center justify-center bg-white text-zinc-950 text-[14px] font-bold px-6 py-3 rounded-full hover:bg-brand-300 hover:scale-[1.02] active:scale-95 transition-all shrink-0 shadow-sm"
          >
            {SITE.email}
          </a>

          {/* Toggle mobile */}
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

      {/* Menu mobile */}
      {isMobileOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 sm:hidden w-[88vw] bg-ink-soft text-white p-4 rounded-3xl border border-white/15 shadow-2xl flex flex-col gap-3 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={resolveNavHref(pathname, link)}
              onClick={() => setIsMobileOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${SITE.email}`}
            className="bg-brand-700 text-white text-center py-2.5 rounded-full font-semibold text-xs mt-1"
          >
            {SITE.email}
          </a>
        </div>
      )}
    </>
  );
}
