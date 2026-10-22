"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import Lenis from "lenis";
import Header from "@/components/landing/header-pill-v2";
import Hero from "@/components/landing/hero-v2";
import Traction from "@/components/landing/traction-v3";
import RunningText from "@/components/landing/running-text";
import KawalanBanner from "@/components/landing/kawalan-banner";
import ServicesCatalog from "@/components/landing/services-catalog";
import Showreel from "@/components/landing/showreel-horizontal";
import MediaBanner from "@/components/landing/media-banner-v4";
import GalleryMasonry from "@/components/landing/gallery-masonry";
import Portfolio from "@/components/landing/portfolio-v4";
import PortfolioOrbit from "@/components/landing/portfolio-orbit-v4";
import Faq from "@/components/landing/faq-v4";
import Footer from "@/components/landing/footer-v4";

interface GsapTimelineConfig {
  scrollTrigger?: Record<string, unknown>;
  [key: string]: unknown;
}

interface GsapTimeline {
  fromTo: (
    target: unknown,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: unknown
  ) => GsapTimeline;
  to: (
    target: unknown,
    vars: Record<string, unknown>,
    position?: unknown
  ) => GsapTimeline;
}

interface MatchMediaReturn {
  add: (query: string, fn: () => void) => void;
  revert: () => void;
}

interface GsapType {
  registerPlugin: (...plugins: unknown[]) => void;
  set: (target: unknown, vars: Record<string, unknown>) => void;
  to: (target: unknown, vars: Record<string, unknown>, position?: unknown) => unknown;
  fromTo: (
    target: unknown,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: unknown
  ) => unknown;
  timeline: (vars?: GsapTimelineConfig) => GsapTimeline;
  matchMedia: () => MatchMediaReturn;
  ticker: {
    add: (fn: (time: number) => void) => void;
    remove: (fn: (time: number) => void) => void;
    lagSmoothing: (threshold: number) => void;
  };
  utils: {
    toArray: <T = Element>(targets: string) => T[];
  };
}

interface ScrollTriggerInstance {
  kill: () => void;
}

interface ScrollTriggerType {
  getAll: () => ScrollTriggerInstance[];
  refresh: () => void;
  update: () => void;
  sort?: () => void;
}

declare global {
  interface Window {
    gsap?: GsapType;
    ScrollTrigger?: ScrollTriggerType;
  }
}

export default function HomePage() {
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [scrollTriggerLoaded, setScrollTriggerLoaded] = useState(false);

  // Active check if GSAP scripts already exist on window (prevents missing onLoad on hot reload/navigation)
  useEffect(() => {
    const checkGsap = () => {
      if (typeof window !== "undefined" && window.gsap && window.ScrollTrigger) {
        setGsapLoaded(true);
        setScrollTriggerLoaded(true);
        return true;
      }
      return false;
    };

    if (!checkGsap()) {
      const timer = setInterval(() => {
        if (checkGsap()) clearInterval(timer);
      }, 50);
      return () => clearInterval(timer);
    }
  }, []);

  // Global Slim Scroll Progress Line
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const bar = document.getElementById("scroll-progress-line");
      if (bar) bar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP & ScrollTrigger Animations Orchestration
  useEffect(() => {
    if (!gsapLoaded || !scrollTriggerLoaded) return;
    if (typeof window === "undefined" || !window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    /* ================= LENIS SMOOTH SCROLL =================
       Semua section pinned (hero, traction, showreel, galeri, orbit)
       adalah scrub-based — Lenis bikin pergerakannya halus & sinkron.
       Sumber scroll tetap window (native), JADI ScrollTrigger tidak
       butuh scrollerProxy: cukup update saat Lenis melaporkan scroll. */
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);
    const lenisRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // Initial State: 4 stickers directly hidden behind center book stack
    gsap.set(["#sticker-tl", "#sticker-tr", "#sticker-bl", "#sticker-br"], {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      scale: 0.15,
      opacity: 0,
      rotation: 0,
    });

    const mm = gsap.matchMedia();

    // ================= DESKTOP & TABLET (width >= 768px) =================
    mm.add("(min-width: 768px)", () => {
      // 1. Hero Fullscreen Multi-layer Timeline
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-fullscreen",
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self: { progress: number }) => {
            const indicator = document.getElementById("hero-scroll-indicator");
            if (indicator) {
              indicator.style.opacity = self.progress > 0.85 ? "0" : "1";
            }
          },
        },
      });

      heroTl.fromTo(
        "#hero-center-box",
        { scale: 0.95, y: 0 },
        { scale: 1.28, y: -20, ease: "none" },
        0
      );

      heroTl.fromTo("#typo-line-1", { x: 0 }, { x: -160, ease: "none" }, 0);
      heroTl.fromTo("#typo-line-2", { x: 0 }, { x: 160, ease: "none" }, 0);

      // Sticker 1: Top-Left
      heroTl.fromTo(
        "#sticker-tl",
        { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 },
        { x: -470, y: -210, rotation: -20, scale: 1.25, opacity: 1, ease: "none" },
        0
      );

      // Sticker 2: Top-Right
      heroTl.fromTo(
        "#sticker-tr",
        { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 },
        { x: 480, y: -200, rotation: 22, scale: 1.3, opacity: 1, ease: "none" },
        0
      );

      // Sticker 3: Bottom-Left
      heroTl.fromTo(
        "#sticker-bl",
        { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 },
        { x: -440, y: 210, rotation: 14, scale: 1.15, opacity: 1, ease: "none" },
        0
      );

      // Sticker 4: Bottom-Right
      heroTl.fromTo(
        "#sticker-br",
        { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 },
        { x: 460, y: 200, rotation: -16, scale: 1.2, opacity: 1, ease: "none" },
        0
      );

      // 2. Traction Horizontal Track Timeline
      const tractionTrack = document.getElementById("traction-track");
      const tractionSection = document.getElementById("traction");

      if (tractionTrack && tractionSection) {
        const getTractionDistance = () => tractionTrack.scrollWidth - window.innerWidth;

        gsap.to(tractionTrack, {
          x: () => -getTractionDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: tractionSection,
            start: "top top",
            end: () => `+=${getTractionDistance() + 600}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self: { progress: number }) => {
              const pct = Math.round(self.progress * 100);
              const label = document.getElementById("traction-percent");
              const bar = document.getElementById("traction-progress-fill");
              if (label) label.innerText = `${pct}%`;
              if (bar) bar.style.width = `${pct}%`;
            },
          },
        });

        // Fanned Island Cards (Cluster 2)
        gsap.fromTo(
          ".fan-card-1",
          { rotate: 0, x: 0 },
          {
            rotate: -20,
            x: -25,
            ease: "power1.out",
            scrollTrigger: {
              trigger: tractionSection,
              start: "top top",
              end: () => `+=${getTractionDistance() + 600}`,
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          ".fan-card-3",
          { rotate: 0, x: 0 },
          {
            rotate: 20,
            x: 25,
            ease: "power1.out",
            scrollTrigger: {
              trigger: tractionSection,
              start: "top top",
              end: () => `+=${getTractionDistance() + 600}`,
              scrub: 1.2,
            },
          }
        );

        // Fanned Hardcover Deck (Cluster 3)
        gsap.fromTo(
          ".fan-book-1",
          { rotate: 0, x: 0, y: 0 },
          {
            rotate: -22,
            x: -35,
            y: 8,
            ease: "power1.out",
            scrollTrigger: {
              trigger: tractionSection,
              start: "top top",
              end: () => `+=${getTractionDistance() + 600}`,
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          ".fan-book-3",
          { rotate: 0, x: 0, y: 0 },
          {
            rotate: 22,
            x: 35,
            y: 8,
            ease: "power1.out",
            scrollTrigger: {
              trigger: tractionSection,
              start: "top top",
              end: () => `+=${getTractionDistance() + 600}`,
              scrub: 1.2,
            },
          }
        );

        // Fanned Concept Tags (Cluster 4)
        gsap.fromTo(
          ".fan-tag-1",
          { rotate: 0, x: 0 },
          {
            rotate: -28,
            x: -40,
            ease: "power1.out",
            scrollTrigger: {
              trigger: tractionSection,
              start: "top top",
              end: () => `+=${getTractionDistance() + 600}`,
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          ".fan-tag-2",
          { rotate: 0, x: 0 },
          {
            rotate: -10,
            x: -14,
            ease: "power1.out",
            scrollTrigger: {
              trigger: tractionSection,
              start: "top top",
              end: () => `+=${getTractionDistance() + 600}`,
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          ".fan-tag-3",
          { rotate: 0, x: 0 },
          {
            rotate: 10,
            x: 14,
            ease: "power1.out",
            scrollTrigger: {
              trigger: tractionSection,
              start: "top top",
              end: () => `+=${getTractionDistance() + 600}`,
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          ".fan-tag-4",
          { rotate: 0, x: 0 },
          {
            rotate: 28,
            x: 40,
            ease: "power1.out",
            scrollTrigger: {
              trigger: tractionSection,
              start: "top top",
              end: () => `+=${getTractionDistance() + 600}`,
              scrub: 1.2,
            },
          }
        );

        // Word Badges Tilt Bob
        gsap.utils.toArray<HTMLElement>("#traction-track .word-badge").forEach((badge, i) => {
          gsap.fromTo(
            badge,
            { y: i % 2 === 0 ? -10 : 10 },
            {
              y: i % 2 === 0 ? 10 : -10,
              ease: "sine.inOut",
              scrollTrigger: {
                trigger: tractionSection,
                start: "top top",
                end: () => `+=${getTractionDistance() + 600}`,
                scrub: 1.5,
              },
            }
          );
        });
      }

      // 3. Showreel Pinned Expand (Smooth Fullscreen Immersion, No Awkward Shrink-back)
      const reelSection = document.getElementById("showreel");
      const reelFrame = document.getElementById("reel-frame");
      const reelHud = document.getElementById("reel-hud");

      if (reelSection && reelFrame) {
        const reelTl = gsap.timeline({
          scrollTrigger: {
            trigger: reelSection,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Expand smoothly to Fullscreen (0% -> 60%)
        reelTl.fromTo(
          reelFrame,
          { scale: 0.76, borderRadius: "2.5rem", borderColor: "rgba(255,255,255,0.2)" },
          { scale: 1.0, borderRadius: "0rem", borderColor: "rgba(255,255,255,0)", ease: "power1.out" },
          0
        );

        // Fade in HUD cleanly as it expands
        reelTl.fromTo(
          reelHud,
          { opacity: 0.2 },
          { opacity: 1, ease: "none" },
          0.2
        );
      }

      // 5. Portfolio Orbit Showcase (Interactive 3D fly-through matching 5.png)
      // NOTE: parallax kolom lama (#portfolio-col-1/2/3) sudah DIHAPUS —
      // penyusunan kolom sekarang ditangani di dalam portfolio-v4.tsx
      // (data-col + anchor catch-up), bukan lagi dari sini.
      const orbitSection = document.getElementById("portfolio-orbit");
      const orbitCenter = document.getElementById("portfolio-orbit-center");

      // ANIMASI ARSIP KARYA (re-enabled): mulai dari state BERSIH —
      // clearProps dulu supaya tidak ada sisa inline style dari
      // iterasi sebelumnya, baru state awal ditetapkan.
      if (orbitSection) {
        gsap.set(
          [
            "#orbit-book-1",
            "#orbit-book-2",
            "#orbit-book-3",
            "#orbit-book-4",
            "#orbit-book-5",
            "#orbit-book-6",
          ],
          { clearProps: "transform,opacity,clipPath,scale,left,top" }
        );

        const orbitTl = gsap.timeline({
          scrollTrigger: {
            trigger: orbitSection,
            start: "top top",
            end: "+=280%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Initial positions offscreen centered at stage origin
        gsap.set(
          [
            "#orbit-book-1",
            "#orbit-book-2",
            "#orbit-book-3",
            "#orbit-book-4",
            "#orbit-book-5",
            "#orbit-book-6",
          ],
          {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0.75,
          }
        );

        // Gentle breathing float on center graphic
        if (orbitCenter) {
          orbitTl.fromTo(
            orbitCenter,
            { scale: 0.94, y: 8 },
            { scale: 1.04, y: -8, ease: "sine.inOut" },
            0
          );
        }

        // --- Wave 1: The Iconic 5.png Trio (SMAN 5 Samarinda, SMAN 5 Makassar, 2024 Arcadia Mondial) ---
        // Book 1 (Left) flies in from top-left into exact 5.png position
        orbitTl.fromTo(
          "#orbit-book-1",
          { x: "-65vw", y: "-40vh", rotate: -25, scale: 0.75, opacity: 0 },
          { x: "-30vw", y: "-4vh", rotate: -7, scale: 1.0, opacity: 1, ease: "power1.out", duration: 0.22 },
          0
        );
        // Holds at 5.png position until 0.34, then swoops down-left offscreen
        orbitTl.to(
          "#orbit-book-1",
          { x: "-70vw", y: "45vh", rotate: -20, scale: 0.8, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.34
        );

        // Book 2 (Right) flies in from bottom-right into exact 5.png position
        orbitTl.fromTo(
          "#orbit-book-2",
          { x: "65vw", y: "45vh", rotate: 25, scale: 0.75, opacity: 0 },
          { x: "30vw", y: "-5vh", rotate: 8, scale: 1.0, opacity: 1, ease: "power1.out", duration: 0.22 },
          0
        );
        // Holds until 0.34, then swoops up-right offscreen
        orbitTl.to(
          "#orbit-book-2",
          { x: "70vw", y: "-45vh", rotate: 22, scale: 0.8, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.34
        );

        // Book 3 (2024 Arcadia Mondial) rises from bottom center into exact 5.png position
        orbitTl.fromTo(
          "#orbit-book-3",
          { x: "-8vw", y: "65vh", rotate: 0, scale: 0.8, opacity: 0 },
          { x: "-8vw", y: "30vh", rotate: 6, scale: 1.0, opacity: 1, ease: "power1.out", duration: 0.22 },
          0
        );
        // Holds until 0.34, then swoops up-left offscreen
        orbitTl.to(
          "#orbit-book-3",
          { x: "-55vw", y: "-40vh", rotate: 16, scale: 0.75, opacity: 0, ease: "power1.in", duration: 0.24 },
          0.34
        );

        // --- Wave 2: SMAK Petra 1 Surabaya & MAN 1 Kota Serang ---
        // Book 4 (SMAK Petra 1) sweeps in from offscreen right across center and exits top-left
        orbitTl.fromTo(
          "#orbit-book-4",
          { x: "65vw", y: "-35vh", rotate: -18, scale: 0.75, opacity: 0 },
          { x: "15vw", y: "-10vh", rotate: -6, scale: 1.02, opacity: 1, ease: "power1.out", duration: 0.24 },
          0.4
        );
        orbitTl.to(
          "#orbit-book-4",
          { x: "-65vw", y: "45vh", rotate: -22, scale: 0.75, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.66
        );

        // Book 5 (MAN 1 Serang) swoops in from left-bottom, crosses center-right, and exits bottom-right
        orbitTl.fromTo(
          "#orbit-book-5",
          { x: "-60vw", y: "40vh", rotate: 18, scale: 0.75, opacity: 0 },
          { x: "-12vw", y: "15vh", rotate: 8, scale: 1.0, opacity: 1, ease: "power1.out", duration: 0.24 },
          0.44
        );
        orbitTl.to(
          "#orbit-book-5",
          { x: "65vw", y: "50vh", rotate: 20, scale: 0.75, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.7
        );

        // --- Wave 3: SMAN 1 Nabire Grand Finale Fly-through ---
        // Book 6 (SMAN 1 Nabire) sweeps gracefully across the stage and exits cleanly
        orbitTl.fromTo(
          "#orbit-book-6",
          { x: "60vw", y: "30vh", rotate: 22, scale: 0.8, opacity: 0 },
          { x: "0vw", y: "-8vh", rotate: -4, scale: 1.05, opacity: 1, ease: "power1.out", duration: 0.22 },
          0.68
        );
        orbitTl.to(
          "#orbit-book-6",
          { x: "-70vw", y: "-45vh", rotate: -18, scale: 0.75, opacity: 0, ease: "power1.in", duration: 0.2 },
          0.88
        );
      }
    });

    // ================= MOBILE DEVICES (width < 768px) =================
    mm.add("(max-width: 767px)", () => {
      const heroTlMobile = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-fullscreen",
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      heroTlMobile.fromTo(
        "#hero-center-box",
        { scale: 0.95, y: 0 },
        { scale: 1.15, y: -10, ease: "none" },
        0
      );

      heroTlMobile.fromTo(
        "#sticker-tl",
        { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 },
        { x: -160, y: -130, rotation: -14, scale: 0.9, opacity: 1, ease: "none" },
        0
      );

      heroTlMobile.fromTo(
        "#sticker-tr",
        { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 },
        { x: 160, y: -120, rotation: 14, scale: 0.9, opacity: 1, ease: "none" },
        0
      );

      heroTlMobile.fromTo(
        "#sticker-bl",
        { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 },
        { x: -150, y: 130, rotation: 10, scale: 0.85, opacity: 1, ease: "none" },
        0
      );

      heroTlMobile.fromTo(
        "#sticker-br",
        { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 },
        { x: 150, y: 130, rotation: -12, scale: 0.85, opacity: 1, ease: "none" },
        0
      );

      // Mobile Traction Horizontal Scroll
      const tractionTrackM = document.getElementById("traction-track");
      const tractionSectionM = document.getElementById("traction");

      if (tractionTrackM && tractionSectionM) {
        const getTractionDistanceM = () => tractionTrackM.scrollWidth - window.innerWidth;

        gsap.to(tractionTrackM, {
          x: () => -getTractionDistanceM(),
          ease: "none",
          scrollTrigger: {
            trigger: tractionSectionM,
            start: "top top",
            end: () => `+=${getTractionDistanceM() + 400}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self: { progress: number }) => {
              const pct = Math.round(self.progress * 100);
              const label = document.getElementById("traction-percent");
              const bar = document.getElementById("traction-progress-fill");
              if (label) label.innerText = `${pct}%`;
              if (bar) bar.style.width = `${pct}%`;
            },
          },
        });
      }

      // Mobile Showreel Pinned Expand
      const reelSectionM = document.getElementById("showreel");
      const reelFrameM = document.getElementById("reel-frame");

      if (reelSectionM && reelFrameM) {
        const reelTlM = gsap.timeline({
          scrollTrigger: {
            trigger: reelSectionM,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        reelTlM.fromTo(
          reelFrameM,
          { scale: 0.82, borderRadius: "1.75rem", borderColor: "rgba(255,255,255,0.2)" },
          { scale: 1.0, borderRadius: "0rem", borderColor: "rgba(255,255,255,0)", ease: "power1.out" },
          0
        );
      }

      // Mobile Portfolio Orbit (Interactive 3D fly-through matching 5.png)
      const orbitSectionM = document.getElementById("portfolio-orbit");
      const orbitCenterM = document.getElementById("portfolio-orbit-center");

      // ANIMASI ARSIP KARYA mobile (re-enabled): clearProps dulu — state bersih
      if (orbitSectionM) {
        gsap.set(
          [
            "#orbit-book-1",
            "#orbit-book-2",
            "#orbit-book-3",
            "#orbit-book-4",
            "#orbit-book-5",
            "#orbit-book-6",
          ],
          { clearProps: "transform,opacity,clipPath,scale,left,top" }
        );

        const orbitTlM = gsap.timeline({
          scrollTrigger: {
            trigger: orbitSectionM,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(
          [
            "#orbit-book-1",
            "#orbit-book-2",
            "#orbit-book-3",
            "#orbit-book-4",
            "#orbit-book-5",
            "#orbit-book-6",
          ],
          {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0.7,
          }
        );

        if (orbitCenterM) {
          orbitTlM.fromTo(
            orbitCenterM,
            { scale: 0.9 },
            { scale: 1.05, ease: "sine.inOut" },
            0
          );
        }

        // Wave 1: Iconic 5.png Trio
        orbitTlM.fromTo(
          "#orbit-book-1",
          { x: "-60vw", y: "-35vh", rotate: -20, scale: 0.7, opacity: 0 },
          { x: "-22vw", y: "-18vh", rotate: -8, scale: 0.95, opacity: 1, ease: "power1.out", duration: 0.22 },
          0
        );
        orbitTlM.to(
          "#orbit-book-1",
          { x: "-65vw", y: "40vh", rotate: -16, scale: 0.7, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.34
        );

        orbitTlM.fromTo(
          "#orbit-book-2",
          { x: "60vw", y: "35vh", rotate: 20, scale: 0.7, opacity: 0 },
          { x: "22vw", y: "18vh", rotate: 8, scale: 0.95, opacity: 1, ease: "power1.out", duration: 0.22 },
          0
        );
        orbitTlM.to(
          "#orbit-book-2",
          { x: "65vw", y: "-40vh", rotate: 18, scale: 0.7, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.34
        );

        orbitTlM.fromTo(
          "#orbit-book-3",
          { x: "0vw", y: "60vh", rotate: 0, scale: 0.75, opacity: 0 },
          { x: "0vw", y: "24vh", rotate: 4, scale: 0.95, opacity: 1, ease: "power1.out", duration: 0.22 },
          0
        );
        orbitTlM.to(
          "#orbit-book-3",
          { x: "-60vw", y: "-35vh", rotate: 14, scale: 0.65, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.34
        );

        // Wave 2
        orbitTlM.fromTo(
          "#orbit-book-4",
          { x: "55vw", y: "-30vh", rotate: -16, scale: 0.7, opacity: 0 },
          { x: "12vw", y: "-14vh", rotate: -6, scale: 0.95, opacity: 1, ease: "power1.out", duration: 0.24 },
          0.4
        );
        orbitTlM.to(
          "#orbit-book-4",
          { x: "-55vw", y: "40vh", rotate: -18, scale: 0.65, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.66
        );

        orbitTlM.fromTo(
          "#orbit-book-5",
          { x: "-50vw", y: "35vh", rotate: 16, scale: 0.7, opacity: 0 },
          { x: "-10vw", y: "14vh", rotate: 6, scale: 0.95, opacity: 1, ease: "power1.out", duration: 0.24 },
          0.44
        );
        orbitTlM.to(
          "#orbit-book-5",
          { x: "55vw", y: "45vh", rotate: 18, scale: 0.65, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.7
        );

        // Wave 3
        orbitTlM.fromTo(
          "#orbit-book-6",
          { x: "50vw", y: "25vh", rotate: 18, scale: 0.75, opacity: 0 },
          { x: "0vw", y: "-6vh", rotate: -4, scale: 1.0, opacity: 1, ease: "power1.out", duration: 0.22 },
          0.68
        );
        orbitTlM.to(
          "#orbit-book-6",
          { x: "-55vw", y: "-40vh", rotate: -16, scale: 0.65, opacity: 0, ease: "power1.in", duration: 0.2 },
          0.88
        );
      }
    });

    // Refresh ScrollTrigger to calculate accurate pin offsets
    ScrollTrigger.refresh();

    /* NORMALISASI URUTAN PIN:
       Pin dibuat lintas React effect (galeri & portfolio = komponen anak,
       hero/traction/showreel/orbit = parent). Kalau urutan pembuatan tidak
       sama dengan urutan dokumen, start pin di bawahnya dihitung TANPA
       spacer pin di atasnya → orbit "masuk" terlalu awal & menimpa galeri.
       ScrollTrigger.sort() menyambung ulang rantai pin sesuai posisi
       dokumen. refresh() saja TIDAK cukup. Normalisasi dijalankan ulang
       di rAF berikutnya + sekali lagi setelah layout settle (fonts/img). */
    const normalizeTriggers = () => {
      ScrollTrigger.sort?.();
      ScrollTrigger.refresh();
    };
    const normalizeRaf = requestAnimationFrame(normalizeTriggers);
    const normalizeDelay = setTimeout(normalizeTriggers, 800);
    window.addEventListener("load", normalizeTriggers);

    return () => {
      cancelAnimationFrame(normalizeRaf);
      clearTimeout(normalizeDelay);
      window.removeEventListener("load", normalizeTriggers);
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [gsapLoaded, scrollTriggerLoaded]);

  return (
    <>
      {/* GSAP CDN Loaders */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => setGsapLoaded(true)}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="afterInteractive"
        onLoad={() => setScrollTriggerLoaded(true)}
      />

      {/* Thin Slim Scroll Progress Bar Top Accent */}
      <div
        id="scroll-progress-line"
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-orange via-accent-yellow to-orange z-50 w-0 pointer-events-none transition-[width] duration-75"
      />

      <main className="min-h-screen bg-paper text-dark selection:bg-orange selection:text-white relative">
        <Header />
        <Hero />
        <Traction fontMode="playtimes" />
        <RunningText />
        <KawalanBanner />
        <ServicesCatalog />
        <Showreel />
        <MediaBanner />
        <GalleryMasonry />
        <Portfolio />
        <PortfolioOrbit />
        <Faq />
        <Footer />
      </main>
    </>
  );
}
