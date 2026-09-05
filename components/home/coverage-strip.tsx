"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { COVERAGE_CITIES, getCountryHomeContent } from "@/lib/countries/home-content";
import RecentProjects from "./recent-projects";
import { transcode } from "buffer";

export function CoverageStrip() {
  const { language } = useLanguage();
  const { country } = useCountry();
  const { coverageTitle, coverageSubtitle } = getCountryHomeContent(country, language);
  const cities = COVERAGE_CITIES[country ?? "fr"];
  const loop = [...cities, ...cities];

  return (
    <section className="bg-[#0A1530] w-full py-16 px-4 flex flex-col items-center border-t-2 border-[#A98B4B]">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-px w-16 bg-[#A98B4B]"></div>
        <span className="text-[#C9B678] text-lg">◆</span>
        <div className="h-px w-16 bg-[#A98B4B]"></div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl text-[#C9B678] font-bold tracking-tight sm:text-3xl">
          Why choose us? - {coverageTitle}
        </h2>
        <p className="mt-2 text-brand-navy-foreground/70">{coverageSubtitle}</p>
      </div>

      <div className="group relative mt-8 overflow-hidden w-full md:w-5xl">
        <div className="flex w-max animate-marquee gap-3 mb-10 group-hover:[animation-play-state:paused]">
          {loop.map((city, index) => (
            <span
              key={`${city}-${index}`}
              className="shrink-0 rounded-full border border-brand-gold/40 px-5 py-2 text-sm font-medium text-brand-navy-foreground"
            >
              {city}
            </span>
          ))}
        </div>
        <h3 className="text-[#C9B678] font-bold text-lg md:text-xl mb-3 text-left">Why Choose Us?</h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed text-left">Choosing Pearly Sky means choosing peace of mind. With extensive experience serving clients throughout France's most prestigious locations, we combine local expertise with international service standards. Our bilingual teams provide seamless communication and exceptional service across Paris, Nice, Cannes, and Monaco. We believe in transparency, punctuality, and an unwavering commitment to excellence. Entrust your property to the professionals who treat every space with the care it deserves.
         Book your consultation today and step into a cleaner, brighter tomorrow.</p>
      </div>
      <RecentProjects />
    </section>
  );
}
