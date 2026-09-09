"use client"
import { useLanguage } from "@/lib/i18n/language-context";
import Link from "next/link";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
interface ServiceLink {
  title: TranslationKey;
  href: string;
}

const relatedServices: ServiceLink[] = [
  { title: "serviceLableDeepCleaning", href: "/fr/en/services/deep-cleaning" },
  {
    title: "serviceLableRegularHomeCleaning",
    href: "/fr/en/services/standard-residential-cleaning",
  },

  {
    title: "serviceLableEndOfTenancyCleaning",
    href: "/fr/en/services/end-of-tenancy-cleaning",
  },
  {
    title: "serviceLablePostConstructionRenovationCleaning",
    href: "/fr/en/services/post-construction-renovation-cleaning",
  },
  { title: "serviceLableLaundryService", href: "/fr/en/services/laundry-service" },
  {
    title: "serviceLableCommercialOfficeCleaning",
    href: "/fr/en/services/commercial-office-cleaning",
  },
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