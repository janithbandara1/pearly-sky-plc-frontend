"use client";

import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { MomentsOfExcellence } from "@/components/home/moments-of-excellence";
import { Testimonials } from "@/components/home/testimonials";
import { useLanguage } from "@/lib/i18n/language-context";

const CLIENTELE = [
  "Ultra-high-net-worth families and private estates",
  "Luxury yacht owners and maritime concierge services",
  "Premium property managers and real-estate groups",
  "Diplomatic residences and security-sensitive organizations",
  "Five-star hospitality and event venues",
];

export default function CustomersPage() {
  const { translate } = useLanguage();

  return (
    <main className="flex-1">
      <PageHero
        image="/images/customers/hero.webp"
        title={translate("customersPageTitle")}
        subtitle={translate("customersPageSubtitle")}
      />

      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight">{translate("customersClienteleTitle")}</h2>
          <ul className="mt-4 space-y-3">
            {CLIENTELE.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Every client receives a bespoke care plan, crafted around their lifestyle, schedule, and privacy
            requirements. Our reputation is built on trust, consistency, and an unwavering commitment to eco-luxury
            standards.
          </p>
        </div>
      </section>

      <MomentsOfExcellence titleKey="customersGalleryTitle" />

      <Testimonials titleKey="customersTestimonialsTitle" />
    </main>
  );
}
