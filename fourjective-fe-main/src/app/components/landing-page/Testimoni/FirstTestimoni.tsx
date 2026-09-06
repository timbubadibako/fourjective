import React from "react";
import Image from "next/image";
import Sadam from "../../../../../public/images/landing-page/testimoni/sadam.svg";
import bgsadam from "../../../../../public/images/landing-page/testimoni/bg-sadam.svg";

const FirstTestimoni = () => {
  return (
    <section className="flex max-w-full flex-col gap-4 md:flex-row">
      {/* Image */}
      <div className="relative h-[280px] w-full overflow-hidden bg-[#FCBC1D] md:h-[500px] md:w-1/3">
        <Image
          src={bgsadam}
          alt="bg-sadam"
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform md:top-0"
        />
        <Image
          src={Sadam}
          alt="Sadam"
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 transform md:-bottom-0"
        />
      </div>

      {/* Text */}
      <div className="flex justify-center bg-[#FCBC1D] p-6 md:h-[500px] md:w-[960px] md:px-10 md:pt-12">
        <div className="flex flex-col items-start gap-3 md:gap-6">
          <div className="flex flex-col items-start md:gap-6">
            <h2
              className="font-lexendZetta text-2xl font-extrabold text-white md:text-[52px]"
              style={{
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
              }}
            >
              Ratna Galih
            </h2>
            <h3
              className="font-lexendZetta text-base font-bold text-white md:text-[24px]"
              style={{
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
              }}
            >
              SMA AL-AZHAR CIREBON 5
            </h3>
          </div>
          <p className="text-start font-poppins text-sm font-medium text-black md:text-2xl">
            "Dari awal ketemu, timnya sudah bikin kita nyaman. Sesi fotonya juga
            ngalir banget, rasanya bukan difoto sama vendor, tapi sama teman
            sendiri. Hasil akhirnya keren dan benar-benar nunjukin karakter kami
            sebagai siswa Al Azhar Cirebon."
          </p>
        </div>
      </div>
    </section>
  );
};

export default FirstTestimoni;
