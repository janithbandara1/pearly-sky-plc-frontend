"use client";

import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { MomentsOfExcellence } from "@/components/home/moments-of-excellence";
import { Testimonials } from "@/components/home/testimonials";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryPageContent } from "@/lib/countries/page-content";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const CLIENTELE: TranslationKey[] = [
  "customersClientele1",
  "customersClientele2",
  "customersClientele3",
  "customersClientele4",
  "customersClientele5",
];

export function OurCustomersView() {
  const { translate, language } = useLanguage();
  const { country } = useCountry();
  const { customersSubtitle } = getCountryPageContent(country, language);

  return (
    <main className="flex-1">
      <PageHero
        image="/images/customers/hero.webp"
        title={translate("customersPageTitle")}
        subtitle={customersSubtitle}
      />

      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight">{translate("customersClienteleTitle")}</h2>
          <ul className="mt-4 space-y-3">
            {CLIENTELE.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" />
                <span className="text-muted-foreground">{translate(item)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{translate("customersClosingParagraph")}</p>
        </div>
      </section>

      <MomentsOfExcellence titleKey="customersGalleryTitle" />

      <Testimonials titleKey="customersTestimonialsTitle" />
    </main>
  );
}
