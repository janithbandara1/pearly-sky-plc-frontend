"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  Gem,
  Globe,
  Headset,
  Leaf,
  UserCheck,
  X,
} from "lucide-react";
import Link from "@/components/locale-link";
import type { OurServiceCopy, OurServicesContent } from "@/lib/content/our-services/types";
import { TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { cn } from "@/lib/utils";
import { greatVibes, playfair } from "./fonts";
import { ServicesQuoteForm } from "./services-quote-form";

const IMAGE_DIR = "/images/services/updated-";

/** Card photo per service id (the 660px variants). */
const IMAGES: Record<string, string> = {
  "regular-home-cleaning": "home-property-cleaning-services-1-standard-residential-cleaning-660w.webp",
  "essential-touch-up-cleaning": "home-property-cleaning-services-2-express-refresh-cleaning-660w.webp",
  "same-day-priority-cleaning": "home-property-cleaning-services-3-last-minute-cleaning-660w.webp",
  "deep-cleaning": "home-property-cleaning-services-4-deep-cleaning-660w.webp",
  "end-of-tenancy-cleaning": "home-property-cleaning-services-5-move-in-out-cleaning-660w.webp",
  "post-construction-renovation-cleaning":
    "home-property-cleaning-services-6-post-construction-renovation-cleaning-660w.webp",
  "premium-rental-concierge-cleaning":
    "home-property-cleaning-services-7-airbnb-short-term-rental-cleaning-660w.webp",
  "commercial-office-cleaning": "home-property-cleaning-services-8-commercial-office-cleaning-660w.webp",
  "healthguard-sanitization":
    "home-property-cleaning-services-9-healthguard-sanitization-medical-grade-eco-disinfection-660w.webp",
  "carpet-upholstery-cleaning": "home-property-cleaning-services-10-carpet-upholstery-cleaning-660w.webp",
  "steam-cleaning": "home-property-cleaning-services-11-steam-cleaning-660w.webp",
  "post-event-cleaning": "home-property-cleaning-services-12-post-event-cleaning-660w.webp",
  "pool-cleaning": "home-property-cleaning-services-13-pool-cleaning-660w.webp",
  "precision-pressure-washing": "home-property-cleaning-services-14-precision-pressure-washing-660w.webp",
  "child-care-service": "care-support-services-1-child-care-service-660w.webp",
  "elder-care-service": "care-support-services-2-elder-care-service-660w.webp",
  "laundry-service": "care-support-services-3-laundry-services-660w.webp",
  "move-in-out-transport-service": "care-support-services-4-move-in-out-transport-service-660w.webp",
  "high-security-property-care": "home-property-cleaning-services-15-security-cleaning-660w.webp",
  "luxury-yacht-cleaning": "home-property-cleaning-services-16-luxury-yacht-cleaning-660w.webp",
};

const CATEGORIES = [
  { id: "home", label: "Home Cleaning" },
  { id: "specialist", label: "Specialist Cleaning" },
  { id: "property", label: "Property Care" },
  { id: "office", label: "Office & Commercial" },
  { id: "lifestyle", label: "Lifestyle Services" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const CATEGORY_BY_SERVICE: Record<string, CategoryId> = {
  "regular-home-cleaning": "home",
  "essential-touch-up-cleaning": "home",
  "same-day-priority-cleaning": "home",
  "deep-cleaning": "home",
  "steam-cleaning": "specialist",
  "healthguard-sanitization": "specialist",
  "carpet-upholstery-cleaning": "specialist",
  "post-event-cleaning": "specialist",
  "precision-pressure-washing": "specialist",
  "pool-cleaning": "specialist",
  "end-of-tenancy-cleaning": "property",
  "high-security-property-care": "property",
  "premium-rental-concierge-cleaning": "property",
  "luxury-yacht-cleaning": "property",
  "commercial-office-cleaning": "office",
  "post-construction-renovation-cleaning": "office",
  "child-care-service": "lifestyle",
  "elder-care-service": "lifestyle",
  "laundry-service": "lifestyle",
  "move-in-out-transport-service": "lifestyle",
};

/**
 * The order (and so the card numbers) the design lists the services in. The
 * design's Floor Polishing, Window & Glass and Outdoor & Garden aren't services
 * we offer, so Pool Cleaning, Child Care and Laundry take slots 15, 17 and 18 and
 * every other service keeps the design's number.
 */
const SERVICE_ORDER = [
  "regular-home-cleaning",
  "essential-touch-up-cleaning",
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "post-construction-renovation-cleaning",
  "same-day-priority-cleaning",
  "high-security-property-care",
  "premium-rental-concierge-cleaning",
  "commercial-office-cleaning",
  "steam-cleaning",
  "post-event-cleaning",
  "luxury-yacht-cleaning",
  "healthguard-sanitization",
  "carpet-upholstery-cleaning",
  "pool-cleaning",
  "precision-pressure-washing",
  "child-care-service",
  "laundry-service",
  "move-in-out-transport-service",
  "elder-care-service",
];

const HERO_FEATURES = [
  { Icon: Leaf, title: "Eco-Friendly", subtitle: "Products" },
  { Icon: Gem, title: "Luxury", subtitle: "Standards" },
  { Icon: UserCheck, title: "Trusted", subtitle: "Professionals" },
  { Icon: Globe, title: "Global", subtitle: "Service Network" },
];

const PROMISES = [
  { Icon: Leaf, label: "100% Eco-Friendly Products" },
  { Icon: UserCheck, label: "Vetted & Trained Professionals" },
  { Icon: Gem, label: "Luxury Service Standards" },
  { Icon: CalendarDays, label: "Flexible Booking & Scheduling" },
  { Icon: Headset, label: "24/7 Customer Support" },
  { Icon: Globe, label: `${TOTAL_COUNTRIES} Countries Global Network` },
];

const bookNowClass =
  "gold-gradient-bg flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-navy-900 shadow-md transition-opacity hover:opacity-90";

/** The global gateway's Our Services page (IS_GLOBAL_SITE). */
export function GlobalServicesPage({ content }: { content: OurServicesContent }) {
  const services = useMemo(
    () => [...content.services].sort((a, b) => SERVICE_ORDER.indexOf(a.id) - SERVICE_ORDER.indexOf(b.id)),
    [content.services],
  );
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState<OurServiceCopy | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = useMemo(
    () => services.filter((service) => category === "all" || CATEGORY_BY_SERVICE[service.id] === category),
    [services, category],
  );
  const titles = useMemo(() => services.map((service) => service.title), [services]);

  const book = (title: string) => {
    setSelectedService(title);
    dialogRef.current?.close();
    document.getElementById("quote-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const openDetails = (service: OurServiceCopy) => {
    setDetails(service);
    dialogRef.current?.showModal();
  };

  const tabs = [
    { id: "all" as const, label: "All Services", count: services.length },
    ...CATEGORIES.map(({ id, label }) => ({
      id,
      label,
      count: services.filter((service) => CATEGORY_BY_SERVICE[service.id] === id).length,
    })),
  ];

  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex-1 bg-navy-900 font-sans text-slate-100`}>
      <section className="relative flex min-h-[580px] items-center justify-center overflow-hidden lg:min-h-[640px]">
        <Image src="/images/hero/hero-1.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/60 to-navy-900/90" />
        <p className="pointer-events-none absolute right-10 top-10 z-10 hidden -rotate-3 font-script text-3xl text-gold-400/90 drop-shadow-md md:block lg:right-24 lg:text-4xl">
          Cleaner Spaces, Brighter Days
        </p>

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 text-center">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-slate-300 backdrop-blur-md"
          >
            <Link href="/" className="min-h-0! hover:text-gold-400">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gold-400" />
            <span aria-current="page" className="text-gold-400">
              Our Services
            </span>
          </nav>

          <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Our Services
          </h1>
          <p className="mb-6 font-display text-xl font-medium text-gold-400 sm:text-2xl">
            Professional Cleaning Solutions for a Healthier, Brighter World
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            From homes and offices to yachts and specialized facilities, Pearly Sky delivers {services.length}{" "}
            professional, eco-friendly cleaning services with exceptional quality, trusted teams and sustainable
            solutions.
          </p>

          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {HERO_FEATURES.map(({ Icon, title, subtitle }) => (
              <li
                key={title}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-md transition-all hover:border-gold-500/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-white">{title}</span>
                  <span className="text-[11px] text-slate-400">{subtitle}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services-section" className="scroll-mt-20 bg-navy-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Our {services.length} Professional Cleaning Services
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Choose from our comprehensive range of eco-friendly cleaning services, designed for homes, offices,
                hotels and specialised facilities.
              </p>
            </div>
            <a
              href="#quote-section"
              className="gold-gradient-bg inline-flex min-h-0! items-center gap-2 self-start rounded-xl px-6 py-3 text-sm font-semibold text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110 lg:self-auto"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="scrollbar-hide mb-10 overflow-x-auto pb-4">
            <div role="group" aria-label="Filter by category" className="flex min-w-max items-center gap-3">
              {tabs.map(({ id, label, count }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={category === id}
                  onClick={() => setCategory(id)}
                  className={cn(
                    "rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all",
                    category === id
                      ? "bg-gold-500 text-navy-900 shadow-lg"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {visible.map((service) => (
              <li
                key={service.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-800/80 shadow-lg transition-all duration-300 hover:border-gold-500/50"
              >
                <div className="relative h-36 overflow-hidden">
                  <span className="gold-gradient-bg absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-navy-900 shadow-md">
                    {services.indexOf(service) + 1}
                  </span>
                  <Image
                    src={`${IMAGE_DIR}${IMAGES[service.id]}`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-800 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
                  <div>
                    <h3 className="mb-1 font-display text-sm font-bold leading-snug text-white">{service.title}</h3>
                    <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-400">{service.headline}</p>
                  </div>
                  <div className="space-y-2">
                    <button type="button" onClick={() => book(service.title)} className={bookNowClass}>
                      <span>Book Now</span>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openDetails(service)}
                      aria-label={`Details: ${service.title}`}
                      className="block w-full text-center text-[11px] font-semibold text-gold-400 transition-colors hover:text-gold-300"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-white/10 bg-navy-800 py-12">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:px-8">
          {PROMISES.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium text-slate-200">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <ServicesQuoteForm services={titles} service={selectedService} onServiceChange={setSelectedService} />

      <dialog
        ref={dialogRef}
        aria-labelledby="service-details-title"
        onClose={() => setDetails(null)}
        onClick={(event) => event.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl border border-gold-500/30 bg-navy-800 p-6 text-slate-100 shadow-2xl backdrop:bg-navy-900/80 backdrop:backdrop-blur-md sm:p-8"
      >
        {details && (
          <>
            <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 id="service-details-title" className="font-display text-xl font-bold text-white sm:text-2xl">
                  {details.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold-400">{details.headline}</p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => dialogRef.current?.close()}
                className="shrink-0 text-slate-400 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-slate-300">
              {details.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h4 className="mb-3 mt-6 text-xs font-bold uppercase tracking-wider text-gold-400">
              {details.highlightsTitle}
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              {details.features.map((feature) => (
                <div key={feature.title} className="rounded-xl border border-slate-800 bg-navy-700/60 p-4">
                  <h5 className="mb-2 text-xs font-bold text-white">{feature.title}</h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button type="button" onClick={() => book(details.title)} className={`${bookNowClass} mt-6 py-3 text-sm`}>
              <span>Book Now</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </>
        )}
      </dialog>
    </main>
  );
}
