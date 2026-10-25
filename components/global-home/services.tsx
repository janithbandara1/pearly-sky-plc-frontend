import Image from "next/image";
import { Anchor, ArrowRight, Building2, HandHeart, House, WandSparkles } from "lucide-react";
import Link from "@/components/locale-link";
import { TOTAL_COUNTRIES } from "@/lib/content/global-countries";

const SERVICES_DIR = "/images/services";

export const GLOBAL_SERVICES = [
  {
    value: "residential",
    title: "Residential Cleaning Services",
    description: "Ultra-clean, dust-free homes using eco-safe non-toxic formulations.",
    image: `${SERVICES_DIR}/updated-home-property-cleaning-services-1-standard-residential-cleaning-660w.webp`,
    Icon: House,
  },
  {
    value: "commercial",
    title: "Commercial & Office Cleaning",
    description: "Pristine corporate spaces fostering health and high productivity.",
    image: `${SERVICES_DIR}/updated-home-property-cleaning-services-8-commercial-office-cleaning-660w.webp`,
    Icon: Building2,
  },
  {
    value: "yacht",
    title: "Luxury Yacht Cleaning",
    description: "Specialised marine detailing and eco-marine certified care.",
    image: `${SERVICES_DIR}/updated-home-property-cleaning-services-16-luxury-yacht-cleaning-660w.webp`,
    Icon: Anchor,
  },
  {
    value: "concierge",
    title: "Care & Concierge Services",
    description: "Bespoke home stewardship and personalized luxury assistance.",
    image: `${SERVICES_DIR}/updated-care-support-services-2-elder-care-service-660w.webp`,
    Icon: HandHeart,
  },
  {
    value: "addons",
    title: "Premium Add-On Services",
    description: "Deep carpet steam, marble polishing, crystal chandelier care.",
    image: `${SERVICES_DIR}/updated-home-property-cleaning-services-10-carpet-upholstery-cleaning-660w.webp`,
    Icon: WandSparkles,
  },
];

export function GlobalServices() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-gold-500/10 bg-navy-900 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gold-400">Our Services</span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">20 Professional Cleaning Services</h2>
            <p className="mt-2 max-w-xl text-xs text-slate-400 sm:text-sm">
              Comprehensive, eco-friendly cleaning solutions for homes, offices, hotels, and specialised facilities
              across {TOTAL_COUNTRIES} global destinations.
            </p>
          </div>
          <Link
            href="/our-services"
            className="glass-panel flex items-center gap-2 self-start rounded-full border-gold-500/30! px-5 py-2.5 text-xs font-semibold text-gold-400 transition-all hover:bg-gold-500 hover:text-navy-900 md:self-auto"
          >
            <span>View All 20 Services</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {GLOBAL_SERVICES.map(({ value, title, description, image, Icon }) => (
            <Link
              key={value}
              href="/our-services"
              className="group relative flex h-72 flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/60 bg-navy-800 transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl"
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/60 to-transparent" />
              <div className="relative z-10 p-4">
                <span className="glass-panel flex h-9 w-9 items-center justify-center rounded-xl border-gold-500/40! text-gold-400 shadow-md">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="relative z-10 p-4">
                <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-gold-300">
                  {title}
                </h3>
                <p className="mt-1 line-clamp-2 text-[11px] text-slate-300">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
