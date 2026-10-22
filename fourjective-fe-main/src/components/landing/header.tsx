"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";

export default function Header() {
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

  // Magnetic Button Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.45;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.45;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
  };

  return (
    <>
      {/* ================= FLOATING CORNER LEFT: BRAND LOGO ================= */}
      <div className="fixed top-6 left-6 md:left-8 z-40 flex items-center">
        <Link
          href="#hero-fullscreen"
          className="group relative inline-flex items-center bg-paper px-4 py-2.5 rounded-2xl border-2 border-dark shadow-brutal hover:bg-white hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer select-none"
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

      {/* ================= FLOATING CORNER RIGHT: MAGNETIC HAMBURGER ================= */}
      <div className="fixed top-6 right-6 md:right-8 z-40 flex items-center">
        <button
          ref={magneticBtnRef}
          id="nav-menu-btn"
          type="button"
          onClick={toggleMenu}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative inline-flex items-center gap-2.5 bg-dark text-white px-5 py-3 rounded-2xl border-2 border-dark shadow-brutal hover:bg-orange hover:text-white transition-colors cursor-pointer select-none will-change-transform"
          aria-label="Menu"
        >
          <span id="menu-btn-text" className="font-headline font-bold text-xs uppercase tracking-wider">
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

      {/* ================= FULLSCREEN ORANGE OVERLAY MENU (MATCHING HTML DRAFT) ================= */}
      <div
        id="nav-drawer"
        className={`fixed inset-0 z-50 bg-[#FF5500]/95 transition-all duration-300 flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-y-auto ${
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
            id="drawer-close-btn"
            type="button"
            onClick={toggleMenu}
            className="group inline-flex items-center gap-2 bg-dark text-white px-5 py-2.5 rounded-2xl border-2 border-dark shadow-brutal hover:bg-paper hover:text-dark transition-all cursor-pointer font-headline text-xs uppercase font-bold"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Menu: Baris per Baris, Rata Tengah, Garis Pemisah, Hover Geser Kanan */}
        <div
          id="nav-drawer-content"
          className={`w-full max-w-4xl mx-auto my-auto py-6 sm:py-8 transition-transform duration-300 transform ${
            isMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="border-t-2 border-dark">
            {/* Item 1 */}
            <Link
              href="#services"
              onClick={toggleMenu}
              className="drawer-link group block w-full py-4 sm:py-5 md:py-6 border-b-2 border-dark text-center transition-colors"
            >
              <div className="inline-flex items-center justify-center gap-3 sm:gap-6 transition-transform duration-200 ease-out group-hover:translate-x-5">
                <span className="font-mono text-xs sm:text-sm font-black text-dark/70 uppercase tracking-widest">[01]</span>
                <span className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase text-dark group-hover:text-white transition-colors tracking-tight">
                  4 Pilar Layanan
                </span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-dark group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0" />
              </div>
            </Link>

            {/* Item 2 */}
            <Link
              href="#showreel"
              onClick={toggleMenu}
              className="drawer-link group block w-full py-4 sm:py-5 md:py-6 border-b-2 border-dark text-center transition-colors"
            >
              <div className="inline-flex items-center justify-center gap-3 sm:gap-6 transition-transform duration-200 ease-out group-hover:translate-x-5">
                <span className="font-mono text-xs sm:text-sm font-black text-dark/70 uppercase tracking-widest">[02]</span>
                <span className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase text-dark group-hover:text-white transition-colors tracking-tight">
                  Cinematic Showreel
                </span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-dark group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0" />
              </div>
            </Link>

            {/* Item 3 */}
            <Link
              href="#portfolio"
              onClick={toggleMenu}
              className="drawer-link group block w-full py-4 sm:py-5 md:py-6 border-b-2 border-dark text-center transition-colors"
            >
              <div className="inline-flex items-center justify-center gap-3 sm:gap-6 transition-transform duration-200 ease-out group-hover:translate-x-5">
                <span className="font-mono text-xs sm:text-sm font-black text-dark/70 uppercase tracking-widest">[03]</span>
                <span className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase text-dark group-hover:text-white transition-colors tracking-tight">
                  Portofolio Buku
                </span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-dark group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0" />
              </div>
            </Link>

            {/* Item 4 */}
            <Link
              href="#calculator"
              onClick={toggleMenu}
              className="drawer-link group block w-full py-4 sm:py-5 md:py-6 border-b-2 border-dark text-center transition-colors"
            >
              <div className="inline-flex items-center justify-center gap-3 sm:gap-6 transition-transform duration-200 ease-out group-hover:translate-x-5">
                <span className="font-mono text-xs sm:text-sm font-black text-dark/70 uppercase tracking-widest">[04]</span>
                <span className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase text-dark group-hover:text-white transition-colors tracking-tight">
                  Estimasi Biaya
                </span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-dark group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0" />
              </div>
            </Link>

            {/* Item 5 */}
            <Link
              href="#traction"
              onClick={toggleMenu}
              className="drawer-link group block w-full py-4 sm:py-5 md:py-6 border-b-2 border-dark text-center transition-colors"
            >
              <div className="inline-flex items-center justify-center gap-3 sm:gap-6 transition-transform duration-200 ease-out group-hover:translate-x-5">
                <span className="font-mono text-xs sm:text-sm font-black text-dark/70 uppercase tracking-widest">[05]</span>
                <span className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase text-dark group-hover:text-white transition-colors tracking-tight">
                  Kenapa Fourjective
                </span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-dark group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0" />
              </div>
            </Link>

            {/* Item 6 */}
            <Link
              href="#faq"
              onClick={toggleMenu}
              className="drawer-link group block w-full py-4 sm:py-5 md:py-6 border-b-2 border-dark text-center transition-colors"
            >
              <div className="inline-flex items-center justify-center gap-3 sm:gap-6 transition-transform duration-200 ease-out group-hover:translate-x-5">
                <span className="font-mono text-xs sm:text-sm font-black text-dark/70 uppercase tracking-widest">[06]</span>
                <span className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase text-dark group-hover:text-white transition-colors tracking-tight">
                  Tanya Jawab (FAQ)
                </span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-dark group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0" />
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Footer inside overlay */}
        <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-dark/40 text-dark">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-center sm:text-left">
            HQ KUNINGAN &bull; SPESIALIS BUKU TAHUNAN SMA/SMK SE-INDONESIA
          </div>
          <a
            href="https://wa.me/6289657008080?text=Halo%20Fourjective,%20kami%20ingin%20konsultasi%20buku%20tahunan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark text-white font-headline text-xs uppercase font-bold rounded-2xl border-2 border-dark shadow-brutal hover:bg-paper hover:text-dark transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Konsultasi WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
