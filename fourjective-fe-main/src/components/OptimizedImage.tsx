"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
  compressionQuality?: number; // 1-100, default 50 for extreme compression
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  className,
  compressionQuality = 50,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className || ""}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <Image
        src={error && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        quality={compressionQuality}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
}
