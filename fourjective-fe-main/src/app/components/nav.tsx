import Link from "next/link";
import Image from "next/image";
import WhatsappButton1 from "./faq/whatsapp-button-1";

export default function Navbar({ toggleNav }: { toggleNav: () => void }) {
  return (
    <nav className="fixed left-1/2 z-50 mt-8 h-16 w-[90%] -translate-x-1/2 rounded-xl border-4 border-black bg-white px-4 md:mx-auto md:ml-0 md:mt-12 md:h-16 md:w-[80%] lg:h-24">
      <div className="flex h-full w-full items-center justify-between md:grid md:grid-cols-6 xl:grid-cols-8">
        <div className="relative h-14 w-40 md:w-28 lg:w-48 xl:w-52">
          <Link href="/">
            <Image
              src="/images/fourjective-logo.svg"
              alt="fourjective-logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <div className="hidden items-center justify-center gap-4 font-poppins font-medium text-black md:col-span-4 md:flex lg:gap-8 lg:text-xl xl:col-span-5 xl:text-2xl">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/portofolio">Portofolio</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="hidden items-center justify-center md:col-span-1 md:flex xl:col-span-2 2xl:justify-end">
          <div className="md:pr-2 lg:h-12 xl:h-16 xl:w-[234px] xl:pr-4">
            <WhatsappButton1 />
          </div>
        </div>
        {/* Mobile View */}
        <div className="flex items-center justify-center md:hidden">
          <Image
            src="/images/hamburger-menu.svg"
            alt="hamburger"
            width={32}
            height={32}
            className="h-auto w-8 cursor-pointer"
            onClick={toggleNav}
          />
        </div>
      </div>
    </nav>
  );
}
