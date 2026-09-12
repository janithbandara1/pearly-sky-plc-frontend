"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getServices, ServicePriceEntry } from "@/lib/catalog-api";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useLanguage } from "@/lib/i18n/language-context";


export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  servicePrices,
  serviceId,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  servicePrices?: ServicePriceEntry[];
  serviceId?: number;
}) {
  const { translate } = useLanguage();
  return (
    <section className="relative flex h-auto justify-center bg-transparent text-center">
      <div className="lg:min-h-[100vh] md:min-h-[50vh]  lg:max-h-[100vh] md:max-h-[80vh] h-[40vh] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="120vw"
          className="object-cover h-[25vh] md:h-[100vh] rounded-b-[100px] md:rounded-none  border border-[rgb(169,139,75)]"
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2.5 md:block md:left-8 left-3 z-10 mx-auto max-w-lg md:max-w-3xl py-4 px-5 md:py-5 md:px-7 bg-[rgb(18,30,45)] border-2 border-[rgb(169,139,75)] md:border-0 md:border-transparent md:rounded-[20px]">
              
                {eyebrow && (
                  <p className="mb-2 hidden text-xs font-semibold uppercase tracking-widest text-brand-gold">
                    {eyebrow}
                  </p>
                )}
                <h1 className="min-w-0 truncate md:overflow-visible max-w-[300px] md:max-w-3xl md:text-clip md:whitespace-normal text-base sm:text-3xl md:text-4xl font-bold text-[#c29b38] tracking-tight leading-tight">
                  {translate(title as TranslationKey)}
                </h1>
              </div>
      

      
    </section>
  );
}