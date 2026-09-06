"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import MascotTopLeft from "../../../../public/images/gallery/yearbook-result/mascot-1.svg";
import MascotTopRight from "../../../../public/images/gallery/yearbook-result/mascot-2.svg";
import MascotBottomLeft from "../../../../public/images/gallery/yearbook-result/mascot-3.svg";
import MascotBottomRight from "../../../../public/images/gallery/yearbook-result/mascot-4.svg";
import Cloud from "../../../../public/images/gallery/yearbook-result/cloud.svg";
import TopLeft from "./YearbookResult/TopLeft";
import TopRight from "./YearbookResult/TopRight";
import BottomLeft from "./YearbookResult/BottomLeft";
import BottomRight from "./YearbookResult/BottomRight";

import Background from "../../../../public/images/gallery/yearbook-result/new/bg.svg";
import Asset1 from "../../../../public/images/gallery/yearbook-result/new/asset-1.svg";
import Asset2 from "../../../../public/images/gallery/yearbook-result/new/asset-2.svg";
import Asset3 from "../../../../public/images/gallery/yearbook-result/new/asset-3.svg";
import Asset4 from "../../../../public/images/gallery/yearbook-result/new/asset-4.svg";
import Mascot1 from "../../../../public/images/gallery/yearbook-result/new/mascot-1.svg";
import Mascot2 from "../../../../public/images/gallery/yearbook-result/new/mascot-2.svg";
import Mascot3 from "../../../../public/images/gallery/yearbook-result/new/mascot-3.svg";
import Mascot4 from "../../../../public/images/gallery/yearbook-result/new/mascot-4.svg";

const YearbookResult = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Top Left Mascot
  const mascotTopLeftContainerRef = useRef<HTMLDivElement>(null);
  const mascotTopLeftIsInView = useInView(mascotTopLeftContainerRef, {
    once: false,
  });
  const mascotTopLeftControl = useAnimation();

  // Top Right Mascot
  const mascotTopRightContainerRef = useRef<HTMLDivElement>(null);
  const mascotTopRightIsInView = useInView(mascotTopRightContainerRef, {
    once: false,
  });
  const mascotTopRightControl = useAnimation();

  // Bottom Left Mascot
  const mascotBottomLeftContainerRef = useRef<HTMLDivElement>(null);
  const mascotBottomLeftIsInView = useInView(mascotBottomLeftContainerRef, {
    once: false,
  });
  const mascotBottomLeftControl = useAnimation();

  // Bottom Right Mascot
  const mascotBottomRightContainerRef = useRef<HTMLDivElement>(null);
  const mascotBottomRightIsInView = useInView(mascotBottomRightContainerRef, {
    once: false,
  });
  const mascotBottomRightControl = useAnimation();

  // Cloud 1
  const firstCloudContainerRef = useRef<HTMLDivElement>(null);
  const firstCloudIsInView = useInView(firstCloudContainerRef, {
    once: false,
  });
  const firstCloudControl = useAnimation();

  // Cloud 2
  const secondCloudContainerRef = useRef<HTMLDivElement>(null);
  const secondCloudIsInView = useInView(secondCloudContainerRef, {
    once: false,
  });
  const secondCloudControl = useAnimation();

  // Cloud 3
  const thirdCloudContainerRef = useRef<HTMLDivElement>(null);
  const thirdCloudIsInView = useInView(thirdCloudContainerRef, {
    once: false,
  });
  const thirdCloudControl = useAnimation();

  // Top Left Gallery
  const topLeftContainerRef = useRef<HTMLDivElement>(null);
  const topLeftIsInView = useInView(topLeftContainerRef, { once: false });
  const topLeftControl = useAnimation();

  // Top Right Gallery
  const topRightContainerRef = useRef<HTMLDivElement>(null);
  const topRightIsInView = useInView(topRightContainerRef, { once: false });
  const topRightControl = useAnimation();

  // Bottom Left Gallery
  const bottomLeftContainerRef = useRef<HTMLDivElement>(null);
  const bottomLeftIsInView = useInView(bottomLeftContainerRef, { once: false });
  const bottomLeftControl = useAnimation();

  // Bottom Right Gallery
  const bottomRightContainerRef = useRef<HTMLDivElement>(null);
  const bottomRightIsInView = useInView(bottomRightContainerRef, {
    once: false,
  });
  const bottomRightControl = useAnimation();

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
    if (mascotTopLeftIsInView) {
      mascotTopLeftControl.start("visible");
    } else {
      mascotTopLeftControl.start("hidden");
    }

    if (mascotTopRightIsInView) {
      mascotTopRightControl.start("visible");
    } else {
      mascotTopRightControl.start("hidden");
    }

    if (mascotBottomLeftIsInView) {
      mascotBottomLeftControl.start("visible");
    } else {
      mascotBottomLeftControl.start("hidden");
    }

    if (mascotBottomRightIsInView) {
      mascotBottomRightControl.start("visible");
    } else {
      mascotBottomRightControl.start("hidden");
    }

    if (firstCloudIsInView) {
      firstCloudControl.start("visible");
    } else {
      firstCloudControl.start("hidden");
    }

    if (secondCloudIsInView) {
      secondCloudControl.start("visible");
    } else {
      secondCloudControl.start("hidden");
    }

    if (thirdCloudIsInView) {
      thirdCloudControl.start("visible");
    } else {
      thirdCloudControl.start("hidden");
    }

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

    if (bottomLeftIsInView) {
      bottomLeftControl.start("visible");
    } else {
      bottomLeftControl.start("hidden");
    }

    if (bottomRightIsInView) {
      bottomRightControl.start("visible");
    } else {
      bottomRightControl.start("hidden");
    }
  }, [
    mascotTopLeftIsInView,
    mascotTopRightIsInView,
    mascotBottomLeftIsInView,
    mascotBottomRightIsInView,
    firstCloudIsInView,
    secondCloudIsInView,
    thirdCloudIsInView,
    topLeftIsInView,
    topRightIsInView,
    bottomLeftIsInView,
    bottomRightIsInView,
  ]);

  return (
    <section className="relative overflow-hidden border-b-[16px] border-black bg-[#AF95FF] bg-[url('/images/gallery/yearbook-result/new/bg.svg')] bg-cover bg-fixed bg-center bg-repeat">
      {/* Asset 1*/}
      <div className="absolute left-0 top-0">
        <Image
          src={Asset1}
          alt="Asset 1"
          className="invisible md:visible md:scale-100"
        />
      </div>

      {/* Asset 2*/}
      <div className="absolute -right-[12%] -top-[12%] md:-top-[26%] md:right-0">
        <Image src={Asset2} alt="Asset 2" className="md:scale-100" />
      </div>

      {/* Asset 3*/}
      <div className="absolute bottom-0 left-0">
        <Image
          src={Asset3}
          alt="Asset 3"
          className="invisible md:visible md:scale-100"
        />
      </div>

      {/* Asset 4*/}
      <div className="absolute bottom-0 right-0">
        <Image src={Asset4} alt="Asset 4" className="md:scale-100" />
      </div>

      {/* Mascot Top Left */}
      <div
        className="absolute -left-[83%] -top-[4%] scale-50 md:-left-[12%] md:top-[8%] md:scale-100"
        ref={mascotTopLeftContainerRef}
      >
        <motion.div
          initial="hidden"
          variants={variant}
          animate={mascotTopLeftControl}
          custom="left"
        >
          <Image
            src={Mascot1}
            alt="Top Left Mascot"
            className="scale-75 md:scale-100"
          />
        </motion.div>
      </div>

      {/* Mascot Top Right */}
      <div
        className="absolute -right-[85%] top-[13%] scale-50 md:-right-[16%] md:top-[40%] md:scale-100"
        ref={mascotTopRightContainerRef}
      >
        <motion.div
          initial="hidden"
          variants={variant}
          animate={mascotTopRightControl}
          custom="right"
        >
          <Image src={Mascot2} alt="Top Right Mascot" className="scale-100" />
        </motion.div>
      </div>

      {/* Mascot Bottom Left */}
      <div
        className="absolute -left-[95%] top-[36%] scale-75 md:-left-[15%] md:top-[58%] md:scale-100"
        ref={mascotBottomLeftContainerRef}
      >
        <motion.div
          initial="hidden"
          variants={variant}
          animate={mascotBottomLeftControl}
          custom="left"
        >
          <Image
            src={Mascot3}
            alt="Bottom Left Mascot"
            className="scale-[0.65] md:scale-100"
          />
        </motion.div>
      </div>

      {/* Mascot Bottom Right */}
      <div
        className="absolute -right-[65%] top-[62%] scale-75 md:-right-[8%] md:top-[80%] md:scale-100"
        ref={mascotBottomRightContainerRef}
      >
        <motion.div
          initial="hidden"
          variants={variant}
          animate={mascotBottomRightControl}
          custom="right"
        >
          <Image
            src={Mascot4}
            alt="Bottom Right Mascot"
            className="scale-[0.6] md:scale-100"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative mx-auto h-[1660px] max-w-full md:h-[2110px] md:max-w-[1440px]">
        {/* Cloud 1 */}
        <div
          className="visible absolute -right-[66%] top-[4%] scale-50 md:invisible md:right-[6%] md:top-[20%] md:scale-100"
          ref={firstCloudContainerRef}
        >
          <motion.div
            initial="hidden"
            variants={variant}
            animate={firstCloudControl}
            custom="right"
          >
            <Image
              src={Cloud}
              alt="Cloud 1"
              className="scale-75 md:scale-100"
            />
          </motion.div>
        </div>

        {/* Cloud 2 */}
        <div
          className="visible absolute -left-[76%] top-[25%] scale-50 md:invisible md:left-[8%] md:top-[48%] md:scale-100"
          ref={secondCloudContainerRef}
        >
          <motion.div
            initial="hidden"
            variants={variant}
            animate={secondCloudControl}
            custom="left"
          >
            <Image
              src={Cloud}
              alt="Cloud 2"
              className="scale-75 md:scale-100"
            />
          </motion.div>
        </div>

        {/* Cloud 3 */}
        <div
          className="visible absolute right-[80%] top-[86%] scale-50 md:invisible md:right-[16%] md:top-[70%] md:scale-100"
          ref={thirdCloudContainerRef}
        >
          <motion.div
            initial="hidden"
            variants={variant}
            animate={thirdCloudControl}
            custom="right"
          >
            <Image
              src={Cloud}
              alt="Cloud 3"
              className="scale-[5] md:scale-100"
            />
          </motion.div>
        </div>

        {/* Title */}
        <div className="mx-auto mt-28 w-full px-4 md:mt-72 md:w-[1000px]">
          <h2
            className="font-lexendZetta text-center text-2xl text-white md:text-[78px]"
            style={{
              WebkitTextStroke: isLargeScreen ? "8px black" : "4px black",
              paintOrder: "stroke fill",
              lineHeight: "1.25",
            }}
          >
            OUR YEARBOOK RESULT
          </h2>
        </div>

        {/* Gallery */}
        <motion.div
          initial="hidden"
          animate={topLeftControl}
          variants={variant}
          custom="left"
          ref={topLeftContainerRef}
          className="absolute left-[100px] top-[140px] h-[300px] w-[200px] md:left-[360px] md:top-[320px] md:h-[500px] md:w-[340px]"
        >
          <TopLeft />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={topRightControl}
          variants={variant}
          custom="right"
          ref={topRightContainerRef}
          className="absolute right-[100px] top-[520px] h-[300px] w-[200px] md:right-[240px] md:top-[560px] md:h-[500px] md:w-[340px]"
        >
          <TopRight />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={bottomLeftControl}
          variants={variant}
          custom="left"
          ref={bottomLeftContainerRef}
          className="absolute left-[90px] top-[910px] h-[300px] w-[200px] md:left-[260px] md:top-[1140px] md:h-[500px] md:w-[340px]"
        >
          <BottomLeft />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={bottomRightControl}
          variants={variant}
          custom="right"
          ref={bottomRightContainerRef}
          className="absolute right-[100px] top-[1300px] h-[300px] w-[200px] md:right-[320px] md:top-[1260px] md:h-[500px] md:w-[340px]"
        >
          <BottomRight />
        </motion.div>
      </div>
    </section>
  );
};

export default YearbookResult;
