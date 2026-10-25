"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Dumbbell,
  Building,
  HeartPulse,
  Hotel,
  KeyRound,
  Landmark,
  ShoppingBag,
} from "lucide-react";

const SECTORS = [
  { title: "Luxury Residential", image: "residential", Icon: Crown },
  { title: "Commercial Property", image: "commercial", Icon: Building },
  { title: "Luxury Property Management", image: "private-properties", Icon: KeyRound },
  { title: "Hospitality & Hotel Cleaning", image: "hospitality", Icon: Hotel },
  { title: "Sports & Wellness Facilities", image: "sports", Icon: Dumbbell },
  { title: "Public & Institutional Cleaning", image: "education", Icon: Landmark },
  { title: "Healthcare Facilities", image: "healthcare", Icon: HeartPulse },
  { title: "Retail Spaces", image: "retail", Icon: ShoppingBag },
];

export function GlobalSectors() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="sectors" className="relative scroll-mt-20 bg-navy-800 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gold-400">
              Our Service Sectors
            </span>
            <h2 className="font-display text-2xl font-bold text-white sm:text-4xl">Trusted Across Multiple Industries</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {([-1, 1] as const).map((direction) => {
              const Icon = direction === -1 ? ChevronLeft : ChevronRight;
              return (
                <button
                  key={direction}
                  type="button"
                  aria-label={direction === -1 ? "Previous sectors" : "Next sectors"}
                  onClick={() => scrollBy(direction)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-all hover:border-gold-500 hover:text-gold-400"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
        </div>

        <div ref={trackRef} className="scrollbar-hide flex snap-x gap-3 overflow-x-auto scroll-smooth sm:gap-4">
          {SECTORS.map(({ title, image, Icon }) => (
            <div
              key={title}
              className="group relative flex h-44 w-[calc((100%-0.75rem)/2)] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-xl border border-slate-700/50 bg-navy-900 p-3 text-center transition-all hover:border-gold-500 sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-5rem)/6)]"
            >
              <Image
                src={`/images/sectors/${image}.webp`}
                alt={title}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/60 to-transparent" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-gold-400/50 bg-gold-500/20 text-gold-400">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-display text-xs font-bold leading-tight text-white group-hover:text-gold-300">
                  {title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
