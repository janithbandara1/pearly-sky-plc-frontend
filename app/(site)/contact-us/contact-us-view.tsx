"use client";

import { useState } from "react";
import { PageHero } from "@/components/contactus/contact-us-page-hero";
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
  
  const [openLocationId, setOpenLocationId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    // Toggling the current open card closes it, clicking another opens it
    setOpenLocationId((prev) => (prev === id ? null : id));
  };

  // Split into 2 columns for wider screens
  const midIndex = Math.ceil(officeLocations.length / 2);
  const leftColumn = officeLocations.slice(0, midIndex);
  const rightColumn = officeLocations.slice(midIndex);

  return (
    <main className="flex-1">
      <PageHero
        image="/images/locations/contact-hero.webp"
        title={translate("contactPageTitle")}
        subtitle={contactSubtitle}
      />
      

      <ContactSection />

      <section className="bg-[#dadada] py-2">
        <h2 className="mx-auto mb-8 w-full max-w-6xl px-4 text-center text-2xl font-bold tracking-tight sm:px-6 sm:text-3xl">
          {translate("contactOfficesTitle")}
        </h2>
        <div className="grid w-full ] items-start gap-4 px-4 sm:px-6 grid-cols-1 md:grid-cols-2">
          {officeLocations.map((loc) => (
            <LocationCard
              
              key={loc.id}
              location={loc}
            isOpen={openLocationId === loc.id}
            onToggle={() => handleToggle(loc.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
