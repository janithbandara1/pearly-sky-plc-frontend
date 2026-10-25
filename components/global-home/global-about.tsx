import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Droplets,
  Feather,
  Gem,
  Globe,
  Handshake,
  Heart,
  House,
  Leaf,
  Lightbulb,
  PawPrint,
  Recycle,
  ShieldCheck,
  Sprout,
  Star,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "@/components/locale-link";
import { REGIONAL_DATA, TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { getOurServicesContent } from "@/lib/content/our-services";
import { WORLD_MAP } from "@/lib/content/world-map";
import { greatVibes, playfair } from "./fonts";

const HERO_BADGES = [
  { Icon: Leaf, title: "Eco-Friendly", subtitle: "Solutions" },
  { Icon: Gem, title: "Luxury", subtitle: "Experience" },
  { Icon: Globe, title: "Global", subtitle: "Standards" },
  { Icon: ShieldCheck, title: "Trusted", subtitle: "Professionals" },
];

const STORY_HIGHLIGHTS = [
  { Icon: Sprout, title: "Sustainable Cleaning", text: "We use certified non-toxic, plant-based products." },
  { Icon: Gem, title: "Luxury Standards", text: "Meticulous care for exceptional results." },
  { Icon: Users, title: "Global Team", text: "Professionals trained to the highest standards." },
];

const VALUES = [
  { Icon: Sprout, title: "Sustainability", text: "Protecting our planet for future generations." },
  { Icon: Gem, title: "Quality", text: "Excellence in every detail." },
  { Icon: Heart, title: "Customer Focus", text: "Your satisfaction is our priority." },
  { Icon: Handshake, title: "Integrity", text: "Honest and reliable in everything we do." },
  { Icon: Lightbulb, title: "Innovation", text: "Always exploring better solutions." },
];

const CERTIFICATIONS = [
  { Icon: Compass, title: "Green Compass", subtitle: "Eco-Certified" },
  { Icon: Sprout, title: "Eco Friendly", subtitle: "Products" },
  { Icon: Droplets, title: "Non-Toxic", subtitle: "Cleaning" },
  { Icon: Recycle, title: "Sustainable", subtitle: "Practices" },
  { Icon: PawPrint, title: "Pet Safe", subtitle: "Certified" },
];

const REGION_CARDS = [
  { region: "Europe Union", label: "Europe" },
  { region: "Middle East & Asia", label: "Middle East & Asia" },
  { region: "Australia & New Zealand", label: "Australia & New Zealand" },
  { region: "North America", label: "North America" },
].map(({ region, label }) => ({
  label,
  count: REGIONAL_DATA.find((group) => group.region === region)?.countries.length ?? 0,
}));

const LIVE_WEBSITES = REGIONAL_DATA.flatMap((group) => group.countries).filter((country) => country.isLive).length;

const sectionLabel = "rounded-md bg-gold-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-600";
const goldButton =
  "gold-gradient-bg inline-flex min-h-0! items-center gap-3 rounded-xl px-6 py-3 text-sm font-bold text-navy-900 shadow-md transition-all hover:shadow-lg hover:brightness-105";

/** The global gateway's About Us page (IS_GLOBAL_SITE). */
export function GlobalAbout() {
  const serviceCount = getOurServicesContent("en").services.length;
  const stats = [
    { Icon: Globe, value: `${TOTAL_COUNTRIES}+`, label: "Countries" },
    { Icon: House, value: `${serviceCount}+`, label: "Professional Services" },
    { Icon: UsersRound, value: `${LIVE_WEBSITES}`, label: "Live Websites" },
    { Icon: ShieldCheck, value: "100%", label: "Eco-Friendly Products" },
    { Icon: Star, value: "5-Star", label: "Service Quality" },
  ];

  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex-1 bg-gray-50 font-sans text-gray-800`}>
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/images/about/hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-gold-500/80 sm:text-sm">
            <Link href="/" className="min-h-0! hover:text-gold-500">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span aria-current="page" className="text-white">
              About Us
            </span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              About Us
            </h1>
            <p className="mb-6 font-display text-2xl italic text-gold-300 sm:text-3xl">
              A Cleaner World. A Brighter Tomorrow.
            </p>
            <p className="mb-12 text-base leading-relaxed text-gray-300 sm:text-lg">
              Pearly Sky Eco-Luxury Cleaning Global delivers exceptional cleaning experiences worldwide with a commitment
              to sustainability, elegance and global well-being.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 md:grid-cols-4">
            {HERO_BADGES.map(({ Icon, title, subtitle }) => (
              <li
                key={title}
                className="flex items-center gap-3 rounded-xl border border-gold-500/20 bg-navy-800/60 p-4 backdrop-blur-md transition hover:border-gold-500/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-500">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-bold text-white sm:text-sm">{title}</span>
                  <span className="text-[11px] text-gray-400">{subtitle}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 right-8 hidden text-right font-display text-6xl italic text-white opacity-10 xl:block"
        >
          Pure Spaces. Elevated Living.
        </p>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <span className={sectionLabel}>Our Story</span>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
                The Vision Behind Pearly Sky
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                Pearly Sky was founded with a simple but powerful vision — to redefine cleaning through sustainability,
                quality and care. We believe a clean space is more than just a tidy environment; it&apos;s a healthier,
                happier and more inspired way of living.
              </p>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                What started as a local cleaning service has grown into a global brand, delivering premium,
                eco-friendly cleaning solutions for homes, offices, hotels and specialised facilities across{" "}
                {TOTAL_COUNTRIES} countries.
              </p>
              <div className="pt-4">
                <Link href="/our-services" className={goldButton}>
                  <span>Our Services</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
                <div className="relative h-[400px] sm:h-[480px]">
                  <Image
                    src="/images/about/welcome.webp"
                    alt="A Pearly Sky cleaning professional in a bright, eco-friendly kitchen"
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <ul className="absolute inset-x-4 bottom-4 grid grid-cols-1 gap-4 rounded-xl border border-gold-500/30 bg-navy-900/85 p-6 text-white backdrop-blur-md sm:grid-cols-3">
                  {STORY_HIGHLIGHTS.map(({ Icon, title, text }) => (
                    <li key={title} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                      <div>
                        <h3 className="font-display text-xs font-bold sm:text-sm">{title}</h3>
                        <p className="mt-1 text-[11px] text-gray-300">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-6 divide-y divide-navy-700 rounded-2xl bg-navy-900 p-8 text-center text-white shadow-xl md:grid-cols-5 md:divide-x md:divide-y-0">
            {stats.map(({ Icon, value, label }, index) => (
              <div key={label} className={`flex flex-col-reverse pt-4 md:pt-0 ${index === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
                <dt className="mt-1 text-xs uppercase tracking-wider text-gray-400">{label}</dt>
                <dd>
                  <Icon className="mx-auto mb-1 h-6 w-6 text-gold-500" />
                  <span className="font-display text-2xl font-bold sm:text-3xl">{value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition hover:border-gold-500 sm:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gold-500/5 transition group-hover:bg-gold-500/15" />
            <span className={sectionLabel}>Our Mission</span>
            <h2 className="mb-4 mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Cleaner Spaces. Brighter Lives.
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Our mission is to provide world-class, eco-luxury cleaning services that enhance the well-being of our
              clients, communities and the environment. We are committed to using sustainable practices, innovative
              solutions and highly trained professionals to deliver spotless, healthier spaces everywhere we operate.
            </p>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-navy-700 bg-navy-900 p-8 text-white shadow-lg transition hover:border-gold-500 sm:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gold-500/10 transition group-hover:bg-gold-500/25" />
            <Feather aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-20 w-20 text-gold-500/10" />
            <span className="rounded-md bg-gold-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-500">
              Our Vision
            </span>
            <h2 className="mb-4 mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              To Be the Global Leader in Eco-Luxury Cleaning
            </h2>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              We envision a cleaner, healthier and more sustainable world, where every home, office and workspace
              benefits from premium, eco-friendly cleaning solutions delivered with integrity, innovation and care.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className={sectionLabel}>Our Values</span>
          <h2 className="mb-12 mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">What Guides Every Sparkle</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map(({ Icon, title, text }, index) => (
              <li
                key={title}
                className={`group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:border-gold-500 hover:shadow-xl ${index === VALUES.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 transition group-hover:bg-gold-500 group-hover:text-navy-900">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-navy-900">{title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-900 py-20 text-white">
        <svg
          viewBox={`0 ${WORLD_MAP.top} ${WORLD_MAP.width} ${WORLD_MAP.height}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
        >
          <path d={WORLD_MAP.land} fill="#d4af37" />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-6">
            <span className="rounded-md bg-gold-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-500">
              Global Footprint
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
              Global Presence <br />
              <span className="text-gold-500">{TOTAL_COUNTRIES} Countries, One Standard</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              From Europe to Asia, Australia to the Americas, Pearly Sky delivers consistent, high-quality cleaning
              services with local expertise and global standards.
            </p>
            <Link href="/our-locations" className={goldButton}>
              <span>View All Locations</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="space-y-4 lg:col-span-6">
            {REGION_CARDS.map(({ label, count }) => (
              <li
                key={label}
                className="flex items-center justify-between rounded-xl border border-gold-500/30 bg-navy-800/80 p-4 backdrop-blur-md transition hover:bg-navy-800"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 text-gold-500">
                    <Globe className="h-4 w-4" />
                  </span>
                  <span className="font-display text-sm font-bold sm:text-base">{label}</span>
                </span>
                <span className="rounded-full bg-gold-500/20 px-3 py-1 text-xs font-semibold text-gold-500">
                  {count} {count === 1 ? "Country" : "Countries"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-2 font-display text-xl font-bold text-navy-900 sm:text-2xl">Certified. Trusted. Responsible.</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xs text-gray-600 sm:text-sm">
            We use certified non-toxic, eco-friendly and plant-based products, and follow international best practices
            to ensure the highest standards of safety, health and environmental care.
          </p>
          <ul className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-5">
            {CERTIFICATIONS.map(({ Icon, title, subtitle }, index) => (
              <li
                key={title}
                className={`flex w-full flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 shadow-sm transition hover:shadow-md ${index === CERTIFICATIONS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold text-navy-900">{title}</span>
                <span className="text-[10px] text-gray-500">{subtitle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
