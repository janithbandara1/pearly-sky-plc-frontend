"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, Leaf,Shield, Layers, Users, Sparkles, Clock, Wallet, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/hero-components/hero-with-social-links";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryPageContent } from "@/lib/countries/page-content";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import PaymentMarquee from "@/components/payment-method-services";
import { Socialmedialinks } from "@/components/contactus/social-media";

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
  { Icon: Shield, titleKey: "aboutWhy6Title", textKey: "aboutWhy6Text" },
];

const VISION_MISSION: { Icon: typeof Compass; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { Icon: Compass, titleKey: "aboutPageVisionTitle", textKey: "aboutVisionText" },
  { Icon: Sparkles, titleKey: "aboutPageMissionTitle", textKey: "aboutMissionText" },
];

const CORE_VALUES: { titleKey: TranslationKey; description: string }[] = [
  {
    titleKey: "aboutValue1",
    description: "Embracing differences and ensuring equal opportunities for all.",
  },
  {
    titleKey: "aboutValue2",
    description: "Maintaining transparency and trust through responsible and honest actions.",
  },
  {
    titleKey: "aboutValue3",
    description: "Adopting practices that benefit both current and future generations.",
  },
  {
    titleKey: "aboutValue4",
    description: "Collaborating effectively to achieve common goals and superior results.",
  },
  {
    titleKey: "aboutValue5",
    description: "Providing outstanding care to clients and partners in every interaction.",
  },
];
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
    <main className="flex-1 bg-[#f4fff8] relative">
      <PageHero
        image="/images/about/hero.webp"
        eyebrow={translate("aboutPageEyebrow")}
        title={translate("aboutPageHeroTitle")}
        height={50}
      /> 
      <div className="absolute md:bottom-none  top-35 z-5 right-3 md:right-none">
        <Socialmedialinks />
      </div>
      
      <section className="">
        
        <div className="bg-[#121e2d] py-10 mb-10">
          <h4 className="text-white text-[18px] font-bold tracking-tight text-center md:text-4xl">
            {translate("aboutPageSectionHeader")}
          </h4>
          <h5 className="text-white text-lg font-normal tracking-tight text-center md:text-3xl">
            {translate("aboutPageHeroTitle")}
          </h5>
        </div>
        <div className="flex w-full  flex-col gap-6 px-4 py-5 sm:px-6 md:mx-auto">
          <Link href="/" title="Back to home" className="mb-6 inline-flex items-center gap-1 text-sm text-brand-gold-dark hover:underline">
            <ArrowLeft className="h-4 w-4" />
            {translate("commonBack")}
          </Link>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-3 sm:px-6 lg:grid-cols-2">
          <div className="bg-white border border-[rgb(169,139,75)] p-4 rounded-lg shadow-lg">
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
          <div className="bg-white border border-[rgb(169,139,75)] p-4 rounded-lg shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
              {translate("aboutPageStoryTitle")}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {translate("aboutPageStorySubtitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">{translate("aboutPageStoryParagraph1")}</p>
            <p className="mt-4 text-muted-foreground">{aboutStoryParagraph2}</p>
        </div>
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

      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/about/updated-pages-aboutupbackground.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover "
          />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 className="mx-auto w-fit max-w-full rounded-full bg-white px-6 py-3 text-center text-xl font-bold tracking-tight text-brand-navy shadow-lg sm:px-9 sm:text-3xl">
            {translate("aboutPageVisionMissionTitle")}
          </h2>

          <div className="relative mt-14 grid gap-8 md:grid-cols-[minmax(0,1fr)_4px_minmax(0,1fr)] md:gap-x-0 md:gap-y-1">
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 bg-brand-gold md:block" />

            {/**VISION  */}
            <div className="relative rounded-2xl border border-brand-gold bg-brand-navy p-6 text-center text-brand-navy-foreground shadow-xl md:col-start-1 md:row-start-1 md:mr-10">
              <div className="absolute right-[-66px] top-1/2 hidden h-1 w-16 -translate-y-1/2 bg-brand-gold md:block" />
              <p className="font-bold text-white">{translate(VISION_MISSION[0].titleKey)}</p>
              <p className="mt-4 text-sm leading-6 text-brand-navy-foreground/90 sm:text-base">{translate(VISION_MISSION[0].textKey)}</p>
            </div>

            {/**MISSION */}
            <div className="relative rounded-2xl border border-brand-gold bg-brand-navy p-6 text-center text-brand-navy-foreground shadow-xl md:col-start-3 md:row-start-2 md:ml-10">
              <div className="absolute left-[-66px] top-1/2 hidden h-1 w-16 -translate-y-1/2 bg-brand-gold md:block" />
              <p className="font-bold text-white">{translate(VISION_MISSION[1].titleKey)}</p>
              <p className="mt-4 text-sm leading-6 text-brand-navy-foreground/90 sm:text-base">{translate(VISION_MISSION[1].textKey)}</p>
            </div>

            {/**Our Core Values */}
            <div className="relative rounded-2xl border border-brand-gold bg-brand-navy p-6 text-brand-navy-foreground shadow-xl md:col-start-1 md:row-start-3 md:mr-10">
              <div className="absolute right-[-66px] top-1/2 hidden h-1 w-16 -translate-y-1/2 bg-brand-gold md:block" />
              <p className="text-center font-bold text-white">{translate("aboutPageValuesTitle")}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-brand-navy-foreground/90 sm:text-base">
                {CORE_VALUES.map(({ titleKey, description }) => (
                  <li key={titleKey}>
                    <span className="font-bold text-white">{translate(titleKey)}:</span>{" "}
                    <span>{description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/**Our Objectives */}
            <div className="relative rounded-2xl border border-brand-gold bg-brand-navy p-6 text-brand-navy-foreground shadow-xl md:col-start-3 md:row-start-4 md:ml-10">
              <div className="absolute left-[-66px] top-1/2 hidden h-1 w-16 -translate-y-1/2 bg-brand-gold md:block" />
              <p className="text-center font-bold text-white">{translate("aboutPageObjectivesTitle")}</p>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-brand-navy-foreground/90 sm:text-base">
                {OBJECTIVES.map((objectiveKey) => (
                  <li key={objectiveKey}><span className="inline-block w-4 text-[15px] text-center text-brand-gold">●</span>{translate(objectiveKey)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-5 bg-white shadow border rounded border-[rgb(169,139,75)] max-w-xl lg:max-w-2xl md:max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{translate("aboutPageCtaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{translate("aboutPageCtaSubtitle")}</p>
        <Button asChild size="lg" className="mt-6 bg-brand-navy text-brand-navy-foreground hover:bg-brand-navy/90">
          <Link href="/contact-us">{translate("aboutPageCtaButton")}</Link>
        </Button>
      </section>
      <PaymentMarquee />
      
    </main>
  );
}
