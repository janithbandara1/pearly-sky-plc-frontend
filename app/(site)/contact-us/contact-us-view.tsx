"use client";

import { PageHero } from "@/components/page-hero";
import { ContactSection } from "@/components/home/contact-section";
import { LocationCard } from "@/components/location-card";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryPageContent } from "@/lib/countries/page-content";
import { officeLocations } from "@/lib/content/locations";

export function ContactUsView() {
  const { translate, language } = useLanguage();
  const { country } = useCountry();
  const { contactSubtitle } = getCountryPageContent(country, language);

  return (
    <main className="flex-1">
      <PageHero
        image="/images/locations/contact-hero.webp"
        title={translate("contactPageTitle")}
        subtitle={contactSubtitle}
      />

      <ContactSection />

      <section className="bg-secondary/40 py-16">
        <h2 className="mx-auto mb-8 w-full max-w-6xl px-4 text-center text-2xl font-bold tracking-tight sm:px-6 sm:text-3xl">
          {translate("contactOfficesTitle")}
        </h2>
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 sm:px-6 sm:grid-cols-3">
          {officeLocations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </section>
    </main>
  );
}
