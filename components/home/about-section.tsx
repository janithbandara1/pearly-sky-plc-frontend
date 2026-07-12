"use client";

import Image from "next/image";
import { Globe2, Leaf, Clock, Headset } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function AboutSection() {
  const { translate } = useLanguage();

  const highlights = [
    { Icon: Globe2, label: translate("aboutBilingualLabel"), desc: translate("aboutBilingualDesc") },
    { Icon: Leaf, label: translate("aboutEcoLabel"), desc: translate("aboutEcoDesc") },
    { Icon: Clock, label: translate("aboutBookingLabel"), desc: translate("aboutBookingDesc") },
    { Icon: Headset, label: translate("aboutSupportLabel"), desc: translate("aboutSupportDesc") },
  ];

  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:order-1">
          <Image
            src="/images/about/welcome.webp"
            alt="Pearly Sky team at work"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            {translate("aboutTitle")}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {translate("aboutSubtitle")}
          </h2>
          <p className="mt-4 text-muted-foreground">{translate("aboutParagraph")}</p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {highlights.map(({ Icon, label, desc }) => (
              <div key={label} className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" />
                <div>
                  <dt className="font-semibold">{label}</dt>
                  <dd className="text-sm text-muted-foreground">{desc}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
