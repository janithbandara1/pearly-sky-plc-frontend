"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Key } from "lucide-react";
import type { HomeService, ServiceCategory } from "@/lib/catalog-api";
import { useCurrency } from "@/lib/currency-context";
import { useCountry } from "@/lib/countries/country-context";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

//2026-08-24=CATAGORIES UPDATED by adding 
//Residential Cleaning Services,Premium Add-On Services,Commercial & Specialised Cleaning Services,Care & Concierge Services
const CATEGORIES: { key: ServiceCategory; headingKey: TranslationKey;subHeader: TranslationKey; limit?: number }[] = [
    //NEW CATEGORIES ADDED
  {key: "residential_cleaning", headingKey: "servicesCategoryResidentialCleaning",subHeader:"servicesSubHeaderResidentialCleaning" },
  {key: "premium_add_ons", headingKey: "servicesCategoryPremiumAddOns",subHeader:"servicesSubHeaderPremiumAddOns" },
  {key:"commercial_and_specialized_cleaning", headingKey:"servicesCategoryCommercialSpecialised",subHeader:"servicesSubHeaderCommercialSpecialised"},
  {key:"care_and_concierge", headingKey:"servicesCategoryCareConcierge",subHeader:"servicesSubHeaderCareConcierge"},
  
      //old CATEGORIES
  //{key: "property_care", headingKey: "servicesCategoryPropertyCare" },
  //{key: "bespoke_lifestyle", headingKey: "servicesCategoryBespokeLifestyle" },

];

const SERVICE_TRANSLATIONS: Partial<Record<string, { label: TranslationKey; description: TranslationKey }>> = {
  "regular-home-cleaning": { label: "serviceRegularHomeCleaning", description: "serviceRegularHomeCleaningDescription" },
  "regular-maintenance-cleaning": { label: "serviceRegularHomeCleaning", description: "serviceRegularHomeCleaningDescription" },
  "essential-touch-up-cleaning": { label: "serviceEssentialTouchUpCleaning", description: "serviceEssentialTouchUpCleaningDescription" },
  "quick-touch-up-cleaning": { label: "serviceEssentialTouchUpCleaning", description: "serviceEssentialTouchUpCleaningDescription" },
  "deep-cleaning": { label: "serviceDeepCleaning", description: "serviceDeepCleaningDescription" },
  "end-of-tenancy-cleaning": { label: "serviceEndOfTenancyCleaning", description: "serviceEndOfTenancyCleaningDescription" },
   "post-construction-renovation-cleaning": { label: "servicePostConstructionRenovationCleaning", description: "servicePostConstructionRenovationCleaningDescription" },
  "premium-rental-concierge-cleaning": { label: "servicePremiumRentalConciergeCleaning", description: "servicePremiumRentalConciergeCleaningDescription" },
  "commercial-office-cleaning":{ label: "serviceCommercialOfficeCleaning", description: "serviceCommercialOfficeCleaningDescription" },

  "same-day-priority-cleaning": { label: "serviceSameDayPriorityCleaning", description: "serviceSameDayPriorityCleaningDescription" },
  "healthguard-sanitization": { label: "serviceHealthguardSanitization", description: "serviceHealthguardSanitizationDescription" },
  "carpet-upholstery-cleaning": { label: "serviceCarpetUpholsteryCleaning", description: "serviceCarpetUpholsteryCleaningDescription" },
  "steam-cleaning": { label: "serviceSteamCleaning", description: "serviceSteamCleaningDescription" },
  "post-event-cleaning": { label: "servicePostEventCleaning", description: "servicePostEventCleaningDescription" },
  "pool-cleaning": { label: "servicePoolCleaning", description: "servicePoolCleaningDescription" },
  "precision-pressure-washing": { label: "servicePrecisionPressureWashing", description: "servicePrecisionPressureWashingDescription" },
  "child-care-service": { label: "serviceChildCareService", description: "serviceChildCareServiceDescription" },
  "elder-care-service": { label: "serviceElderCareService", description: "serviceElderCareServiceDescription" },
  "laundry-service": { label: "serviceLaundryService", description: "serviceLaundryServiceDescription" },
  "move-in-out-transport-service": { label: "serviceMoveInOutTransportService", description: "serviceMoveInOutTransportServiceDescription" },
  "high-security-property-care": { label: "serviceHighSecurityPropertyCare", description: "serviceHighSecurityPropertyCareDescription" },
  "luxury-yacht-cleaning": { label: "serviceLuxuryYachtCleaning", description: "serviceLuxuryYachtCleaningDescription" },
};

type TaxBucket = "residential" | "commercial" | "specialized";

/**
 * Which tax-display bucket each hourly-rate service falls into, per the
 * "Pearly Sky Eco-Luxury Cleaning — International Pricing Structure" web
 * display spec. This is a display-only grouping distinct from the app's
 * ServiceCategory (e.g. High-Security Property Care is RESIDENTIAL_CLEANING
 * in the catalog but shown as "Residential" here too, while Steam/Post-Event/
 * Luxury Yacht are COMMERCIAL_AND_SPECIALIZED_CLEANING in the catalog yet
 * "Specialized" here — the two taxonomies just happen to diverge on those).
 */
const SERVICE_TAX_BUCKET: Partial<Record<string, TaxBucket>> = {
  "regular-home-cleaning": "residential",
  "regular-maintenance-cleaning": "residential",
  "essential-touch-up-cleaning": "residential",
  "quick-touch-up-cleaning": "residential",
  "deep-cleaning": "residential",
  "end-of-tenancy-cleaning": "residential",
  "post-construction-renovation-cleaning": "residential",
  "same-day-priority-cleaning": "residential",
  "high-security-property-care": "residential",
  "premium-rental-concierge-cleaning": "residential",
  "commercial-office-cleaning": "commercial",
  "healthguard-sanitization": "specialized",
  "steam-cleaning": "specialized",
  "post-event-cleaning": "specialized",
  "luxury-yacht-cleaning": "specialized",
  "child-care-service": "specialized",
  "elder-care-service": "specialized",
};

const TAX_BUCKET_LABEL: Record<TaxBucket, TranslationKey> = {
  residential: "taxBucketResidential",
  commercial: "taxBucketCommercial",
  specialized: "taxBucketSpecialized",
};

/** Dictionary keys, so the wording follows the visitor's language. */
type TaxStatusWording = Record<TaxBucket, TranslationKey>;

const EU_TAX_WORDING: TaxStatusWording = {
  residential: "taxVatIncludedTtc",
  commercial: "taxVatExcludedHt",
  specialized: "taxVatIncludedTtc",
};
const UK_TAX_WORDING: TaxStatusWording = {
  residential: "taxTaxIncluded",
  commercial: "taxExclVat",
  specialized: "taxTaxIncluded",
};
const CH_TAX_WORDING: TaxStatusWording = {
  residential: "taxInclVat",
  commercial: "taxExclVat",
  specialized: "taxInclVat",
};
const US_TAX_WORDING: TaxStatusWording = {
  residential: "taxPlusTax",
  commercial: "taxPlusTax",
  specialized: "taxPlusTax",
};
const CA_TAX_WORDING: TaxStatusWording = {
  residential: "taxTaxIncluded",
  commercial: "taxExclTax",
  specialized: "taxTaxIncluded",
};
const GST_TAX_WORDING: TaxStatusWording = {
  residential: "taxInclGst",
  commercial: "taxExclGst",
  specialized: "taxInclGst",
};
const GCC_TAX_WORDING: TaxStatusWording = {
  residential: "taxInclVat",
  commercial: "taxExclVat",
  specialized: "taxInclVat",
};
const LK_TAX_WORDING: TaxStatusWording = {
  residential: "taxInclVat",
  commercial: "taxExclVat",
  specialized: "taxInclVat",
};

/** Per-country tax-status wording for the web display spec — covers all 28 supported countries (see backend's countries.constant.ts). */
const COUNTRY_TAX_WORDING: Record<string, TaxStatusWording> = {
  fr: EU_TAX_WORDING, de: EU_TAX_WORDING, lu: EU_TAX_WORDING, nl: EU_TAX_WORDING,
  fi: EU_TAX_WORDING, se: EU_TAX_WORDING, it: EU_TAX_WORDING, pl: EU_TAX_WORDING,
  be: EU_TAX_WORDING, at: EU_TAX_WORDING, dk: EU_TAX_WORDING, es: EU_TAX_WORDING,
  pt: EU_TAX_WORDING, ro: EU_TAX_WORDING, ie: EU_TAX_WORDING, mc: EU_TAX_WORDING,
  ch: CH_TAX_WORDING,
  gb: UK_TAX_WORDING,
  us: US_TAX_WORDING,
  ca: CA_TAX_WORDING,
  au: GST_TAX_WORDING,
  nz: GST_TAX_WORDING,
  qa: GCC_TAX_WORDING, sa: GCC_TAX_WORDING, ae: GCC_TAX_WORDING,
  om: GCC_TAX_WORDING, bh: GCC_TAX_WORDING,
  lk: LK_TAX_WORDING,
};

/** e.g. "(Residential - VAT Included [TTC])" for regular-home-cleaning in France. */
function getTaxStatusLabel(
  serviceName: string,
  country: string | null,
  translate: (key: TranslationKey) => string,
): string | null {
  const bucket = SERVICE_TAX_BUCKET[serviceName];
  const wording = country ? COUNTRY_TAX_WORDING[country] : undefined;
  if (!bucket || !wording) return null;
  return `(${translate(TAX_BUCKET_LABEL[bucket])} - ${translate(wording[bucket])})`;
}

function ServiceCard({ service }: { service: HomeService }) {
  const { translate } = useLanguage();
  const { symbol } = useCurrency();
  const { country } = useCountry();
  const serviceTranslation = SERVICE_TRANSLATIONS[service.name];
  const label = serviceTranslation ? translate(serviceTranslation.label) : service.label;
  const description = serviceTranslation ? translate(serviceTranslation.description) : service.description;

  const isDedicatedFlow =
    service.name === "child-care-service" ||
    service.name === "elder-care-service" ||
    service.name === "carpet-upholstery-cleaning" ||
    service.name === "pool-cleaning" ||
    service.name === "precision-pressure-washing";

  const showBookable= 
    service.name === "child-care-service" ||
    service.name === "elder-care-service" 

  /**
   * Carpet/pool/pressure-washing are quote-only (no configured hourly rate),
   * and laundry/move-in-out transport aren't priced per cleaner-hour — so
   * the rate line never applies to them. Child/elder care are booked
   * on-flow like the rest (isDedicatedFlow) but do have a real hourly rate,
   * so they still show it.
   */
  const hidesHourlyRate =
    service.name === "carpet-upholstery-cleaning" ||
    service.name === "pool-cleaning" ||
    service.name === "precision-pressure-washing" ||
    service.name === "laundry-service" ||
    service.name === "move-in-out-transport-service";

  const taxStatusLabel = getTaxStatusLabel(service.name, country, translate);

  const isCareService = service.name === "child-care-service" || service.name === "elder-care-service";
  const pricePerUnitKey = isCareService ? "servicesPricePerProfessional" : "servicesPricePerCleaner";

  return (
<div className="relative w-full max-w-2xl  rounded-[1rem] bg-brand-navy  text-white shadow-2xl">
  {/* Inner Double Border Frame */}
  <div className="flex h-full flex-col overflow-hidden rounded-[1rem] border border-brand-gold p-2 pb-2 ring-1 ring-brand-gold/30">
    
    {/* Top Image Section with Corner Leaf Accents */}
    <div className="relative -top-2 -left-2 -right-1 h-45 w-[calc(110%-0.1rem)]  overflow-hidden rounded-b-[75px] md:rounded-b-[80px]">
      {service.imageUrl ? (
        <Image
          src={service.imageUrl}
          alt={label}
          fill
          sizes="(max-width: 640px) 110vw, (max-width: 1024px) 60vw, 35vw"
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full bg-transparent" />
      )}

      
      {/* Top Left Leaf Decor Overlay */}
      {/* A CSS background, not an <img> — purely decorative, so it shouldn't count as an image without alt text. */}
      <div className="pointer-events-none rounded-t-[1rem] absolute -left-3.5 md:-left-4 top-5 md:top-4 rotate-y-[45deg] h-48 w-20 md:h-54 md:w-25 bg-[url(/images/decor/leaf-left.svg)] bg-size-[80px_185px] bg-left-top bg-no-repeat" />

      {/* Top Right Leaf Decor Overlay */}
      <div className="pointer-events-none rounded-t-[1rem] absolute rotate-y-[45deg] -right-1 md:-right-6 top-5 md:top-4 h-48 w-20 md:h-54 md:w-25 bg-[url(/images/decor/leaf-right.svg)] bg-size-[80px_185px] bg-left-top bg-no-repeat" />
    </div>

      
    {/* Content Body */}
    <div className="flex flex-1 flex-col justify-between pt-5 text-center">
      {/* Title */}
      <h4 className="text-xl md:text-base font-bold tracking-wide text-white">
        {label}
      </h4>

      {/* Description */}
      {description && (
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-300">
          {description}
        </p>
      )}

      {/* Pricing Pill Container */}
      {!hidesHourlyRate && (
        <div className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-[#1e293b]/70 px-4 py-3 border border-slate-700/50">
          {/* Clock / Service Icon */}
          <div className="flex shrink-0 items-center justify-center text-slate-300">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
              <path strokeLinecap="round" strokeWidth="1.5" d="M12 7v5l3 3" />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-base font-medium text-white">
              {service.price ? (
                <>
                  {translate("servicesHourlyRateLabel")}{" "}
                  <span className="font-bold">{symbol}{Number(service.price).toFixed(2)}</span>{" "}
                  <span className="text-sm font-normal">{translate(pricePerUnitKey)}</span>
                </>
              ) : (
                translate("servicesRequestQuotation")
              )}
            </p>
            {service.price && taxStatusLabel && (
              <p className="text-xs text-slate-400">({taxStatusLabel})</p>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex w-full flex-col gap-3">
        {service.name === "child-care-service" || service.name === "elder-care-service" ? (
          <div className="relative">
            <Link
              href={`/services/${service.slug}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-lg transition-transform hover:scale-[1.01]"
            >
              {translate("servicesBookNow")}
              <span className="sr-only"> – {label}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            {/* Bottom Right Golden Leaf Icon Badge */}
              <div className="pointer-events-none absolute -bottom-3.5 md:-bottom-1.5 -right-2 flex h-17 w-17 md:h-14 md:w-14 items-center justify-center rounded-full  bg-slate-900 text-brand-gold">
                <svg className="h-12 w-12 md:h-10 md:w-10 border border-brand-gold rounded-full md:p-1 p-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,8C8,10 5,16 5,22C11.5,22 17,17 17,8Z" />
                </svg>
              </div>
          </div>
        ) : isDedicatedFlow ? (
          <Link
            href={`/services/${service.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-gold/80 bg-transparent py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-gold/10"
          >
            <Key className="h-4 w-4 text-brand-gold" />
            {translate("servicesGetFreeQuote")}
            <span className="sr-only"> – {label}</span>
          </Link>
        ) : service.isBookable ? (
          <>
            <Link
              href={`/services/${service.slug}/request-quotation`}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-gold/80 bg-transparent py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-gold/10"
            >
              <Key className="h-4 w-4 text-brand-gold" />
              {translate("servicesGetFreeQuote")}
              <span className="sr-only"> – {label}</span>
            </Link>

            <div className="relative">
              <Link
                href={`/services/${service.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold py-3.5 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-md transition-transform hover:scale-[1.01]"
              >
                {translate("servicesBookNow")}
                <span className="sr-only"> – {label}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              {/* Bottom Right Golden Leaf Icon Badge */}
              <div className="pointer-events-none absolute -bottom-3.5 md:-bottom-1.5 -right-2 flex h-17 w-17 md:h-14 md:w-14 items-center justify-center rounded-full  bg-slate-900 text-brand-gold">
                <svg className="h-12 w-12 md:h-10 md:w-10 border border-brand-gold rounded-full md:p-1 p-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,8C8,10 5,16 5,22C11.5,22 17,17 17,8Z" />
                </svg>
              </div>
            </div>
          </>
        ) : service.isQuotable ? (
          <Link
            href={`/services/${service.slug}/request-quotation`}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-gold/80 bg-transparent py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-gold/10"
          >
            <Key className="h-4 w-4 text-brand-gold" />
            {translate("servicesGetFreeQuote")}
            <span className="sr-only"> – {label}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="block w-full rounded-xl border border-slate-700 bg-slate-800/40 py-3 text-center text-xs font-medium text-slate-400">
            {translate("servicesComingSoon")}
          </span>
        )}
      </div>
    </div>
  </div>
</div>
  );
}

function CategoryGrid({ services, limit }: { services: HomeService[]; limit?: number }) {
  const { translate } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const canCollapse = limit !== undefined && services.length > limit;
  const visible = canCollapse && !expanded ? services.slice(0, limit) : services;

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      {canCollapse && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-lg border border-brand-gold px-5 py-2 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold/10"
          >
            {translate(expanded ? "servicesSeeLess" : "servicesSeeMore")}
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      )}
    </>
  );
}

export function ServicesSection({ services }: { services: HomeService[] }) {
  const { translate } = useLanguage();
  const active = services.filter((service) => service.status === "active");

  return (
    <section id="services" className="scroll-mt-16 bg-brand-navy py-16 text-brand-navy-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="md:text-4xl font-bold tracking-tight text-3xl">
            {translate("servicesHeading")}
          </h2>
          
        </div>

        {CATEGORIES.map(({ key, headingKey,subHeader, limit }) => {
          const categoryServices = active.filter((service) => service.category === key);
          if (categoryServices.length === 0) return null;

          return (
            <div key={key} className="mt-12 first:mt-0">
              <h3 className="letter-spacing-tight mb-1 text-center text-2xl break-words font-bold tracking-wider text-brand-navy-foreground md:text-3xl">
                {translate(headingKey)}
              </h3>
              <p className="mb-6 mt-2 text-center mx-0 font-poppins font-normal text-base leading-normal text-[rgba(255,253,244,0.75)]">
                {translate(subHeader)}
              </p>
              <CategoryGrid services={categoryServices} limit={limit} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
