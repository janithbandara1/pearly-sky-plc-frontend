import { CURRENT_COUNTRY, IS_GLOBAL_SITE, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import { getTranslatedCountryPageMeta } from "./meta-templates";

export interface PageMeta {
  title: string;
  description?: string;
}

export type PageMetaContent = Record<string, PageMeta>;

/**
 * Fallback <title>/description, used by app/layout.tsx's root `metadata`
 * export whenever a page has no `generateMetadata()` of its own. Distinct
 * from GLOBAL_META below despite the similar name — this one is "the
 * whole site's fallback," GLOBAL_META is "content for the global gateway
 * deployment specifically."
 */
export const SITE_META: PageMeta = {
  title: "Pearly Sky",
  description: "Cleaning services, booking, and account management.",
};

/** <title>/description content for the global gateway deployment (IS_GLOBAL_SITE) — one entry per page, keyed the same way getCountryPageMeta's callers ask for. */
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
 * non-English language ("fr") is generated on
 * demand from meta-templates.ts's per-language templates instead, so all
 * languages read consistently from one generator rather than mixing hand-tuned
 * and generated copy. English copy is transcribed verbatim from the master
 * blueprint (frontend/docs/pearly-sky-global-master-blueprint.md, section 3).
 */
const COUNTRY_PAGE_META: Record<CountryCode, Partial<Record<LanguageCode, Record<CountryPageKey, PageMeta>>>> = {
  fr: {
    en: {
      home: {
        title: "Pearly Sky | Premium Cleaning Services France",
        description:
          "Thoughtful, professional cleaning for homes and workspaces across selected locations in France.",
      },
      about: {
        title: "About Pearly Sky | Professional Cleaning France",
        description:
          "Discover Pearly Sky's approach to professional residential, commercial and specialist cleaning in selected locations across France.",
      },
      customers: {
        title: "Our Customers | Pearly Sky Cleaning Services France",
        description:
          "Discover how Pearly Sky serves homeowners, families, property owners and businesses with professional cleaning services tailored to their spaces across selected locations in France.",
      },
      contact: {
        title: "Contact Pearly Sky | Professional Cleaning Services France",
        description:
          "Contact Pearly Sky for professional home, office and specialist cleaning services in selected locations across France. Request a personalised quote or enquire about our services.",
      },
      careers: {
        title: "Careers at Pearly Sky | Cleaning Jobs in France",
        description:
          "Explore career opportunities with Pearly Sky. Discover potential cleaning and professional service roles and learn how to express your interest in joining our team in France.",
      },
      ourLocations: {
        title: "Our Locations | Pearly Sky Cleaning Services",
        description:
          "Explore Pearly Sky Cleaning Services locations and discover professional, eco-conscious cleaning for homes and workspaces in our service areas.",
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
        title: "Pearly Sky | Premium Cleaning Services UK",
        description:
          "Thoughtful, professional cleaning for homes and workspaces across selected locations in the UK.",
      },
      about: {
        title: "About Pearly Sky | Professional Cleaning UK",
        description:
          "Discover Pearly Sky's approach to professional residential, commercial and specialist cleaning in selected locations across the UK.",
      },
      customers: {
        title: "Our Customers | Pearly Sky Cleaning Services UK",
        description:
          "Discover how Pearly Sky serves homeowners, families, property owners and businesses with professional cleaning services tailored to their spaces across selected locations in the UK.",
      },
      contact: {
        title: "Contact Pearly Sky | Professional Cleaning Services UK",
        description:
          "Contact Pearly Sky for professional home, office and specialist cleaning services in selected locations across the UK. Request a personalised quote or enquire about our services.",
      },
      careers: {
        title: "Careers at Pearly Sky | Cleaning Jobs in the UK",
        description:
          "Explore career opportunities with Pearly Sky. Discover potential cleaning and professional service roles and learn how to express your interest in joining our team in the UK.",
      },
      ourLocations: {
        title: "Our Locations | Pearly Sky Cleaning Services",
        description:
          "Explore Pearly Sky Cleaning Services locations and discover professional, eco-conscious cleaning for homes and workspaces in our service areas.",
      },
      blog: {
        title: "Eco-Luxury Cleaning Blog & Insights UK | Pearly Sky",
        description:
          "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in the United Kingdom.",
      },
    },
  },
  lk: {
    en: {
      home: {
        title: "Pearly Sky | Premium Cleaning Services Sri Lanka",
        description:
          "Thoughtful, professional cleaning for homes and workspaces across selected locations in Sri Lanka.",
      },
      about: {
        title: "About Pearly Sky | Professional Cleaning Sri Lanka",
        description:
          "Discover Pearly Sky's approach to professional residential, commercial and specialist cleaning in selected locations across Sri Lanka.",
      },
      customers: {
        title: "Our Customers | Pearly Sky Cleaning Services Sri Lanka",
        description:
          "Discover how Pearly Sky serves homeowners, families, property owners and businesses with professional cleaning services tailored to their spaces across selected locations in Sri Lanka.",
      },
      contact: {
        title: "Contact Pearly Sky | Professional Cleaning Services Sri Lanka",
        description:
          "Contact Pearly Sky for professional home, office and specialist cleaning services in selected locations across Sri Lanka. Request a personalised quote or enquire about our services.",
      },
      careers: {
        title: "Careers at Pearly Sky | Cleaning Jobs in Sri Lanka",
        description:
          "Explore career opportunities with Pearly Sky. Discover potential cleaning and professional service roles and learn how to express your interest in joining our team in Sri Lanka.",
      },
      ourLocations: {
        title: "Our Locations | Pearly Sky Cleaning Services",
        description:
          "Explore Pearly Sky Cleaning Services locations and discover professional, eco-conscious cleaning for homes and workspaces in our service areas.",
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
 * Maps a CountryPageKey (what every page's generateMetadata already asks
 * for) to its entry in GLOBAL_META above — the two were named differently
 * ("ourLocations" vs. "ourLocation", "customers" vs. "ourCustomer", etc.)
 * since GLOBAL_META covers more than just these 7 pages.
 */
const GLOBAL_META_KEY: Record<CountryPageKey, string> = {
  home: "home",
  about: "aboutUs",
  customers: "ourCustomer",
  contact: "contactUs",
  careers: "career",
  ourLocations: "ourLocation",
  blog: "blog",
};

/**
 * Title/description for `page`. On the global gateway this always comes
 * from GLOBAL_META (via GLOBAL_META_KEY) — no country/language resolution
 * applies there. On a real country site, resolution order for
 * CURRENT_COUNTRY in `language` is: hand-written English copy
 * (COUNTRY_PAGE_META above; the only hand-written entry any country has)
 * -> a generated translation (meta-templates.ts; covers every
 * country's "fr") -> CURRENT_COUNTRY's English copy as a last-resort
 * fallback.
 */
export function getCountryPageMeta(page: CountryPageKey, language: LanguageCode): PageMeta {
  if (IS_GLOBAL_SITE) return GLOBAL_META[GLOBAL_META_KEY[page]];

  const forCountry = COUNTRY_PAGE_META[CURRENT_COUNTRY];
  const handWritten = forCountry[language]?.[page];
  if (handWritten) return handWritten;

  const generated = getTranslatedCountryPageMeta(page, CURRENT_COUNTRY, language);
  if (generated) return generated;

  return forCountry.en![page];
}

type StaticPageKey = "termsAndConditions" | "privacyPolicy" | "cookiePolicy";

/**
 * <title>/description for the legal pages — identical for every country, but
 * translated per language. Titles match each document's own heading in
 * lib/content/legal.
 */
export const STATIC_PAGE_META: Record<StaticPageKey, Record<LanguageCode, PageMeta>> = {
  termsAndConditions: {
    en: {
      title: "Terms and Conditions | Pearly Sky",
      description:
        "The terms for using the Pearly Sky website and cleaning services: user responsibilities, intellectual property, liability and governing law.",
    },
    fr: {
      title: "Conditions générales | Pearly Sky",
      description:
        "Conditions d’utilisation du site et des services Pearly Sky : obligations de l’utilisateur, propriété intellectuelle, responsabilité et droit applicable.",
    },
  },
  privacyPolicy: {
    en: {
      title: "Privacy Policy | Pearly Sky",
      description:
        "How Pearly Sky collects, uses, shares and protects your personal data when you book our cleaning services, and how to exercise your GDPR rights.",
    },
    fr: {
      title: "Politique de confidentialité | Pearly Sky",
      description:
        "Comment Pearly Sky collecte, utilise, partage et protège vos données personnelles lorsque vous réservez nos services de nettoyage, et vos droits RGPD.",
    },
  },
  cookiePolicy: {
    en: {
      title: "Cookie Policy | Pearly Sky",
      description:
        "Which cookies the Pearly Sky website uses and why, which third parties set cookies, and how you can manage or disable them in your browser.",
    },
    fr: {
      title: "Politique relative aux cookies | Pearly Sky",
      description:
        "Les cookies utilisés par le site Pearly Sky et leur finalité, les cookies tiers, et comment les gérer ou les désactiver dans votre navigateur.",
    },
  },
};
