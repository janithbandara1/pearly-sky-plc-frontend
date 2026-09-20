import { CURRENT_COUNTRY, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import { getTranslatedCountryPageMeta } from "./meta-templates";

export interface PageMeta {
  title: string;
  description?: string;
}

export type PageMetaContent = Record<string, PageMeta>;

/** Fallback <title>/description, used by app/layout.tsx's root `metadata` export whenever a page has no `generateMetadata()` of its own. */
export const GLOBAL_META: PageMetaContent = {
  // Core Pages
  home: {
    title: "Global Eco-Luxury Cleaning Services | Pearly Sky Worldwide",
    description: "Experience world-class, sustainable residential & commercial eco-luxury cleaning. Bespoke, premium care tailored to your elite worldwide lifestyle.",
  },
  aboutUs: {
    title: "The Elite Global Eco-Luxury Cleaning Team | Pearly Sky",
    description: "Discover our global commitment to ultra-premium, sustainable cleaning excellence. Trusted by high-net-worth clients and luxury estates worldwide.",
  },
  contactUs: {
    title: "Book Your Global Luxury Clean | Contact Pearly Sky",
    description: "Get in touch with Pearly Sky Eco-Luxury Cleaning Services. Request a bespoke quote for premium residential or corporate cleaning worldwide.",
  },
  ourLocation: {
    title: "Global Operations & Locations | Pearly Sky Worldwide",
    description: "Explore Pearly Sky's international service locations. Providing elite eco-luxury cleaning and estate management services across global destinations.",
  },
  career: {
    title: "Join Our Elite Global Team | Pearly Sky Careers",
    description: "Apply for premium cleaning and property care careers at Pearly Sky Worldwide. Join a rewarding, high-end global brand with superior training.",
  },
  blog: {
    title: "Eco-Luxury Living & Estate Maintenance Blog | Pearly Sky",
    description: "Expert international insights on sustainable luxury living, elite property maintenance, and world-class eco-friendly cleaning practices.",
  },
  ourCustomer: {
    title: "Global Client Reviews & 5-Star Testimonials | Pearly Sky",
    description: "Read verified testimonials from high-profile residents, luxury estates, and premium corporate clients who trust Pearly Sky worldwide.",
  },

  // Residential Services
  regularHomeCleaning: {
    title: "Bespoke Regular House Cleaning | Pearly Sky Worldwide",
    description: "Maintain your estate flawlessly with our premium regular domestic cleaning. Elite, eco-friendly upkeep tailored to luxury residences globally.",
  },
  essentialTouchUpCleaning: {
    title: "Premium Touch-Up & Express Refresh | Pearly Sky",
    description: "Fast, high-end refresh cleaning services for pristine properties. Expert eco-luxury touch-ups to maintain immaculate spaces worldwide.",
  },
  deepCleaning: {
    title: "Elite Deep Cleaning Services | Pearly Sky Worldwide",
    description: "Intensive, meticulous eco-luxury deep cleaning for estates and luxury homes. Our premium professionals restore every detail to perfection.",
  },
  endOfTenancyCleaning: {
    title: "Premium End of Tenancy Cleaning | Pearly Sky Worldwide",
    description: "Flawless luxury checkout cleaning for elite properties. High-end deep eco-cleaning designed to exceed strict international landlord standards.",
  },
  postConstructionCleaning: {
    title: "Luxury Post-Construction & After Builders Clean | Pearly Sky",
    description: "Expert post-renovation cleaning for luxury developments and estates. We remove construction dust and residue using premium eco-methods globally.",
  },
  sameDayPriorityCleaning: {
    title: "Urgent Same-Day Emergency Cleaning | Pearly Sky Global",
    description: "Fast-response, priority eco-luxury cleaning when time is critical. Last-minute premium cleaning services available worldwide. Book now.",
  },
  highSecurityPropertyCare: {
    title: "Confidential & High-Security Property Care | Pearly Sky",
    description: "Discreet, elite cleaning services for high-net-worth individuals, diplomatic properties, and secure estates worldwide. Vetted professionals.",
  },

  // Specialist Care
  premiumRentalConciergeCleaning: {
    title: "Luxury Rental Concierge & Airbnb Turnaround | Pearly Sky",
    description: "Five-star concierge and turnaround cleaning for premium vacation rentals and luxury villas globally. Impress your global guests seamlessly.",
  },
  laundryAndLinenCare: {
    title: "Premium Laundry & Fine Eco-Linen Care | Pearly Sky",
    description: "Fine garment, couture, and luxury linen care. Gentle, sustainable washing, precise pressing, and wardrobe management for elite homes worldwide.",
  },
  carpetAndUpholsteryCleaning: {
    title: "Luxury Carpet & Fine Upholstery Cleaning | Pearly Sky",
    description: "Deep eco-friendly steam extraction for premium rugs, carpets, and delicate fabrics. Restoring fine textiles in luxury properties globally.",
  },
  poolCleaningAndMaintenance: {
    title: "Luxury Pool Cleaning & Valet Maintenance | Pearly Sky",
    description: "Professional indoor/outdoor pool cleaning, chemical balancing, and premium maintenance services for luxury private estates worldwide.",
  },
  precisionPressureWashing: {
    title: "Elite Pressure Washing & Jet Washing | Pearly Sky Global",
    description: "Precision exterior pressure washing for luxury driveways, terraces, and stonework. Eco-friendly cleaning restoring global estate kerb appeal.",
  },

  // Commercial & Specialty
  commercialAndOfficeCleaning: {
    title: "Premium Commercial & Corporate Workspace Cleaning | Pearly Sky",
    description: "Eco-luxury commercial cleaning for premium offices, luxury retail boutiques, and high-end corporate premises globally. Elevate your brand environment.",
  },
  steamCleaning: {
    title: "Advanced Eco Sanitizing Steam Cleaning | Pearly Sky Global",
    description: "Chemical-free, high-temperature steam cleaning for premium hygiene. Sanitizes delicate surfaces, floors, and tiles safely via pure water power.",
  },
  postEventCleaning: {
    title: "Luxury Event & Gala Post-Party Cleaning | Pearly Sky",
    description: "Complete post-event cleanup for private galas, corporate gatherings, and high-profile parties. Restoring luxury venues to flawless condition fast.",
  },
  luxuryYachtCleaning: {
    title: "Elite Superyacht & Marine Detailing | Pearly Sky Worldwide",
    description: "Premium interior and exterior eco-luxury detailing for superyachts and luxury watercraft. Marine-safe professional cleaning at elite ports worldwide.",
  },

  // Ancillary & Support
  childcareServices: {
    title: "Premium Worldwide Childcare & Nanny Services | Pearly Sky",
    description: "Elite, trusted childcare and bespoke nanny solutions for high-profile families globally. Safe, nurturing, and professional elite home support.",
  },
  elderCareServices: {
    title: "Elite Companion & Private Senior Care | Pearly Sky Global",
    description: "Compassionate, premium home care and dignified companion services for senior family members. Tailored for elegant, independent living worldwide.",
  },
  moveInAndMoveOutTransportHealth: {
    title: "Luxury Move Logistics & Health Sanitization | Pearly Sky",
    description: "Bespoke relocation logistics integrated with complete medical-grade property sanitization for a pristine, healthy home transition globally.",
  },
  guardSanitizationServices: {
    title: "Advanced Guard Disinfection Services | Pearly Sky Global",
    description: "High-level protective antiviral sanitization and disinfection services. Eco-conscious bio-defense to guard elite properties and estates worldwide.",
  },
};

type CountryPageKey = "home" | "about" | "customers" | "contact" | "careers" | "ourLocations" | "blog";

/**
 * <title>/description for pages whose copy names the visitor's country,
 * keyed by [country][language] — this shape mirrors exactly which
 * languages each country actually offers (see COUNTRY_LANGUAGES in
 * ./config). Every country only has a hand-written "en" entry here; every
 * non-English language (France's "fr"/"de"/"es"/"it") is generated on
 * demand from meta-templates.ts's per-language templates instead, so all
 * four read consistently from one generator rather than mixing hand-tuned
 * and generated copy. English copy is transcribed verbatim from the master
 * blueprint (frontend/docs/pearly-sky-global-master-blueprint.md, section 3).
 */
const COUNTRY_PAGE_META: Record<CountryCode, Partial<Record<LanguageCode, Record<CountryPageKey, PageMeta>>>> = {
  fr: {
    en: {
      home: {
        title: "Premium Eco-Luxury Cleaning Services France | Pearly Sky",
        description:
          "Experience elite, eco-luxury residential & commercial cleaning in France. Five-star premium property care using sustainable, high-performance practices.",
      },
      about: {
        title: "About Us: Eco-Luxury Property Care France | Pearly Sky",
        description:
          "Discover the story, strict standards, and values driving Pearly Sky Global in France. Dedicated to elite property care and lifestyle support.",
      },
      customers: {
        title: "Verified Client Reviews & Testimonials France | Pearly Sky",
        description:
          "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in France.",
      },
      contact: {
        title: "Contact Our Eco-Luxury Cleaning Team France | Pearly Sky",
        description:
          "Get in touch with Pearly Sky Global France for booking inquiries or custom service quotes. Reliable, immediate assistance.",
      },
      careers: {
        title: "Careers in Luxury Property Care France | Pearly Sky",
        description:
          "Build a rewarding career in luxury property care in France. Explore open positions for professional cleaners and premium specialists.",
      },
      ourLocations: {
        title: "Our Service Locations in France | Pearly Sky Global",
        description:
          "Operating premium service clusters across France. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
      },
      blog: {
        title: "Eco-Luxury Cleaning Blog & Insights France | Pearly Sky",
        description:
          "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in France.",
      },
    },
  },
  gb: {
    en: {
      home: {
        title: "Premium Eco-Luxury Cleaning Services United Kingdom | Pearly Sky",
        description:
          "Experience elite, eco-luxury residential & commercial cleaning in The United Kingdom. Five-star premium property care using sustainable, high-performance practices.",
      },
      about: {
        title: "About Us: Eco-Luxury Property Care United Kingdom | Pearly Sky",
        description:
          "Discover the story, strict standards, and values driving Pearly Sky Global in The United Kingdom. Dedicated to elite property care and lifestyle support.",
      },
      customers: {
        title: "Verified Client Reviews & Testimonials United Kingdom | Pearly Sky",
        description:
          "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in The United Kingdom.",
      },
      contact: {
        title: "Contact Our Eco-Luxury Cleaning Team United Kingdom | Pearly Sky",
        description:
          "Get in touch with Pearly Sky Global United Kingdom for booking inquiries or custom service quotes. Reliable, immediate assistance.",
      },
      careers: {
        title: "Careers in Luxury Property Care United Kingdom | Pearly Sky",
        description:
          "Build a rewarding career in luxury property care in The United Kingdom. Explore open positions for professional cleaners and premium specialists.",
      },
      ourLocations: {
        title: "Our Service Locations in United Kingdom | Pearly Sky Global",
        description:
          "Operating premium service clusters across The United Kingdom. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
      },
      blog: {
        title: "Eco-Luxury Cleaning Blog & Insights United Kingdom | Pearly Sky",
        description:
          "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in The United Kingdom.",
      },
    },
  },
  lk: {
    en: {
      home: {
        title: "Premium Eco-Luxury Cleaning Services Sri Lanka | Pearly Sky",
        description:
          "Experience elite, eco-luxury residential & commercial cleaning in Sri Lanka. Five-star premium property care using sustainable, high-performance practices.",
      },
      about: {
        title: "About Us: Eco-Luxury Property Care Sri Lanka | Pearly Sky",
        description:
          "Discover the story, strict standards, and values driving Pearly Sky Global in Sri Lanka. Dedicated to elite property care and lifestyle support.",
      },
      customers: {
        title: "Verified Client Reviews & Testimonials Sri Lanka | Pearly Sky",
        description:
          "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Sri Lanka.",
      },
      contact: {
        title: "Contact Our Eco-Luxury Cleaning Team Sri Lanka | Pearly Sky",
        description:
          "Get in touch with Pearly Sky Global Sri Lanka for booking inquiries or custom service quotes. Reliable, immediate assistance.",
      },
      careers: {
        title: "Careers in Luxury Property Care Sri Lanka | Pearly Sky",
        description:
          "Build a rewarding career in luxury property care in Sri Lanka. Explore open positions for professional cleaners and premium specialists.",
      },
      ourLocations: {
        title: "Our Service Locations in Sri Lanka | Pearly Sky Global",
        description:
          "Operating premium service clusters across Sri Lanka. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
      },
      blog: {
        title: "Eco-Luxury Cleaning Blog & Insights Sri Lanka | Pearly Sky",
        description:
          "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Sri Lanka.",
      },
    },
  },
};

/**
 * Title/description for `page` in CURRENT_COUNTRY, in `language`. Resolution
 * order: hand-written English copy (COUNTRY_PAGE_META above; the only
 * hand-written entry any country has) -> a generated translation
 * (meta-templates.ts; covers France's "fr"/"de"/"es"/"it") ->
 * CURRENT_COUNTRY's English copy as a last-resort fallback.
 */
export function getCountryPageMeta(page: CountryPageKey, language: LanguageCode): PageMeta {
  const forCountry = COUNTRY_PAGE_META[CURRENT_COUNTRY];
  const handWritten = forCountry[language]?.[page];
  if (handWritten) return handWritten;

  const generated = getTranslatedCountryPageMeta(page, CURRENT_COUNTRY, language);
  if (generated) return generated;

  return forCountry.en![page];
}

type StaticPageKey = "termsAndConditions" | "privacyPolicy" | "cookiePolicy";

/** <title>/description for pages whose copy is identical for every country. */
export const STATIC_PAGE_META: Record<StaticPageKey, PageMeta> = {
  termsAndConditions: {
    title: "Terms and Conditions | Pearly Sky",
  },
  privacyPolicy: {
    title: "Privacy Policy | Pearly Sky",
  },
  cookiePolicy: {
    title: "Cookie Policy | Pearly Sky",
  },
};
