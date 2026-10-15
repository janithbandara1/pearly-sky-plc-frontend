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
  Mail,
  MapPin,
  Network,
  Phone,
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
  /** Full-width row under the icon/text row (the office card's contacts). */
  footer?: (hidden: boolean) => ReactNode;
  /** Overrides the default card width. */
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
      className: "w-[360px] sm:w-[480px]",
      details: () => (
        <div className="mt-2 space-y-0.5 text-[11px] leading-snug text-brand-navy-foreground/85 sm:mt-2.5 sm:space-y-1 sm:text-[13px]">
          <p className="font-semibold text-white">{office.company}</p>
          <p>{office.address}</p>
          {office.registrationNumber && (
            <p>
              {translate("trustOfficeRegNo")}: {office.registrationNumber}
            </p>
          )}
        </div>
      ),
      footer: (hidden) => {
        const linkTabIndex = hidden ? -1 : undefined;
        const contacts = [
          { ContactIcon: Phone, href: `tel:${office.phone.replace(/\s/g, "")}`, text: office.phone },
          { ContactIcon: Mail, href: `mailto:${office.email}`, text: office.email },
        ];
        return (
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] text-brand-navy-foreground/90 sm:mt-4 sm:gap-x-3 sm:text-[13px]">
            {contacts.map(({ ContactIcon, href, text }, i) => (
              <div key={href} className="flex items-center gap-2 sm:gap-3">
                {i > 0 && <span aria-hidden="true" className="hidden h-5 w-px bg-brand-gold/60 sm:block" />}
                <a
                  href={href}
                  tabIndex={linkTabIndex}
                  className="flex items-center gap-1.5 transition-colors hover:text-brand-gold sm:gap-2"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-gold/80 sm:h-7 sm:w-7">
                    <ContactIcon className="h-3 w-3 text-brand-gold sm:h-3.5 sm:w-3.5" />
                  </span>
                  {text}
                </a>
              </div>
            ))}
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
    <section className="px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
      {/* Vertical padding keeps the cards' shadows inside the clipped area. */}
      <div className="mx-auto w-full max-w-7xl overflow-hidden py-3">
        <div
          className={`flex w-max ${
            marqueeLoop.length
              ? "animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]"
              : ""
          }`}
          // Slower than the shared 40s marquee: these cards are wide, so 40s
          // would scroll ~5000px of track far too fast.
          style={{ animationDuration: "120s" }}
        >
          {[...items, ...marqueeLoop].map(({ Icon, label, description, details, footer, className }, index) => {
            const hidden = index >= items.length;
            return (
              <div
                key={`${label}-${index}`}
                aria-hidden={hidden || undefined}
                className={`mr-3 flex min-h-[120px] shrink-0 flex-col justify-center rounded-xl border border-brand-gold/20 border-b-brand-gold/60 bg-gradient-to-br from-[#0f2a4d] to-brand-navy px-3.5 py-3.5 text-brand-navy-foreground shadow-[0_12px_24px_-12px_rgba(0,0,0,0.55)] sm:mr-4 sm:min-h-[170px] sm:p-5 ${
                  className ?? "w-[340px] sm:w-[400px]"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-gold/80 shadow-[0_0_18px_rgba(201,168,88,0.3)] sm:h-20 sm:w-20">
                    <Icon className="h-6 w-6 stroke-[1.5] text-brand-gold sm:h-9 sm:w-9" />
                  </span>
                  <span aria-hidden="true" className="w-px self-stretch bg-brand-gold/50" />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-serif text-[15px] font-bold uppercase leading-tight tracking-[0.03em] text-white sm:text-[19px]">
                      {label}
                    </p>
                    <span aria-hidden="true" className="mt-1.5 block h-px w-10 bg-brand-gold sm:mt-2" />
                    {details ? (
                      details(hidden)
                    ) : (
                      <p className="mt-2 text-[12px] leading-snug text-brand-navy-foreground/85 sm:mt-2.5 sm:text-[13px]">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
                {footer?.(hidden)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
