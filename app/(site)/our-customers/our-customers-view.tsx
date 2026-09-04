"use client";

import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/customers/customer-hero";
import { MomentsOfExcellence } from "@/components/home/moments-of-excellence";
import { Testimonials } from "@/components/home/testimonials";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryPageContent } from "@/lib/countries/page-content";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import CustomerFeedback from "@/components/customers/customer-feedbacks";
import RandomImageGrid from "@/components/customers/Recentprojects";
import ReviewMarquee from "@/components/customers/customer-reviews";
import PaymentMarquee from "@/components/payment-method-services";

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
    <main className="flex-1 bg-[#f6f2e8]">
      <PageHero
        image="/images/customers/hero.webp"
        title={translate("customersPageTitle")}
        subtitle={customersSubtitle}
      />

      <section className="mx-auto w-full bg-[#f6f2e8] px-4 py-16 sm:px-6">
        <div className="rounded-2xl w-full border border-border bg-card p-6 sm:p-8 shadow-md">
          <h2 className="text-xl font-bold tracking-tight">{translate("customersClienteleTitle")}</h2>
          <ul className="mt-4 space-y-3">
            {CLIENTELE.map((item) => (
              <li key={item} className="flex gap-3 text-md">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" />
                <span className="text-gray-800 ">{translate(item)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{translate("customersClosingParagraph")}</p>
        </div>
      </section>

      <CustomerFeedback />

      <MomentsOfExcellence titleKey="customersGalleryTitle" />
      <RandomImageGrid />

      <ReviewMarquee />
          
       <h1 className="text-2xl font-semibold mb-6 text-blue-900 text-center mt-8 max-[541px]:text-lg text-center">
        Support Payment Methods
        </h1>    
      <PaymentMarquee />
      
    </main>
  );
}
