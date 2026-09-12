"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import type { CatalogService, ServiceCategory } from "@/lib/catalog-api";
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
  "premium-rental-concierge-cleaning": { label: "serviceEndOfTenancyCleaning", description: "serviceEndOfTenancyCleaningDescription" },
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

const TAX_BUCKET_LABEL: Record<TaxBucket, string> = {
  residential: "Residential",
  commercial: "Commercial",
  specialized: "Specialized",
};

type TaxStatusWording = Record<TaxBucket, string>;

const EU_TAX_WORDING: TaxStatusWording = {
  residential: "VAT Included [TTC]",
  commercial: "VAT Excluded [HT]",
  specialized: "VAT Included [TTC]",
};
const UK_TAX_WORDING: TaxStatusWording = {
  residential: "Tax Included",
  commercial: "Excl. VAT",
  specialized: "Tax Included",
};
const CH_TAX_WORDING: TaxStatusWording = {
  residential: "Incl. VAT",
  commercial: "Excl. VAT",
  specialized: "Incl. VAT",
};
const US_TAX_WORDING: TaxStatusWording = {
  residential: "Plus Tax",
  commercial: "Plus Tax",
  specialized: "Plus Tax",
};
const CA_TAX_WORDING: TaxStatusWording = {
  residential: "Tax Included",
  commercial: "Excl. Tax",
  specialized: "Tax Included",
};
const GST_TAX_WORDING: TaxStatusWording = {
  residential: "Incl. GST",
  commercial: "Excl. GST",
  specialized: "Incl. GST",
};
const GCC_TAX_WORDING: TaxStatusWording = {
  residential: "Incl. VAT",
  commercial: "Excl. VAT",
  specialized: "Incl. VAT",
};
const LK_TAX_WORDING: TaxStatusWording = {
  residential: "Incl. VAT",
  commercial: "Excl. VAT",
  specialized: "Incl. VAT",
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
function getTaxStatusLabel(serviceName: string, country: string | null): string | null {
  const bucket = SERVICE_TAX_BUCKET[serviceName];
  const wording = country ? COUNTRY_TAX_WORDING[country] : undefined;
  if (!bucket || !wording) return null;
  return `(${TAX_BUCKET_LABEL[bucket]} - ${wording[bucket]})`;
}

function ServiceCard({ service }: { service: CatalogService }) {
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

  const taxStatusLabel = getTaxStatusLabel(service.name, country);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-brand-gold bg-brand-navy shadow-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl">
      <div className="relative h-40 w-full shrink-0 sm:h-44">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-brand-navy-foreground/10" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3 text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-1">
          <h3 className="text-base font-bold text-brand-navy-foreground">
            {label}
          </h3>
          {description && (
            <p className="line-clamp-3 text-sm text-brand-navy-foreground/65">
              {description}
            </p>
          )}
          {!hidesHourlyRate && (
            <>
              <p className="text-sm font-semibold text-brand-gold">
                {service.price
                  ? `Rate: ${symbol}${service.price}${translate("servicesPricePerCleaner")}`
                  : translate("servicesRequestQuotation")}
              </p>
              {service.price && taxStatusLabel && (
                <p className="text-xs text-brand-navy-foreground/60">{taxStatusLabel}</p>
              )}
            </>
          )}
        </div>

        <div className="mt-2 flex w-full flex-col gap-2">
          {
          service.name === "child-care-service" ||
          service.name === "elder-care-service" ?
          (
            <Link
                href={`/services/${service.slug}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-navy transition-colors hover:bg-brand-gold/90"
              >
                {translate("servicesBookNow")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
          ):isDedicatedFlow ? (
            <Link
              href={`/services/${service.name}`}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand-gold bg-brand-navy px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-navy"
            >
              {translate("servicesRequestQuotation")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )  : service.isBookable  ? (
            <>
              <Link
                href={`/services/${service.slug}/request-quotation`}
                className="flex w-full items-center justify-center rounded-lg border border-brand-gold bg-brand-navy px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-navy"
              >
                {translate("servicesRequestQuotation")}
              </Link>
              <Link
                href={`/services/${service.slug}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-navy transition-colors hover:bg-brand-gold/90"
              >
                {translate("servicesBookNow")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </>
          ) : service.isQuotable ? (
            <Link
              href={`/services/${service.name}/request-quotation`}
              className="flex w-full items-center justify-center rounded-lg border border-brand-gold bg-brand-navy px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-navy"
            >
              {translate("servicesRequestQuotation")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span className="block w-full rounded-lg border border-brand-navy-foreground/20 px-4 py-2.5 text-xs font-medium text-brand-navy-foreground/50">
              {translate("servicesComingSoon")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryGrid({ services, limit }: { services: CatalogService[]; limit?: number }) {
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

export function ServicesSection({ services }: { services: CatalogService[] }) {
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
              <h3 className="letter-spacing-tight mb-1 text-center text-2xl font-bold tracking-wider text-brand-navy-foreground md:text-3xl">
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
