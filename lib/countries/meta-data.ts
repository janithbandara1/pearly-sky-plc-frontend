import type { CountryCode } from "./config";
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
 * <title>/description for pages whose copy names the visitor's country —
 * same [page][country] matrix pattern used by home-content.ts/page-content.ts
 * for the rest of these pages' body content. Text is transcribed verbatim
 * from the master blueprint (frontend/docs/pearly-sky-global-master-blueprint.md,
 * section 3) for every country it covers, so hreflang-alternate URLs don't
 * read as duplicate content.
 */
const COUNTRY_PAGE_META: Record<CountryPageKey, Record<CountryCode, PageMeta>> = {
  home: {
    fr: {
      title: "Premium Eco-Luxury Cleaning Services France & Monaco | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in France & Monaco. Five-star premium property care using sustainable, high-performance practices.",
    },
    gb: {
      title: "Premium Eco-Luxury Cleaning Services United Kingdom | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in The United Kingdom. Five-star premium property care using sustainable, high-performance practices.",
    },
    lk: {
      title: "Premium Eco-Luxury Cleaning Services Sri Lanka | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Sri Lanka. Five-star premium property care using sustainable, high-performance practices.",
    },
  },
  about: {
    fr: {
      title: "About Us: Eco-Luxury Property Care France & Monaco | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in France & Monaco. Dedicated to elite property care and lifestyle support.",
    },
    gb: {
      title: "About Us: Eco-Luxury Property Care United Kingdom | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in The United Kingdom. Dedicated to elite property care and lifestyle support.",
    },
    lk: {
      title: "About Us: Eco-Luxury Property Care Sri Lanka | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Sri Lanka. Dedicated to elite property care and lifestyle support.",
    },
  },
  customers: {
    fr: {
      title: "Verified Client Reviews & Testimonials France & Monaco | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in France & Monaco.",
    },
    gb: {
      title: "Verified Client Reviews & Testimonials United Kingdom | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in The United Kingdom.",
    },
    lk: {
      title: "Verified Client Reviews & Testimonials Sri Lanka | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Sri Lanka.",
    },
  },
  contact: {
    fr: {
      title: "Contact Our Eco-Luxury Cleaning Team France & Monaco | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global France & Monaco for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    gb: {
      title: "Contact Our Eco-Luxury Cleaning Team United Kingdom | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global United Kingdom for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    lk: {
      title: "Contact Our Eco-Luxury Cleaning Team Sri Lanka | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Sri Lanka for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
  },
  careers: {
    fr: {
      title: "Careers in Luxury Property Care France & Monaco | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in France & Monaco. Explore open positions for professional cleaners and premium specialists.",
    },
    gb: {
      title: "Careers in Luxury Property Care United Kingdom | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in The United Kingdom. Explore open positions for professional cleaners and premium specialists.",
    },
    lk: {
      title: "Careers in Luxury Property Care Sri Lanka | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Sri Lanka. Explore open positions for professional cleaners and premium specialists.",
    },
  },
  ourLocations: {
    fr: {
      title: "Our Service Locations in France & Monaco | Pearly Sky Global",
      description:
        "Operating premium service clusters across France & Monaco. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    gb: {
      title: "Our Service Locations in United Kingdom | Pearly Sky Global",
      description:
        "Operating premium service clusters across The United Kingdom. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    lk: {
      title: "Our Service Locations in Sri Lanka | Pearly Sky Global",
      description:
        "Operating premium service clusters across Sri Lanka. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
  },
  blog: {
    fr: {
      title: "Eco-Luxury Cleaning Blog & Insights France & Monaco | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in France & Monaco.",
    },
    gb: {
      title: "Eco-Luxury Cleaning Blog & Insights United Kingdom | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in The United Kingdom.",
    },
    lk: {
      title: "Eco-Luxury Cleaning Blog & Insights Sri Lanka | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Sri Lanka.",
    },
  },
};

/**
 * France's meta title/description in French, per page — the one
 * country/language combo besides each country's English default (mirrors
 * FR_PAGE_CONTENT_FR in page-content.ts). Every other country+language pair
 * (e.g. de-de, es-es) still resolves to COUNTRY_PAGE_META's English copy
 * until that country's body content is itself translated into that
 * language — see COUNTRY_LANGUAGES in ./config.
 */
const FR_PAGE_META_FR: Record<CountryPageKey, PageMeta> = {
  home: {
    title: "Services de Nettoyage Éco-Luxe Premium France & Monaco | Pearly Sky",
    description:
      "Découvrez un service de nettoyage résidentiel et commercial éco-luxe d'élite en France & Monaco. Entretien immobilier cinq étoiles avec des pratiques durables et hautement performantes.",
  },
  about: {
    title: "À Propos : Entretien de Propriétés Éco-Luxe France & Monaco | Pearly Sky",
    description:
      "Découvrez l'histoire, les normes strictes et les valeurs qui animent Pearly Sky Global en France & Monaco. Dédiés à l'entretien immobilier d'élite et au soutien lifestyle.",
  },
  customers: {
    title: "Avis et Témoignages Clients Vérifiés France & Monaco | Pearly Sky",
    description:
      "Découvrez ce que nos clients disent de nous. Lisez des avis vérifiés de propriétaires premium, de bureaux d'entreprise et de propriétés de luxe en France & Monaco.",
  },
  contact: {
    title: "Contactez Notre Équipe de Nettoyage Éco-Luxe France & Monaco | Pearly Sky",
    description:
      "Contactez Pearly Sky Global France & Monaco pour toute demande de réservation ou devis personnalisé. Une assistance fiable et immédiate.",
  },
  careers: {
    title: "Carrières dans l'Entretien de Propriétés de Luxe France & Monaco | Pearly Sky",
    description:
      "Construisez une carrière valorisante dans l'entretien de propriétés de luxe en France & Monaco. Découvrez nos postes ouverts pour nettoyeurs professionnels et spécialistes premium.",
  },
  ourLocations: {
    title: "Nos Zones de Service en France & Monaco | Pearly Sky Global",
    description:
      "Des clusters de service premium opérant à travers la France & Monaco. Trouvez votre portail de service Pearly Sky Global local et réservez un entretien éco-luxe d'élite.",
  },
  blog: {
    title: "Blog & Actualités Nettoyage Éco-Luxe France & Monaco | Pearly Sky",
    description:
      "Lisez des conseils professionnels, des guides d'entretien durable et des insights sur l'entretien immobilier d'élite pour les espaces premium en France & Monaco.",
  },
};

/** Falls back to France when country is null (unprefixed/global site). */
export function getCountryPageMeta(page: CountryPageKey, country: CountryCode | null, language: LanguageCode): PageMeta {
  const resolved = country ?? "fr";
  if (resolved === "fr" && language === "fr") return FR_PAGE_META_FR[page];
  return getTranslatedCountryPageMeta(page, resolved, language) ?? COUNTRY_PAGE_META[page][resolved];
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
