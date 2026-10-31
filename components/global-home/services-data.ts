import { Anchor, Building2, HandHeart, House, WandSparkles } from "lucide-react";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { serviceCardImage } from "./services-catalog";

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
    image: serviceCardImage("regular-home-cleaning"),
    Icon: House,
  },
  {
    value: "commercial",
    title: "Commercial & Office Cleaning",
    titleKey: "homeServices.commercial.title",
    descriptionKey: "homeServices.commercial.description",
    image: serviceCardImage("commercial-office-cleaning"),
    Icon: Building2,
  },
  {
    value: "yacht",
    title: "Luxury Yacht Cleaning",
    titleKey: "homeServices.yacht.title",
    descriptionKey: "homeServices.yacht.description",
    image: serviceCardImage("luxury-yacht-cleaning"),
    Icon: Anchor,
  },
  {
    value: "concierge",
    title: "Care & Concierge Services",
    titleKey: "homeServices.concierge.title",
    descriptionKey: "homeServices.concierge.description",
    image: serviceCardImage("elder-care-service"),
    Icon: HandHeart,
  },
  {
    value: "addons",
    title: "Premium Add-On Services",
    titleKey: "homeServices.addons.title",
    descriptionKey: "homeServices.addons.description",
    image: serviceCardImage("carpet-upholstery-cleaning"),
    Icon: WandSparkles,
  },
];
