"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import type { CatalogService, ServiceCategory } from "@/lib/catalog-api";
import { useCurrency } from "@/lib/currency-context";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

// Mirrors the backend's PRICING_TABLES registry — these are the services
// with real, verified area-band pricing data ported so far. The rest use a
// different (non-property-size) input model that hasn't been built yet.
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

// Services priced on a per-project basis rather than an hourly rate — the
// homepage card shows "Request Quotation" instead of an "/h" price for these.
const QUOTE_ONLY_PRICING_SERVICES = new Set([
  "carpet-upholstery-cleaning",
  "pool-cleaning",
  "precision-pressure-washing",
  "laundry-services",
  "move-in-out-transport-service",
  "child-care-service",
  "elder-care-service",
]);

// Services with a "Request Quotation" flow (services/<slug>/request-quotation)
const QUOTABLE_SERVICES = new Set([
  "regular-maintenance-cleaning",
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "same-day-priority-cleaning",
  "quick-touch-up-cleaning",
  "post-construction-renovation-cleaning",
  "premium-rental-concierge-cleaning",
  "commercial-office-cleaning",
]);

// Per-project services with a customized quotation form (no hourly booking flow) —
// these get a "Request Quotation" card action instead of "Coming Soon".
const CUSTOM_QUOTE_SERVICES = new Set([
  "carpet-upholstery-cleaning",
  "pool-cleaning",
  "precision-pressure-washing",
  "child-care-service",
  "elder-care-service",
]);

const CATEGORIES: { key: ServiceCategory; headingKey: TranslationKey; limit?: number }[] = [
  { key: "property_care", headingKey: "servicesCategoryPropertyCare", limit: 4 },
  { key: "bespoke_lifestyle", headingKey: "servicesCategoryBespokeLifestyle" },
];

function ServiceCard({ service }: { service: CatalogService }) {
  const { translate } = useLanguage();
  const { symbol } = useCurrency();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-brand-gold bg-brand-navy shadow-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl">
      <div className="relative h-40 w-full shrink-0 sm:h-44">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.label}
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
          <h3 className="text-base font-bold text-brand-navy-foreground">{service.label}</h3>
          {service.description && (
            <p className="line-clamp-3 text-sm text-brand-navy-foreground/65">
              {service.description}
            </p>
          )}
          <p className="text-sm font-semibold text-brand-gold">
            {QUOTE_ONLY_PRICING_SERVICES.has(service.name)
              ? translate("servicesRequestQuotation")
              : service.price
                ? `${symbol}${service.price}${translate("servicesPricePerCleaner")}`
                : translate("servicesPricingSoon")}
          </p>
        </div>

        {BOOKABLE_SERVICES.has(service.name) ? (
          <div className="mt-2 flex w-full flex-col gap-2">
            <Link
              href={`/services/${service.name}`}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gold px-4 py-2 text-xs font-semibold text-brand-navy transition-colors hover:bg-brand-gold/90"
            >
              {translate("servicesBookNow")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {QUOTABLE_SERVICES.has(service.name) && (
              <Link
                href={`/services/${service.name}/request-quotation`}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand-gold px-4 py-2 text-xs font-semibold text-brand-gold transition-colors hover:bg-brand-gold/10"
              >
                {translate("servicesRequestQuotation")}
              </Link>
            )}
          </div>
        ) : CUSTOM_QUOTE_SERVICES.has(service.name) ? (
          <Link
            href={`/services/${service.name}/request-quotation`}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gold px-4 py-2 text-xs font-semibold text-brand-navy transition-colors hover:bg-brand-gold/90"
          >
            {translate("servicesRequestQuotation")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="mt-2 block w-full rounded-lg border border-brand-navy-foreground/20 px-4 py-2 text-xs font-medium text-brand-navy-foreground/50">
            {translate("servicesComingSoon")}
          </span>
        )}
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
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {translate("servicesHeading")}
          </h2>
        </div>

        {CATEGORIES.map(({ key, headingKey, limit }) => {
          const categoryServices = active.filter((service) => service.category === key);
          if (categoryServices.length === 0) return null;

          return (
            <div key={key} className="mt-12 first:mt-0">
              <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-brand-navy-foreground sm:text-2xl">
                {translate(headingKey)}
              </h3>
              <CategoryGrid services={categoryServices} limit={limit} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
