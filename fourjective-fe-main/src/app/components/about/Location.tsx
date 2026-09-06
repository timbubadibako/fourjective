"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LocationImage from "../../../../public/images/about/location.svg";
import LocationImageMobile from "../../../../public/images/about/location-mobile.svg";

export default function Location() {
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
    <div className="min-h-screen bg-[#437EFF] border-b-8 border-black">
      <h1
        className="text-center font-lexendZetta text-white text-3xl md:text-4xl lg:text-5xl py-10 md:py-14"
        style={{
          WebkitTextStroke: isLargeScreen ? "5px black" : "3px black",
          paintOrder: "stroke fill",
        }}
      >
        FOURJECTIV<br className="block md:hidden"/> LOCATION
      </h1>
      <Image src={LocationImage} alt="Location" className="hidden md:block mx-auto my-auto w-[90%]" />
      <Image src={LocationImageMobile} alt="Location" className="block md:hidden mx-auto pb-8 w-[88%]" />
    </div>
  );
}
