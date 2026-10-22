"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, MessageCircle, Calculator, Sparkles } from "lucide-react";

export default function HeaderV2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const magneticBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Magnetic Button Physics for mobile hamburger
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
  };

  const navLinks = [
    { label: "Layanan", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Showreel", href: "#showreel" },
    { label: "Kalkulator Kas", href: "#calculator" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* ================= FLOATING CORNER LEFT: BRAND LOGO ================= */}
      <div className="fixed top-5 left-4 md:left-8 z-40 flex items-center">
        <Link
          href="#hero-fullscreen"
          className="group relative inline-flex items-center bg-paper px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 border-dark shadow-brutal hover:bg-white hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer select-none"
          aria-label="Fourjective"
        >
          <Image
            src="/images/fourjective-logo.svg"
            alt="Fourjective"
            width={120}
            height={28}
            className="h-6 sm:h-7 w-auto object-contain group-hover:scale-105 transition-transform"
            priority
          />
        </Link>
      </div>

      {/* ================= FLOATING CENTER DESKTOP NAV (INLINE PILL) ================= */}
      <nav
        aria-label="Navigasi Utama"
        className="fixed top-5 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-1 bg-surface-bright/95 backdrop-blur-md px-3 py-1.5 rounded-full border-2 border-dark shadow-brutal select-none"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3.5 py-1.5 rounded-full font-headline text-xs font-bold uppercase tracking-wider text-dark/80 hover:text-dark hover:bg-orange/15 transition-all"
          >
            {link.label}
          </Link>
        ))}

        <div className="w-px h-4 bg-dark/20 mx-1" />

        <Link
          href="#calculator"
          className="inline-flex items-center gap-1.5 bg-orange text-white px-3.5 py-1.5 rounded-full font-headline text-xs font-bold uppercase tracking-wider hover:bg-dark transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulasi Kas</span>
        </Link>
      </nav>

      {/* ================= FLOATING CORNER RIGHT: HAMBURGER & QUICK CTA ================= */}
      <div className="fixed top-5 right-4 md:right-8 z-40 flex items-center gap-3">
        <a
          href="https://wa.me/6281234567890?text=Halo%20Fourjective%20Studio!%20Mau%20konsultasi%20buku%20tahunan"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 bg-accent-wa text-dark font-headline font-bold text-xs uppercase px-4 py-3 rounded-2xl border-2 border-dark shadow-brutal hover:bg-white hover:text-dark transition-all select-none"
        >
          <MessageCircle className="w-4 h-4 fill-dark text-transparent" />
          <span>KONSULTASI WA</span>
        </a>

        {/* Mobile & Drawer Hamburger */}
        <button
          ref={magneticBtnRef}
          id="nav-menu-btn"
          type="button"
          onClick={toggleMenu}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative inline-flex items-center gap-2 bg-dark text-white px-4 sm:px-5 py-3 rounded-2xl border-2 border-dark shadow-brutal hover:bg-orange hover:text-white transition-colors cursor-pointer select-none will-change-transform lg:hidden"
          aria-label="Menu"
        >
          <span className="font-headline font-bold text-xs uppercase tracking-wider">
            {isMenuOpen ? "CLOSE" : "MENU"}
          </span>
          <div className="w-5 h-5 flex items-center justify-center">
            {isMenuOpen ? (
              <X className="w-4 h-4 transition-transform group-hover:scale-110" />
            ) : (
              <Menu className="w-4 h-4 transition-transform group-hover:scale-110" />
            )}
          </div>
        </button>
      </div>

      {/* ================= FULLSCREEN ORANGE OVERLAY MENU (MOBILE) ================= */}
      <div
        id="nav-drawer"
        className={`fixed inset-0 z-50 bg-[#FF5500]/98 transition-all duration-300 flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-y-auto ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top Bar inside overlay */}
        <div className="w-full flex items-center justify-between max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-paper px-4 py-2 rounded-2xl border-2 border-dark shadow-brutal">
            <Image
              src="/images/fourjective-logo.svg"
              alt="Fourjective"
              width={100}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </div>
          <button
            type="button"
            onClick={toggleMenu}
            className="group inline-flex items-center gap-2 bg-dark text-white px-5 py-2.5 rounded-2xl border-2 border-dark shadow-brutal hover:bg-paper hover:text-dark transition-all cursor-pointer font-headline text-xs uppercase font-bold"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Menu Links */}
        <div className="w-full max-w-4xl mx-auto my-auto py-6 sm:py-8">
          <div className="border-t-2 border-dark">
            {[
              { num: "[01]", label: "4 Pilar Layanan", href: "#services" },
              { num: "[02]", label: "Galeri Portofolio", href: "#portfolio" },
              { num: "[03]", label: "Showreel Sinematik", href: "#showreel" },
              { num: "[04]", label: "Simulator Kas Angkatan", href: "#calculator" },
              { num: "[05]", label: "Pertanyaan Umum (FAQ)", href: "#faq" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="group block w-full py-4 sm:py-5 border-b-2 border-dark text-center transition-colors"
              >
                <div className="inline-flex items-center justify-center gap-3 sm:gap-6 transition-transform duration-200 ease-out group-hover:translate-x-3">
                  <span className="font-mono text-xs sm:text-sm font-black text-dark/70 uppercase tracking-widest">
                    {item.num}
                  </span>
                  <span className="font-headline font-black text-2xl sm:text-4xl uppercase text-dark group-hover:text-white transition-colors tracking-tight">
                    {item.label}
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-dark group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Drawer Bar */}
        <div className="w-full max-w-4xl mx-auto pt-4 border-t-2 border-dark/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold text-dark/80">
          <span>FOURJECTIVE CREATIVE STUDIO // 2026</span>
          <a
            href="https://wa.me/6281234567890"
            className="inline-flex items-center gap-2 bg-dark text-white px-4 py-2 rounded-xl border border-dark"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Hubungi Tim Kreatif</span>
          </a>
        </div>
      </div>
    </>
  );
}
