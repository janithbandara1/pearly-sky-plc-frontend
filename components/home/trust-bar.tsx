"use client";

import { useSyncExternalStore } from "react";
import { Globe2, Leaf, Network, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";

const noopSubscribe = () => () => {};

/** false during SSR and hydration, true once running in the browser. */
function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function TrustBar() {
  const { translate, language } = useLanguage();
  const { trustCoverage } = getCountryHomeContent(language);

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

  // One list serves both layouts: a 4-column grid from md up, a scrolling
  // marquee below. The marquee's looping copy is client-only, so the
  // server HTML (what crawlers read) carries each card exactly once.
  const marqueeLoop = useIsClient() ? items : [];

  return (
    <section className="  px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div
          className={`flex w-max gap-2 sm:gap-3 md:grid md:w-full md:grid-cols-4 lg:gap-4 ${
            marqueeLoop.length ? "max-md:animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]" : ""
          }`}
        >
          {[...items, ...marqueeLoop].map(({ Icon, label, description }, index) => (
            <div
              key={`${label}-${index}`}
              aria-hidden={index >= items.length || undefined}
              className={`flex min-h-[148px] w-[200px] shrink-0 flex-col items-center justify-start rounded-[7px] border border-brand-gold/20 bg-brand-navy px-2 py-4 text-center text-brand-navy-foreground sm:min-h-[158px] sm:px-3 sm:py-5 md:w-auto lg:min-h-[164px] lg:px-4 ${
                index >= items.length ? "md:hidden" : ""
              }`}
            >
              <Icon className="mb-2 h-9 w-9 shrink-0 stroke-[1.5] text-brand-gold sm:mb-2.5 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
              <p className="max-w-[170px] text-[14px] font-bold uppercase leading-[1.18] tracking-[0.01em] sm:text-[15px] md:max-w-[250px] md:text-[16px] lg:max-w-[230px] lg:text-lg">
                {label}
              </p>
              <p className="mt-2 max-w-[190px] text-[11px] leading-[1.35] text-brand-navy-foreground/90 sm:mt-2.5 md:max-w-[250px] md:text-[12px] lg:max-w-[280px] lg:text-[13px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
