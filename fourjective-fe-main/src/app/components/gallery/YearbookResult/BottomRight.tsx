import Image from "next/image";
import Result4 from "../../../../../public/images/gallery/yearbook-result/new/result/result-4.png";
import Strip1 from "../../../../../public/images/gallery/yearbook-result/strip-1.svg";
import Strip2 from "../../../../../public/images/gallery/yearbook-result/strip-2.svg";

const BottomRight = () => {
  return (
    <section>
      {/* Image */}
      <div className="relative h-full w-full rotate-[-10deg] rounded-xl border-[5px] border-black bg-red-50 md:rounded-2xl md:border-8">
        <div className="absolute -left-3 -top-3 z-10 h-full w-full scale-[1.025] rounded-xl border-4 border-white md:-left-4 md:-top-4 md:border-[6px]"></div>
        <Image
          src={Result4}
          alt="Bottom Right Content"
          className="h-full w-full"
        />
      </div>

      {/* Decoration */}
      <Image
        src={Strip1}
        alt="Strip 1"
        className="absolute -left-20 -top-20 scale-50 md:-left-24 md:-top-10 md:scale-100"
      />

      <Image
        src={Strip2}
        alt="Strip 2"
        className="absolute -bottom-16 -right-20 scale-50 md:-bottom-8 md:-right-20 md:scale-100"
      />
    </section>
  );
};

export default BottomRight;
