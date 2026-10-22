"use client";

import React, { useState } from "react";
import { Lock, Globe, Plus, Folder, ArrowUpRight, BookOpen, MoreVertical, Sparkles } from "lucide-react";
import { Portfolio } from "@/services/api";
import { useRouter } from "next/navigation";

export interface SchoolFolderProps {
  portfolio?: Portfolio;
  folderName: string;
  year?: number | string;
  studentCount?: number;
  pageCount?: number;
  fileSize?: string;
  isLocked?: boolean;
  theme?: "orange-liquid" | "dark-marble" | "frosted-glass" | "amber-fire";
  onOpen?: () => void;
}

export function SchoolFolderCard({
  portfolio,
  folderName,
  year = 2025,
  studentCount = 280,
  pageCount = 120,
  fileSize = "2.4 GB",
  isLocked = false,
  theme = "orange-liquid",
  onOpen,
}: SchoolFolderProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Background artwork patterns matching the tactile folder aesthetic in Cloud Dock
  const getBackgroundArtwork = () => {
    switch (theme) {
      case "orange-liquid":
        return "bg-gradient-to-br from-[#FF4D00] via-[#8B1A00] to-[#121318]";
      case "amber-fire":
        return "bg-gradient-to-br from-[#FF6B00] via-[#D84315] to-[#210D04]";
      case "dark-marble":
        return "bg-gradient-to-br from-[#2D313D] via-[#1B1D24] to-[#0E0F13]";
      case "frosted-glass":
      default:
        return "bg-gradient-to-br from-[#FF5722] via-[#E64A19] to-[#181A20]";
    }
  };

  const handleCardClick = () => {
    if (onOpen) {
      onOpen();
    } else if (portfolio?.id) {
      router.push(`/dashboard/${portfolio.id}`);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative cursor-pointer select-none transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* ================= FOLDER WRAPPER WITH TACTILE SILHOUETTE ================= */}
      <div className="relative w-full h-[220px] rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-slate-200/80 group-hover:shadow-[0_20px_40px_rgba(255,77,0,0.22)] group-hover:border-orange/50 transition-all bg-white">
        
        {/* ================= 1. BACK FOLDER TAB (TOP-LEFT / CUTOUT) ================= */}
        <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
          {/* Top Folder Tab Shape */}
          <div className="absolute top-2 left-4 px-4 py-1.5 rounded-t-xl bg-orange/90 backdrop-blur-md border-t border-x border-white/20 flex items-center gap-1.5 text-white z-0 shadow-sm">
            <Folder className="w-3.5 h-3.5 text-white fill-white/30" />
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
              ANGKATAN {year}
            </span>
          </div>

          {/* Top right decorative status */}
          <div className="absolute top-3 right-4 flex items-center gap-1.5 z-10">
            {isLocked ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30 font-mono text-[9px] font-bold">
                <Lock className="w-2.5 h-2.5" /> Kunci
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30 font-mono text-[9px] font-bold">
                <Globe className="w-2.5 h-2.5" /> Publik
              </span>
            )}
          </div>
        </div>

        {/* ================= 2. ABSTRACT LIQUID / MARBLE WALLPAPER (BACK POCKET) ================= */}
        <div className={`absolute inset-x-0 top-6 bottom-0 ${getBackgroundArtwork()} overflow-hidden`}>
          {/* Liquid decorative waves inspired by the uploaded folder concept */}
          <svg
            className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
          >
            <path
              d="M-50,80 C100,20 220,160 350,70 C420,20 480,100 500,60 L500,300 L-50,300 Z"
              fill="rgba(255, 120, 40, 0.5)"
            />
            <path
              d="M-50,140 C80,190 200,90 320,170 C410,230 460,150 500,180 L500,300 L-50,300 Z"
              fill="rgba(255, 77, 0, 0.35)"
            />
          </svg>

          {/* Subtle noise grid */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        {/* ================= 3. SLIDING DOCUMENT SHEET (PEEKS OUT ON HOVER) ================= */}
        <div
          className={`absolute inset-x-5 top-7 h-28 rounded-2xl bg-[#FFFDF9] border border-white/60 shadow-[0_8px_20px_rgba(0,0,0,0.18)] p-3.5 transition-transform duration-300 ease-out ${
            isHovered ? "-translate-y-4" : "translate-y-1"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-100">
            <span className="font-bold text-orange flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 3D FLIPBOOK READY
            </span>
            <span>{pageCount} Hal</span>
          </div>

          <div className="space-y-1.5 mt-2.5">
            <div className="h-2 w-3/4 bg-slate-200/80 rounded-full" />
            <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
          </div>
        </div>

        {/* ================= 4. FRONT FROSTED FLAP / POCKET ================= */}
        <div className="absolute inset-x-0 bottom-0 top-[88px] rounded-b-3xl bg-[#161820]/92 backdrop-blur-xl border-t border-white/15 p-4 flex flex-col justify-between text-white z-10 transition-colors group-hover:bg-[#12141A]/95">
          {/* Top of front flap: Title & Year */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="overflow-hidden">
                <h3 className="font-headline font-bold text-sm sm:text-base text-white tracking-tight truncate group-hover:text-orange transition-colors">
                  {folderName}
                </h3>
                <p className="font-mono text-[11px] text-white/60 mt-0.5">
                  {studentCount} Siswa • {pageCount} Halaman
                </p>
              </div>

              {/* Floating quick action button (+ icon squircle from image) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick();
                }}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-orange text-white flex items-center justify-center shrink-0 border border-white/15 transition-all shadow-sm hover:scale-105 active:scale-95"
                title="Buka Folder Arsip"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom of front flap: Meta stats & simulated avatar stack */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
            <div className="flex items-center gap-2">
              <span className="text-orange font-bold">{fileSize}</span>
              <span className="text-white/30">•</span>
              <span>{isLocked ? "Terkunci" : "Terbuka"}</span>
            </div>

            {/* Simulated mini avatar stack matching Image 1 */}
            <div className="flex items-center -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-orange/80 border border-[#161820] text-[9px] flex items-center justify-center text-white font-bold">
                4J
              </div>
              <div className="w-5 h-5 rounded-full bg-slate-700 border border-[#161820] text-[9px] flex items-center justify-center text-white">
                PM
              </div>
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-[#161820] text-[8px] flex items-center justify-center text-white/80">
                +8
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
