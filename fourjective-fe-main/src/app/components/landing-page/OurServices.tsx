"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import imgvideo from "../../../../public/images/landing-page/our-services/video-img.svg";
import bgvideo from "../../../../public/images/landing-page/our-services/video-bg.svg";
import bgphotoshoot from "../../../../public/images/landing-page/our-services/photoshoot-bg.svg";
import imgphotoshoot from "../../../../public/images/landing-page/our-services/photoshoot-img.svg";
import bgediting from "../../../../public/images/landing-page/our-services/editing-bg.svg";
import imgediting from "../../../../public/images/landing-page/our-services/editing-img.svg";
import bgbookcover from "../../../../public/images/landing-page/our-services/book-bg.svg";
import imgbookcover from "../../../../public/images/landing-page/our-services/book-img.svg";
import bgbooklayout from "../../../../public/images/landing-page/our-services/layiut-bg.svg";
import imgbooklayout from "../../../../public/images/landing-page/our-services/layiut-img.svg";
import bgproduct from "../../../../public/images/landing-page/our-services/product-bg.svg";
import imgproduct from "../../../../public/images/landing-page/our-services/product-img.svg";
import bgar from "../../../../public/images/landing-page/our-services/ar-bg.svg";
import imgar from "../../../../public/images/landing-page/our-services/ar-img.svg";
import bgyearbook from "../../../../public/images/landing-page/our-services/yearbook-bg.svg";
import imgyearbook from "../../../../public/images/landing-page/our-services/yearbook-img.svg";
import bgmerch from "../../../../public/images/landing-page/our-services/merch-bg.svg";
import imgmerch from "../../../../public/images/landing-page/our-services/merch-img.svg";

interface ServiceItem {
  title: string;
  bgImage: any; // Consider using proper type for imported images
  img: any;
  items: string[];
}

const servicesData: ServiceItem[] = [
  {
    title: "Video Service",
    bgImage: bgvideo,
    img: imgvideo,
    items: [
      "Film Angkatan",
      "After Movie",
      "BTS Video (Behind The Scene)",
      "Trend Video Unlimited",
      "Drone Service",
    ],
  },
  {
    title: "Photoshoot Service",
    bgImage: bgphotoshoot,
    img: imgphotoshoot,
    items: ["Indoor Photo", "Outdoor Photo", "Studio Delivery"],
  },
  {
    title: "Editing Service",
    bgImage: bgediting,
    img: imgediting,
    items: [
      "Photo Editing (Coloring/ Color Grading, Remove Background)",
      "Video Editing (Script/Konsep, Sound Design, Color Grading)",
    ],
  },
  {
    title: "Book Service (Design Cover)",
    bgImage: bgbookcover,
    img: imgbookcover,
    items: [
      "Essential. Simple, Clean dan Timeless",
      "Elements. Lebih Rame, Lebih Berani dengan Elemen Visual",
      "Masterpiece. Desain Premium dengan Sentuhan Ilustrasi Khusus",
    ],
  },
  {
    title: "Book Service (Design Layout)",
    bgImage: bgbooklayout,
    img: imgbooklayout,
    items: [
      "Foto Dominan, Lebih Clean & Modern",
      "Biar Moment Kamu yang Jadi Spotlight",
    ],
  },
  {
    title: "Product Specification",
    bgImage: bgproduct,
    img: imgproduct,
    items: [
      "Halaman",
      "Jenis Kertas",
      "Ukuran Buku",
      "Jenis Bahan Packaging",
      "Additional",
    ],
  },
  {
    title: "AR (Augmented Reality)",
    bgImage: bgar,
    img: imgar,
    items: [
      "Cover atau Packaging Bisa Langsung Memunculkan Video, Animasi, atau Pesan Khusus Lewat Kamera Smartphone",
    ],
  },
  {
    title: "Yearbook Digital (E-Book)",
    bgImage: bgyearbook,
    img: imgyearbook,
    items: [
      "Akses Praktis. Bisa Dibuka Lewat HP, Tablet, Laptop",
      "Lifetime Archive. Data & File Kamu Aman",
      "Nggak Takut Hilang, Cetak Ilang? Gak Panik. File Digital Selalu Ready",
    ],
  },
  {
    title: "Merchandise Yearbook",
    bgImage: bgmerch,
    img: imgmerch,
    items: [
      "Medali Angkatan",
      "Totebag",
      "Baju Angkatan",
      "Photobooth",
      "Merch Lain? Siap!",
    ],
  },
];

const OurServices = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const variant = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        duration: 0.6,
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative overflow-hidden border-b-[16px] border-black bg-[#F0A6FF] bg-[url('/images/landing-page/our-services/bg-services.svg')] bg-cover bg-fixed bg-center bg-repeat">
      <div className="mx-auto max-w-full px-6 py-16 md:max-w-[1440px] md:px-[42px] md:pb-32 md:pt-16">
        <div className="flex flex-col items-center gap-8 md:gap-16">
          <h2
            className="font-leagueSpartan text-[42px] font-bold text-white md:text-8xl"
            style={{
              WebkitTextStroke: isLargeScreen ? "4px black" : "2px black",
              paintOrder: "stroke fill",
            }}
          >
            OUR SERVICES
          </h2>

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {servicesData.map((service, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, {
                once: true,
                margin: "0px 0px -100px 0px",
              });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={variant}
                  className="flex justify-center"
                >
                  <div
                    className="relative flex h-full w-full justify-center bg-cover bg-no-repeat px-20 pb-10 md:min-h-[738px] md:max-w-[420px] md:bg-contain md:bg-center md:bg-no-repeat md:pb-0 md:pt-12"
                    style={{ backgroundImage: `url(${service.bgImage.src})` }}
                  >
                    <div className="flex h-full w-full flex-col gap-6 pt-10">
                      <h2
                        className="relative w-full text-center font-leagueSpartan text-[36px] font-semibold leading-none text-white md:text-[42px]"
                        style={{
                          WebkitTextStroke: isLargeScreen
                            ? "3px black"
                            : "2px black",
                          paintOrder: "stroke fill",
                        }}
                      >
                        {service.title}
                      </h2>
                      <ul className="relative w-full list-disc font-leagueSpartan text-base leading-6 text-white md:text-xl md:leading-[36px]">
                        {service.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      <Image
                        src={service.img}
                        alt={`${service.title} illustration`}
                        priority={index < 3}
                        className="z-10 h-full w-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
