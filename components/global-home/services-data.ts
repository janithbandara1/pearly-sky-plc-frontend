import { Anchor, Building2, HandHeart, House, WandSparkles } from "lucide-react";
import type { GlobalKey } from "@/lib/i18n/global/en";

const SERVICES_DIR = "/images/services";

/**
 * `title` is the English name — it goes into the enquiry the team reads
 * (components/global-home/quote.tsx); visitors see the translated
 * `titleKey` / `descriptionKey` instead.
 */
export const GLOBAL_SERVICES: {
  value: string;
  title: string;
  titleKey: GlobalKey;
  descriptionKey: GlobalKey;
  image: string;
  Icon: typeof House;
}[] = [
  {
    value: "residential",
    title: "Residential Cleaning Services",
    titleKey: "homeServices.residential.title",
    descriptionKey: "homeServices.residential.description",
    image: `${SERVICES_DIR}/updated-home-property-cleaning-services-1-standard-residential-cleaning-660w.webp`,
    Icon: House,
  },
  {
    value: "commercial",
    title: "Commercial & Office Cleaning",
    titleKey: "homeServices.commercial.title",
    descriptionKey: "homeServices.commercial.description",
    image: `${SERVICES_DIR}/updated-home-property-cleaning-services-8-commercial-office-cleaning-660w.webp`,
    Icon: Building2,
  },
  {
    value: "yacht",
    title: "Luxury Yacht Cleaning",
    titleKey: "homeServices.yacht.title",
    descriptionKey: "homeServices.yacht.description",
    image: `${SERVICES_DIR}/updated-home-property-cleaning-services-16-luxury-yacht-cleaning-660w.webp`,
    Icon: Anchor,
  },
  {
    value: "concierge",
    title: "Care & Concierge Services",
    titleKey: "homeServices.concierge.title",
    descriptionKey: "homeServices.concierge.description",
    image: `${SERVICES_DIR}/updated-care-support-services-2-elder-care-service-660w.webp`,
    Icon: HandHeart,
  },
  {
    value: "addons",
    title: "Premium Add-On Services",
    titleKey: "homeServices.addons.title",
    descriptionKey: "homeServices.addons.description",
    image: `${SERVICES_DIR}/updated-home-property-cleaning-services-10-carpet-upholstery-cleaning-660w.webp`,
    Icon: WandSparkles,
  },
];
