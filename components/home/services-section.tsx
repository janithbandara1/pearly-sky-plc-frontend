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
import QuoteModal from "./quote-model";

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
  return `(${translate(TAX_BUCKET_LABEL[bucket])}
${translate(wording[bucket])})`;
}

function ServiceCard({ service, handleOpenModal }: { service: HomeService; handleOpenModal: (serviceName?: string) => void }) {
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

  const hidesHourlyRate =
    service.name === "carpet-upholstery-cleaning" ||
    service.name === "pool-cleaning" ||
    service.name === "precision-pressure-washing" ||
    service.name === "laundry-service" ||
    service.name === "move-in-out-transport-service";

  const taxStatusLabel = getTaxStatusLabel(service.name, country, translate);

  const isCareService = service.name === "child-care-service" || service.name === "elder-care-service";
  const pricePerUnitKey = isCareService ? "servicesPricePerProfessional" : "servicesPricePerCleaner";

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Booking action triggered for: ${label}`);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-[#d4af37] hover:shadow-xl">
      <div>
        <div className="relative h-40 w-full overflow-hidden">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              alt={label}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-slate-100" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e]/70 via-transparent to-transparent" />

          {!hidesHourlyRate && service.price && (
            <span className="absolute bottom-2 left-3 rounded-full border border-[#d4af37]/30 bg-[#0b121e]/90 px-3 py-1 text-[11px] font-bold text-[#d4af37]">
              {symbol}{Number(service.price).toFixed(2)} / {translate(pricePerUnitKey).replace(/^per\s+/i, '')}
            </span>
          )}
        </div>

        <div className="p-4">
          <h4 className="font-serif text-sm font-bold text-[#0b121e] transition-colors group-hover:text-[#c9a858]">
            {label}
          </h4>
          {description && (
            <p className="mt-1 line-clamp-2 text-xs text-slate-600">
              {description}
            </p>
          )}
          {taxStatusLabel && service.price && (
            <p className="mt-1 text-[10px] text-slate-400">{taxStatusLabel}</p>
          )}
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* service.name === "child-care-service" || service.name === "elder-care-service" || service.isBookable ? */ }
          <button
            type="button"
            onClick={() => handleOpenModal(label)}
            className="w-full rounded-lg bg-[linear-gradient(135deg,#D4AF37_0%,#C5A059_50%,#A07A30_100%)] py-2 text-xs font-bold text-[#0b121e] shadow-sm transition-all hover:brightness-110"
          >
            {translate("servicesBookNow")} →
          </button>
        
          {/* <Link
            href={`/services/${service.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-2 text-xs font-bold text-[#0b121e] transition-colors hover:bg-slate-100"
          >
            {translate("servicesGetFreeQuote")}
            <ArrowRight className="h-3 w-3" />
          </Link> */}
        
          {/* <span className="block w-full rounded-lg border border-slate-200 bg-slate-100 py-2 text-center text-xs font-medium text-slate-400">
            {translate("servicesComingSoon")}
          </span> */}
        
      </div>
    </div>
  );
}

function CategoryGrid({ services, limit, handleOpenModal }: { services: HomeService[]; limit?: number; handleOpenModal: (serviceName?: string) => void }) {
  const { translate } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const canCollapse = limit !== undefined && services.length > limit;
  const visible = canCollapse && !expanded ? services.slice(0, limit) : services;

  return (
    <>
      <div id="services" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((service) => (
          <ServiceCard handleOpenModal={handleOpenModal} key={service.id} service={service} />
        ))}
      </div>
      {canCollapse && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-lg border border-[#d4af37] px-5 py-2 text-sm font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37]/10"
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleOpenModal = (serviceName?: string) => {
    setSelectedService(serviceName || '');
    setIsModalOpen(true);
  };

  return (
    <section className="scroll-mt-16 bg-[#fff] shadow-lg border-t border-slate-200 py-16 text-[#0b121e]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Complete Luxury Directory
          </p>
          <h2 className="mt-1 text-3xl font-serif font-bold tracking-tight text-[#0b121e] md:text-4xl">
            {translate("servicesHeading")}
          </h2>
        </div>

        {CATEGORIES.map(({ key, headingKey, subHeader, limit }) => {
          const categoryServices = active.filter((service) => service.category === key);
          if (categoryServices.length === 0) return null;

          return (
            <div key={key} className="mt-12 first:mt-0 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <div className="mb-8 flex flex-col justify-between border-b border-slate-200 pb-6 gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b121e] text-lg text-[#d4af37]">
                      🏠
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#0b121e]">
                      {translate(headingKey)}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 sm:ml-13">
                    {translate(subHeader)}
                  </p>
                </div>
              </div>
              <CategoryGrid handleOpenModal={handleOpenModal} services={categoryServices} limit={limit} />
            </div>
          );
        })}
      </div>

      {/* Render the Modal */}
      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName={selectedService}
      />
    </section>
  );
}
