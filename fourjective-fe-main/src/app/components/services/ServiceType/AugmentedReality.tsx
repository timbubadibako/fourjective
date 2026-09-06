import React from "react";
import Image from "next/image";
import Augmented from "../../../../../public/images/services/service-type/augmented.svg"; 
import AugmentedMobile from "../../../../../public/images/services/service-type/augmented-mobile.svg"; 

const AugmentedReality = () => {
  return (
    <section className="flex max-w-full flex-col gap-1 overflow-hidden md:flex-row">
      {/* Image */}
      <div className="relative bg-[#D02683]">
        {/* Photo */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Augmented}
            alt="Video Service"
            className="relative left-1/2 h-full -translate-x-1/2 scale-[105%] transform hidden md:block"
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <Image
            src={AugmentedMobile}
            alt="Video Service"
            className="relative left-1/2 h-full w-full -translate-x-1/2 transform block md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#D02683] py-12 px-6 md:w-[960px]">
        {/* Content */}
        <div className="relative flex flex-col gap-3 md:px-4 md:gap-10">
          <h2
            className="font-leagueSpartan text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            AR (Augmented Reality)
          </h2>
          <div className="relative left-4 flex gap-6">
            <ul className="font-leagueSpartan w-full pr-4 text-sm text-white md:text-xl">
              <p>Cover atau packaging bisa langsung  memunculkan video, animasi, atau pesan khusus lewat kamera smartphone.</p>
              <p>• Bikin buku tahunan lo lebih berkesan & kekinian.</p>
              <p>• Lebih interaktif, gak cuma sekadar buku.</p>
              <p>• Bisa jadi pembeda dari angkatan lain</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AugmentedReality;
