"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CatalogService } from "@/lib/catalog-api";
import { useLanguage } from "@/lib/i18n/language-context";

// Mirrors the backend's PRICING_TABLES registry — these are the services
// with real, verified area-band pricing data ported so far. The rest use a
// different (non-property-size) input model that hasn't been built yet.
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

export function ServicesSection({ services }: { services: CatalogService[] }) {
  const { translate } = useLanguage();
  const active = services.filter((service) => service.status === "active");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {translate("servicesHeading")}
        </h2>
        <p className="mt-2 text-muted-foreground">{translate("servicesSubheading")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {active.map((service) => (
          <Card key={service.id} className="border-border/80 transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-brand-gold-dark" />
              <CardTitle className="text-base leading-snug">{service.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {service.price ? service.price : translate("servicesPricingSoon")}
              </p>
              {BOOKABLE_SERVICES.has(service.name) ? (
                <Button size="sm" asChild>
                  <Link href={`/book/${service.id}`}>{translate("servicesBookNow")}</Link>
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {translate("servicesComingSoon")}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline">
          <Link href="/services">{translate("servicesViewAll")}</Link>
        </Button>
      </div>
    </section>
  );
}
