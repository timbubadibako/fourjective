import React from "react";
import Image from "next/image";
import Mahalini from "../../../../../public/images/landing-page/testimoni/mahalini.svg";
import bgMahalini from "../../../../../public/images/landing-page/testimoni/bg-mahalini.svg";

const SecondTestimoni = () => {
  return (
    <section className="flex max-w-full flex-col-reverse gap-4 md:flex-row">
      {/* Text */}
      <div className="flex justify-center bg-[#2791D8] p-6 md:h-[500px] md:w-[960px] md:px-10 md:pt-12">
        <div className="flex flex-col items-start gap-3 md:items-end md:gap-6">
          <div className="flex flex-col items-start md:items-end md:gap-6">
            <h2
              className="font-lexendZetta text-2xl font-extrabold text-white md:text-[52px]"
              style={{
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
              }}
            >
              Jeszichow
            </h2>
            <h3
              className="font-lexendZetta text-base font-bold text-white md:text-[24px]"
              style={{
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
              }}
            >
              SMAK 8 PENABUR TANJUNG DUREN
            </h3>
          </div>
          <p className="text-start font-poppins text-sm font-medium text-black md:text-2xl">
            "Working with the team honestly felt like spending time with
            friends. No pressure, no awkward posing — just genuine moments. The
            final photos really reflect who we are as students at SMAK 8, and
            that’s what makes them so special."
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="relative h-[280px] w-full overflow-hidden bg-[#2791D8] md:h-[500px] md:w-1/3">
        <Image
          src={bgMahalini}
          alt="Mahalini"
          className="absolute bottom-0 right-0 top-0 transform"
        />
        <Image
          src={Mahalini}
          alt="Mahalini"
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 transform md:-bottom-4"
        />
      </div>
    </section>
  );
};

export default SecondTestimoni;
