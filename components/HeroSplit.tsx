"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = {
  href: string;
  src: string;
  alt: string;
  label: string;
};

type Props = {
  left: Item;
  right: Item;
  bottom?: Item;
  className?: string;
};

export default function HeroSplit({ left, right, bottom, className = "" }: Props) {
  const [nyDate, setNyDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const nyTime = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
      setNyDate(`NEW YORK ${nyTime.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '.')}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative w-full ${className}`}>
      <div className="mb-1 text-white text-xs font-light">Form held by clarity, freed by imagination</div>
      <div className="mb-2 text-[9px] tracking-widest text-neutral-400">{nyDate}</div>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 min-h-[80vh] md:min-h-[85vh]">
        <HeroTile {...left} side="left" />
        <HeroTile {...right} side="right" />
      </div>

      <div className="mt-12 mb-12 md:mt-16 md:mb-16 lg:mt-20 lg:mb-20 space-y-2">
        <h2 className="font-extrabold text-white text-lg tracking-wide">ALEXANDER MAY STUDIO</h2>
        <p className="text-neutral-300 text-sm leading-relaxed max-w-1xl">
          works across creative direction, spatial design, and curation, shaping environments and narratives with precision and imagination.
        </p>
      </div>

      {bottom && <HeroTile {...bottom} />}
    </section>
  );
}

function HeroTile({ href, src, alt, label, side }: Item & { side?: "left" | "right" }) {
  const isFullWidth = !side;
  
  return (
    <Link
      href={href}
      className={`group relative block outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
        isFullWidth ? "w-full" : `h-full ${side === "left" ? "md:border-r md:border-neutral-800" : ""}`
      }`}
    >
      <div className={`relative w-full overflow-hidden bg-neutral-900 ${isFullWidth ? "aspect-[16/9]" : "h-full"}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={!isFullWidth}
          className="object-cover transition-all duration-300 ease-out brightness-[0.4] opacity-60 group-hover:brightness-100 group-hover:opacity-100 group-focus-visible:brightness-100 group-focus-visible:opacity-100"
          sizes={isFullWidth ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 px-6">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-neutral-200 transition-colors duration-200 group-hover:text-white group-focus-visible:text-white">
          {label}
        </span>
      </div>
    </Link>
  );
}
