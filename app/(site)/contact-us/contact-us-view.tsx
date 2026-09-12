"use client";

import { useState } from "react";
import { PageHero } from "@/components/hero-components/hero-with-social-links";
import { ContactSection } from "@/components/home/contact-section";
import { LocationCard } from "@/components/location-card";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryPageContent } from "@/lib/countries/page-content";
import { locations, officeLocations } from "@/lib/content/locations";
import { Socialmedialinks } from "@/components/contactus/social-media";
import Link from "next/link";

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

  const filteredCountries=locations.filter((loc) => loc.country && loc.country.toLowerCase() === "scotland");

  return (
    <main className="flex-1 w-full relative">

      <PageHero
        image="/images/locations/contact-hero.webp"
        title={translate("contactPageTitle")}
        subtitle={contactSubtitle}
        eyebrow={translate("aboutPageEyebrow")}
        height={50}
      /> 
      <div className="absolute md:bottom-none  top-40 z-5 right-3 md:right-none">
        <Socialmedialinks />
      </div>
      
      
      <ContactSection />
      

      <section className="bg-[#dadada] py-2">
        <h2 className="mx-auto mb-8 w-full max-w-6xl px-4 text-center text-2xl font-bold tracking-tight sm:px-6 sm:text-3xl">
          {translate("contactOfficesTitle")}
        </h2>
        <div className="grid w-full ] items-start gap-4 px-4 sm:px-6 grid-cols-1 md:grid-cols-2">
          {locations.filter((loc)=>loc.name !=="Scotland").map((loc)=>{
            const isLocked = loc.hasOfficeDetail ? openLocationId === loc.id : false
            return <LocationCard
              key={loc.id}
              location={loc}
              isOpen={isLocked}
              onToggle={() => handleToggle(loc.id)}
            />
          })}
        </div>
      </section>
    </main>
  );
}

/* <LocationCard
              key={loc.id}
              location={loc}
              isOpen={openLocationId === loc.id}
              onToggle={() => handleToggle(loc.id)}
            /> */