import React from "react";
import Image from "next/image";
import SearchLogo from "../../../../public/images/portofolio/search.svg";
import CloseLogo from "../../../../public/images/portofolio/close.svg";

export default function SearchBar({
  onSearch,
  onReset,
  searchQuery,
}: {
  onSearch: (query: string) => void;
  onReset: () => void;
  searchQuery: string;
}) {
  return (
    <div className="flex min-h-8 w-[93%] items-center gap-2 rounded-xl border-[3px] border-black bg-white p-4 lg:w-1/2">
      <Image src={SearchLogo} alt="Search" />
      <input
        className="w-full focus:outline-none"
        placeholder="Cari result sekolah kamu"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      ></input>
      <Image
        src={CloseLogo}
        alt="Close"
        onClick={onReset}
        className="hover:brightness-[0.95]"
      />
    </div>
  );
}
