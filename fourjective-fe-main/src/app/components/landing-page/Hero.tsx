"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import MascotLeft from "../../../../public/images/landing-page/hero/mascot-left.svg";
import MascotRight from "../../../../public/images/landing-page/hero/mascot-right.svg";
import Cloud1 from "../../../../public/images/landing-page/hero/cloud-1.svg";
import Cloud2 from "../../../../public/images/landing-page/hero/cloud-2.svg";
import Cloud3 from "../../../../public/images/landing-page/hero/cloud-3.svg";
import Mascot1 from "../../../../public/images/landing-page/hero/mascot-1.svg";
import ProjectText from "../../../../public/images/landing-page/hero/projects-text.svg";
import TopEclipse from "../../../../public/images/landing-page/hero/eclipse-top.svg";
import BottomEclipse from "../../../../public/images/landing-page/hero/eclipse-bottom.svg";
import TopWave from "../../../../public/images/landing-page/hero/wave-top.svg";
import BottomWave from "../../../../public/images/landing-page/hero/wave-bottom.svg";
import Mascot2 from "../../../../public/images/landing-page/hero/mascot-2.svg";
import Fourjective from "../../../../public/images/landing-page/hero/fourjective.png";
import FourjectiveBG from "../../../../public/images/landing-page/hero/fourjective-card-bg.svg";
import Star from "../../../../public/images/landing-page/hero/star.svg";

const Hero = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const projectContainerRef = useRef<HTMLDivElement>(null);
  const projectIsInView = useInView(projectContainerRef, { once: false });
  const projectControl = useAnimation();

  const possibleContainerRef = useRef<HTMLDivElement>(null);
  const possibleIsInView = useInView(possibleContainerRef, { once: false });
  const possibleControl = useAnimation();

  const serviceContainerRef = useRef<HTMLDivElement>(null);
  const serviceIsInView = useInView(serviceContainerRef, { once: false });
  const serviceControl = useAnimation();

  const momentContainerRef = useRef<HTMLDivElement>(null);
  const momentIsInView = useInView(momentContainerRef, { once: false });
  const momentControl = useAnimation();

  const mascotLeftContainerRef = useRef<HTMLDivElement>(null);
  const mascotLeftIsInView = useInView(mascotLeftContainerRef, { once: false });
  const mascotLeftControl = useAnimation();

  const mascotRightContainerRef = useRef<HTMLDivElement>(null);
  const mascotRightIsInView = useInView(mascotRightContainerRef, {
    once: false,
  });
  const mascotRightControl = useAnimation();

  const cloud1ContainerRef = useRef<HTMLDivElement>(null);
  const cloud1IsInView = useInView(cloud1ContainerRef, { once: false });
  const cloud1Control = useAnimation();

  const cloud2ContainerRef = useRef<HTMLDivElement>(null);
  const cloud2IsInView = useInView(cloud2ContainerRef, { once: false });
  const cloud2Control = useAnimation();

  const cloud3ContainerRef = useRef<HTMLDivElement>(null);
  const cloud3IsInView = useInView(cloud3ContainerRef, { once: false });
  const cloud3Control = useAnimation();

  const cardVariant = {
    hidden: (direction: "left" | "right" | "bottom") => ({
      x: direction === "left" ? "-20%" : direction === "right" ? "20%" : 0,
      y: direction === "bottom" ? "-20%" : 0,
      opacity: 0,
    }),
    visible: {
      x: "0%",
      y: "0%",
      opacity: 1,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  const assetVariant = {
    hidden: (direction: "left" | "right") => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
    }),
    visible: {
      x: "0%",
      opacity: 1,
      transition: { type: "spring", stiffness: 50 },
    },
  };

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

  useEffect(() => {
    if (projectIsInView) {
      projectControl.start("visible");
    } else {
      projectControl.start("hidden");
    }

    if (possibleIsInView) {
      possibleControl.start("visible");
    } else {
      possibleControl.start("hidden");
    }

    if (serviceIsInView) {
      serviceControl.start("visible");
    } else {
      serviceControl.start("hidden");
    }

    if (momentIsInView) {
      momentControl.start("visible");
    } else {
      momentControl.start("hidden");
    }

    if (mascotLeftIsInView) {
      mascotLeftControl.start("visible");
    } else {
      mascotLeftControl.start("hidden");
    }

    if (mascotRightIsInView) {
      mascotRightControl.start("visible");
    } else {
      mascotRightControl.start("hidden");
    }

    if (cloud1IsInView) {
      cloud1Control.start("visible");
    } else {
      cloud1Control.start("hidden");
    }

    if (cloud2IsInView) {
      cloud2Control.start("visible");
    } else {
      cloud2Control.start("hidden");
    }

    if (cloud3IsInView) {
      cloud3Control.start("visible");
    } else {
      cloud3Control.start("hidden");
    }
  }, [
    projectIsInView,
    possibleIsInView,
    serviceIsInView,
    momentIsInView,
    mascotLeftIsInView,
    mascotRightIsInView,
    cloud1IsInView,
    cloud2IsInView,
    cloud3IsInView,
  ]);

  return (
    <section className="relative min-h-screen overflow-hidden border-b-[16px] border-black bg-[#FF7700] md:h-full">
      <Image
        src="/images/landing-page/hero/background-hero.svg"
        alt="Hero Background"
        fill
        className="absolute object-cover"
      />
      {/* Mascot Left Asset */}
      <div
        className="absolute -left-[22%] -top-[12%] z-10 scale-50 md:-left-[1%] md:top-[4%] md:scale-100"
        ref={mascotLeftContainerRef}
      >
        <motion.div
          initial="hidden"
          animate={mascotLeftControl}
          variants={assetVariant}
          custom="left"
        >
          <Image
            src={MascotLeft}
            alt="Mascot Left"
            className="scale-[0.85] md:scale-100"
          />
        </motion.div>
      </div>

      {/* Mascot Right Asset */}
      <div
        className="absolute -right-[22%] top-[16%] scale-50 md:-right-[1%] md:top-[15%] md:scale-100"
        ref={mascotRightContainerRef}
      >
        <motion.div
          initial="hidden"
          animate={mascotRightControl}
          variants={assetVariant}
          custom="right"
        >
          <Image
            src={MascotRight}
            alt="Mascot Right"
            className="scale-[0.85] md:scale-100"
          />
        </motion.div>
      </div>

      {/* Cloud 1 Asset */}
      <div
        className="absolute -left-[1%] top-[44%] hidden md:block"
        ref={cloud1ContainerRef}
      >
        <motion.div
          initial="hidden"
          animate={cloud1Control}
          variants={assetVariant}
          custom="left"
        >
          <Image src={Cloud1} alt="Cloud 1" />
        </motion.div>
      </div>

      {/* Cloud 2 Asset */}
      <div
        className="absolute -right-[16%] top-[46%] hidden md:block"
        ref={cloud2ContainerRef}
      >
        <motion.div
          initial="hidden"
          animate={cloud2Control}
          variants={assetVariant}
          custom="right"
        >
          <Image src={Cloud2} alt="Cloud 2" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="mx-auto flex flex-col gap-6 px-4 md:max-w-[1440px] md:gap-16 md:px-[42px]">
        {/* Hero Title */}
        <div className="z-20 mt-24 flex flex-col items-center justify-center gap-2 py-16 md:mt-52 md:gap-6 md:py-32">
          <h1
            className="font-lexendZetta text-4xl font-extrabold text-white md:text-8xl"
            style={{
              WebkitTextStroke: isLargeScreen ? "8px black" : "4px black",
              paintOrder: "stroke fill",
            }}
          >
            FOURJECTIV
          </h1>
          <div className="mt-2 h-[12px] w-3/4 border-2 border-black bg-white md:h-3 md:w-1/2"></div>

          <h1
            className="text-center font-lexendZetta text-[24px] font-extrabold text-white md:text-6xl lg:w-3/4"
            style={{
              WebkitTextStroke: isLargeScreen ? "8px black" : "4px black",
              paintOrder: "stroke fill",
            }}
          >
            DO THE BEST FOR THE BEST MOMENT
          </h1>
        </div>

        {/* Fourjective Card */}
        <motion.div
          initial="hidden"
          animate={momentControl}
          variants={cardVariant}
          custom={isLargeScreen ? "bottom" : "right"}
          ref={momentContainerRef}
        >
          <div
            className="relative mb-6 flex w-full flex-col gap-6 rounded-3xl border-4 border-black px-6 py-8 md:mb-20 md:mt-20 md:flex-row md:gap-8 md:rounded-[32px] md:border-[8px] md:px-12 md:py-16"
            style={{
              backgroundImage: `url('/images/landing-page/hero/bg-box.svg')`,
              backgroundSize: "cover, auto",
              backgroundPosition: "center, center",
              backgroundRepeat: "no-repeat, repeat",
            }}
          >
            {/* Star */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-16 -top-[88px] z-20 hidden md:block"
            >
              <Image src={Star} alt="Star" />
            </motion.div>

            {/* Text */}
            <div className="z-20 flex w-full flex-col justify-between gap-4 md:gap-0">
              <h2
                className="text-center font-lexendZetta text-2xl text-white md:mb-8 md:text-start md:text-[48px] md:font-semibold"
                style={{
                  WebkitTextStroke: isLargeScreen ? "2px black" : "3px black",
                  paintOrder: "stroke fill",
                }}
              >
                FOURJECTIV Hadir
              </h2>
              <div className="w-full rounded-xl border-2 border-black bg-white px-4 py-2 md:rounded-lg md:border-4 md:px-6 md:py-4">
                <p className="w-full font-poppins text-xs font-medium leading-5 text-black md:text-xl">
                  Fourjectiv hadir bukan hanya mencetak buku. Kami percaya,
                  kenangan yang baik layak dirangkai dengan cara yang istimewa.
                  Bukan hanya foto, tapi juga melalui video short movie, rewind
                  sekolah yang kami produksi bersama tim film profesional,
                  dokumentasi angkatan yang penuh cerita, hingga desain yang
                  estetik dan relevan. Semua kami siapkan agar masa sekolahmu
                  tak sekadar lewat, tapi benar-benar hidup kembali saat kamu
                  membukanya kelak.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
