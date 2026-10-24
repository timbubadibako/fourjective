"use client";

import React from "react";

interface PastiJadiStickerProps {
  className?: string;
  variant?: "orange-signature" | "amber-flame" | "dark-mode";
  size?: number | string;
}

/**
 * PastiJadiSticker - 100% Vector SVG Neobrutal Sticker
 * Identitas Fourjective: Swiss-Neobrutalism (Deep Ink #14161C, Pure Orange #FF4D00, Warm Paper #FAF6F0)
 */
export default function PastiJadiSticker({
  className = "",
  variant = "orange-signature",
  size = "100%",
}: PastiJadiStickerProps) {
  // Color presets based on Fourjective Brand Token
  const palettes = {
    "orange-signature": {
      outerStroke: "#14161C",
      outerFill: "#FF4D00",
      innerPad: "#FAF6F0",
      textFill: "#14161C",
      shadow: "#000000",
    },
    "amber-flame": {
      outerStroke: "#14161C",
      outerFill: "#FFB800",
      innerPad: "#FFF8F2",
      textFill: "#FF4D00",
      shadow: "#14161C",
    },
    "dark-mode": {
      outerStroke: "#FF4D00",
      outerFill: "#14161C",
      innerPad: "#2A2E39",
      textFill: "#FAF6F0",
      shadow: "#FF4D00",
    },
  };

  const c = palettes[variant];

  return (
    <svg
      viewBox="0 0 520 400"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none filter drop-shadow-[8px_8px_0px_${c.shadow}] hover:rotate-2 hover:scale-105 transition-transform duration-300 ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Filter untuk bevel / tactile sticker feel */}
        <filter id="sticker-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="4" dy="6" stdDeviation="0" floodColor={c.outerStroke} floodOpacity="1" />
        </filter>
      </defs>

      {/* ================= LAYER 1: OUTER BUBBLE SHIELD (ORANGE / ACCENT) ================= */}
      {/* Bentuk bubble meliuk organik khas stiker pop-culture */}
      <path
        d="M 120 70 
           C 170 30, 310 25, 410 55 
           C 475 75, 495 125, 470 180 
           C 490 220, 480 280, 440 320 
           C 390 370, 280 375, 180 365 
           C 110 360, 65 315, 80 250 
           C 50 200, 65 110, 120 70 Z"
        fill={c.outerFill}
        stroke={c.outerStroke}
        strokeWidth="14"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ================= LAYER 2: INNER WARM PAPER PAD (SPACER KREM) ================= */}
      <path
        d="M 130 85 
           C 175 48, 300 45, 395 72 
           C 450 88, 470 130, 450 178 
           C 468 215, 458 268, 422 302 
           C 378 345, 280 350, 192 342 
           C 128 338, 88 298, 100 242 
           C 74 200, 88 122, 130 85 Z"
        fill={c.innerPad}
        stroke={c.outerStroke}
        strokeWidth="7"
        strokeLinejoin="round"
      />

      {/* ================= LAYER 3: INNER CONTOUR HIGHLIGHT ================= */}
      {/* Aksen garis highlight tipis yang memberi efek vinyl timbul */}
      <path
        d="M 150 98 C 220 70, 320 68, 385 86"
        stroke={c.outerFill}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* ================= LAYER 4: RETRO BUBBLE TYPOGRAPHY ================= */}
      {/* 
          Teks "Pasti" (Baris 1) & "Jadi" (Baris 2)
          Menggunakan kurva melengkung retro 70s-90s funk 
      */}
      <g id="typography-group">
        {/* --- SIMBOL TAG HASTAG (#) --- */}
        <g transform="translate(95, 82) rotate(-8)">
          {/* Garis vertikal miring 1 */}
          <path
            d="M 28 8 C 30 25, 26 65, 22 88 C 21 95, 12 95, 10 88 C 8 70, 14 25, 16 8 C 17 2, 26 2, 28 8 Z"
            fill={c.textFill}
          />
          {/* Garis vertikal miring 2 */}
          <path
            d="M 52 5 C 55 24, 49 68, 45 92 C 44 98, 35 98, 33 92 C 31 72, 38 24, 40 5 C 41 -1, 50 -1, 52 5 Z"
            fill={c.textFill}
          />
          {/* Garis horizontal tebal 1 */}
          <path
            d="M 2 35 C 22 32, 50 30, 68 34 C 74 35, 74 44, 68 45 C 48 48, 20 48, 2 45 C -4 44, -4 36, 2 35 Z"
            fill={c.textFill}
          />
          {/* Garis horizontal tebal 2 */}
          <path
            d="M 0 62 C 20 59, 48 57, 65 61 C 71 62, 71 71, 65 72 C 45 75, 18 75, 0 72 C -6 71, -6 63, 0 62 Z"
            fill={c.textFill}
          />
        </g>

        {/* --- TEKS: PASTI (Baris Atas) --- */}
        <g transform="translate(170, 75) rotate(-3)">
          {/* Huruf P */}
          <path
            d="M 8 18 C 15 15, 38 12, 52 22 C 65 32, 64 52, 50 62 C 38 70, 25 68, 22 68 L 16 102 C 15 108, 6 108, 5 102 L 7 18 Z M 22 32 L 20 52 C 26 53, 36 54, 40 48 C 45 42, 44 34, 38 31 C 32 28, 25 30, 22 32 Z"
            fill={c.textFill}
          />

          {/* Huruf A */}
          <path
            d="M 72 42 C 60 48, 52 62, 55 78 C 58 92, 72 104, 90 98 C 105 92, 110 78, 108 65 L 106 50 C 105 38, 88 35, 72 42 Z M 88 62 L 88 78 C 82 82, 74 82, 72 75 C 70 68, 74 60, 88 62 Z"
            fill={c.textFill}
          />
          {/* Kaki kanan A */}
          <path
            d="M 104 55 C 108 55, 115 58, 114 75 L 112 98 C 111 104, 102 104, 101 98 L 104 55 Z"
            fill={c.textFill}
          />

          {/* Huruf S */}
          <path
            d="M 160 38 C 155 30, 140 28, 130 34 C 120 40, 122 52, 130 58 C 142 66, 164 68, 160 84 C 156 98, 138 102, 124 98 C 114 94, 112 85, 118 80 C 124 75, 130 82, 136 84 C 144 86, 148 82, 149 76 C 151 68, 136 64, 125 56 C 114 46, 116 32, 128 24 C 142 15, 164 18, 170 28 C 174 35, 166 42, 160 38 Z"
            fill={c.textFill}
          />

          {/* Huruf T */}
          <path
            d="M 172 34 C 170 28, 178 22, 185 22 L 218 20 C 225 20, 228 26, 225 32 L 208 33 L 202 96 C 201 102, 192 102, 191 96 L 195 34 L 172 34 Z"
            fill={c.textFill}
          />

          {/* Huruf I */}
          <path
            d="M 235 15 C 242 15, 248 20, 248 26 C 248 32, 242 38, 235 38 C 228 38, 222 32, 222 26 C 222 20, 228 15, 235 15 Z M 228 44 C 230 40, 240 40, 242 44 L 238 96 C 237 102, 228 102, 227 96 L 228 44 Z"
            fill={c.textFill}
          />
        </g>

        {/* --- TEKS: JADI (Baris Bawah) --- */}
        <g transform="translate(145, 185) rotate(2)">
          {/* Huruf J */}
          <path
            d="M 45 15 C 52 15, 58 20, 58 26 C 58 32, 52 38, 45 38 C 38 38, 32 32, 32 26 C 32 20, 38 15, 45 15 Z M 38 45 C 40 40, 50 40, 52 45 L 48 95 C 46 115, 30 128, 10 122 C -2 118, -4 106, 4 102 C 12 98, 18 106, 26 108 C 34 110, 38 104, 38 95 L 38 45 Z"
            fill={c.textFill}
          />

          {/* Huruf A */}
          <path
            d="M 75 55 C 62 60, 55 75, 58 92 C 62 108, 78 118, 96 112 C 112 105, 118 90, 114 75 L 112 62 C 110 50, 92 48, 75 55 Z M 95 78 L 94 94 C 88 98, 78 98, 75 90 C 72 82, 78 74, 95 78 Z"
            fill={c.textFill}
          />
          <path
            d="M 112 68 C 116 68, 122 72, 120 88 L 118 112 C 117 118, 108 118, 107 112 L 112 68 Z"
            fill={c.textFill}
          />

          {/* Huruf D */}
          <path
            d="M 168 25 C 172 25, 178 30, 178 36 L 174 112 C 173 118, 164 118, 163 112 L 165 98 C 158 108, 144 115, 130 110 C 114 104, 108 88, 112 70 C 116 52, 134 45, 150 48 L 165 50 L 168 25 Z M 150 68 C 138 68, 132 78, 130 85 C 128 92, 134 98, 142 98 C 150 98, 156 92, 156 82 L 154 68 L 150 68 Z"
            fill={c.textFill}
          />

          {/* Huruf I */}
          <path
            d="M 205 18 C 212 18, 218 23, 218 29 C 218 35, 212 41, 205 41 C 198 41, 192 35, 192 29 C 192 23, 198 18, 205 18 Z M 198 48 C 200 44, 210 44, 212 48 L 208 110 C 207 116, 198 116, 197 110 L 198 48 Z"
            fill={c.textFill}
          />
        </g>
      </g>
    </svg>
  );
}
