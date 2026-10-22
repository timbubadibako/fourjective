"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden relative">
      {/* Section Header Lockup */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="bg-dark text-accent-yellow font-mono text-xs font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-sm uppercase inline-block">
            ✦ SELECTED WORKS &bull; 2017 &ndash; 2026
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight mt-4 text-dark leading-tight">
            OUR FINEST <span className="text-orange underline decoration-wavy decoration-accent-yellow">YEARBOOK</span> STORIES
          </h2>
          <p className="text-sm md:text-base text-zinc-600 mt-2 font-medium max-w-xl leading-relaxed">
            Nol template basi. Setiap angkatan punya konsep visual autentik yang dirancang dari nol, didampingi pengarah gaya profesional, dan dicetak dengan standar album museum.
          </p>
        </div>

        {/* Quick Moodboard Concept Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-orange text-white border-2 border-dark font-mono text-xs font-black uppercase shadow-sm">
            ✦ ALL ARCHIVES
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white text-dark border-2 border-dark font-mono text-xs font-bold uppercase hover:bg-accent-yellow transition-colors cursor-pointer">
            #HIGH_FASHION
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white text-dark border-2 border-dark font-mono text-xs font-bold uppercase hover:bg-accent-lilac transition-colors cursor-pointer">
            #CYBER_Y2K
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white text-dark border-2 border-dark font-mono text-xs font-bold uppercase hover:bg-accent-mint transition-colors cursor-pointer">
            #WES_ANDERSON
          </span>
        </div>
      </div>

      {/* 3-COLUMN STAGGERED IRREGULAR GRID (GSAP PARALLAX TARGETS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start relative">
        
        {/* ================= COLUMN 1 (PARALLAX TARGET: col1) ================= */}
        <div id="portfolio-col-1" className="flex flex-col gap-8 will-change-transform">
          
          {/* Card 1.1: SMA Mondial Batam */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[3/4] relative">
              <Image
                src="https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7de096148969cdc51584b_COVER%20DEPAN%20SMA%20MONDIAL%20BATAM.png"
                alt="SMA Mondial Batam"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-black uppercase border border-white/20">
                01 &bull; HARDCOVER DOFF
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">BATAM &bull; 2024</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#LUXURY_DOFF</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                SMA Mondial Batam
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Cover doff velvet tahan gores dengan timbul Spot UV presisi.</p>
            </div>
          </div>

          {/* Card 1.2: High-Fashion Editorial Shoot */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="absolute -top-4 -right-3 w-16 pointer-events-none z-20 sticker-bob-a filter drop-shadow-md">
              <Image
                src="/images/loonart/hero_sticker_asset5.png"
                alt="Sticker 5"
                width={64}
                height={64}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[4/5] relative">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
                alt="Cyber Y2K Editorial Shoot"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-yellow text-dark font-mono text-[10px] font-black uppercase border border-dark">
                EDITORIAL THEME
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">ANGKATAN 2025</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#CYBER_Y2K</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                The Nostalgic Crew
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Konsep visual out-of-the-box dengan color grading film retro 90s.</p>
            </div>
          </div>

          {/* Card 1.3: SMAN 3 Bandung - Wes Anderson Editorial */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[16/11] relative">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                alt="Classroom Wes Anderson"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-lilac text-dark font-mono text-[10px] font-black uppercase border border-dark">
                SYMMETRIC SHOT
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">BANDUNG &bull; 2025</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#WES_ANDERSON</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                SMAN 3 Bandung
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Palet warna pastel simetris dengan wardrobe tematik vintage corduroy.</p>
            </div>
          </div>

          {/* Card 1.4: SMAN 1 Denpasar - Golden Hour Rooftop */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[3/4] relative">
              <Image
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
                alt="Sunset Rooftop"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-mint text-dark font-mono text-[10px] font-black uppercase border border-dark">
                OUTDOOR ROOFTOP
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">BALI &bull; 2024</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#GOLDEN_HOUR</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                SMAN 1 Denpasar
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Sesi senja dramatis dengan siluet hangat matahari Bali.</p>
            </div>
          </div>

        </div>

        {/* ================= COLUMN 2 (PARALLAX TARGET: col2 + INITIAL SHIFT) ================= */}
        <div id="portfolio-col-2" className="flex flex-col gap-8 md:translate-y-20 lg:translate-y-28 will-change-transform">
          
          {/* Card 2.1: SMAN 5 Samarinda */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[3/4] relative">
              <Image
                src="https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7ddf924f0e6c1f41d180a_COVER%20DEPAN%20SMAN%205%20SAMARINDA.png"
                alt="SMAN 5 Samarinda"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-orange text-white font-mono text-[10px] font-black uppercase border border-dark">
                02 &bull; FULLCOLOR ART
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">SAMARINDA &bull; 2024</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#FULLCOLOR_ART</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                SMAN 5 Samarinda
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Kertas Art Paper 150gr cetak offset Jerman anti-pudar seumur hidup.</p>
            </div>
          </div>

          {/* Card 2.2: Creative Studio Editorial Shoot */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="absolute -top-4 -left-3 w-16 pointer-events-none z-20 sticker-bob-b filter drop-shadow-md">
              <Image
                src="/images/loonart/hero_sticker_asset8.png"
                alt="Sticker 8"
                width={64}
                height={64}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[4/5] relative">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Youth Editorial Studio"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-pink text-dark font-mono text-[10px] font-black uppercase border border-dark">
                STUDIO SETTING
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">ANGKATAN 2025</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#EDITORIAL_RETRO</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                Classic Youth Chemistry
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Lighting studio multi-point dengan dynamic pose arahan art director.</p>
            </div>
          </div>

          {/* Card 2.3: SMA Taruna Nusantara */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[3/4] relative">
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="SMA Taruna Nusantara"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-dark text-white font-mono text-[10px] font-black uppercase border border-white/20">
                EDITORIAL PORTRAIT
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">MAGELANG &bull; 2025</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#FORMAL_CINEMA</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                SMA Taruna Nusantara
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Elegansi kedisiplinan berpadu dengan grading warna cinematic film.</p>
            </div>
          </div>

          {/* Card 2.4: SMAK Petra 1 Surabaya */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[3/4] relative">
              <Image
                src="https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7ddd15a54e7599d258fe3_COVER%20DEPAN%20SMAK%20PETRA%201%20SURABAYA.png"
                alt="SMAK Petra 1 Surabaya"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-yellow text-dark font-mono text-[10px] font-black uppercase border border-dark">
                04 &bull; RIGID BOX
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">SURABAYA &bull; 2024</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#GOLD_FOIL</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                SMAK Petra 1 Surabaya
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Kemasan box magnetik tebal eksklusif dengan foil emas hot-stamping.</p>
            </div>
          </div>

        </div>

        {/* ================= COLUMN 3 (PARALLAX TARGET: col3 + MID SHIFT) ================= */}
        <div id="portfolio-col-3" className="flex flex-col gap-8 md:translate-y-10 lg:translate-y-14 will-change-transform">
          
          {/* Card 3.1: SMAN 5 Makassar */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[3/4] relative">
              <Image
                src="https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7de043c61e4ee38d5bdde_COVER%20DEPAN%20SMAN%205%20MAKASSAR%201.png"
                alt="SMAN 5 Makassar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-mint text-dark font-mono text-[10px] font-black uppercase border border-dark">
                03 &bull; LINEN THREAD
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">MAKASSAR &bull; 2024</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#LINEN_COVER</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                SMAN 5 Makassar
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Buku tebal dijahit benang kokoh dapat terbuka 180 derajat rata sempurna.</p>
            </div>
          </div>

          {/* Card 3.2: Classroom Creative Crew */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="absolute -top-4 -right-3 w-16 pointer-events-none z-20 sticker-bob-a filter drop-shadow-md">
              <Image
                src="/images/loonart/hero_sticker_asset9.png"
                alt="Sticker 9"
                width={64}
                height={64}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[4/5] relative">
              <Image
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
                alt="Youth Classroom Story"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-yellow text-dark font-mono text-[10px] font-black uppercase border border-dark">
                CANDID MOMENT
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">ANGKATAN 2025</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#RETRO_POP</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                The Brotherhood
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Tawa autentik masa putih abu-abu yang tak bisa diulang dua kali.</p>
            </div>
          </div>

          {/* Card 3.3: SMAN 8 Jakarta - Cinematic Aerial Drone */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[16/10] relative">
              <Image
                src="https://cdn.prod.website-files.com/65d4758ce33eca00784c7a05/6602417b7a3303264fe482dc_ARTIKEL-2.jpg"
                alt="Aerial Drone Shoot"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white font-mono text-[10px] font-black uppercase border border-dark">
                4K DRONE SHOT
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">JAKARTA &bull; 2025</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#AERIAL_4K</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                SMAN 8 Jakarta
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Footage aerial drone 4K megah berpadu koreografi formasi angkatan.</p>
            </div>
          </div>

          {/* Card 3.4: Graduation Night Celebration */}
          <div className="group bg-white rounded-[2.25rem] border-2 border-dark p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5 relative">
            <div className="absolute -top-4 -left-3 w-16 pointer-events-none z-20 sticker-bob-b filter drop-shadow-md">
              <Image
                src="/images/loonart/hero_sticker_asset16.png"
                alt="Sticker 16"
                width={64}
                height={64}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-[1.75rem] overflow-hidden border border-dark/20 bg-zinc-100 aspect-[4/5] relative">
              <Image
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
                alt="Graduation Aftermovie"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-yellow text-dark font-mono text-[10px] font-black uppercase border border-dark">
                PROM NIGHT
              </span>
            </div>
            <div className="pt-3.5 pb-1 px-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">AFTERMOVIE 2024</span>
                <span className="font-mono text-[10px] font-bold text-zinc-400">#FESTIVAL_NIGHT</span>
              </div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
                A Night To Remember
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Dokumentasi aftermovie sinematik untuk malam perpisahan legendaris.</p>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM SAMPLE REQUEST CARD */}
      <div className="mt-20 p-8 sm:p-10 rounded-[2.5rem] bg-white border-2 border-dark shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">
        <div>
          <span className="font-mono text-xs font-black text-orange uppercase tracking-wider block mb-1">
            ✦ PENASARAN DENGAN KUALITAS FISIK KAMI?
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-dark leading-tight">
            Request Buku Sampel Fisik Langsung Ke Sekolah Anda
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            Kami kirimkan paket sampel hardcover, sample art paper, dan packaging box asli agar komite kelas bisa pegang langsung!
          </p>
        </div>
        <a
          href="https://wa.me/6289657008080?text=Halo%20Fourjective!%20Kami%20ingin%20request%20buku%20sampel%20fisik%20buku%20tahunan%20ke%20sekolah%20kami."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-dark text-white font-display font-black text-base hover:bg-orange transition-all transform hover:scale-105 shadow-xl border-2 border-dark"
        >
          <span>KIRIM SAMPEL GRATIS</span>
          <ArrowUpRight className="w-5 h-5 text-accent-yellow" />
        </a>
      </div>
    </section>
  );
}
