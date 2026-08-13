"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getServices } from "@/lib/catalog-api";
import type { CatalogService } from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";

// Mirrors the backend's PRICING_TABLES registry — kept in sync with
// components/home/services-section.tsx and app/services/page.tsx.
const BOOKABLE_SERVICES = new Set([
  "regular-maintenance-cleaning",
  "quick-touch-up-cleaning",
  "same-day-priority-cleaning",
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "post-construction-renovation-cleaning",
  "premium-rental-concierge-cleaning",
  "commercial-office-cleaning",
  "healthguard-sanitization",
  "steam-cleaning",
  "post-event-cleaning",
  "high-security-property-care",
  "luxury-yacht-cleaning",
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
  scrollable = true,
}: {
  onNavigate?: () => void;
  className?: string;
  /** Set to false when the list already sits inside another scrollable container (e.g. the mobile menu). */
  scrollable?: boolean;
}) {
  const services = useCatalogServices();

  return (
    <ul
      className={`grid min-w-0 gap-1 p-1 ${scrollable ? "max-h-[60vh] overflow-y-auto" : ""} ${className}`}
    >
      {services.map((service) => (
        <li key={service.id} className="min-w-0">
          <Link
            href={
              BOOKABLE_SERVICES.has(service.name)
                ? `/services/${service.name}`
                : "/#services"
            }
            onClick={onNavigate}
            className="flex min-w-0 items-start gap-2 rounded-lg p-2 text-sm hover:bg-muted"
          >
            <span className="min-w-0 break-words font-medium leading-snug">{service.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
