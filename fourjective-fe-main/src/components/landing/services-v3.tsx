"use client";

import React from "react";
import VariantPoster from "./services-v3/variant-poster";
import { CtaBand } from "./services-v3/bits";

/**
 * Section "Pilar All-In-One" — final visual: Retro Poster (biru).
 * Variasi lain (grid / rows / bento / flow / marquee) masih tersimpan di
 * ./services-v3/variant-*.tsx kalau mau diaktifkan lagi.
 */
export default function ServicesV3() {
  return (
    <section id="services" className="relative w-full border-b-4 border-dark overflow-hidden">
      <VariantPoster />
      <CtaBand />
    </section>
  );
}
