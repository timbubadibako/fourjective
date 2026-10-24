"use client";

import React, { useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * Tile film hover-play — rekanan WorkCard untuk grid karya
 * (LP #portfolio, /portofolio). Video putar saat hover/tap.
 */
export default function WorkVideoTile({
  src,
  poster,
  label,
  spec,
  index,
  place,
  aspect,
}: {
  src: string;
  poster: string;
  label: string;
  spec: string;
  index: string;
  place: string;
  aspect: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    videoRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };
  const stop = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <article className="group relative bg-white border-3 border-dark shadow-brutal hover:-translate-y-1.5 hover:shadow-brutal-lg transition-all duration-300">
      <div
        className={`relative ${aspect} overflow-hidden border-b-3 border-dark bg-dark`}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%)",
        }}
        onMouseEnter={play}
        onMouseLeave={stop}
        onTouchStart={play}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          preload="none"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Overlay hint (fade saat memutar) */}
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="w-12 h-12 rounded-full bg-orange text-[#FAF6F0] flex items-center justify-center border-3 border-white shadow-[0_8px_25px_rgba(255,77,0,0.5)]">
            <Play className="w-5 h-5 ml-0.5" />
          </span>
        </div>
        <span className="absolute bottom-0 left-3 font-display font-black text-[64px] leading-none text-white/85 tracking-tighter pointer-events-none">
          {index}
        </span>
        <span className="absolute top-0 right-0 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase border-b-3 border-l-3 border-dark bg-dark text-white">
          {spec}
        </span>
      </div>

      <div className="p-4 pt-5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] font-black text-orange uppercase tracking-wider">
            {place}
          </span>
          <span className="font-mono text-[10px] font-bold text-zinc-400">
            FILM
          </span>
        </div>
        <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight group-hover:text-orange transition-colors">
          {label}
        </h3>
        <p className="text-xs text-zinc-500 font-medium leading-snug">
          Arahkan kursor — film langsung memutar.
        </p>
      </div>
    </article>
  );
}
