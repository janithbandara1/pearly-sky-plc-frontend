import { CURRENT_COUNTRY, IS_GLOBAL_SITE, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import { getTranslatedCountryPageMeta } from "./meta-templates";

export interface PageMeta {
  title: string;
  description?: string;
}

/** Fallback <title>/description, used by app/layout.tsx's root `metadata` export whenever a page has no `generateMetadata()` of its own. */
export const GLOBAL_META: PageMeta = {
  title: "Pearly Sky",
  description: "Cleaning services, booking, and account management.",
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
 * <title>/description for the global gateway (IS_GLOBAL_SITE) — France's
 * English copy above with the country reference stripped out, since the
 * gateway isn't any one country. Kept as its own table (rather than a 4th
 * "country" in COUNTRY_PAGE_META) because CountryCode intentionally only
 * has real, database-backed countries — "global" isn't one.
 */
const GLOBAL_PAGE_META: Record<CountryPageKey, PageMeta> = {
  home: {
    title: "Premium Eco-Luxury Cleaning Services | Pearly Sky",
    description:
      "Experience elite, eco-luxury residential & commercial cleaning. Five-star premium property care using sustainable, high-performance practices.",
  },
  about: {
    title: "About Us: Eco-Luxury Property Care | Pearly Sky",
    description:
      "Discover the story, strict standards, and values driving Pearly Sky Global. Dedicated to elite property care and lifestyle support.",
  },
  customers: {
    title: "Verified Client Reviews & Testimonials | Pearly Sky",
    description:
      "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates.",
  },
  contact: {
    title: "Contact Our Eco-Luxury Cleaning Team | Pearly Sky",
    description:
      "Get in touch with Pearly Sky Global for booking inquiries or custom service quotes. Reliable, immediate assistance.",
  },
  careers: {
    title: "Careers in Luxury Property Care | Pearly Sky",
    description:
      "Build a rewarding career in luxury property care. Explore open positions for professional cleaners and premium specialists.",
  },
  ourLocations: {
    title: "Our Service Locations | Pearly Sky Global",
    description:
      "Operating premium service clusters. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
  },
  blog: {
    title: "Eco-Luxury Cleaning Blog & Insights | Pearly Sky",
    description:
      "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces.",
  },
};

/**
 * Title/description for `page`. On the global gateway this is always
 * GLOBAL_PAGE_META — no country/language resolution applies there. On a
 * real country site, resolution order for CURRENT_COUNTRY in `language` is:
 * hand-written English copy (COUNTRY_PAGE_META above; the only hand-written
 * entry any country has) -> a generated translation (meta-templates.ts;
 * covers France's "fr"/"de"/"es"/"it") -> CURRENT_COUNTRY's English copy as
 * a last-resort fallback.
 */
export function getCountryPageMeta(page: CountryPageKey, language: LanguageCode): PageMeta {
  if (IS_GLOBAL_SITE) return GLOBAL_PAGE_META[page];

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
