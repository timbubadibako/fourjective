"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HeroAbout from "../../../../public/images/about/hero-about.svg";
import HeroAboutMobile from "../../../../public/images/about/hero-about-mobile.svg";
import Mascot1 from "../../../../public/images/about/about-mascot1.svg";
import Mascot2 from "../../../../public/images/about/about-mascot2.svg";

export default function Hero() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Only translateX for the animation (no scale change)
  const mascot1Transform = `translateX(${Math.min(scrollPosition / 5, 100)}%)`;
  const mascot2Transform = `translateX(${-Math.min(scrollPosition / 5, 100)}%)`;

  return (
    <div className="relative min-h-[50vh] md:min-h-[85vh] w-full overflow-hidden bg-blue-200 bg-[url('/images/about/background.svg')] bg-cover bg-fixed bg-center bg-repeat border-b-8 border-black">
      <Image
        src={HeroAbout}
        alt="HeroAbout"
        className="hidden md:block absolute left-1/2 md:top-1/2 lg:top-[60%] z-10 -translate-x-1/2 -translate-y-1/2"
      />

      <Image
        src={HeroAboutMobile}
        alt="HeroAbout"
        className="block md:hidden absolute left-1/2 top-[60%] z-10 -translate-x-1/2 -translate-y-1/2"
      />

      <Image
        src={Mascot1}
        alt="Mascot1"
        className="absolute -bottom-36 w-[350px] sm:w-[380px] md:w-[450px] md:-bottom-36 -left-32 z-20"
        style={{
          transform: mascot1Transform,
        }}
      />

      <Image
        src={Mascot2}
        alt="Mascot2"
        className="absolute -bottom-32 w-[350px] sm:w-[380px] md:w-[450px] md:-bottom-32 -right-24 z-20"
        style={{
          transform: mascot2Transform,
        }}
      />
    </div>
  );
}
