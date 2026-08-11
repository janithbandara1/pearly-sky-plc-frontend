"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { COVERAGE_CITIES, getCountryHomeContent } from "@/lib/countries/home-content";

export function CoverageStrip() {
  const { language } = useLanguage();
  const { country } = useCountry();
  const { coverageTitle, coverageSubtitle } = getCountryHomeContent(country, language);
  const cities = COVERAGE_CITIES[country ?? "fr"];
  const loop = [...cities, ...cities];

  return (
    <section className="bg-brand-navy py-14 text-brand-navy-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {coverageTitle}
        </h2>
        <p className="mt-2 text-brand-navy-foreground/70">{coverageSubtitle}</p>
      </div>

      <div className="group relative mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
          {loop.map((city, index) => (
            <span
              key={`${city}-${index}`}
              className="shrink-0 rounded-full border border-brand-gold/40 px-5 py-2 text-sm font-medium text-brand-navy-foreground"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
