import Image from "next/image";
import Star1 from "../../../../../public/images/gallery/yearbook-result/star-1.svg";
import Result1 from "../../../../../public/images/gallery/yearbook-result/new/result/result-1.png";

const TopLeft = () => {
  return (
    <section>
      {/* Image */}
      <div className="relative h-full w-full rotate-[-8deg] rounded-xl border-[5px] border-black bg-red-50 md:rounded-2xl md:border-8">
        <div className="absolute -left-3 -top-3 z-10 h-full w-full scale-[1.025] rounded-xl border-4 border-white md:-left-4 md:-top-4 md:border-[6px]"></div>
        <Image src={Result1} alt="Top Left Content" className="h-full w-full" />
      </div>

      {/* Decoration */}
      <Image
        src={Star1}
        alt="Star 1"
        className="absolute -top-28 right-8 scale-[0.35] md:-top-24 md:right-2 md:scale-100"
      />
    </section>
  );
};

export default TopLeft;
