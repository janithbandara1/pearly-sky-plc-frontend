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

type CountryPageKey = "home" | "about" | "customers" | "contact" | "careers" | "ourLocations";

/**
 * <title>/description for pages whose copy names the visitor's country —
 * same [page][country] matrix pattern used by home-content.ts/page-content.ts
 * for the rest of these pages' body content. Each country's title/description
 * is deliberately distinct text (not just a find/replace of the country name)
 * so hreflang-alternate URLs don't read as duplicate content.
 */
const COUNTRY_PAGE_META: Record<CountryPageKey, Record<CountryCode, PageMeta>> = {
  home: {
    fr: {
      title: "Eco-Luxury Home & Office Cleaning in France | Pearly Sky Cleaning",
      description:
        "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across France. Request an instant bespoke quote from Pearly Sky today.",
    },
    gb: {
      title: "Eco-Luxury Home & Office Cleaning in the United Kingdom | Pearly Sky Cleaning",
      description:
        "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across the United Kingdom. Request an instant bespoke quote from Pearly Sky today.",
    },
    lk: {
      title: "Eco-Luxury Home & Office Cleaning in Sri Lanka | Pearly Sky Cleaning",
      description:
        "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across Sri Lanka. Request an instant bespoke quote from Pearly Sky today.",
    },
  },
  about: {
    fr: {
      title: "About Us | Luxury & Sustainable Cleaning Excellence in France",
      description:
        "Discover the heritage of Pearly Sky in France. Learn about our strict carbon-neutral cleaning protocols, premium certified teams, and white-glove standards.",
    },
    gb: {
      title: "About Us | Luxury & Sustainable Cleaning Excellence in the United Kingdom",
      description:
        "Discover the heritage of Pearly Sky in the United Kingdom. Learn about our strict carbon-neutral cleaning protocols, premium certified teams, and white-glove standards.",
    },
    lk: {
      title: "About Us | Luxury & Sustainable Cleaning Excellence in Sri Lanka",
      description:
        "Discover the heritage of Pearly Sky in Sri Lanka. Learn about our strict carbon-neutral cleaning protocols, premium certified teams, and white-glove standards.",
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
      title: "Contact Our Luxury Concierge Team | Pearly Sky France",
      description:
        "Connect with our luxury hospitality consultants in France. Request custom site audits, specialized project pricing, or urgent elite schedule dispatches.",
    },
    gb: {
      title: "Contact Our Luxury Concierge Team | Pearly Sky United Kingdom",
      description:
        "Connect with our luxury hospitality consultants in the United Kingdom. Request custom site audits, specialized project pricing, or urgent elite schedule dispatches.",
    },
    lk: {
      title: "Contact Our Luxury Concierge Team | Pearly Sky Sri Lanka",
      description:
        "Connect with our luxury hospitality consultants in Sri Lanka. Request custom site audits, specialized project pricing, or urgent elite schedule dispatches.",
    },
  },
  careers: {
    fr: {
      title: "Join Our Team | Careers at Pearly Sky Cleaning in France",
      description:
        "Apply for elite professional cleaning positions in France. Discover competitive wages, exceptional benefits, and specialized eco-luxury hospitality training.",
    },
    gb: {
      title: "Join Our Team | Careers at Pearly Sky Cleaning in the United Kingdom",
      description:
        "Apply for elite professional cleaning positions in the United Kingdom. Discover competitive wages, exceptional benefits, and specialized eco-luxury hospitality training.",
    },
    lk: {
      title: "Join Our Team | Careers at Pearly Sky Cleaning in Sri Lanka",
      description:
        "Apply for elite professional cleaning positions in Sri Lanka. Discover competitive wages, exceptional benefits, and specialized eco-luxury hospitality training.",
    },
  },
  ourLocations: {
    fr: {
      title: "Our Locations & Service Areas | Pearly Sky Luxury France",
      description:
        "Find our operational branches and elite residential service coverage maps in France. Premium cleaning services delivered directly to your destination.",
    },
    gb: {
      title: "Our Locations & Service Areas | Pearly Sky Luxury United Kingdom",
      description:
        "Find our operational branches and elite residential service coverage maps in the United Kingdom. Premium cleaning services delivered directly to your destination.",
    },
    lk: {
      title: "Our Locations & Service Areas | Pearly Sky Luxury Sri Lanka",
      description:
        "Find our operational branches and elite residential service coverage maps in Sri Lanka. Premium cleaning services delivered directly to your destination.",
    },
  },
};

/** Falls back to France when country is null (unprefixed/global site). */
export function getCountryPageMeta(page: CountryPageKey, country: CountryCode | null): PageMeta {
  return COUNTRY_PAGE_META[page][country ?? "fr"];
}

type StaticPageKey = "blog" | "termsAndConditions" | "privacyPolicy";

/** <title>/description for pages whose copy is identical for every country. */
export const STATIC_PAGE_META: Record<StaticPageKey, PageMeta> = {
  blog: {
    title: "Blog | Pearly Sky",
    description: "Cleaning tips, industry insights, and company news from Pearly Sky's eco-luxury cleaning experts.",
  },
  termsAndConditions: {
    title: "Terms and Conditions | Pearly Sky",
  },
  privacyPolicy: {
    title: "Privacy Policy | Pearly Sky",
  },
};
