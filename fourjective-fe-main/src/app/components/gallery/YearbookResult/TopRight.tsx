import Image from "next/image";
import Result2 from "../../../../../public/images/gallery/yearbook-result/new/result/result-2.png";
import Lightning1 from "../../../../../public/images/gallery/yearbook-result/lightning-1.svg";
import Lightning2 from "../../../../../public/images/gallery/yearbook-result/lightning-2.svg";

const TopRight = () => {
  return (
    <section>
      {/* Image */}
      <div className="relative h-full w-full rotate-[12deg] rounded-xl border-[5px] border-black bg-red-50 md:rounded-2xl md:border-8">
        <div className="absolute -left-3 -top-3 z-10 h-full w-full scale-[1.025] rounded-xl border-4 border-white md:-left-4 md:-top-4 md:border-[6px]"></div>
        <Image
          src={Result2}
          alt="Top Right Content"
          className="h-full w-full"
        />
      </div>

      {/* Decoration */}
      <Image
        src={Lightning1}
        alt="Lightning 1"
        className="absolute -top-16 left-0 scale-50 md:-top-20 md:left-10 md:scale-100"
      />

      <Image
        src={Lightning2}
        alt="Lightning 2"
        className="absolute -bottom-24 -right-10 scale-50 md:-bottom-20 md:-right-4 md:scale-100"
      />
    </section>
  );
};

export default TopRight;
