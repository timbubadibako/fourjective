import Image from "next/image";
import Result3 from "../../../../../public/images/gallery/yearbook-result/new/result/result-3.png";
import Star2 from "../../../../../public/images/gallery/yearbook-result/star-2.svg";
import Star3 from "../../../../../public/images/gallery/yearbook-result/star-3.svg";

const BottomLeft = () => {
  return (
    <section>
      {/* Image */}
      <div className="relative h-full w-full rotate-[5deg] rounded-xl border-[5px] border-black bg-red-50 md:rounded-2xl md:border-8">
        <div className="absolute -left-3 -top-3 z-10 h-full w-full scale-[1.025] rounded-xl border-4 border-white md:-left-4 md:-top-4 md:border-[6px]"></div>
        <Image
          src={Result3}
          alt="Bottom Left Content"
          className="h-full w-full"
        />
      </div>

      {/* Decoration */}
      <Image
        src={Star2}
        alt="Star 2"
        className="absolute -right-16 -top-16 scale-50 md:-right-16 md:-top-10 md:scale-100"
      />

      <Image
        src={Star3}
        alt="Star 3"
        className="absolute -bottom-16 -left-20 scale-50 md:-bottom-12 md:-left-24 md:scale-100"
      />
    </section>
  );
};

export default BottomLeft;
