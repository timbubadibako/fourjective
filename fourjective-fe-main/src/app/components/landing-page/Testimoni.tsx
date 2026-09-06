"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import TestimoniBG from "../../../../public/images/landing-page/testimoni/bg-title.svg";
import FirstTestimoni from "./Testimoni/FirstTestimoni";
import SecondTestimoni from "./Testimoni/SecondTestimoni";
import ThirdTestimoni from "./Testimoni/ThirdTestimoni";

const Testimoni = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleIsInView = useInView(titleContainerRef, { once: false });
  const titleControl = useAnimation();

  const firstContainerRef = useRef<HTMLDivElement>(null);
  const firstIsInView = useInView(firstContainerRef, { once: false });
  const firstControl = useAnimation();

  const secondContainerRef = useRef<HTMLDivElement>(null);
  const secondIsInView = useInView(secondContainerRef, { once: false });
  const secondControl = useAnimation();

  const thirdContainerRef = useRef<HTMLDivElement>(null);
  const thirdIsInView = useInView(thirdContainerRef, { once: false });
  const thirdControl = useAnimation();

  const variant = {
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
    if (titleIsInView) {
      titleControl.start("visible");
    } else {
      titleControl.start("hidden");
    }

    if (firstIsInView) {
      firstControl.start("visible");
    } else {
      firstControl.start("hidden");
    }

    if (secondIsInView) {
      secondControl.start("visible");
    } else {
      secondControl.start("hidden");
    }

    if (thirdIsInView) {
      thirdControl.start("visible");
    } else {
      thirdControl.start("hidden");
    }
  }, [titleIsInView, firstIsInView, secondIsInView, thirdIsInView]);

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="mx-auto flex max-w-full flex-col gap-4 p-4 md:max-w-[1440px]">
        {/* Title */}
        <div ref={titleContainerRef}>
          <motion.div
            className="flex h-20 max-w-full items-center justify-center bg-[#A986FC] md:h-80"
            style={{
              backgroundImage: `url(${TestimoniBG.src})`,
              backgroundSize: isLargeScreen ? "auto" : "cover",
              backgroundPositionX: "center",
              backgroundPositionY: isLargeScreen ? "top" : "40%",
              backgroundRepeat: "repeat",
            }}
            initial="hidden"
            variants={variant}
            animate={titleControl}
            custom="right"
          >
            <h2
              className="font-lexendZetta text-2xl font-extrabold text-white md:text-8xl"
              style={{
                WebkitTextStroke: isLargeScreen ? "8px black" : "2px black",
                paintOrder: "stroke fill",
              }}
            >
              TESTIMONI
            </h2>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          variants={variant}
          animate={firstControl}
          custom="left"
          ref={firstContainerRef}
        >
          <FirstTestimoni />
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variant}
          animate={secondControl}
          custom="right"
          ref={secondContainerRef}
        >
          <SecondTestimoni />
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variant}
          animate={thirdControl}
          custom="left"
          ref={thirdContainerRef}
        >
          <ThirdTestimoni />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimoni;
