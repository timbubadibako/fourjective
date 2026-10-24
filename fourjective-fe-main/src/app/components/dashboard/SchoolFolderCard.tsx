"use client";

import React, { useState } from "react";
import { Portfolio } from "@/services/api";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Lock, Unlock, BookOpen } from "lucide-react";

export interface SchoolFolderProps {
  portfolio?: Portfolio;
  folderName: string;
  year?: number | string;
  studentCount?: number;
  pageCount?: number;
  fileSize?: string;
  isLocked?: boolean;
  coverImage?: string;
  onOpen?: () => void;
}

export function SchoolFolderCard({
  portfolio,
  folderName,
  year = 2026,
  studentCount = 280,
  pageCount = 120,
  fileSize = "2.4 GB",
  isLocked = false,
  coverImage,
  onOpen,
}: SchoolFolderProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const coverUrl = coverImage || portfolio?.cover;

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
      className="group flex flex-col items-center cursor-pointer select-none transition-all duration-300 hover:-translate-y-2"
    >
      {/* ========================================================================= */}
      {/* 3D TACTILE FOLDER: SILUET BELAKANG SOLID + SILUET DEPAN FROSTED GLASSY    */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[340px] h-[245px] flex items-end justify-center drop-shadow-[0_22px_30px_rgba(0,0,0,0.18)]">

        {/* 1. LAYER 1: SILUET FOLDER BELAKANG DENGAN TAB KIRI ATAS */}
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 340 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Folder Belakang Solid Tebal */}
            <path
              d="M 12 34
                 C 12 20, 22 10, 36 10
                 L 115 10
                 C 128 10, 137 16, 146 26
                 L 160 42
                 C 167 50, 175 54, 186 54
                 L 304 54
                 C 318 54, 328 64, 328 78
                 L 328 206
                 C 328 220, 318 230, 304 230
                 L 36 230
                 C 22 230, 12 220, 12 206
                 Z"
              fill="url(#folderBackGradient)"
            />
            {/* Highlight Punggung Tab */}
            <path
              d="M 36 11 L 115 11 C 127 11, 136 17, 145 27 L 159 43 C 166 51, 174 55, 186 55 L 304 55"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="folderBackGradient" x1="170" y1="10" x2="170" y2="230" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2A2D36" />
                <stop offset="100%" stopColor="#14161C" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 2. LAYER 2: KERTAS DOKUMEN BERTINGKAT (BERGARIS MINIMALIS) */}
        {/* Kertas Kiri */}
        <div
          className={`absolute z-10 w-[240px] h-[175px] rounded-2xl bg-[#E6E1D8] border border-white/60 shadow-md transition-all duration-500 ease-out pointer-events-none ${
            isHovered
              ? "bottom-[118px] -rotate-4 scale-102"
              : "bottom-[52px] -rotate-2 scale-98"
          }`}
        >
          <div className="p-4 space-y-2 opacity-35">
            <div className="h-2 w-16 bg-dark/50 rounded-full" />
            <div className="h-1.5 w-32 bg-dark/30 rounded-full" />
            <div className="h-1.5 w-24 bg-dark/25 rounded-full" />
          </div>
        </div>

        {/* Kertas Kanan */}
        <div
          className={`absolute z-10 w-[235px] h-[170px] rounded-2xl bg-[#F2EFE9] border border-white/70 shadow-sm transition-all duration-500 ease-out pointer-events-none ${
            isHovered
              ? "bottom-[112px] rotate-4 scale-102"
              : "bottom-[50px] rotate-2 scale-98"
          }`}
        >
          <div className="p-4 space-y-2 opacity-35">
            <div className="h-2 w-20 bg-dark/40 rounded-full" />
            <div className="h-1.5 w-28 bg-dark/25 rounded-full" />
          </div>
        </div>

        {/* 3. LAYER 3: FOTO SAMPUL MURNI / BERSIH TANPA DEKORASI ATAU BADGE APAPUN */}
        {/* Foto murni 100% borderless clean photo print */}
        <div
          className={`absolute z-20 w-[240px] h-[135px] rounded-xl overflow-hidden bg-white border-2 border-white/95 shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out ${
            isHovered
              ? "bottom-[125px] scale-105 shadow-[0_20px_35px_rgba(255,77,0,0.3)]"
              : "bottom-[28px] scale-100"
          }`}
        >
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={folderName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[#FAF6F0] flex flex-col items-center justify-center p-2 text-center">
              <BookOpen className="w-7 h-7 text-dark/30 mb-1" />
              <span className="font-sans font-bold text-xs text-dark/60 truncate max-w-[170px]">
                {folderName}
              </span>
            </div>
          )}
        </div>

        {/* 4. LAYER 4: SILUET DEPAN GLASSY TRANSPARAN (SELEBAR SILUET BELAKANG 12px s.d. 328px) */}
        <div className="absolute inset-x-[12px] bottom-[10px] h-[134px] z-30 rounded-[28px] overflow-hidden border border-white/20 bg-gradient-to-b from-white/15 via-[#1D2028]/75 to-[#101217]/92 backdrop-blur-md shadow-[0_-6px_20px_rgba(0,0,0,0.25),0_15px_30px_rgba(0,0,0,0.35)] flex flex-col justify-between p-4 pointer-events-none group-hover:from-white/20 group-hover:via-[#1D2028]/70 transition-all duration-300">

          {/* Bibir Kilau Kaca Atas (Glass Specular Highlight) */}
          <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

          {/* 3 Garis Emboss Fisik Minimalis Khas Folder Fisik (Tempat Pegangan Kertas) */}
          <div className="absolute bottom-3 inset-x-8 flex flex-col gap-1.5 opacity-20 pointer-events-none">
            <div className="h-[1.5px] w-full bg-white/90 rounded-full" />
            <div className="h-[1.5px] w-4/5 bg-white/70 rounded-full" />
            <div className="h-[1.5px] w-3/5 bg-white/50 rounded-full" />
          </div>

          {/* Baris Atas Glass Pocket: Badge Tahun & Status Privasi */}
          <div className="flex items-center justify-between z-10 pointer-events-auto">
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange text-white shadow-xs">
              ANGKATAN {year}
            </span>

            <span className="font-mono text-[9px] font-bold text-white/80 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/15 flex items-center gap-1">
              {isLocked ? (
                <>
                  <Lock className="w-2.5 h-2.5 text-amber-400" />
                  <span>Terkunci</span>
                </>
              ) : (
                <>
                  <Unlock className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Publik</span>
                </>
              )}
            </span>
          </div>

          {/* Baris Bawah Glass Pocket: Nama Sekolah & Tombol Aksi */}
          <div className="flex items-end justify-between gap-2 z-10 pointer-events-auto pt-2">
            <div className="overflow-hidden">
              <h4 className="font-headline font-black text-sm text-white tracking-wide truncate group-hover:text-orange transition-colors drop-shadow-xs">
                {folderName}
              </h4>
              <p className="font-mono text-[10px] text-white/60 mt-0.5">
                {studentCount} Siswa • {pageCount} Halaman • {fileSize}
              </p>
            </div>

            <div className="w-7 h-7 rounded-lg bg-white/15 group-hover:bg-orange text-white flex items-center justify-center shrink-0 border border-white/20 transition-all shadow-xs group-hover:border-orange">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
