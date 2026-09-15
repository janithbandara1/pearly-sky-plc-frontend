import { locations, type Location } from "@/lib/content/locations";
import type { Job } from "@/lib/content/jobs";
import type { BlogPost } from "@/lib/content/blog-posts";
import type { CountryCode } from "@/lib/countries/config";
import { SOCIAL_URLS } from "@/lib/content/social-links";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const LOGO_URL = `${SITE_URL}/images/brand/logo.webp`;
const SAME_AS = Object.values(SOCIAL_URLS);

/** Display names for schema.org fields — kept local so json-ld stays synchronous (no backend call). */
const COUNTRY_NAMES: Record<CountryCode, string> = {
  fr: "France",
  de: "Germany",
  lu: "Luxembourg",
  nl: "Netherlands",
  fi: "Finland",
  se: "Sweden",
  it: "Italy",
  pl: "Poland",
  be: "Belgium",
  at: "Austria",
  dk: "Denmark",
  es: "Spain",
  pt: "Portugal",
  ro: "Romania",
  ie: "Ireland",
  mc: "Monaco",
  ch: "Switzerland",
  gb: "United Kingdom",
  us: "United States",
  ca: "Canada",
  au: "Australia",
  nz: "New Zealand",
  qa: "Qatar",
  sa: "Saudi Arabia",
  ae: "United Arab Emirates",
  om: "Oman",
  bh: "Bahrain",
  lk: "Sri Lanka",
};

export function buildLocalBusinessJsonLd(office: Location, country: CountryCode) {
  const countryName = COUNTRY_NAMES[country];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Pearly Sky – ${countryName}`,
    image: LOGO_URL,
    url: SITE_URL,
    telephone: office.contactNo,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressCountry: countryName,
    },
    sameAs: SAME_AS,
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "9 December 2025" -> "2025-12-09". Manual parse to avoid relying on engine-specific Date parsing. */
function toIsoDate(displayDate: string): string {
  const [day, month, year] = displayDate.split(" ");
  const monthIndex = MONTHS.indexOf(month);
  if (monthIndex === -1 || !day || !year) return new Date().toISOString().slice(0, 10);
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function buildArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.image}`,
    datePublished: toIsoDate(post.date),
    author: { "@type": "Organization", name: "Pearly Sky" },
    publisher: {
      "@type": "Organization",
      name: "Pearly Sky",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  "flexible shifts": "OTHER",
  "contract": "CONTRACTOR",
  "internship": "INTERN",
};

function mapEmploymentTypes(employmentType: string): string[] {
  const types = employmentType
    .split("/")
    .map((t) => EMPLOYMENT_TYPE_MAP[t.trim().toLowerCase()])
    .filter((t): t is string => Boolean(t));
  return types.length > 0 ? types : ["OTHER"];
}

const LOCATIONS_BY_NAME = new Map(locations.map((loc) => [loc.name, loc]));

/** Postings don't carry an explicit expiry, so treat them as valid for 6 months from datePosted — refresh datePosted to extend. */
function computeValidThrough(datePosted: string): string {
  const [year, month, day] = datePosted.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1 + 6, day)).toISOString().slice(0, 10);
}

export function buildJobPostingJsonLd(job: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.aboutParagraphs.join(" "),
    datePosted: job.datePosted,
    validThrough: computeValidThrough(job.datePosted),
    employmentType: mapEmploymentTypes(job.employmentType),
    hiringOrganization: {
      "@type": "Organization",
      name: "Pearly Sky",
      sameAs: SAME_AS,
      logo: LOGO_URL,
    },
    jobLocation: job.location.split("/").map((loc) => {
      const name = loc.trim();
      const office = LOCATIONS_BY_NAME.get(name);
      return {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: name,
          ...(office?.streetAddress && { streetAddress: office.streetAddress }),
          ...(office?.addressLocality && { addressLocality: office.addressLocality }),
          ...(office?.addressRegion && { addressRegion: office.addressRegion }),
          ...(office?.postalCode && { postalCode: office.postalCode }),
        },
      };
    }),
  };
}
