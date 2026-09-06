"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import TopLeft from "./Portfolio/TopLeft";
import TopRight from "./Portfolio/TopRight";
import Middle from "./Portfolio/Middle";
import BottomRight from "./Portfolio/BottomRight";
import BottomLeft from "./Portfolio/BottomLeft";
import Image from "next/image";

const Portfolio = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const topLeftContainerRef = useRef<HTMLDivElement>(null);
  const topLeftIsInView = useInView(topLeftContainerRef, { once: false });
  const topLeftControl = useAnimation();

  const topRightContainerRef = useRef<HTMLDivElement>(null);
  const topRightIsInView = useInView(topRightContainerRef, { once: false });
  const topRightControl = useAnimation();

  const middleContainerRef = useRef<HTMLDivElement>(null);
  const middleIsInView = useInView(middleContainerRef, { once: false });
  const middleControl = useAnimation();

  const bottomRightContainerRef = useRef<HTMLDivElement>(null);
  const bottomRightIsInView = useInView(bottomRightContainerRef, {
    once: false,
  });
  const bottomRightControl = useAnimation();

  const bottomLeftContainerRef = useRef<HTMLDivElement>(null);
  const bottomLeftIsInView = useInView(bottomLeftContainerRef, { once: false });
  const bottomLeftControl = useAnimation();

  const variant = {
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
    if (topLeftIsInView) {
      topLeftControl.start("visible");
    } else {
      topLeftControl.start("hidden");
    }

    if (topRightIsInView) {
      topRightControl.start("visible");
    } else {
      topRightControl.start("hidden");
    }

    if (middleIsInView) {
      middleControl.start("visible");
    } else {
      middleControl.start("hidden");
    }

    if (bottomRightIsInView) {
      bottomRightControl.start("visible");
    } else {
      bottomRightControl.start("hidden");
    }

    if (bottomLeftIsInView) {
      bottomLeftControl.start("visible");
    } else {
      bottomLeftControl.start("hidden");
    }
  }, [
    topLeftIsInView,
    topRightIsInView,
    middleIsInView,
    bottomRightIsInView,
    bottomLeftIsInView,
  ]);

  return (
    <section className="relative overflow-hidden bg-[#209E68] bg-[url('/images/landing-page/portfolio/portfolio-bg.svg')] bg-cover bg-fixed bg-center bg-repeat">
      {/* Content */}
      <div className="relative mx-auto flex h-[2400px] max-w-full md:h-[3800px] md:max-w-[1440px]">
        <Image
          src="/images/landing-page/portfolio/assets-top-right.svg"
          alt="Portfolio"
          width={703}
          height={1357}
          className="absolute right-0 top-0 w-[300px] translate-x-56 md:w-[500px]"
        />
        <Image
          src="/images/landing-page/portfolio/assets-top-left.svg"
          alt="Portfolio"
          width={703}
          height={1357}
          className="absolute left-0 top-0 w-[300px] -translate-x-56 md:w-[500px]"
        />
        <Image
          src="/images/landing-page/portfolio/assets-bottom-left.svg"
          alt="Portfolio"
          width={703}
          height={1357}
          className="absolute bottom-0 left-0 w-[300px] -translate-x-56 md:w-[500px]"
        />

        <Image
          src="/images/landing-page/portfolio/assets-bottom-right.svg"
          alt="Portfolio"
          width={703}
          height={1357}
          className="absolute bottom-0 right-0 w-[300px] translate-x-56 md:w-[500px]"
        />
        {/* Portfolio */}
        <motion.div
          ref={topLeftContainerRef}
          initial="hidden"
          animate={topLeftControl}
          variants={variant}
          custom="left"
          className="absolute top-[150px] flex w-[400px] justify-center md:-left-40 md:top-[500px] md:w-[880px]"
        >
          <TopLeft />
        </motion.div>

        <motion.div
          ref={topRightContainerRef}
          initial="hidden"
          animate={topRightControl}
          variants={variant}
          custom="right"
          className="absolute -right-14 top-[600px] flex w-[400px] justify-center md:-right-44 md:top-[1000px] md:w-[880px]"
        >
          <TopRight />
        </motion.div>

        <motion.div
          ref={middleContainerRef}
          initial="hidden"
          animate={middleControl}
          variants={variant}
          custom={isLargeScreen ? "bottom" : "left"}
          className="absolute left-1/4 top-[1050px] flex -translate-x-1/2 transform justify-center md:left-1/3 md:top-[1750px]"
        >
          <Middle />
        </motion.div>

        <motion.div
          ref={bottomRightContainerRef}
          initial="hidden"
          animate={bottomRightControl}
          variants={variant}
          custom="right"
          className="absolute top-[1500px] flex w-[400px] justify-center md:-right-44 md:top-[2800px] md:w-[880px]"
        >
          <BottomRight />
        </motion.div>

        <motion.div
          ref={bottomLeftContainerRef}
          initial="hidden"
          animate={bottomLeftControl}
          variants={variant}
          custom="left"
          className="absolute -left-2 top-[1950px] flex w-[400px] justify-center md:-left-36 md:top-[2950px] md:w-[880px]"
        >
          <BottomLeft />
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
