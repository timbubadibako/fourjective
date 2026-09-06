import { useState, useEffect } from "react";
import Image from "next/image";
import Mascot from "../../../../../public/images/landing-page/portfolio/top-left.svg";
import Barbie from "../../../../../public/images/landing-page/portfolio/barbie.png";

const TopLeft = () => {
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
    <section>
      {/* Mascot */}
      <Image
        src={Mascot}
        alt="Top Left Content"
        className="absolute -right-24 -top-48 scale-50 md:-right-24 md:-top-52 md:scale-100"
      />

      {/* Image */}
      <div className="flex w-[200px] rotate-[15deg] flex-col items-center gap-6 md:w-[400px]">
        <div className="h-[300px] w-full md:h-[630px]">
          <Image
            src={Barbie}
            alt="Barbie"
            className="h-full w-full scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default TopLeft;
