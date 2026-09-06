import React from "react";
import Image from "next/image";
import Video from "../../../../../public/images/services/service-type/video.svg"; 
import VideoMobile from "../../../../../public/images/services/service-type/video-mobile.svg"; 

const VideoService = () => {
  return (
    <section className="flex max-w-full flex-col gap-1 overflow-hidden md:flex-row">
      {/* Image */}
      <div className="relative bg-[#E94504]">
        {/* Photo */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Video}
            alt="Video Service"
            className="relative left-1/2 h-full -translate-x-1/2 scale-[105%] transform hidden md:block"
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <Image
            src={VideoMobile}
            alt="Video Service"
            className="relative left-1/2 h-full w-full -translate-x-1/2 transform block md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#E94504] py-12 px-6 md:w-[960px]">
        {/* Content */}
        <div className="relative flex flex-col gap-3 md:px-4 md:gap-10">
          <h2
            className="font-leagueSpartan text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            Video Service
          </h2>
          <div className="relative left-4 flex gap-6">
            <ul className="font-leagueSpartan w-full pr-4 list-disc text-sm text-white md:text-xl">
              <li className="font-bold">Film Angkatan</li>
              <p>Produksi kita ga main-main, karena kita ada SPV FIlm Khusus yang
              langsung ngawasin presesnya. hasilnya? udah kayak short movie
              beneran.</p>
              <li className="font-bold">After movie</li>
              <p>Video sinematik singkat yang rangkum semua keseruan angkatan lo.
              Cocok buat teaser, recap, atau diputar di acara.</p>
              <li className="font-bold">BTS VIdeo (Behind The Scene)</li>
              <p>Butuh video cepet? Kita siap kirim sameday / next da Biar
              moment-moment kecil tetep terasa hangat.</p>
              <li className="font-bold">Trend Video Unlimited</li>
              <p>Mau konten buat sosmed? Mau ikut trend? Mau yang beda, lebih
              otentik? Kita siap buatin tanpa batas request. Ide? Kita bantu
              brainstorming.</p>
              <li className="font-bold">Drone Service</li>
              <p>Butuh video cepet? Kita siap kirim sameday / next day Biar
              moment-moment kecil tetep terasa hangat.</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoService;
