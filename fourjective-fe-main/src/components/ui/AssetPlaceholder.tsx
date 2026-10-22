import React from "react";
import { Image as ImageIcon, Sparkles, BookOpen, Camera, Film, Layers } from "lucide-react";

interface AssetPlaceholderProps {
  label: string;
  dimensions: string;
  description: string;
  ratio?: "square" | "portrait" | "landscape" | "wide" | "banner";
  theme?: "loonart" | "abankirenk" | "fourjective";
  icon?: "image" | "book" | "camera" | "film" | "sparkles" | "layers";
  className?: string;
  badge?: string;
}

export function AssetPlaceholder({
  label,
  dimensions,
  description,
  ratio = "landscape",
  theme = "fourjective",
  icon = "image",
  className = "",
  badge,
}: AssetPlaceholderProps) {
  // Ratio mapping
  const ratioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    wide: "aspect-[16/9]",
    banner: "aspect-[21/9]",
  }[ratio];

  // Theme styling
  const themeStyles = {
    loonart: {
      wrapper: "bg-[#F5EFE6] border-2 border-dashed border-[#8C7A6B]/40 text-[#4A3E3D]",
      badge: "bg-[#DDD6FE] text-[#4C1D95] border border-[#7C3AED]/30",
      accent: "bg-[#FDE047] text-[#713F12]",
      tag: "bg-[#FFFFFF] text-[#18181B] shadow-[2px_2px_0px_#18181B]",
    },
    abankirenk: {
      wrapper: "bg-[#251740] border-2 border-dashed border-[#FAC443]/50 text-[#F5E4DE]",
      badge: "bg-[#FF4D1F] text-[#FFFFFF] shadow-[3px_3px_0px_#1E1233]",
      accent: "bg-[#FAC443] text-[#1E1233]",
      tag: "bg-[#534CC3] text-[#FFFFFF] shadow-[3px_3px_0px_#1E1233]",
    },
    fourjective: {
      wrapper: "bg-[#FAFAFA] border-2 border-dashed border-[#FF6E00]/40 text-[#18181B]",
      badge: "bg-[#FF6E00] text-white shadow-sm",
      accent: "bg-[#FFF4ED] text-[#FF6E00] border border-[#FF6E00]/30",
      tag: "bg-[#18181B] text-[#FFFFFF]",
    },
  }[theme];

  const renderIcon = () => {
    switch (icon) {
      case "book":
        return <BookOpen className="w-6 h-6 opacity-75" />;
      case "camera":
        return <Camera className="w-6 h-6 opacity-75" />;
      case "film":
        return <Film className="w-6 h-6 opacity-75" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6 opacity-75" />;
      case "layers":
        return <Layers className="w-6 h-6 opacity-75" />;
      default:
        return <ImageIcon className="w-6 h-6 opacity-75" />;
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-4 text-center rounded-xl overflow-hidden group select-none transition-all duration-300 hover:border-solid ${ratioClasses} ${themeStyles.wrapper} ${className}`}
    >
      {/* Background blueprint subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
        <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full ${themeStyles.badge}`}>
          {dimensions}
        </span>
        {badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${themeStyles.accent}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Center Icon & Label */}
      <div className="flex flex-col items-center gap-2 max-w-[90%] z-10">
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm shadow-inner">
          {renderIcon()}
        </div>
        <p className="font-bold text-sm md:text-base tracking-tight leading-tight">
          {label}
        </p>
        <p className="text-[11px] md:text-xs opacity-75 line-clamp-3 leading-relaxed max-w-xs">
          {description}
        </p>
      </div>

      {/* Bottom tag */}
      <div className="absolute bottom-2 right-2 z-10">
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${themeStyles.tag}`}>
          ASSET PLACEHOLDER
        </span>
      </div>
    </div>
  );
}
