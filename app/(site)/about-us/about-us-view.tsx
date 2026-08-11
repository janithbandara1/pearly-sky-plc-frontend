"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, Leaf, Layers, Users, Sparkles, Clock, Wallet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryPageContent } from "@/lib/countries/page-content";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const CORE_IDENTITY: { labelKey: TranslationKey; textKey: TranslationKey }[] = [
  { labelKey: "aboutIdentity1Label", textKey: "aboutIdentity1Text" },
  { labelKey: "aboutIdentity2Label", textKey: "aboutIdentity2Text" },
  { labelKey: "aboutIdentity3Label", textKey: "aboutIdentity3Text" },
];

const WHY_CHOOSE_US: { Icon: typeof Users; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { Icon: Users, titleKey: "aboutWhy1Title", textKey: "aboutWhy1Text" },
  { Icon: Leaf, titleKey: "aboutWhy2Title", textKey: "aboutWhy2Text" },
  { Icon: Layers, titleKey: "aboutWhy3Title", textKey: "aboutWhy3Text" },
  { Icon: Wallet, titleKey: "aboutWhy4Title", textKey: "aboutWhy4Text" },
  { Icon: Clock, titleKey: "aboutWhy5Title", textKey: "aboutWhy5Text" },
];

const VISION_MISSION: { Icon: typeof Compass; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { Icon: Compass, titleKey: "aboutPageVisionTitle", textKey: "aboutVisionText" },
  { Icon: Sparkles, titleKey: "aboutPageMissionTitle", textKey: "aboutMissionText" },
];

const CORE_VALUES: TranslationKey[] = ["aboutValue1", "aboutValue2", "aboutValue3", "aboutValue4", "aboutValue5"];
const OBJECTIVES: TranslationKey[] = [
  "aboutObjective1",
  "aboutObjective2",
  "aboutObjective3",
  "aboutObjective4",
  "aboutObjective5",
];

export function AboutUsView() {
  const { translate, language } = useLanguage();
  const { country } = useCountry();
  const { aboutStoryParagraph2 } = getCountryPageContent(country, language);

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
          <p className="mt-4 text-muted-foreground">{translate("aboutPageIdentityIntro")}</p>
          <ul className="mt-6 space-y-4">
            {CORE_IDENTITY.map((item) => (
              <li key={item.labelKey} className="flex gap-2 text-sm">
                <span className="font-semibold text-brand-navy">{translate(item.labelKey)}:</span>
                <span className="text-muted-foreground">{translate(item.textKey)}</span>
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
          <p className="mt-4 text-muted-foreground">{translate("aboutPageStoryParagraph1")}</p>
          <p className="mt-4 text-muted-foreground">{aboutStoryParagraph2}</p>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-brand-navy-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{translate("aboutPageWhyTitle")}</h2>
          <p className="mt-2 text-brand-navy-foreground/70">{translate("aboutPageWhySubtitle")}</p>
        </div>
        <div className="mx-auto mt-10 grid w-full max-w-6xl gap-4 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map(({ Icon, titleKey, textKey }) => (
            <div key={titleKey} className="rounded-xl bg-white/5 p-5">
              <Icon className="h-6 w-6 text-brand-gold" />
              <p className="mt-3 font-semibold text-brand-gold">{translate(titleKey)}</p>
              <p className="mt-1 text-sm text-brand-navy-foreground/80">{translate(textKey)}</p>
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
            {VISION_MISSION.map(({ Icon, titleKey, textKey }) => (
              <div key={titleKey} className="rounded-2xl border border-brand-gold/40 bg-brand-navy p-6 text-brand-navy-foreground">
                <Icon className="h-6 w-6 text-brand-gold" />
                <p className="mt-3 font-semibold">{translate(titleKey)}</p>
                <p className="mt-2 text-sm text-brand-navy-foreground/80">{translate(textKey)}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-brand-gold/40 bg-brand-navy p-6 text-brand-navy-foreground">
              <ShieldCheck className="h-6 w-6 text-brand-gold" />
              <p className="mt-3 font-semibold">{translate("aboutPageValuesTitle")}</p>
              <ul className="mt-2 space-y-1 text-sm text-brand-navy-foreground/80">
                {CORE_VALUES.map((v) => (
                  <li key={v}>{translate(v)}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-gold/40 bg-brand-navy p-6 text-brand-navy-foreground">
              <Layers className="h-6 w-6 text-brand-gold" />
              <p className="mt-3 font-semibold">{translate("aboutPageObjectivesTitle")}</p>
              <ul className="mt-2 space-y-1 text-sm text-brand-navy-foreground/80">
                {OBJECTIVES.map((o) => (
                  <li key={o}>{translate(o)}</li>
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
