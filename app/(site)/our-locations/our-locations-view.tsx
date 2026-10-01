"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { PageHero } from "@/components/locations/locations-hero";
import { Input } from "@/components/ui/input";
import { LocationCard } from "@/components/locations/locations-grids";
import { useLanguage } from "@/lib/i18n/language-context";
import { locations, type Location } from "@/lib/content/locations";
import { Socialmedialinks } from "@/components/contactus/social-media";
import Link from "@/components/locale-link";

const REGIONS: { key: Location["region"]; titleKey: "locationsEurope" | "locationsAsiaPacific" | "locationsAmericas" }[] = [
  { key: "europe", titleKey: "locationsEurope" },
  { key: "asia-pacific", titleKey: "locationsAsiaPacific" },
  { key: "americas", titleKey: "locationsAmericas" },
];

export function OurLocationsView() {
  const { translate } = useLanguage();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [countrySearchOpen, setCountrySearchOpen] = useState(false);
  const [openLocationId, setOpenLocationId] = useState<string | null>(null);

  const countrySuggestions = useMemo(() => {
    const query = country.trim().toLowerCase();
    return locations
      .filter((location) => !query || location.name.toLowerCase().includes(query))
      .slice(0, 8);
  }, [country]);

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
  const isSearching = Boolean(country.trim() || city.trim());

  const handleToggle = (id: string) => {
    // Toggling the current open card closes it, clicking another opens it
    setOpenLocationId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="flex-1 w-full bg-[#021642]">
      <PageHero
        image="/images/locations/hero.webp"
        title={translate("locationsPageTitle")}
        subtitle={translate("locationsPageSubtitle")}
      />
      <div className="absolute md:bottom-none  bottom-40 z-5 right-3 md:right-none">
        <Socialmedialinks />
      </div>
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl px-4  sm:px-6">
          
        <div className="flex flex-col bg-transparent md:mb-0 mb-15 md:bg-[rgba(28,48,82,0.4)] md:backdrop-blur-sm rounded-2xl border-0 md:border-2 md:border-[rgb(169,139,75)] shadow-lg p-4 gap-4">
          <div className="text-white  text-center">
            <h1 className="text-2xl my-3 font-bold md:text-3xl">
              {translate("locationSearchHeaderText")}
            </h1>
            <p className="font-bold my-2 text-shadow-[#727272]">
              {translate("locationSearchSubHeaderText")}
            </p>
          </div>
          <div className="flex flex-col gap-3 bg-[rgb(11,27,52)] md:bg-transparent text-gray-300 rounded-2xl border border-gray-600  p-4 shadow-lg sm:flex-row">
            <div className="relative flex-1">
            <Search className="pointer-events-none text-white absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 " />
            <Input
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
                setCountrySearchOpen(true);
              }}
              onFocus={() => setCountrySearchOpen(true)}
              onBlur={() => setCountrySearchOpen(false)}
              autoComplete="off"
              placeholder={translate("locationsSearchCountryPlaceholder")}
              className="pl-8"
            />
            <div
              className={`absolute top-full right-0 left-0 z-20 mt-2 hidden overflow-hidden rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl md:block ${
                countrySearchOpen ? "visible opacity-100" : "invisible opacity-0"
              } transition-opacity`}
            >
              {countrySuggestions.length > 0 ? (
                countrySuggestions.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setCountry(location.name);
                      setCountrySearchOpen(false);
                    }}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {location.name}
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-muted-foreground">No countries found</p>
              )}
            </div>
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
          
        </div>
      </section>

      <div className="flex w-full  flex-col gap-6 px-4 pt-5 sm:px-6 md:mx-auto">
        <Link href="/" title="Back to home" className="mb-3  inline-flex items-center gap-1 text-sm text-brand-gold-dark hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {translate("commonBack")}
        </Link>
      </div>
            
      <section className=" w-full  px-4 py-8 sm:px-6">
        {!hasResults && (
          <p className="text-center text-muted-foreground">{translate("locationsNoResults")}</p>
        )}

        {hasResults &&
          REGIONS.map(({ key, titleKey }) => {
            const items = filtered.filter((loc) => loc.region === key);
            if (items.length === 0) return null;
            const marqueeDuration = `${Math.max(items.length * 8, 80)}s`;
            return (
              <div key={key} className="mb-12">
                <h2 className="mb-4 text-3xl text-white text-center font-bold tracking-tight">{translate(titleKey)}</h2>
                <div className="overflow-hidden">
                  <div
                    className={`flex w-max gap-4 motion-reduce:animate-none ${isSearching ? "" : "animate-marquee hover:[animation-play-state:paused]"}`}
                    style={isSearching ? undefined : { animationDuration: marqueeDuration }}
                  >
                    {(isSearching ? [0] : [0, 1]).map((copy) => (
                      <div
                        key={`${key}-${copy}`}
                        aria-hidden={copy === 1}
                        className={`flex items-start gap-4 ${copy === 1 ? "pointer-events-none" : ""}`}
                      >
                        {items.map((loc) => (
                          <div key={`${loc.id}-${copy}`} className="w-[min(82vw,22rem)] shrink-0 sm:w-[20rem] lg:w-[22rem]">
                            <LocationCard
                              location={loc}
                              isOpen={true}
                              onToggle={copy === 0 ? () => handleToggle(loc.id) : () => undefined}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </section>
    </main>
  );
}
