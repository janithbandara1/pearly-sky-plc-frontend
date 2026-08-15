import type { CountryCode } from "./config";

export interface PageMeta {
  title: string;
  description?: string;
}

/** Fallback <title>/description, used by app/layout.tsx's root `metadata` export whenever a page has no `generateMetadata()` of its own. */
export const GLOBAL_META: PageMeta = {
  title: "Pearly Sky",
  description: "Cleaning services, booking, and account management.",
};

type CountryPageKey = "home" | "about" | "customers" | "contact";

/**
 * <title>/description for pages whose copy names the visitor's country —
 * same [page][country] matrix pattern used by home-content.ts/page-content.ts
 * for the rest of these pages' body content.
 */
const COUNTRY_PAGE_META: Record<CountryPageKey, Record<CountryCode, PageMeta>> = {
  home: {
    fr: {
      title: "Pearly Sky | Eco-Luxury Home & Office Cleaning in France",
      description:
        "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across France. Request an instant bespoke quote from Pearly Sky today.",
    },
    gb: {
      title: "Pearly Sky | Eco-Luxury Home & Office Cleaning in the United Kingdom",
      description:
        "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across the United Kingdom. Request an instant bespoke quote from Pearly Sky today.",
    },
    lk: {
      title: "Pearly Sky | Eco-Luxury Home & Office Cleaning in Sri Lanka",
      description:
        "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across Sri Lanka. Request an instant bespoke quote from Pearly Sky today.",
    },
  },
  about: {
    fr: {
      title: "About Us | Pearly Sky – Eco-Luxury Cleaning in France",
      description:
        "Learn about Pearly Sky's story, values, and commitment to eco-luxury cleaning and transport services across France.",
    },
    gb: {
      title: "About Us | Pearly Sky – Eco-Luxury Cleaning in the United Kingdom",
      description:
        "Learn about Pearly Sky's story, values, and commitment to eco-luxury cleaning and transport services across the United Kingdom.",
    },
    lk: {
      title: "About Us | Pearly Sky – Eco-Luxury Cleaning in Sri Lanka",
      description:
        "Learn about Pearly Sky's story, values, and commitment to eco-luxury cleaning and transport services across Sri Lanka.",
    },
  },
  customers: {
    fr: {
      title: "Our Customers | Pearly Sky",
      description:
        "Trusted by discerning clients across France — ultra-high-net-worth families, luxury yacht owners, and five-star hospitality venues.",
    },
    gb: {
      title: "Our Customers | Pearly Sky",
      description:
        "Trusted by discerning clients across the United Kingdom — ultra-high-net-worth families, luxury yacht owners, and five-star hospitality venues.",
    },
    lk: {
      title: "Our Customers | Pearly Sky",
      description:
        "Trusted by discerning clients across Sri Lanka — ultra-high-net-worth families, luxury yacht owners, and five-star hospitality venues.",
    },
  },
  contact: {
    fr: {
      title: "Contact Us | Pearly Sky",
      description: "Get in touch with Pearly Sky's concierge team in France — call, WhatsApp, or visit our office.",
    },
    gb: {
      title: "Contact Us | Pearly Sky",
      description:
        "Get in touch with Pearly Sky's concierge team in the United Kingdom — call, WhatsApp, or visit our office.",
    },
    lk: {
      title: "Contact Us | Pearly Sky",
      description: "Get in touch with Pearly Sky's concierge team in Sri Lanka — call, WhatsApp, or visit our office.",
    },
  },
};

/** Falls back to France when country is null (unprefixed/global site). */
export function getCountryPageMeta(page: CountryPageKey, country: CountryCode | null): PageMeta {
  return COUNTRY_PAGE_META[page][country ?? "fr"];
}

type StaticPageKey = "careers" | "blog" | "ourLocations" | "termsAndConditions" | "privacyPolicy";

/** <title>/description for pages whose copy is identical for every country. */
export const STATIC_PAGE_META: Record<StaticPageKey, PageMeta> = {
  careers: {
    title: "Careers | Pearly Sky",
    description: "Join the Pearly Sky team — explore open roles in eco-luxury cleaning, hospitality, and care services.",
  },
  blog: {
    title: "Blog | Pearly Sky",
    description: "Cleaning tips, industry insights, and company news from Pearly Sky's eco-luxury cleaning experts.",
  },
  ourLocations: {
    title: "Our Locations | Pearly Sky",
    description:
      "Explore Pearly Sky's eco-luxury cleaning and transport services across France, the United Kingdom, Sri Lanka, and beyond.",
  },
  termsAndConditions: {
    title: "Terms and Conditions | Pearly Sky",
  },
  privacyPolicy: {
    title: "Privacy Policy | Pearly Sky",
  },
};
