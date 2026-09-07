"use client";

import { Globe2, Leaf, Network, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";

export function TrustBar() {
  const { translate, language } = useLanguage();
  const { country } = useCountry();
  const { trustCoverage } = getCountryHomeContent(country, language);

  const items = [
    {
      Icon: Globe2,
      label: trustCoverage,
      description: translate("trustCoverageDescription"),
    },
    {
      Icon: Leaf,
      label: translate("trustEcoCertified"),
      description: translate("trustEcoDescription"),
    },
    {
      Icon: Star,
      label: translate("trustRating"),
      description: translate("trustRatingDescription"),
    },
    {
      Icon: Network,
      label: translate("trustPartnership"),
      description: translate("trustPartnershipDescription"),
    },
  ];

  return (
    <section className="  px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-4">
        {items.map(({ Icon, label, description }) => (
          <div
            key={label}
            className="flex min-h-[148px] flex-col items-center bg-brand-navy justify-start rounded-[7px] border border-brand-gold/20 px-2 py-4 text-center text-brand-navy-foreground sm:min-h-[158px] sm:px-3 sm:py-5 lg:min-h-[164px] lg:px-4"
          >
            <Icon className="mb-2 h-9 w-9 shrink-0 stroke-[1.5] text-brand-gold sm:mb-2.5 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
            <h2 className="max-w-[170px] lg:max-w-[230px] md:max-w-[250px] text-[11px]  font-bold uppercase leading-[1.18] tracking-[0.01em]  md:text-[15px] lg:text-lg">
              {label}
            </h2>
            <p className="mt-2 max-w-[190px] lg:max-w-[280px] md:max-w-[250px] text-[8px] leading-[1.35] text-brand-navy-foreground/90 sm:mt-2.5  lg:text-[12px]">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
