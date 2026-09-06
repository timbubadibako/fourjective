"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Background from "../../../../public/images/landing-page/background.svg";
import Whatsapp from "../../../../public/images/landing-page/contact-us/whatsapp.svg";
import Tiktok from "../../../../public/images/landing-page/contact-us/tiktok.svg";
import Instagram from "../../../../public/images/landing-page/contact-us/instagram.svg";
import Gmail from "../../../../public/images/landing-page/contact-us/gmail.svg";

const ContactUs = () => {
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

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section
      className="relative overflow-hidden border-b-[8px] border-black bg-[#1E88E5]"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPositionX: "center",
        backgroundPositionY: "top",
      }}
    >
      <div className="mx-auto max-w-full px-4 py-16 md:max-w-[1440px] md:px-14">
        <div className="flex flex-col items-center gap-8">
          <h2
            className="font-playtimes text-[32px] text-white md:text-8xl"
            style={{
              WebkitTextStroke: isLargeScreen ? "16px black" : "8px black",
              paintOrder: "stroke fill",
            }}
          >
            contact us
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <a
              href="https://wa.me/6285157386631"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-right"
              data-aos-offset="200"
            >
              <Image src={Whatsapp} alt="Whatsapp Contact" />
            </a>
            <a
              href="https://www.tiktok.com/@fourjectiv?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-offset="200"
            >
              <Image src={Tiktok} alt="Tiktok Contact" />
            </a>
            <a
              href="https://www.instagram.com/fourjectiv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-down"
              data-aos-offset="200"
            >
              <Image src={Instagram} alt="Instagram Contact" />
            </a>
            <a
              href="mailto:fourjectiv@gmail.com"
              data-aos="fade-left"
              data-aos-offset="200"
            >
              <Image src={Gmail} alt="Gmail Contact" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
