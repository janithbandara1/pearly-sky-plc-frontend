"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { COVERAGE_CITIES, getCountryHomeContent } from "@/lib/countries/home-content";
import { Building2, Castle, Landmark, Palmtree, ShieldCheck, Star, Timer, UsersRound } from "lucide-react";
import RecentProjects from "./recent-projects";

export function CoverageStrip() {
  const {translate, language } = useLanguage();
  const { country } = useCountry();
  const { coverageTitle, coverageSubtitle } = getCountryHomeContent(country, language);
  const cities = COVERAGE_CITIES[country ?? "fr"];
  const displayedCities = country === "fr"
    ? ["Bordeaux", "Saint-Tropez", "Strasbourg", "Aix-en-Provence", "Annecy", "Paris", "Nice", "Cannes"]
    : cities.slice(0, 8);
  const cityIcons = [Landmark, Palmtree, Castle, Building2, ShieldCheck, Landmark, Palmtree, Castle, Building2, ShieldCheck];
  const features = [
    { Icon: ShieldCheck, title: translate("coveragePeaceTitle"), description: translate("coveragePeaceDescription") },
    { Icon: Timer, title: translate("coveragePrecisionTitle"), description: translate("coveragePrecisionDescription") },
    { Icon: UsersRound, title: translate("coverageCommunicationTitle"), description: translate("coverageCommunicationDescription") },
    { Icon: Star, title: translate("coverageLuxuryTitle"), description: translate("coverageLuxuryDescription") },
  ];

  return (
    <section className="w-full border-t-2 border-[#A98B4B] bg-[#0A1530] px-3 py-7 text-[#fffdf4] sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center font-bold tracking-tight text-[#C9B678]  text-lg  lg:text-xl">
          {translate("aboutPageWhyTitle")} - {coverageTitle}
        </h2>

        <p className="mx-auto mt-1 max-w-3xl text-center text-[10px] leading-4 text-[#fffdf4]/75 text-[10px] lg:text-[14px]">
          {coverageSubtitle}
        </p>

        <div className="mt-4 overflow-hidden sm:mt-5 lg:mt-6">
          <div className="grid w-max grid-flow-col grid-rows-2 gap-1.5 motion-reduce:animate-none animate-marquee hover:[animation-play-state:paused] sm:hidden">
            {[...cities, ...cities].map((city, index) => {
              const Icon = cityIcons[index % cityIcons.length];

              return (
                <div
                  key={`${city}-${index}`}
                  aria-hidden={index >= cities.length}
                  className="flex h-12 w-[calc((100vw-1.875rem)/2)] items-center justify-center gap-1.5 rounded-[4px] border border-[#A98B4B]/75 bg-[#182640]/60 px-1.5 text-center"
                >
                  <Icon className="h-5 w-5 shrink-0 stroke-[1.2] text-[#C9B678]" />
                  <span className="text-[10px] font-medium leading-tight text-[#fffdf4]">
                    {city}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="hidden grid-cols-4 gap-2 sm:grid lg:grid-cols-4 lg:gap-2.5">
            {cities.map((city, index) => {
              const Icon = cityIcons[index % cityIcons.length];

              return (
                <div
                  key={city}
                  className="flex h-14 items-center justify-center gap-2 rounded-[4px] border border-[#A98B4B]/75 bg-[#182640]/60 px-1.5 text-center lg:h-16"
                >
                  <Icon className="h-6 w-6 shrink-0 stroke-[1.2] text-[#C9B678] lg:h-7 lg:w-7" />
                  <span className="text-[13px] font-medium leading-tight text-[#fffdf4] lg:text-[14px]">
                    {city}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="mt-7 text-center font-bold text-[#C9B678] sm:mt-9 text-lg lg:mt-10 md:text-2xl lg:text-2xl">
          {translate("aboutPageWhyTitle")}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-5 sm:grid-cols-4 sm:gap-5 lg:mt-6 lg:gap-8">
          {features.map(({ Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <Icon className="h-7 w-7 stroke-[1.2] text-[#C9B678] sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
              <h4 className="mt-2 text-[11px] font-bold text-[#fffdf4] md:text-[16px] lg:text-[16px] lg:text-xs">{title}</h4>
              <p className="mt-1 max-w-[180px] text-[8px] leading-[1.35] text-[#fffdf4]/85 md:text-[12px] lg:text-[12px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <RecentProjects />
    </section>
  );
}
