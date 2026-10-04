"use client"
import { useLanguage } from "@/lib/i18n/language-context";
import Link from "@/components/locale-link";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
interface ServiceLink {
  title: TranslationKey;
  /** Base (English) slug — the service's `name`. */
  name: string;
  /** Path after the slug, e.g. "/request-quotation". */
  suffix?: string;
}

/**
 * Curated cross-links to a fixed set of services, keyed by base (English)
 * slug. Each link is written with the current language's own slug (from
 * `slugs`), so crawlers never see a mismatched URL like
 * "/de/services/deep-cleaning" that only reaches the real page through a
 * redirect; a service missing from `slugs` falls back to its base slug.
 */
const relatedServices: ServiceLink[] = [
  { title: "serviceLableDeepCleaning", name: "deep-cleaning" },
  { title: "serviceLableRegularHomeCleaning", name: "regular-home-cleaning" },
  { title: "serviceLableEndOfTenancyCleaning", name: "end-of-tenancy-cleaning" },
  { title: "serviceLablePostConstructionRenovationCleaning", name: "post-construction-renovation-cleaning" },
  // Quotation-only — laundry has no Book Now flow (see lib/service-flows.ts).
  { title: "serviceLableLaundryService", name: "laundry-service", suffix: "/request-quotation" },
  { title: "serviceLableCommercialOfficeCleaning", name: "commercial-office-cleaning" },
];

export default function RelatedServices({ slugs = {} }: { slugs?: Record<string, string> }) {
  const{translate}=useLanguage()
  return (
    <section className="w-full bg-[#F8F9FA] px-4 py-8 font-poppins">
      <h3 className="mb-4 text-center text-lg font-bold text-[#121E2D]">
        {translate("exploreServicesRelated")} 
      </h3>
      
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
        {relatedServices.map((service) => (
          <Link
            key={service.name}
            href={`/services/${slugs[service.name] ?? service.name}${service.suffix ?? ""}`}
            className="rounded-lg border-[1.5px] border-[#A98B4B] bg-white px-[18px] py-2 text-sm font-medium text-[#121E2D] transition-colors duration-200 hover:bg-[#A98B4B] hover:text-white"
          >
            {translate(service.title)}
          </Link>
        ))}
      </div>
    </section>
  );
}