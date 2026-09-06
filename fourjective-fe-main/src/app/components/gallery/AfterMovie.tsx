"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import MascotNew from "../../../../public/images/gallery/after-movie/mascot-new.svg";
import StarLeft from "../../../../public/images/gallery/after-movie/star-1.svg";
import StarRight1 from "../../../../public/images/gallery/after-movie/star-right-1.svg";
import StarRight2 from "../../../../public/images/gallery/after-movie/star-right-2.svg";

const AfterMovie = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false });
  const mascotIsInView = useInView(mascotContainerRef, { once: false });
  const starLeftControls = useAnimation();
  const starRight1Controls = useAnimation();
  const starRight2Controls = useAnimation();
  const mascotControls = useAnimation();

  const starVariants = {
    rotate1: {
      rotate: [0, 360],
      transition: { duration: 4, repeat: Infinity, ease: "linear" },
    },
    rotate2: {
      rotate: [0, -360],
      transition: { duration: 4, repeat: Infinity, ease: "linear" },
    },
  };

  const mascotVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
    },
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
    if (isInView) {
      starLeftControls.start("rotate1");
      starRight1Controls.start("rotate2");
      starRight2Controls.start("rotate2");
      if (mascotIsInView) {
        mascotControls.start("visible");
      } else {
        mascotControls.start("hidden");
      }
    }
  }, [isInView, mascotIsInView]);

  return (
    <section>
      <div
        className="relative overflow-hidden border-b-[16px] border-black bg-[#FF790C] bg-[url('/images/gallery/after-movie/after-movie-bg.png')] bg-cover bg-fixed bg-center bg-repeat"
        ref={containerRef}
      >
        {/* Mascot */}
        <div
          className="absolute -bottom-[23%] -left-[23%] z-20 scale-50 md:-bottom-[1%] md:-left-[0%] md:scale-100"
          ref={mascotContainerRef}
        >
          <motion.div
            initial="hidden"
            variants={mascotVariants}
            animate={mascotControls}
          >
            <Image
              src={MascotNew}
              alt="MascotNew"
              className="scale-75 md:scale-100"
            />
          </motion.div>
        </div>

        {/* Star Left */}
        <motion.div
          variants={starVariants}
          animate={starLeftControls}
          className="absolute -left-[6%] -top-[5%] scale-50 md:left-[1%] md:top-[2%] md:scale-100"
        >
          <Image
            src={StarLeft}
            alt="Star 1"
            className="scale-50 md:scale-100"
          />
        </motion.div>

        {/* Star Right 1 */}
        <motion.div
          variants={starVariants}
          animate={starRight1Controls}
          className="absolute -right-[0%] -top-[13%] scale-50 md:-top-[5%] md:right-[3%] md:scale-100"
        >
          <Image
            src={StarRight1}
            alt="Star Right 1"
            className="scale-50 md:scale-100"
          />
        </motion.div>

        {/* Star Right 2 */}
        <motion.div
          variants={starVariants}
          animate={starRight2Controls}
          className="absolute -right-[10%] top-[5%] scale-50 md:-right-[2%] md:top-[14%] md:scale-100"
        >
          <Image
            src={StarRight2}
            alt="Star Right 2"
            className="scale-50 md:scale-100"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 mx-auto flex h-96 max-w-full flex-col items-center gap-6 px-4 py-12 md:h-[880px] md:max-w-[1440px] md:gap-16 md:px-14 md:py-16">
          {/* Title */}
          <h2
            className="text-center font-lexendZetta text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: isLargeScreen ? "8px black" : "4px black",
              paintOrder: "stroke fill",
              lineHeight: isLargeScreen ? "1.0" : "1.5",
            }}
          >
            AFTER MOVIE
          </h2>

          {/* Video */}
          <video
            className="h-48 w-full rounded-md border-4 border-black bg-black drop-shadow-[0_4px_0_rgba(0,0,0,1.0)] md:h-[600px] md:rounded-2xl md:border-[8px] md:drop-shadow-[0_16px_0_rgba(0,0,0,1.0)]"
            controls
            preload="none"
          >
            <source src="/videos/aftermovie-fourjectiv.mp4" />
          </video>
        </div>
      </div>
      <div
        className="relative overflow-hidden border-b-[16px] border-black bg-[#9D7CFF] bg-[url('/images/gallery/after-movie/after-movie-bg.png')] bg-cover bg-fixed bg-center bg-repeat"
        ref={containerRef}
      >
        {/* Mascot */}
        <div
          className="absolute -bottom-[23%] -left-[23%] z-20 scale-50 md:-bottom-[1%] md:-left-[0%] md:scale-100"
          ref={mascotContainerRef}
        >
          <motion.div
            initial="hidden"
            variants={mascotVariants}
            animate={mascotControls}
          >
            <Image
              src={MascotNew}
              alt="MascotNew"
              className="scale-75 md:scale-100"
            />
          </motion.div>
        </div>

        {/* Star Left */}
        <motion.div
          variants={starVariants}
          animate={starLeftControls}
          className="absolute -left-[6%] -top-[5%] scale-50 md:left-[1%] md:top-[2%] md:scale-100"
        >
          <Image
            src={StarLeft}
            alt="Star 1"
            className="scale-50 md:scale-100"
          />
        </motion.div>

        {/* Star Right 1 */}
        <motion.div
          variants={starVariants}
          animate={starRight1Controls}
          className="absolute -right-[0%] -top-[13%] scale-50 md:-top-[5%] md:right-[3%] md:scale-100"
        >
          <Image
            src={StarRight1}
            alt="Star Right 1"
            className="scale-50 md:scale-100"
          />
        </motion.div>

        {/* Star Right 2 */}
        <motion.div
          variants={starVariants}
          animate={starRight2Controls}
          className="absolute -right-[10%] top-[5%] scale-50 md:-right-[2%] md:top-[14%] md:scale-100"
        >
          <Image
            src={StarRight2}
            alt="Star Right 2"
            className="scale-50 md:scale-100"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 mx-auto flex h-96 max-w-full flex-col items-center gap-6 px-4 py-12 md:h-[880px] md:max-w-[1440px] md:gap-16 md:px-14 md:py-16">
          {/* Title */}
          <h2
            className="text-center font-lexendZetta text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: isLargeScreen ? "8px black" : "4px black",
              paintOrder: "stroke fill",
              lineHeight: isLargeScreen ? "1.0" : "1.5",
            }}
          >
            REWIND
          </h2>

          {/* Video */}
          <video
            className="h-48 w-full rounded-md border-4 border-black bg-black drop-shadow-[0_4px_0_rgba(0,0,0,1.0)] md:h-[600px] md:rounded-2xl md:border-[8px] md:drop-shadow-[0_16px_0_rgba(0,0,0,1.0)]"
            controls
            preload="none"
          >
            <source src="/videos/rewind-fourjectiv.mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default AfterMovie;
