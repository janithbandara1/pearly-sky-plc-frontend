"use client"
import { useLanguage } from "@/lib/i18n/language-context";
import Link from "next/link";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
interface ServiceLink {
  title: TranslationKey;
  href: string;
}

/**
 * Curated cross-links to a fixed set of services, by their base (English)
 * slug — same unprefixed-path convention as ServicesNavList's links. A click
 * lands on the unprefixed route, which proxy.ts redirects to the visitor's
 * current locale (and, once a service has a translated slug, to that
 * locale's own slug — see CatalogService.findServiceBySlug on the backend).
 */
const relatedServices: ServiceLink[] = [
  { title: "serviceLableDeepCleaning", href: "/services/deep-cleaning" },
  { title: "serviceLableRegularHomeCleaning", href: "/services/regular-home-cleaning" },
  { title: "serviceLableEndOfTenancyCleaning", href: "/services/end-of-tenancy-cleaning" },
  {
    title: "serviceLablePostConstructionRenovationCleaning",
    href: "/services/post-construction-renovation-cleaning",
  },
  { title: "serviceLableLaundryService", href: "/services/laundry-service" },
  { title: "serviceLableCommercialOfficeCleaning", href: "/services/commercial-office-cleaning" },
];

export default function RelatedServices() {
  const{translate}=useLanguage()
  return (
    <section className="w-full bg-[#F8F9FA] px-4 py-8 font-poppins">
      <h3 className="mb-4 text-center text-lg font-bold text-[#121E2D]">
        {translate("exploreServicesRelated")} 
      </h3>
      
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
        {relatedServices.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="rounded-lg border-[1.5px] border-[#A98B4B] bg-white px-[18px] py-2 text-sm font-medium text-[#121E2D] transition-colors duration-200 hover:bg-[#A98B4B] hover:text-white"
          >
            {translate(service.title)}
          </Link>
        ))}
      </div>
    </section>
  );
}