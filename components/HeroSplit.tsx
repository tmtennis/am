"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = {
  href: string;
  src: string;          // public path, e.g. "/images/hero/hero-1.png"
  alt: string;
  label: string;        // client name, e.g. "NORDIC KNOT"
};

type Props = {
  left: Item;
  right: Item;
  className?: string;
};

export default function HeroSplit({ left, right, className = "" }: Props) {
  const [nyDate, setNyDate] = useState<string>("");

  useEffect(() => {
    const updateNYTime = () => {
      const now = new Date();
      const nyTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
      const formattedDate = nyTime.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.');
      setNyDate(`NEW YORK ${formattedDate}`);
    };

    updateNYTime();
    const interval = setInterval(updateNYTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative w-full ${className}`}>
      {/* Date stamp above images, left aligned */}
      <div className="mb-2 text-[9px] tracking-widest text-neutral-400 text-left">
        {nyDate}
      </div>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 min-h-[80vh] md:min-h-[85vh]">
        <Tile {...left} side="left" />
        <Tile {...right} side="right" />
      </div>

      {/* Studio description below images */}
      <div className="mt-2 space-y-0">
        <h2 className="font-extrabold text-white text-lg tracking-wide">
          ALEXANDER MAY STUDIO
        </h2>
        <p className="text-neutral-300 text-sm leading-relaxed max-w-1xl">
          works across creative direction, spatial design, and curation, shaping environments and narratives with precision and imagination.
        </p>
      </div>

      {/* Hero-3 image below description */}
      <div className="mt-4 w-full">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
          <Image
            src="/images/hero/hero-3.png"
            alt="Alexander May Studio Work"
            fill
            className="object-cover transition-all duration-300 ease-out brightness-[0.65] opacity-75 hover:brightness-100 hover:opacity-100"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}

function Tile({
  href,
  src,
  alt,
  label,
  side,
}: Item & { side: "left" | "right" }) {
  return (
    <Link
      href={href}
      className={`group relative block outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white h-full ${
        side === "left" ? "md:border-r md:border-neutral-800" : ""
      }`}
    >
      {/* image wrapper fills entire tile */}
      <div className="relative w-full h-full overflow-hidden bg-neutral-900">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover transition-all duration-300 ease-out brightness-[0.65] opacity-75 group-hover:brightness-100 group-hover:opacity-100 group-focus-visible:brightness-100 group-focus-visible:opacity-100"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      {/* bottom-left label */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 px-6">
        <span className="inline-block bg-transparent text-[11px] font-semibold uppercase tracking-widest text-neutral-200 transition-colors duration-200 group-hover:text-white group-focus-visible:text-white">
          {label}
        </span>
      </div>
    </Link>
  );
}
