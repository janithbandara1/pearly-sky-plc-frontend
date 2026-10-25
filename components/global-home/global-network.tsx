"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CountryFlagIcon } from "./country-flags";
import { REGIONAL_DATA, TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All Countries" },
  ...REGIONAL_DATA.map((group) => ({ id: group.region, label: group.region })),
];

// Live sites first, so the countries a visitor can actually use lead the row.
const ALL_COUNTRIES = REGIONAL_DATA.flatMap((group) =>
  group.countries.map((country) => ({ ...country, region: group.region })),
).sort((a, b) => Number(b.isLive) - Number(a.isLive));

export function GlobalNetwork() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState({ current: 0, count: 1 });
  const trackRef = useRef<HTMLDivElement>(null);

  const countries = filter === "all" ? ALL_COUNTRIES : ALL_COUNTRIES.filter((c) => c.region === filter);

  const updatePage = () => {
    const track = trackRef.current;
    if (!track) return;
    const count = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth - 0.05));
    const maxScroll = track.scrollWidth - track.clientWidth;
    const current = maxScroll <= 0 ? 0 : Math.round((track.scrollLeft / maxScroll) * (count - 1));
    setPage((prev) => (prev.current === current && prev.count === count ? prev : { current, count }));
  };

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    updatePage();
    window.addEventListener("resize", updatePage);
    return () => window.removeEventListener("resize", updatePage);
  }, [filter]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const scrollToPage = (index: number) => {
    const track = trackRef.current;
    if (!track || page.count <= 1) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: (maxScroll * index) / (page.count - 1), behavior: "smooth" });
  };

  return (
    <section id="locations" className="relative scroll-mt-20 bg-navy-800 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="mb-2 font-display text-3xl font-bold text-white sm:text-4xl">Our Global Network</h2>
          <p className="mb-1 text-base font-medium text-gold-400">{TOTAL_COUNTRIES} Countries, One Premium Standard</p>
          <p className="text-xs text-slate-400 sm:text-sm">
            Choose your local Pearly Sky destination for tailored pricing, localized services, and currency options.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-xs font-medium sm:gap-3">
          {FILTERS.map(({ id, label }) => {
            const count = id === "all" ? TOTAL_COUNTRIES : ALL_COUNTRIES.filter((c) => c.region === id).length;
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(id)}
                className={cn(
                  "rounded-full border px-4 py-2 transition-all",
                  active
                    ? "border-gold-500 bg-gold-500 font-semibold text-navy-900"
                    : "border-slate-700 bg-navy-700/50 text-slate-300 hover:border-gold-500/50",
                )}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Side gutters on sm+ hold the arrows, so they never sit on top of a card. */}
        <div className="relative sm:px-14">
          <button
            type="button"
            aria-label="Scroll countries left"
            onClick={() => scrollBy(-1)}
            className="glass-panel absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-gold-500/40! text-gold-400 shadow-lg transition-all hover:bg-gold-500 hover:text-navy-900 sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll countries right"
            onClick={() => scrollBy(1)}
            className="glass-panel absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-gold-500/40! text-gold-400 shadow-lg transition-all hover:bg-gold-500 hover:text-navy-900 sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={trackRef}
            onScroll={updatePage}
            className="scrollbar-hide flex snap-x gap-4 overflow-x-auto scroll-smooth px-1 pb-4 pt-2"
          >
            {countries.map((country) => (
              <div
                key={country.id}
                className="flex min-w-[200px] snap-start flex-col items-center rounded-2xl border border-slate-700/60 bg-navy-700/40 p-5 text-center transition-all hover:-translate-y-1 hover:border-gold-500/50 sm:min-w-[220px]"
              >
                <CountryFlagIcon code={country.flagCode} className="mb-3 h-8 w-12 rounded-md shadow-md" />
                {/* Two-line slot, so long names ("United States of America") don't make the shorter cards' gaps uneven. */}
                <h3 className="flex min-h-10 items-center font-display text-base font-bold leading-tight text-white">
                  {country.name}
                </h3>
                <p className="mb-3 mt-1 text-[11px] text-slate-400">
                  {country.isLive ? country.domain.toLowerCase() : country.region}
                </p>
                {country.isLive ? (
                  <a
                    href={`https://${country.domain.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-0! items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-600/20 px-3.5 py-1.5 text-xs font-medium text-emerald-400 transition-all hover:bg-emerald-600 hover:text-white"
                  >
                    <span>Live Website</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-400">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {page.count > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {Array.from({ length: page.count }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to page ${index + 1}`}
                aria-current={index === page.current}
                onClick={() => scrollToPage(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === page.current ? "w-5 bg-gold-400" : "w-2 bg-slate-700 hover:bg-slate-500",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
