"use client";

import { useEffect, useState } from "react";
import Link from "@/components/locale-link";
import { getServices } from "@/lib/catalog-api";
import type { CatalogService } from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { buildLocalePath } from "@/lib/locale";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { hasServicePage } from "@/lib/service-flows";

export function useCatalogServices() {
  const { country } = useCountry();
  const { language } = useLanguage();
  const [services, setServices] = useState<CatalogService[]>([]);

  useEffect(() => {
    getServices(country, language)
      .then((data) => setServices(data.filter((s) => s.status === "active")))
      .catch(() => setServices([]));
  }, [country, language]);

  return services;
}

const serviceTranslationKeyMap: Record<string, TranslationKey> = {
  // By service name (slug) - primary lookup for resilience
  "regular-home-cleaning": "serviceLableRegularHomeCleaning",
  "essential-touch-up-cleaning": "serviceLableEssentialTouchUpCleaning",
  "quick-touch-up-cleaning": "serviceLableEssentialTouchUpCleaning",
  "deep-cleaning": "serviceLableDeepCleaning",
  "end-of-tenancy-cleaning": "serviceLableEndOfTenancyCleaning",
  "post-construction-renovation-cleaning": "serviceLablePostConstructionRenovationCleaning",
  "same-day-priority-cleaning": "serviceLableSameDayPriorityCleaning",
  "high-security-property-care": "serviceLableHighSecurityPropertyCare",
  "premium-rental-concierge-cleaning": "serviceLablePremiumRentalConciergeCleaning",
  "laundry-service": "serviceLableLaundryService",
  "carpet-upholstery-cleaning": "serviceLableCarpetUpholsteryCleaning",
  "pool-cleaning": "serviceLablePoolCleaning",
  "precision-pressure-washing": "serviceLablePrecisionPressureWashing",
  "commercial-office-cleaning": "serviceLableCommercialOfficeCleaning",
  "steam-cleaning": "serviceLableSteamCleaning",
  "post-event-cleaning": "serviceLablePostEventCleaning",
  "luxury-yacht-cleaning": "serviceLableLuxuryYachtCleaning",
  "child-care-service": "serviceLableChildCareService",
  "elder-care-service": "serviceLableElderCareService",
  "move-in-move-out-transport-service": "serviceLableMoveInMoveOutTransportService",
  "healthguard-sanitization": "serviceLableHealthGuardSanitization",

  // By service label - secondary fallback lookup
  "Regular Home Cleaning": "serviceLableRegularHomeCleaning",
  "Essential Touch-Up Cleaning": "serviceLableEssentialTouchUpCleaning",
  "Quick Touch-Up Cleaning": "serviceLableEssentialTouchUpCleaning",
  "Deep Cleaning": "serviceLableDeepCleaning",
  "End of Tenancy Cleaning": "serviceLableEndOfTenancyCleaning",
  "Post-Construction & Renovation Cleaning": "serviceLablePostConstructionRenovationCleaning",
  "Same-Day Priority Cleaning": "serviceLableSameDayPriorityCleaning",
  "High Security Property Care": "serviceLableHighSecurityPropertyCare",
  "Premium Rental Concierge Cleaning": "serviceLablePremiumRentalConciergeCleaning",
  "Laundry Service": "serviceLableLaundryService",
  "Carpet & Upholstery Cleaning": "serviceLableCarpetUpholsteryCleaning",
  "Pool Cleaning": "serviceLablePoolCleaning",
  "Precision Pressure Washing": "serviceLablePrecisionPressureWashing",
  "Commercial & Office Cleaning": "serviceLableCommercialOfficeCleaning",
  "Steam Cleaning": "serviceLableSteamCleaning",
  "Post-Event Cleaning": "serviceLablePostEventCleaning",
  "Luxury Yacht Cleaning": "serviceLableLuxuryYachtCleaning",
  "Child Care Service": "serviceLableChildCareService",
  "Elder Care Service": "serviceLableElderCareService",
  "Move-In / Move-Out Transport Service": "serviceLableMoveInMoveOutTransportService",
  "HealthGuard-Sanitization": "serviceLableHealthGuardSanitization",
  "HealthGuard Sanitization": "serviceLableHealthGuardSanitization",
};

export function ServicesNavList({
  onNavigate,
  className = "w-[320px] sm:w-[420px] sm:grid-cols-2",
  scrollable = true,
}: {
  onNavigate?: () => void;
  className?: string;
  /** Set to false when the list already sits inside another scrollable container (e.g. the mobile menu). */
  scrollable?: boolean;
}) {
  const services = useCatalogServices();
  const { translate, language } = useLanguage();

  return (
    <ul
      className={`grid min-w-0 gap-1 p-1 ${scrollable ? "max-h-[60vh] overflow-y-auto" : ""} ${className}`}
    >
      {services.map((service) => {
        const rawHref = hasServicePage(service)
          ? `/services/${service.slug}`
          : service.isQuotable
            ? `/services/${service.slug}/request-quotation`
            : null;
        const href = rawHref ? buildLocalePath(rawHref, language) : null;

        const translationKey =
          serviceTranslationKeyMap[service.name] ||
          serviceTranslationKeyMap[service.label];

        const labelText = translationKey
          ? translate(translationKey)
          : service.label;

        return (
          <li key={service.id} className="min-w-0">
            {href ? (
              <Link
                href={href}
                onClick={onNavigate}
                className="flex min-w-0 items-start gap-2 rounded-lg p-2 text-sm hover:bg-muted"
              >
                <span className="min-w-0 break-words font-medium leading-snug">{labelText}</span>
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="flex min-w-0 cursor-not-allowed items-start gap-2 rounded-lg p-2 text-sm text-muted-foreground/50"
              >
                <span className="min-w-0 break-words font-medium leading-snug">{labelText}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
