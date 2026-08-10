"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, Leaf, Layers, Users, Sparkles, Clock, Wallet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { useLanguage } from "@/lib/i18n/language-context";

const CORE_IDENTITY = [
  {
    label: "Pristine Care",
    text: "We are committed to an unmatched level of detail and excellence in every service we provide.",
  },
  {
    label: "Eco-Luxury",
    text: "We combine sustainable, non-toxic practices with a premium, white-glove approach.",
  },
  {
    label: "Comprehensive Service",
    text: "We are your trusted partner for both elite cleaning care and reliable transport solutions.",
  },
];

const WHY_CHOOSE_US = [
  {
    Icon: Users,
    title: "Experienced Team",
    text: "Our trained, professional, and courteous staff are experts in handling any cleaning challenge with discretion and precision.",
  },
  {
    Icon: Leaf,
    title: "Eco-Friendly Practices",
    text: "We utilize safe, non-toxic, and advanced cleaning products, ensuring our methods are gentle on the environment and safe for your family or employees.",
  },
  {
    Icon: Layers,
    title: "Customized Solutions",
    text: "Every client is unique. We tailor our cleaning and transport services to meet your specific needs, schedules, and luxury preferences.",
  },
  {
    Icon: Wallet,
    title: "Affordable Luxury",
    text: "We provide competitive rates that deliver premium service without compromising quality.",
  },
  {
    Icon: Clock,
    title: "24/7 Availability",
    text: "We are here for you, offering reliable and prompt service, anytime you need us.",
  },
];

const VISION_MISSION = [
  {
    Icon: Compass,
    title: "aboutPageVisionTitle" as const,
    text: "We deliver excellence by striving for exceptional quality and outstanding results for all our clients and partners.",
  },
  {
    Icon: Sparkles,
    title: "aboutPageMissionTitle" as const,
    text: "We lead through exceptional service and creative innovation, driving progress across our cleaning and transport sectors.",
  },
];

const CORE_VALUES = ["Diversity, Inclusion & Equity", "Accountability", "Sustainability", "Teamwork", "Service Excellence"];
const OBJECTIVES = [
  "Promote diversity and inclusion",
  "Attract and retain top talent",
  "Encourage innovation",
  "Exceed partner expectations",
  "Build a strong service culture",
];

export default function AboutPage() {
  const { translate } = useLanguage();

  return (
    <main className="flex-1">
      <PageHero
        image="/images/about/hero.webp"
        eyebrow={translate("aboutPageEyebrow")}
        title={translate("aboutPageHeroTitle")}
      />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            {translate("aboutPageIdentityTitle")}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {translate("aboutPageIdentitySubtitle")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            At Pearly Sky, we believe true cleanliness is an art form — the foundation of a healthy, productive, and
            serene environment.
          </p>
          <ul className="mt-6 space-y-4">
            {CORE_IDENTITY.map((item) => (
              <li key={item.label} className="flex gap-2 text-sm">
                <span className="font-semibold text-brand-navy">{item.label}:</span>
                <span className="text-muted-foreground">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            {translate("aboutPageStoryTitle")}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {translate("aboutPageStorySubtitle")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pearly Sky Cleaning Services began as a small local business driven by a singular vision: to revolutionize
            the cleaning industry by setting a new standard for quality, innovation, and sustainability.
          </p>
          <p className="mt-4 text-muted-foreground">
            Since then, we&apos;ve grown into a trusted name across France and beyond. Our journey is guided by a deep
            passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.
          </p>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-brand-navy-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{translate("aboutPageWhyTitle")}</h2>
          <p className="mt-2 text-brand-navy-foreground/70">{translate("aboutPageWhySubtitle")}</p>
        </div>
        <div className="mx-auto mt-10 grid w-full max-w-6xl gap-4 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-xl bg-white/5 p-5">
              <Icon className="h-6 w-6 text-brand-gold" />
              <p className="mt-3 font-semibold text-brand-gold">{title}</p>
              <p className="mt-1 text-sm text-brand-navy-foreground/80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-16">
        <div className="absolute inset-0">
          <Image src="/images/about/vision.webp" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-white/85" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            {translate("aboutPageVisionMissionTitle")}
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {VISION_MISSION.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-brand-gold/40 bg-brand-navy p-6 text-brand-navy-foreground">
                <Icon className="h-6 w-6 text-brand-gold" />
                <p className="mt-3 font-semibold">{translate(title)}</p>
                <p className="mt-2 text-sm text-brand-navy-foreground/80">{text}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-brand-gold/40 bg-brand-navy p-6 text-brand-navy-foreground">
              <ShieldCheck className="h-6 w-6 text-brand-gold" />
              <p className="mt-3 font-semibold">{translate("aboutPageValuesTitle")}</p>
              <ul className="mt-2 space-y-1 text-sm text-brand-navy-foreground/80">
                {CORE_VALUES.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-gold/40 bg-brand-navy p-6 text-brand-navy-foreground">
              <Layers className="h-6 w-6 text-brand-gold" />
              <p className="mt-3 font-semibold">{translate("aboutPageObjectivesTitle")}</p>
              <ul className="mt-2 space-y-1 text-sm text-brand-navy-foreground/80">
                {OBJECTIVES.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{translate("aboutPageCtaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{translate("aboutPageCtaSubtitle")}</p>
        <Button asChild size="lg" className="mt-6 bg-brand-navy text-brand-navy-foreground hover:bg-brand-navy/90">
          <Link href="/contact-us">{translate("aboutPageCtaButton")}</Link>
        </Button>
      </section>
    </main>
  );
}
