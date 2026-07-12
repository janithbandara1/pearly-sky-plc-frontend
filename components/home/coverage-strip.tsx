"use client";

import { useLanguage } from "@/lib/i18n/language-context";

const CITIES = [
  "Paris",
  "Nice",
  "Saint-Tropez",
  "Antibes",
  "Cannes",
  "Monaco",
  "Lyon",
  "Normandy",
  "Deauville",
  "Bordeaux",
  "Reims",
  "Strasbourg",
  "Montpellier",
  "Biarritz",
  "Aix-en-Provence",
  "Annecy",
  "Courchevel",
  "Megève",
];

export function CoverageStrip() {
  const { translate } = useLanguage();
  const loop = [...CITIES, ...CITIES];

  return (
    <section className="bg-brand-navy py-14 text-brand-navy-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {translate("coverageTitle")}
        </h2>
        <p className="mt-2 text-brand-navy-foreground/70">{translate("coverageSubtitle")}</p>
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
