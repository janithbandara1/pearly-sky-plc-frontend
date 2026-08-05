"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const GALLERY = [6, 7, 8, 11, 12, 16, 20, 24].map((n) => `/images/gallery/gallery-${n}.webp`);

export function MomentsOfExcellence({ titleKey = "momentsOfExcellenceTitle" }: { titleKey?: TranslationKey }) {
  const { translate } = useLanguage();

  return (
    <section className="bg-secondary/40 py-16">
      <h2 className="mx-auto mb-8 w-full max-w-6xl px-4 text-center text-2xl font-bold tracking-tight sm:px-6 sm:text-3xl">
        {translate(titleKey)}
      </h2>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-4 sm:px-6 sm:grid-cols-4">
        {GALLERY.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-xl">
            <Image src={src} alt="Pearly Sky at work" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
