# Global gateway site — URLs & metadata

**Domain:** https://pearlyskyglobalclean.com  
**Deployment setting:** `NEXT_PUBLIC_COUNTRY=global`, `NEXT_PUBLIC_SITE_URL=https://pearlyskyglobalclean.com`  
**Languages:** English (`/en`)  
**Generated:** 2026-10-07, from the source code in this repository (frontend + backend seed data) — not from the live site.

> This reflects the code as it is now, including changes not yet deployed. Service pages assume the database holds what
> `backend/src/database/seed-fr.ts` seeds (all services active, no extra per-country SEO overrides added from the staff dashboard).
> Anything edited in the database after seeding would change the service titles, descriptions or slugs listed here.

## Summary

| | Count |
|---|---|
| Public page URLs | 18 |
| …listed in `sitemap.xml` | 18 |
| Redirecting URLs (308) — **not** in `sitemap.xml` | 0 |
| Private / utility routes (blocked in robots.txt) | — |

**Contents:** [Main pages](#main-pages) · [Legal pages](#legal-pages) · [Blog posts](#blog-posts) · [Job postings](#job-postings) · [Blocked routes](#blocked-routes) · [Observations](#observations) · [robots.txt](#robotstxt)

## Site-wide metadata

Set in `app/layout.tsx` and `lib/countries/seo.ts` (`buildSocialMeta`), applied to every page unless the page overrides it:

| Field | Value |
|---|---|
| `metadataBase` | `https://pearlyskyglobalclean.com` (relative canonicals and image paths resolve against it) |
| `<html lang>` | `en` |
| `og:site_name` | Pearly Sky |
| `og:type` | website |
| `twitter:card` | summary_large_image |
| Default `og:image` / `twitter:image` | `https://pearlyskyglobalclean.com/images/hero/hero-1.webp` (pages with their own image: blog posts, services) |
| `og:title` / `og:description` | Same as the page's title / description unless noted |
| Fallback title (pages with no metadata of their own) | Pearly Sky |
| Fallback description | Cleaning services, booking, and account management. |

### Canonical & hreflang

- The main pages (home, about, customers, locations, blog index, careers index, contact, our-services) have a **self-referencing canonical and no hreflang** (`buildGlobalAlternates`): the gateway's pages are not translations of any country site.
- The legal pages, blog posts and job postings use `buildCountryAlternates` instead, so they carry a self canonical **plus** 16 hreflang links pointing at the three country sites, with `x-default` → `https://pearlyskyglobalclean.fr/en/…`. See [Observations](#observations).

## Main pages

*Metadata source:* `lib/countries/meta-data.ts` (`getCountryPageMeta`), translated via `lib/countries/meta-templates.ts`; `/our-services` is hard-coded in `app/(site)/our-services/page.tsx`.

### Home

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en | Global Eco-Luxury Cleaning Services \| Pearly Sky Worldwide | Experience world-class, sustainable residential & commercial eco-luxury cleaning. Bespoke, premium care tailored to your elite worldwide lifestyle. |

### About Us

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/about-us | The Elite Global Eco-Luxury Cleaning Team \| Pearly Sky | Discover our global commitment to ultra-premium, sustainable cleaning excellence. Trusted by high-net-worth clients and luxury estates worldwide. |

### Our Customers

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/our-customers | Global Client Reviews & 5-Star Testimonials \| Pearly Sky | Read verified testimonials from high-profile residents, luxury estates, and premium corporate clients who trust Pearly Sky worldwide. |

### Our Locations

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/our-locations | Global Operations & Locations \| Pearly Sky Worldwide | Explore Pearly Sky's international service locations. Providing elite eco-luxury cleaning and estate management services across global destinations. |

### Blog

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/blog | Eco-Luxury Living & Estate Maintenance Blog \| Pearly Sky | Expert international insights on sustainable luxury living, elite property maintenance, and world-class eco-friendly cleaning practices. |

### Careers

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/careers | Join Our Elite Global Team \| Pearly Sky Careers | Apply for premium cleaning and property care careers at Pearly Sky Worldwide. Join a rewarding, high-end global brand with superior training. |

### Contact Us

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/contact-us | Book Your Global Luxury Clean \| Contact Pearly Sky | Get in touch with Pearly Sky Eco-Luxury Cleaning Services. Request a bespoke quote for premium residential or corporate cleaning worldwide. |

### Our Services

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |

## Legal pages

*Metadata source:* `STATIC_PAGE_META` in `lib/countries/meta-data.ts`.

### Privacy Policy

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/privacy-policy | Privacy Policy \| Pearly Sky | How Pearly Sky collects, uses, shares and protects your personal data when you book our cleaning services, and how to exercise your GDPR rights. | Privacy Policy |

### Cookie Policy

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/cookie-policy | Cookie Policy \| Pearly Sky | Which cookies the Pearly Sky website uses and why, which third parties set cookies, and how you can manage or disable them in your browser. | Cookie Policy |

### Terms and Conditions

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/terms-and-conditions | Terms and Conditions \| Pearly Sky | The terms for using the Pearly Sky website and cleaning services: user responsibilities, intellectual property, liability and governing law. | Terms and Conditions |

## Blog posts

*Metadata source:* `lib/content/blog-posts.ts` — title is `{post title} | Pearly Sky Blog`.

### Blog — The Importance Of Regular Cleaning For A Healthy Home

**og:image:** `https://pearlyskyglobalclean.com/images/blog/article-1.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/blog/importance-of-regular-cleaning | The Importance Of Regular Cleaning For A Healthy Home \| Pearly Sky Blog | Why a consistent cleaning routine does more for your home than just appearances — and how to keep it up without the effort. |

### Blog — Top 5 Cleaning Tips For Busy Professionals

**og:image:** `https://pearlyskyglobalclean.com/images/blog/article-2.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/blog/top-5-cleaning-tips | Top 5 Cleaning Tips For Busy Professionals \| Pearly Sky Blog | Get expert advice on how to keep your space clean and organized, even on the busiest of days. |

### Blog — The Benefits Of Eco-Friendly Cleaning Services

**og:image:** `https://pearlyskyglobalclean.com/images/blog/article-3.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/blog/eco-friendly-cleaning | The Benefits Of Eco-Friendly Cleaning Services \| Pearly Sky Blog | Learn about the advantages of choosing eco-friendly cleaning services for your home or business. |

### Blog — How To Choose The Right Cleaning Service For Your Needs

**og:image:** `https://pearlyskyglobalclean.com/images/blog/choose-right-cleaning-service.jpg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/blog/choose-right-cleaning-service | How To Choose The Right Cleaning Service For Your Needs \| Pearly Sky Blog | Find out what to look for when selecting a cleaning service that meets your specific requirements. |

## Job postings

*Metadata source:* `lib/content/jobs.ts` + the i18n dictionaries; title/description built in `app/(site)/careers/[jobId]/page.tsx`.

### Job — Cleaner (Male / Female) — Residential and Commercial Properties

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/careers/residential-cleaner | Residential & Commercial Cleaner \| Careers at Pearly Sky | Join Pearly Sky as a Residential & Commercial Cleaner in France. Full-time, part-time and flexible opportunities may be available depending on location. |

### Job — Children Care Worker (Male / Female)

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/careers/childcare-assistant | Childcare Assistant \| Careers at Pearly Sky | Explore Childcare Assistant opportunities with Pearly Sky in France. Part-time and full-time roles may be available depending on location and requirements. |

### Job — Elder Care Worker (Male / Female)

**og:image:** `https://pearlyskyglobalclean.com/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.com/en/careers/elder-care-assistant | Elder Care Assistant \| Careers at Pearly Sky | Explore Elder Care Assistant opportunities with Pearly Sky in France. Full-time, part-time and flexible roles may be available depending on location. |

## Blocked routes

The gateway has no backend, so `proxy.ts` only serves these paths (each under `/en`) and 308-redirects everything else — services,
login/sign-up, checkout, account and staff pages — to `/en`:

`/`, `/about-us`, `/our-customers`, `/our-locations`, `/contact-us`, `/our-services`, `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, `/blog/*`, `/careers/*`

## Observations

- The legal pages, blog posts and job postings emit hreflang links to the three country sites and set `x-default` to the **France** site,
  while the gateway's main pages deliberately carry none. Search engines may read the gateway's copy as an alternate of the France page.
  If that's not intended, these pages should use `buildGlobalAlternates` like the main pages do.
- The cookie policy is reachable here but, like on the country sites, it is listed in the sitemap only by the current code (not yet deployed).

## robots.txt

Generated by `app/robots.ts`:

```text
User-Agent: *
Allow: /
Disallow: /login
Disallow: /signup
Disallow: /staff/*
Disallow: /profile
Disallow: /addresses
Disallow: /bookings*
Disallow: /quotations*
Disallow: /dashboard*
Disallow: /forgot-password
Disallow: /*/forgot-password
Disallow: /booking-confirmation/*
Disallow: /quotation-confirmation/*
Disallow: /services/*/checkout
Disallow: /services/*/form-submit
Disallow: /careers/*/apply
Disallow: /checkout
Disallow: /payment-confirmation
Disallow: /*/booking-confirmation/*
Disallow: /*/quotation-confirmation/*
Disallow: /*/services/*/checkout
Disallow: /*/services/*/form-submit
Disallow: /*/careers/*/apply
Disallow: /*/checkout
Disallow: /*/payment-confirmation
Disallow: /api/*

User-Agent: Googlebot
Allow: /
Allow: /api/catalog/
Allow: /api/countries
Disallow: /login
Disallow: /signup
Disallow: /staff/*
Disallow: /profile
Disallow: /addresses
Disallow: /bookings*
Disallow: /quotations*
Disallow: /dashboard*
Disallow: /forgot-password
Disallow: /*/forgot-password
Disallow: /booking-confirmation/*
Disallow: /quotation-confirmation/*
Disallow: /services/*/checkout
Disallow: /services/*/form-submit
Disallow: /careers/*/apply
Disallow: /checkout
Disallow: /payment-confirmation
Disallow: /*/booking-confirmation/*
Disallow: /*/quotation-confirmation/*
Disallow: /*/services/*/checkout
Disallow: /*/services/*/form-submit
Disallow: /*/careers/*/apply
Disallow: /*/checkout
Disallow: /*/payment-confirmation
Disallow: /api/*
Disallow: /api/auth/

Sitemap: https://pearlyskyglobalclean.com/sitemap.xml
```
