import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/catalog-api";

export const dynamic = "force-dynamic";

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

export default async function ServicesPage() {
  const services = await getServices();
  const active = services.filter((service) => service.status === "active");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Our services</h1>
        <p className="text-muted-foreground">
          {active.length} cleaning services available for booking.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {active.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {service.price ? service.price : "Pricing coming soon"}
              </p>
              {BOOKABLE_SERVICES.has(service.name) ? (
                <Button size="sm" asChild>
                  <Link href={`/services/${service.name}`}>Book now</Link>
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">Coming soon</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Link href="/" className="text-sm underline underline-offset-2">
        Back home
      </Link>
    </div>
  );
}
