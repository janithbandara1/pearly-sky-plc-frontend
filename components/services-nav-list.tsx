"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getServices } from "@/lib/catalog-api";
import type { CatalogService } from "@/lib/catalog-api";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";

// Mirrors the backend's PRICING_TABLES registry — kept in sync with
// components/home/services-section.tsx and app/services/page.tsx.
const BOOKABLE_SERVICES = new Set([
  "standard-residential-cleaning",
  "express-refresh-cleaning",
  "last-minute-cleaning",
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "post-construction-renovation-cleaning",
  "premium-rental-concierge-cleaning",
  "commercial-office-cleaning",
  "healthguard-sanitization",
  "steam-cleaning",
  "post-event-cleaning",
]);

export function useCatalogServices() {
  const { country } = useCountry();
  const [services, setServices] = useState<CatalogService[]>([]);

  useEffect(() => {
    getServices(country)
      .then((data) => setServices(data.filter((s) => s.status === "active")))
      .catch(() => setServices([]));
  }, [country]);

  return services;
}

export function ServicesNavList({
  onNavigate,
  className = "w-[320px] sm:w-[420px] sm:grid-cols-2",
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const { translate } = useLanguage();
  const services = useCatalogServices();

  return (
    <ul className={`grid max-h-[60vh] min-w-0 gap-1 overflow-y-auto p-1 ${className}`}>
      {services.map((service) => (
        <li key={service.id} className="min-w-0">
          <Link
            href={
              BOOKABLE_SERVICES.has(service.name)
                ? `/services/${service.name}`
                : "/services"
            }
            onClick={onNavigate}
            className="flex min-w-0 items-start gap-2 rounded-lg p-2 text-sm hover:bg-muted"
          >
            <span className="flex min-w-0 flex-col">
              <span className="font-medium leading-snug break-words">{service.label}</span>
              <span className="text-xs text-muted-foreground">
                {BOOKABLE_SERVICES.has(service.name)
                  ? translate("navServicesBookNow")
                  : translate("navServicesComingSoon")}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
