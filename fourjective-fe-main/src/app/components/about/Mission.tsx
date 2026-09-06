"use client";

import { useState, useEffect } from "react";

export default function History() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex min-h-[55vh] w-full flex-col items-center overflow-hidden border-b-8 border-black bg-[#F68722] px-8 md:px-12 text-white md:min-h-[80vh]">
      <h1
        className="pb-12 pt-16 text-center font-lexendZetta text-4xl text-white md:text-5xl lg:text-6xl"
        style={{
          WebkitTextStroke: isLargeScreen ? "7px black" : "4px black",
          paintOrder: "stroke fill",
        }}
      >
        VISI & MISI
      </h1>
      <div className="mb-16 text-lg md:text-2xl">
        <p>VISI :</p>
        <p className="mb-5">
          Menjadi mitra terpercaya dalam menciptakan buku tahunan (Yearbook)
          yang menyentuh hati, berkualitas tinggi, dan penuh kenangan otentik
          untuk generasi sekolah masa kini — dengan sentuhan teknologi dan
          inovasi yang selalu kami update dari tahun ke tahun.
        </p>
        <p>MISI :</p>
        <p>
          1. Mengabadikan kenangan sekolah dengan pendekatan personal dan
          emosional
        </p>
        <p>2. Menjaga standar kualitas tertinggi</p>
        <p>
          3. Berinovasi secara berkelanjutan dengan teknologi visual terkini
        </p>
        <p>4. Membangun komunikasi kolaboratif</p>
        <p>5. Memberikan layanan tepat waktu dan bertanggung jawab</p>
        <p>6. Mendedikasikan upaya terbaik untuk setiap momen berharga</p>
        <p>
          7. Memberikan solusi dengan sudut pandang sebagai klien itu sendiri
        </p>
      </div>
    </div>
  );
}
