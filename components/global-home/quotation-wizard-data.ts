/**
 * Static options for the global gateway's quotation wizard
 * (global-quotation-page.tsx). Every `value` is the English wording saved on
 * the quotation the team reads; every `labelKey` is its copy in the visitor's language.
 */
import {
  Baby,
  Box,
  Building2,
  Clock,
  CloudFog,
  ConciergeBell,
  Droplets,
  HardHat,
  HeartHandshake,
  House,
  KeyRound,
  PartyPopper,
  Sailboat,
  ShieldCheck,
  ShieldPlus,
  Sofa,
  Sparkles,
  SprayCan,
  Truck,
  WashingMachine,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { GlobalKey } from "@/lib/i18n/global/en";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "regular-home-cleaning": House,
  "essential-touch-up-cleaning": SprayCan,
  "deep-cleaning": Sparkles,
  "end-of-tenancy-cleaning": KeyRound,
  "post-construction-renovation-cleaning": HardHat,
  "same-day-priority-cleaning": Clock,
  "high-security-property-care": ShieldCheck,
  "premium-rental-concierge-cleaning": ConciergeBell,
  "commercial-office-cleaning": Building2,
  "steam-cleaning": CloudFog,
  "post-event-cleaning": PartyPopper,
  "luxury-yacht-cleaning": Sailboat,
  "healthguard-sanitization": ShieldPlus,
  "carpet-upholstery-cleaning": Sofa,
  "pool-cleaning": Waves,
  "precision-pressure-washing": Droplets,
  "child-care-service": Baby,
  "laundry-service": WashingMachine,
  "move-in-out-transport-service": Truck,
  "elder-care-service": HeartHandshake,
};

/** Personal-support services — scoped by people and hours, never by area. */
export const NO_AREA_SERVICES = new Set(["child-care-service", "elder-care-service", "laundry-service"]);

/** Labour-heavy services that show the completion-time notice on the crew step. */
export const INTENSIVE_SERVICES = new Set([
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "post-construction-renovation-cleaning",
]);

export const UPHOLSTERY_SERVICE = "carpet-upholstery-cleaning";

export const UPHOLSTERY_PRESETS: { id: string; area: number; labelKey: GlobalKey; value: string }[] = [
  { id: "1seater", area: 2, labelKey: "gq.preset.1seater", value: "1-seater armchair" },
  { id: "2seater", area: 4, labelKey: "gq.preset.2seater", value: "2-seater loveseat" },
  { id: "3seater", area: 6, labelKey: "gq.preset.3seater", value: "3-seater sofa" },
  { id: "lshape", area: 10, labelKey: "gq.preset.lshape", value: "L-shaped corner sofa" },
  { id: "modular", area: 15, labelKey: "gq.preset.modular", value: "Modular sectional" },
  { id: "mattress", area: 3, labelKey: "gq.preset.mattress", value: "Mattress" },
  { id: "dining", area: 4, labelKey: "gq.preset.dining", value: "Dining chairs (x4)" },
];

export interface PropertyOption {
  value: string;
  labelKey: GlobalKey;
}

/** 30 property types in 7 categories — the same list as the country sites' quotation page. */
export const PROPERTY_CATEGORIES: { id: string; labelKey: GlobalKey; items: PropertyOption[] }[] = [
  {
    id: "res",
    labelKey: "gq.property.cat.res",
    items: [
      { value: "Studio", labelKey: "gq.property.studio" },
      { value: "Apartment / Flat", labelKey: "gq.property.apartment" },
      { value: "Townhouse", labelKey: "gq.property.townhouse" },
      { value: "House", labelKey: "gq.property.house" },
      { value: "Penthouse", labelKey: "gq.property.penthouse" },
      { value: "Luxury Villa", labelKey: "gq.property.villa" },
      { value: "Holiday Rental / VIP Property", labelKey: "gq.property.holiday" },
    ],
  },
  {
    id: "com",
    labelKey: "gq.property.cat.com",
    items: [
      { value: "Micro Office", labelKey: "gq.property.microOffice" },
      { value: "Office", labelKey: "gq.property.office" },
      { value: "Coworking Space", labelKey: "gq.property.coworking" },
      { value: "Retail Shop", labelKey: "gq.property.retail" },
      { value: "Shopping Centre", labelKey: "gq.property.mall" },
      { value: "Supermarket / Grocery Store", labelKey: "gq.property.supermarket" },
      { value: "Bank / Financial Office", labelKey: "gq.property.bank" },
      { value: "Showroom", labelKey: "gq.property.showroom" },
      { value: "Car Dealership", labelKey: "gq.property.dealership" },
    ],
  },
  {
    id: "hosp",
    labelKey: "gq.property.cat.hosp",
    items: [
      { value: "Restaurant", labelKey: "gq.property.restaurant" },
      { value: "Café", labelKey: "gq.property.cafe" },
      { value: "Hotel", labelKey: "gq.property.hotel" },
      { value: "Gym / Fitness Centre", labelKey: "gq.property.gym" },
      { value: "Beauty Salon / Spa", labelKey: "gq.property.spa" },
    ],
  },
  {
    id: "health",
    labelKey: "gq.property.cat.health",
    items: [
      { value: "Medical Clinic", labelKey: "gq.property.clinic" },
      { value: "Hospital", labelKey: "gq.property.hospital" },
      { value: "Elderly Care Home", labelKey: "gq.property.careHome" },
    ],
  },
  {
    id: "edu",
    labelKey: "gq.property.cat.edu",
    items: [
      { value: "School / Nursery", labelKey: "gq.property.school" },
      { value: "Playground / Outdoor Play Area", labelKey: "gq.property.playground" },
    ],
  },
  {
    id: "ind",
    labelKey: "gq.property.cat.ind",
    items: [
      { value: "Warehouse", labelKey: "gq.property.warehouse" },
      { value: "Distribution Centre", labelKey: "gq.property.distribution" },
      { value: "Factory", labelKey: "gq.property.factory" },
    ],
  },
  {
    id: "spec",
    labelKey: "gq.property.cat.spec",
    items: [{ value: "Other Property", labelKey: "gq.property.other" }],
  },
];

export const PROPERTY_COUNT = PROPERTY_CATEGORIES.reduce((sum, category) => sum + category.items.length, 0);

/**
 * The regular frequencies the wizard offers. Only services whose backend
 * SERVICE_FREQUENCIES (bookings/dto/booking-frequency.ts) include them show the
 * frequency step — the backend drops a frequency the service doesn't offer.
 */
export const FREQUENCIES: {
  value: "one-time" | "weekly" | "bi-weekly" | "monthly";
  titleKey: GlobalKey;
  tagKey: GlobalKey;
  pointKeys: GlobalKey[];
  popular?: boolean;
}[] = [
  {
    value: "one-time",
    titleKey: "gq.freq.oneTime",
    tagKey: "gq.freq.oneTime.tag",
    pointKeys: ["gq.freq.oneTime.p1", "gq.freq.oneTime.p2", "gq.freq.oneTime.p3"],
  },
  {
    value: "weekly",
    titleKey: "gq.freq.weekly",
    tagKey: "gq.freq.weekly.tag",
    pointKeys: ["gq.freq.weekly.p1", "gq.freq.weekly.p2", "gq.freq.weekly.p3"],
    popular: true,
  },
  {
    value: "bi-weekly",
    titleKey: "gq.freq.biWeekly",
    tagKey: "gq.freq.biWeekly.tag",
    pointKeys: ["gq.freq.biWeekly.p1", "gq.freq.biWeekly.p2", "gq.freq.biWeekly.p3"],
  },
  {
    value: "monthly",
    titleKey: "gq.freq.monthly",
    tagKey: "gq.freq.monthly.tag",
    pointKeys: ["gq.freq.monthly.p1", "gq.freq.monthly.p2", "gq.freq.monthly.p3"],
  },
];

/** Services offering the regular frequencies — mirrors the backend's SERVICE_FREQUENCIES. */
export const FREQUENCY_SERVICES = new Set([
  "regular-home-cleaning",
  "essential-touch-up-cleaning",
  "deep-cleaning",
  "high-security-property-care",
  "premium-rental-concierge-cleaning",
  "commercial-office-cleaning",
  "steam-cleaning",
  "luxury-yacht-cleaning",
  "healthguard-sanitization",
]);

export interface SupplyOption {
  id: string;
  /** The catalog's own item name — shown and saved on the quotation as-is. */
  name: string;
  descKey: GlobalKey;
  icon: LucideIcon;
}

export const SUPPLIES: SupplyOption[] = [
  { id: "bioSolvent", name: "BIO - SOLVENT", descKey: "gq.supply.bioSolvent.desc", icon: Box },
  { id: "mop", name: "MOP (1 MOP)", descKey: "gq.supply.mop.desc", icon: Box },
  { id: "materials", name: "MATERIALS (1 KIT)", descKey: "gq.supply.materials.desc", icon: Box },
  { id: "vacuum", name: "VACUUM (1 VAC)", descKey: "gq.supply.vacuum.desc", icon: Box },
];

export const GENDER_OPTIONS: PropertyOption[] = [
  { value: "no-preference", labelKey: "gq.prefs.noPreference" },
  { value: "female", labelKey: "gq.prefs.female" },
  { value: "male", labelKey: "gq.prefs.male" },
];

/** Staff language preference — `code` names the language in the visitor's own language (Intl.DisplayNames). */
export const STAFF_LANGUAGES: { value: string; code: string }[] = [
  { value: "english", code: "en" },
  { value: "french", code: "fr" },
  { value: "german", code: "de" },
  { value: "spanish", code: "es" },
  { value: "italian", code: "it" },
];

export const CONTACT_OPTIONS: { value: "whatsapp" | "phone" | "email"; labelKey: GlobalKey }[] = [
  { value: "whatsapp", labelKey: "gq.contact.whatsapp" },
  { value: "phone", labelKey: "gq.contact.phone" },
  { value: "email", labelKey: "gq.contact.email" },
];

export const ACCESS_OPTIONS: PropertyOption[] = [
  { value: "I'll be at home", labelKey: "gq.access.home" },
  { value: "Concierge / reception will let the team in", labelKey: "gq.access.concierge" },
  { value: "Key safe / lockbox (code in special requirements)", labelKey: "gq.access.keybox" },
  { value: "Other (see special requirements)", labelKey: "gq.access.other" },
];
