"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Input } from "@/components/ui/input";
import { LocationCard } from "@/components/location-card";
import { useLanguage } from "@/lib/i18n/language-context";
import { locations, type Location } from "@/lib/content/locations";

const REGIONS: { key: Location["region"]; titleKey: "locationsEurope" | "locationsAsiaPacific" | "locationsAmericas" }[] = [
  { key: "europe", titleKey: "locationsEurope" },
  { key: "asia-pacific", titleKey: "locationsAsiaPacific" },
  { key: "americas", titleKey: "locationsAmericas" },
];

export function OurLocationsView() {
  const { translate } = useLanguage();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const filtered = useMemo(() => {
    const c = country.trim().toLowerCase();
    const ci = city.trim().toLowerCase();
    return locations.filter((loc) => {
      const matchesCountry = !c || loc.name.toLowerCase().includes(c);
      const matchesCity = !ci || loc.serviceCities.some((sc) => sc.toLowerCase().includes(ci));
      return matchesCountry && matchesCity;
    });
  }, [country, city]);

  const hasResults = filtered.length > 0;

  return (
    <main className="flex-1">
      <PageHero
        image="/images/locations/hero.webp"
        title={translate("locationsPageTitle")}
        subtitle={translate("locationsPageSubtitle")}
      />

      <section className="mx-auto mt-8 w-full max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={translate("locationsSearchCountryPlaceholder")}
              className="pl-8"
            />
          </div>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={translate("locationsSearchCityPlaceholder")}
              className="pl-8"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        {!hasResults && (
          <p className="text-center text-muted-foreground">{translate("locationsNoResults")}</p>
        )}

        {hasResults &&
          REGIONS.map(({ key, titleKey }) => {
            const items = filtered.filter((loc) => loc.region === key);
            if (items.length === 0) return null;
            return (
              <div key={key} className="mb-12">
                <h2 className="mb-4 text-xl font-bold tracking-tight">{translate(titleKey)}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((loc) => (
                    <LocationCard key={loc.id} location={loc} />
                  ))}
                </div>
              </div>
            );
          })}
      </section>
    </main>
  );
}
