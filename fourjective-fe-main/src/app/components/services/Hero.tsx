"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import MascotLeft from "../../../../public/images/services/hero/mascot-left.svg";
import MascotRight from "../../../../public/images/services/hero/mascot-right.svg";
import Background1 from "../../../../public/images/services/hero/background-1.svg";

const Hero = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false });
  const mascotLeftControls = useAnimation();
  const mascotRightControls = useAnimation();

  const mascotVariants = {
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
    if (isInView) {
      mascotLeftControls.start("visible");
      mascotRightControls.start("visible");
    } else {
      mascotLeftControls.start("hidden");
      mascotRightControls.start("hidden");
    }
  }, [isInView]);

  return (
    <section
      className="relative h-[320px] w-full overflow-hidden bg-[#DDDDDD] md:h-[527px]"
      ref={containerRef}
    >
      <Image
        src={Background1}
        alt="Background"
        fill
        className="absolute inset-0 object-cover"
      />
      {/* Mascot Left */}
      <motion.div
        initial="hidden"
        animate={mascotLeftControls}
        variants={mascotVariants}
        custom="left"
        className="absolute -bottom-[60%] -left-[19%] scale-50 md:-bottom-[25%] md:-left-[2%] md:scale-100"
      >
        <Image
          src={MascotLeft}
          alt="Mascot Left"
          className="scale-[0.35] md:scale-100"
        />
      </motion.div>

      {/* Mascot Right */}
      <motion.div
        initial="hidden"
        animate={mascotRightControls}
        variants={mascotVariants}
        custom="right"
        className="absolute -bottom-[56%] -right-[14%] scale-50 md:-bottom-[25%] md:-right-[2%] md:scale-100"
      >
        <Image
          src={MascotRight}
          alt="Mascot Right"
          className="scale-[0.35] md:scale-100"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center px-14">
        <div className="mt-28 flex w-full flex-col items-center gap-3 md:mt-52 md:w-fit md:gap-6 md:py-16">
          <div className="relative">
            <h1
              className="font-kronaOne absolute inset-0 translate-x-1 translate-y-1 text-2xl font-light text-transparent md:text-7xl"
              style={{
                WebkitTextStroke: "3px black",
                paintOrder: "stroke fill",
              }}
            >
              OUR SERVICES
            </h1>
            <h1
              className="font-kronaOne relative text-2xl text-white md:text-7xl"
              style={{
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
              }}
            >
              OUR SERVICES
            </h1>
          </div>
          <div className="flex w-full items-center gap-3 md:gap-8">
            <div className="h-1 w-full bg-white md:h-2"></div>
            <h1
              className="whitespace-nowrap text-center font-lexendZetta text-base text-white md:text-[32px] md:leading-10"
              style={{
                WebkitTextStroke: "3px black",
                paintOrder: "stroke fill",
              }}
            >
              Do The Best For <br />
              The Best Moment
            </h1>
            <div className="h-1 w-full bg-white md:h-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
