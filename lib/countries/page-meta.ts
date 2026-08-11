import type { CountryCode } from "./config";

type PageKey = "about" | "customers" | "contact";

interface PageMeta {
  title: string;
  description: string;
}

/**
 * <title>/description for pages whose copy names the visitor's country —
 * same [page][country] matrix pattern as home-content.ts/page-content.ts,
 * mirroring the body content already localized on these pages.
 */
const COUNTRY_PAGE_META: Record<PageKey, Record<CountryCode, PageMeta>> = {
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
export function getCountryPageMeta(page: PageKey, country: CountryCode | null): PageMeta {
  return COUNTRY_PAGE_META[page][country ?? "fr"];
}
