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
    <div className="flex min-h-8 w-full items-center gap-2 rounded-xl border-3 border-dark bg-white p-4 shadow-[4px_5px_0px_#14161C]">
      <input
        className="w-full bg-transparent focus:outline-none font-mono text-sm font-bold text-dark placeholder:text-dark/40"
        placeholder="Cari result sekolah kamu"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
      {searchQuery ? (
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 font-mono text-[10px] font-black uppercase tracking-widest text-dark/50 hover:text-orange transition-colors"
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}
