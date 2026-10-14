"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import {
  Building2,
  Clock,
  Globe2,
  Home,
  KeyRound,
  Languages,
  Leaf,
  MapPin,
  Network,
  ShieldCheck,
  Ship,
  Star,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";
import { CURRENT_COUNTRY, type CountryCode } from "@/lib/countries/config";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const OFFICES: Record<
  CountryCode,
  {
    titleKey: TranslationKey;
    company: string;
    address: string;
    registrationNumber?: string;
    phone: string;
    email: string;
  }
> = {
  fr: {
    titleKey: "trustOfficeFrance",
    company: "Pearly Sky Company Private",
    address: "15 Rue des Halles, 75001 Paris, France",
    phone: "+33 7 43 70 87 80",
    email: "info@pearlyskyglobalclean.com",
  },
  gb: {
    titleKey: "trustOfficeUnitedKingdom",
    company: "Pearly Sky Cleaning and Facility Maintenance Company Private Ltd",
    address: "60 Tottenham Court Road, Office 775, Fitzrovia, London, W1T 2EW, United Kingdom",
    registrationNumber: "15307255",
    phone: "+44 7349 369400",
    email: "info@pearlyskyglobalclean.com",
  },
  lk: {
    titleKey: "trustOfficeSriLanka",
    company: "Pearly Sky Company Private Ltd",
    address: "No. 188/2, Kandy Road, Pahala Imbulgoda, Imbulgoda, Sri Lanka",
    registrationNumber: "PV 00295748",
    phone: "+94 332 218 900",
    email: "info@pearlyskyglobalclean.com",
  },
};

type TrustItem = {
  Icon: typeof Globe2;
  label: string;
  description?: string;
  /** Rich body used instead of `description`; `hidden` is true for the marquee's looping copy. */
  details?: (hidden: boolean) => ReactNode;
  className?: string;
};

const noopSubscribe = () => () => {};

/** false during SSR and hydration, true once running in the browser. */
function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function TrustBar() {
  const { translate, language } = useLanguage();
  const { trustCoverage } = getCountryHomeContent(language);

  const office = OFFICES[CURRENT_COUNTRY];

  const items: TrustItem[] = [
    {
      Icon: Globe2,
      label: trustCoverage,
      description: translate("trustCoverageDescription"),
    },
    {
      Icon: MapPin,
      label: translate(office.titleKey),
      // Wider than the other cards so the address block wraps less and the
      // card stays close to their height.
      className: "w-[340px] sm:w-[400px]",
      details: (hidden) => {
        const linkTabIndex = hidden ? -1 : undefined;
        return (
          <div className="mt-1.5 space-y-0.5 text-[11px] leading-[1.3] text-brand-navy-foreground/90 md:text-[12px]">
            <p className="font-semibold text-brand-navy-foreground">{office.company}</p>
            <p>{office.address}</p>
            {office.registrationNumber && (
              <p>
                {translate("trustOfficeRegNo")}: {office.registrationNumber}
              </p>
            )}
            <p>
              <a
                href={`tel:${office.phone.replace(/\s/g, "")}`}
                tabIndex={linkTabIndex}
                className="hover:text-brand-gold"
              >
                {office.phone}
              </a>
              {" · "}
              <a href={`mailto:${office.email}`} tabIndex={linkTabIndex} className="hover:text-brand-gold">
                {office.email}
              </a>
            </p>
          </div>
        );
      },
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
    {
      Icon: Clock,
      label: translate("trustBooking60Sec"),
      description: translate("trustBooking60SecDescription"),
    },
    {
      Icon: Leaf,
      label: translate("trustEcoFriendlyProducts"),
      description: translate("trustEcoFriendlyProductsDescription"),
    },
    {
      Icon: Languages,
      label: translate("trustEnglishFrenchTeams"),
      description: translate("trustEnglishFrenchTeamsDescription"),
    },
    {
      Icon: ShieldCheck,
      label: translate("trustVettedProfessionalTeam"),
      description: translate("trustVettedProfessionalTeamDescription"),
    },
    {
      Icon: Home,
      label: translate("trustResidentialCleaning"),
      description: translate("trustResidentialCleaningDescription"),
    },
    {
      Icon: Building2,
      label: translate("trustCommercialCleaning"),
      description: translate("trustCommercialCleaningDescription"),
    },
    {
      Icon: Ship,
      label: translate("trustYachtMarineCleaning"),
      description: translate("trustYachtMarineCleaningDescription"),
    },
    {
      Icon: KeyRound,
      label: translate("trustShortTermRentalConcierge"),
      description: translate("trustShortTermRentalConciergeDescription"),
    },
  ];

  // The list is rendered twice and slid by -50% for a seamless loop; cards
  // use a right margin instead of a flex gap so both halves are equal width.
  // The looping copy is client-only, so the server HTML (what crawlers read)
  // carries each card exactly once.
  const marqueeLoop = useIsClient() ? items : [];

  return (
    <section className="  px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div
          className={`flex w-max ${
            marqueeLoop.length
              ? "animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]"
              : ""
          }`}
        >
          {[...items, ...marqueeLoop].map(({ Icon, label, description, details, className }, index) => (
            <div
              key={`${label}-${index}`}
              aria-hidden={index >= items.length || undefined}
              className={`mr-2 flex min-h-[148px] ${className ?? "w-[200px] md:w-auto"} shrink-0 flex-col items-center justify-start rounded-[7px] border border-brand-gold/20 bg-brand-navy px-2 py-4 text-center text-brand-navy-foreground sm:min-h-[158px] sm:px-3 sm:py-5 sm:mr-3 lg:min-h-[164px] lg:px-4`}
            >
              <Icon className="mb-2 h-9 w-9 shrink-0 stroke-[1.5] text-brand-gold sm:mb-2.5 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
              <p className="max-w-[170px] text-[14px] font-bold uppercase leading-[1.18] tracking-[0.01em] sm:text-[15px] md:max-w-[250px] md:text-[16px] lg:max-w-[230px] lg:text-lg">
                {label}
              </p>
              {details ? (
                details(index >= items.length)
              ) : (
                <p className="mt-2 max-w-[190px] text-[11px] leading-[1.35] text-brand-navy-foreground/90 sm:mt-2.5 md:max-w-[250px] md:text-[12px] lg:max-w-[280px] lg:text-[13px]">
                  {description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
