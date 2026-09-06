"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Whatsapp from "../../../public/images/landing-page/contact-us/whatsapp.svg";
import Tiktok from "../../../public/images/landing-page/contact-us/tiktok.svg";
import Instagram from "../../../public/images/landing-page/contact-us/instagram.svg";
import Gmail from "../../../public/images/landing-page/contact-us/gmail.svg";

interface ContactUsProps {
  bgColor?: string;
}

const ContactUs: React.FC<ContactUsProps> = ({ bgColor = "#FFE868" }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false });
  const waControls = useAnimation();
  const ttControls = useAnimation();
  const igControls = useAnimation();
  const gmControls = useAnimation();

  const buttonVariants = {
    hiddenX: (direction: "left" | "right") => ({
      x: direction === "left" ? "-20%" : "20%",
      opacity: 0,
    }),
    visibleX: {
      x: "0%",
      opacity: 1,
      transition: { stiffness: 30, delay: 0.3 },
    },
    hiddenY: (direction: "top" | "bottom") => ({
      y: direction === "top" ? "-20%" : "20%",
      opacity: 0,
    }),
    visibleY: {
      y: "0%",
      opacity: 1,
      transition: { stiffness: 30, delay: 0.3 },
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
      waControls.start("visibleX");
      ttControls.start("visibleY");
      igControls.start("visibleY");
      gmControls.start("visibleX");
    } else {
      waControls.start("hiddenX");
      ttControls.start("hiddenY");
      igControls.start("hiddenY");
      gmControls.start("hiddenX");
    }
  }, [isInView]);

  return (
    <section
      className="relative overflow-hidden border-b-[16px] border-black bg-[url('/images/landing-page/contact-us/background.svg')] bg-cover bg-fixed bg-center bg-repeat"
      style={{
        backgroundColor: bgColor,
      }}
      ref={containerRef}
    >
      <div className="mx-auto max-w-full px-4 py-16 md:max-w-[1440px] md:px-14">
        <div className="flex flex-col items-center gap-4 text-center md:gap-8">
          {/* Title */}
          <h2
            className="font-lexendZetta text-[42px] font-semibold text-white md:text-8xl"
            style={{
              WebkitTextStroke: isLargeScreen ? "16px black" : "8px black",
              paintOrder: "stroke fill",
            }}
          >
            contact us
          </h2>
          {/* Contact */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <motion.a
              href="https://wa.me/6285157386631"
              target="_blank"
              rel="noopener noreferrer"
              initial="hiddenX"
              custom="left"
              animate={waControls}
              variants={buttonVariants}
              // transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image src={Whatsapp} alt="Whatsapp Contact" />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@fourjectiv?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              initial="hiddenY"
              custom="top"
              animate={ttControls}
              variants={buttonVariants}
            >
              <Image src={Tiktok} alt="Tiktok Contact" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/fourjectiv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              initial="hiddenY"
              custom="bottom"
              animate={igControls}
              variants={buttonVariants}
            >
              <Image src={Instagram} alt="Instagram Contact" />
            </motion.a>
            <motion.a
              href="mailto:fourjectiv@gmail.com"
              initial="hiddenX"
              custom="right"
              animate={gmControls}
              variants={buttonVariants}
            >
              <Image src={Gmail} alt="Gmail Contact" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
