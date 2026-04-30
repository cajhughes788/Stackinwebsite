"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const previews = [
  {
    src: "/images/app-preview-1.jpg",
    alt: "Stackin app preview showing the current pay period screen.",
  },
  {
    src: "/images/app-preview-2.jpg",
    alt: "Stackin app preview showing the current month income screen.",
  },
  {
    src: "/images/app-preview-3.jpg",
    alt: "Stackin app preview showing the expenses breakdown screen.",
  },
] as const;

export function AppPreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % previews.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl" />

      <div className="relative rounded-3xl border border-border bg-card/80 p-3 shadow-2xl backdrop-blur-xl">
        <div className="relative aspect-[1242/2147] overflow-hidden rounded-[1.65rem] bg-[#080a08]">
          {previews.map((preview, index) => (
            <Image
              key={preview.src}
              src={preview.src}
              alt={preview.alt}
              fill
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 100vw, 34vw"
              className={`object-contain transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
