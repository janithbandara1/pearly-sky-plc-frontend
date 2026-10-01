"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { useState, useEffect } from "react";
import { getServices, ServicePriceEntry } from "@/lib/catalog-api";
import { COUNTRY_FLAGS } from "@/components/country-switcher";
import { CURRENT_COUNTRY, SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import { HeroPriceSelector, type HeroPriceOption } from "@/components/hero-price-selector";
import { transcode } from "buffer";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

/** Same country-flag-icons set the navbar's CountrySwitcher/LocaleSwitcher use. */
function getFlagComponent(code: string) {
  return COUNTRY_FLAGS[code.toLowerCase() as CountryCode] ?? COUNTRY_FLAGS.fr;
}

/**
 * A few legacy price rows use `GBR`; the site's own code for the UK is `gb`.
 * Returns null for anything outside the supported list — the backend still
 * holds prices for many other countries (de, ch, ie, …), and those must be
 * skipped rather than folded into another country's slot (they used to fall
 * back to `fr`, so whichever came last, e.g. ch's 29.70, showed as France's).
 */
function normalizeCountryCode(raw: string | null | undefined): CountryCode | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const code = lower === "gbr" ? "gb" : lower;
  return (SUPPORTED_COUNTRIES as readonly string[]).includes(code) ? (code as CountryCode) : null;
}

export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  servicePrices,
  serviceId,
  hidePriceSelector,
  unitLabelKey,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  servicePrices?: ServicePriceEntry[];
  serviceId?: number;
  /** Hides the "€X.XX / Hour Per Cleaner" price + country picker — for services that aren't priced per hour. */
  hidePriceSelector?: boolean;
  /** "Hour Per Cleaner" by default — pass "hourPerProfessional" for Child/Elder Care. */
  unitLabelKey?: TranslationKey;
}) {
  /** This deployment's fixed country (see CURRENT_COUNTRY) — no picker anymore now that each country is its own site. */
  const { country, countries } = useCountry();
  const metaByCode = Object.fromEntries(countries.map((c) => [c.code, c]));
  const [priceByCode, setPriceByCode] = useState<Record<string, number | null>>({});

  useEffect(() => {
    function processPrices(prices: ServicePriceEntry[]) {
      if (!prices || prices.length === 0) return;
      const byCode: Record<string, number | null> = {};
      for (const p of prices) {
        const code = normalizeCountryCode(p.country);
        if (!code) continue;
        byCode[code] = p.price !== null && p.price !== undefined ? parseFloat(p.price) : null;
      }
      setPriceByCode(byCode);
    }

    if (servicePrices && servicePrices.length > 0) {
      processPrices(servicePrices);
    } else {
      getServices()
        .then((services) => {
          if (!services || services.length === 0) return;
          const targetService = serviceId
            ? services.find((s) => s.id === serviceId) || services[0]
            : services[0];
          if (targetService && targetService.prices) {
            processPrices(targetService.prices);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch service prices from backend database:", err);
        });
    }
  }, [servicePrices, serviceId]);

  /** Just this deployment's own country — no other country's price ever shows here anymore. */
  const activePrices: HeroPriceOption[] = [
    {
      country: CURRENT_COUNTRY,
      price: priceByCode[CURRENT_COUNTRY] ?? null,
      currency: metaByCode[CURRENT_COUNTRY]?.currency ?? "",
    },
  ];

  const selectedCountryCode = country;
  const selectedData = activePrices[0];
  const SelectedFlag = getFlagComponent(selectedData.country);

  /* const navigateToPreviousService = 
                          [
                            {slug:"regular-home-cleaning",label: "Regular Home Cleaning"},
                            {slug:"quick-touch-up-cleaning",label: "Quick Touch-Up Cleaning"},
                            {slug:"same-day-priority-cleaning",label: "Same-Day Priority Cleaning"},
                            {slug:"deep-cleaning",label: "Deep Cleaning"},
                            {slug:"end-of-tenancy-cleaning",label: "End of Tenancy Cleaning"},
                            {slug:"post-construction-renovation-cleaning",label: "Post-Construction Renovation Cleaning"},
                            {slug:"premium-rental-concierge-cleaning",label: "Premium Rental Concierge Cleaning"},
                            {slug:"commercial-office-cleaning",label: "Commercial Office Cleaning"},
                            {slug:"healthguard-sanitization",label: "Healthguard Sanitization"},
                            {slug:"carpet-upholstery-cleaning",label: "Carpet and Upholstery Cleaning"},
                            {slug:"steam-cleaning",label: "Steam Cleaning"},
                            {slug:"post-event-cleaning",label: "Post-Event Cleaning"},
                            {slug:"pool-cleaning",label: "Pool Cleaning"},
                            {slug:"precision-pressure-washing",label: "Precision Pressure Washing"},
                            {slug:"child-care-service",label: "Child Care Service"},
                            {slug:"elder-care-service",label: "Elder Care Service"},
                            {slug:"laundry-service",label: "Laundry Service"},
                            {slug:"move-in-out-transport-service",label: "Move-In/Out Transport Service"},
                            {slug:"high-security-property-care",label: "High Security Property Care"},
                            {slug:"luxury-yacht-cleaning",label: "Luxury Yacht Cleaning"}
                          ] */
  

  const {translate} =useLanguage()

  return (
    <section className="relative flex h-auto justify-center bg-transparent text-center mb-16 md:mb-12">
      <div className="lg:min-h-[75vh] lg:max-h-[80vh] md:min-h-[45vh] md:max-h-[80vh] h-[15vh] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="120vw"
          className="object-cover h-[25vh] md:h-[100vh] rounded-none md:rounded-b-[100px] border border-[rgb(169,139,75)]"
        />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2.5 md:block md:left-8 left-3 z-10 mx-auto max-w-lg md:max-w-3xl py-4 px-5 md:py-5 md:px-7 bg-[rgb(18,30,45)] border-2 border-[rgb(169,139,75)] md:border-0 md:border-transparent md:rounded-[20px]">
        <Link href={"/"}
          className="inline-flex md:hidden shrink-0 items-center gap-2">
          <Image
            src="/images/services/service-back.svg"
            alt="Logo"
            width={20}
            height={20}
          />
        </Link>
        {eyebrow && (
          <p className="mb-2 hidden text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="min-w-0 truncate md:overflow-visible max-w-[300px] md:max-w-3xl md:text-clip md:whitespace-normal text-base sm:text-3xl md:text-4xl font-bold text-[#c29b38] tracking-tight leading-tight">
          {translate(title as TranslationKey)}
        </h1>
        {subtitle && <p className="mt-3 text-brand-cream/85 hidden">{subtitle}</p>}

        {!hidePriceSelector && (
          <HeroPriceSelector
            activePrices={activePrices}
            selectedCountryCode={selectedCountryCode}
            selectedData={selectedData}
            selectedFlag={SelectedFlag}
            getFlagComponent={getFlagComponent}
            onCountryChange={() => {}}
            unitLabelKey={unitLabelKey}
          />
        )}
      </div>
    </section>
  );
}