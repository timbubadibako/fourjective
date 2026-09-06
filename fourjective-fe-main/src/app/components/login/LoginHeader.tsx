"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function LoginHeader() {
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
  return (
    <div className="overflow-hidden relative w-full h-[60vh] md:h-[85%] md:w-1/2 md:rounded-3xl bg-[#FD9A35]">
      <Image
        src="/images/login/login-background.svg"
        alt="background"
        width={120}
        height={120}
        className="h-full w-full scale-[3] md:scale-[1.2]"
      />
      <Image
        src="/images/login/loginmascot1.svg"
        alt="mascot1"
        width={120}
        height={120}
        className="absolute -bottom-16 md:-bottom-4 -left-14 z-10 h-52 w-52 lg:h-64 lg:w-64 xl:h-72 xl:w-72"
      />
      <h1
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 font-playtimes text-white text-center text-6xl md:text-5xl lg:text-6xl xl:text-8xl tracking-wider"
        style={{
          WebkitTextStroke: isLargeScreen ? "16px black" : "10px black",
          paintOrder: "stroke fill",
          lineHeight: isLargeScreen ? "1.0" : "1.5",
        }}
      >
        <span className="-mb-2 md:mb-5 lg:mb-7 block">login</span>
        <span>admin</span>
      </h1>
      <Image
        src="/images/login/loginmascot2.svg"
        alt="mascot2"
        width={120}
        height={120}
        className="absolute -bottom-20 -right-24 z-30 h-64 w-64 lg:h-[350px] lg:w-[350px] xl:h-96 xl:w-96"
      />
    </div>
  );
}
