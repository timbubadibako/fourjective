import React from "react";
import Image from "next/image";
import Editing from "../../../../../public/images/services/service-type/editing.svg"; 
import EditingMobile from "../../../../../public/images/services/service-type/editing-mobile.svg"; 

const EditingService = () => {
  return (
    <section className="flex max-w-full flex-col gap-1 overflow-hidden md:flex-row">
      {/* Image */}
      <div className="relative bg-[#0096B3]">
        {/* Photo */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Editing}
            alt="Editing Service"
            className="relative left-1/2 h-full -translate-x-1/2 transform hidden md:block"
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <Image
            src={EditingMobile}
            alt="Editing Service"
            className="relative left-1/2 h-full w-full -translate-x-1/2 transform block md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#0096B3] py-12 px-6 md:w-[960px]">
        {/* Content */}
        <div className="relative flex flex-col gap-3 md:px-4 md:gap-10">
          <h2
            className="font-leagueSpartan text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            Editing Service
          </h2>
          <div className="relative left-4 flex gap-6">
            <ul className="font-leagueSpartan w-full pr-4 text-sm text-white md:text-xl">
              <h3 className="font-bold">1. Photo Editing</h3>
              <p>Biar tone foto lo lebih hidup, lebih estetik, dan lebih kekinian.</p>
              <li>• Remove Background</li>
              <p>Mau foto lebih clean, simple, atau buat kebutuhan layout, kita siap.</p>
              <li>• Digital Imaging</li>
              <p>Foto lo diolah jadi lebih kreatif, lebih standout dengan sentuhan digital art</p>
              <br/>
              <h3 className="font-bold">2. Video Editing</h3>
              <li>• Script/Konsep</li>
              <p>Kita kolaborasi bareng SPV Film Fourjectiv, biar storytelling lebih kuat.</p>
              <li>• Sound Design</li>
              <p>Audio? Kita rapihin, kita poles, biar videonya makin hidup & berasa.</p>
              <li>• Color Grading</li>
              <p>Tone warna? Udah pasti kita buat lebih sinematik, lebih proper.</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditingService;
