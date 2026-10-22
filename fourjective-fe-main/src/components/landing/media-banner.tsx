"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function MediaBanner() {
  return (
    <section
      id="media-banner"
      className="relative w-full overflow-hidden select-none border-b-4 border-dark"
    >
      {/* ================= TOP GREEN CAMO BAND (ALA 4.PNG) ================= */}
      <div className="relative w-full h-6 sm:h-7 bg-[#15803D] border-b-4 border-dark overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="green-camo-pattern"
            width="120"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 16 Q30 5 60 16 T120 16 Q90 28 60 20 T0 16Z"
              fill="#052E16"
            />
            <circle cx="20" cy="8" r="5" fill="#14532D" />
            <circle cx="85" cy="22" r="6" fill="#14532D" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#green-camo-pattern)" />
        </svg>
      </div>

      {/* ================= MAIN VIBRANT BANNER BODY (35-40VH) ================= */}
      <div className="relative w-full min-h-[300px] sm:min-h-[340px] md:h-[38vh] max-h-[420px] bg-[#4338CA] py-6 sm:py-8 px-4 sm:px-8 md:px-14 flex items-center justify-between overflow-hidden">
        {/* SVG LEOPARD / CHEETAH ROSETTE CAMO PATTERN (MATCHING 4.PNG) */}
        <div className="absolute inset-0 pointer-events-none opacity-45">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="leopard-camo"
              width="140"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              {/* Rosette 1 */}
              <path
                d="M20 25 C15 20, 10 35, 18 42 C24 48, 35 44, 32 32 C30 22, 24 28, 20 25 Z"
                fill="#312E81"
              />
              <circle cx="24" cy="34" r="3.5" fill="#1E1B4B" />

              {/* Rosette 2 */}
              <path
                d="M80 18 C72 12, 68 28, 74 36 C82 42, 94 36, 92 24 C90 14, 84 22, 80 18 Z"
                fill="#312E81"
              />
              <circle cx="82" cy="26" r="4" fill="#1E1B4B" />

              {/* Rosette 3 */}
              <path
                d="M110 80 C102 74, 98 90, 105 100 C114 108, 126 100, 122 88 C118 78, 114 86, 110 80 Z"
                fill="#312E81"
              />
              <circle cx="112" cy="90" r="3.8" fill="#1E1B4B" />

              {/* Rosette 4 */}
              <path
                d="M45 85 C38 80, 32 94, 40 104 C48 112, 60 104, 56 92 C52 82, 48 90, 45 85 Z"
                fill="#312E81"
              />
              <circle cx="47" cy="95" r="4" fill="#1E1B4B" />

              {/* Rosette 5 */}
              <path
                d="M85 110 C80 106, 76 118, 82 125 C88 130, 96 124, 94 116 Z"
                fill="#312E81"
              />

              {/* Solid Dots & Blobs */}
              <ellipse cx="55" cy="20" rx="4.5" ry="3.5" fill="#312E81" />
              <ellipse cx="115" cy="35" rx="5" ry="4" fill="#312E81" />
              <circle cx="15" cy="90" r="4" fill="#312E81" />
              <ellipse cx="80" cy="70" rx="6" ry="4" fill="#312E81" />
              <circle cx="130" cy="130" r="5" fill="#312E81" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#leopard-camo)" />
          </svg>
        </div>

        {/* Ambient Warm Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />

        {/* ================= CONTENT CONTAINER ================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* LEFT: MASSIVE 2-LINE GRAPHIC TYPOGRAPHY + STARBURST (MATCHING 4.PNG) */}
          <div className="relative flex flex-col items-start leading-[0.82] select-none">
            
            {/* Row 1: FOUR */}
            <div
              className="font-headline font-black text-[clamp(4rem,12vw,8.5rem)] uppercase text-accent-bright tracking-tight drop-shadow-[5px_5px_0px_#18181B]"
              style={{
                WebkitTextStroke: "4px #18181B",
                paintOrder: "stroke fill",
              }}
            >
              FOUR
            </div>

            {/* Row 2: MEDIA + OVERLAPPING STARBURST STICKER */}
            <div className="relative flex items-center">
              <div
                className="font-headline font-black text-[clamp(4rem,12vw,8.5rem)] uppercase text-accent-bright tracking-tight drop-shadow-[5px_5px_0px_#18181B]"
                style={{
                  WebkitTextStroke: "4px #18181B",
                  paintOrder: "stroke fill",
                }}
              >
                MEDIA
              </div>

              {/* STARBURST POP STICKER "VIEW MORE" (ALA 4.PNG DI HURUF M) */}
              <Link
                href="#portfolio"
                className="group absolute -left-4 sm:-left-8 -bottom-3 sm:-bottom-6 w-20 sm:w-26 md:w-32 h-20 sm:h-26 md:h-32 flex items-center justify-center transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer filter drop-shadow-[4px_4px_0px_#18181B]"
                aria-label="View More Media"
              >
                {/* 14-Point Starburst SVG */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full fill-[#FF3377] stroke-dark stroke-[3.5] drop-shadow-md"
                >
                  <polygon points="50,2 62,20 83,12 82,34 100,45 88,62 96,82 75,85 68,100 50,90 32,100 25,85 4,82 12,62 0,45 18,34 17,12 38,20" />
                </svg>

                {/* Text inside Starburst */}
                <div className="absolute inset-0 flex flex-col items-center justify-center font-headline font-black text-[10px] sm:text-xs md:text-sm text-accent-bright leading-tight text-center uppercase tracking-tight -rotate-3 group-hover:rotate-0 transition-transform">
                  <span>VIEW</span>
                  <span>MORE</span>
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT: 3 FANNED POLAROID / CANDID PHOTO CARDS (MATCHING 4.PNG) */}
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] h-[190px] sm:h-[220px] md:h-[260px] flex items-center justify-center md:justify-end">
            
            {/* Card 1 (Back left tilt) */}
            <div className="absolute w-36 sm:w-44 md:w-52 aspect-[4/5] rounded-2xl border-3 border-dark bg-amber-100 overflow-hidden shadow-[4px_4px_0px_#18181B] transform -rotate-10 -translate-x-12 sm:-translate-x-16 translate-y-1 hover:-translate-y-2 hover:rotate-[-6deg] transition-all duration-300">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80"
                alt="BTS Photoshoot"
                fill
                className="object-cover"
              />
            </div>

            {/* Card 2 (Middle slight right tilt) */}
            <div className="absolute w-36 sm:w-44 md:w-52 aspect-[4/5] rounded-2xl border-3 border-dark bg-white overflow-hidden shadow-[5px_5px_0px_#18181B] transform rotate-2 translate-x-0 translate-y-0 hover:-translate-y-2 hover:rotate-0 transition-all duration-300">
              <Image
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=500&q=80"
                alt="Classroom Candid"
                fill
                className="object-cover"
              />
            </div>

            {/* Card 3 (Front dominant right tilt ala 4.png) */}
            <div className="absolute w-38 sm:w-48 md:w-56 aspect-[4/5] rounded-2xl border-3 border-dark bg-white overflow-hidden shadow-[6px_6px_0px_#18181B] transform rotate-8 translate-x-8 sm:translate-x-12 translate-y-2 hover:-translate-y-3 hover:rotate-6 transition-all duration-300 z-10">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80"
                alt="High School Moments"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm border border-white/20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold text-white">
                <span>✦ BATCH ARCHIVE</span>
                <span className="text-accent-bright">2026</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ================= BOTTOM GREEN CAMO BAND (ALA 4.PNG) ================= */}
      <div className="relative w-full h-6 sm:h-7 bg-[#15803D] border-t-4 border-dark overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="green-camo-pattern-bottom"
            width="120"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 16 Q30 5 60 16 T120 16 Q90 28 60 20 T0 16Z"
              fill="#052E16"
            />
            <circle cx="45" cy="10" r="5" fill="#14532D" />
            <circle cx="105" cy="20" r="6" fill="#14532D" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#green-camo-pattern-bottom)" />
        </svg>
      </div>
    </section>
  );
}
