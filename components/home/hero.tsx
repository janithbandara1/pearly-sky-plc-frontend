"use client";

import { useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";
import { IoSparkles } from "react-icons/io5";

const HERO_IMAGES = ["/images/hero/hero-1.webp", "/images/hero/hero-2.webp"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const { translate, language } = useLanguage();
  const { heroSubtitle } = getCountryHomeContent(language);
  const [plugins] = useState(() => [Autoplay({ delay: 6000, stopOnInteraction: false })]);

  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-brand-navy sm:h-[85vh]">
      <Carousel
        plugins={plugins}
        opts={{ loop: true }}
        className="absolute inset-0 h-full w-full [&>div]:h-full"
      >
        <CarouselContent className="h-full ml-0">
          {HERO_IMAGES.map((src, index) => (
            <CarouselItem key={src} className="relative h-[70vh] min-h-[420px] pl-0 sm:h-[85vh]">
              <Image
                src={src}
                alt={`Pearly Sky eco-luxury cleaning ${index + 1}`}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : undefined}
                sizes="100vw"
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/40" />

      <div className="relative z-10 flex h-[90%] lg:h-full md:h-full max-w-7xl flex-col justify-end md:justify-center gap-2 px-4 mx-auto sm:px-6">
        <h1 className="max-w-xl text-lg lg:text-2xl md:text-left text-center font-normal tracking-wide text-brand-gold drop-shadow-lg md:text-3xl">
          <IoSparkles aria-hidden="true" className="mr-1 inline-block h-6 w-6 align-[-0.2em]" />
          {translate("heroTitle")}
          <IoSparkles aria-hidden="true" className="ml-1 inline-block h-6 w-6 align-[-0.2em]" />
        </h1>
        <h2 className="max-w-lg md:text-left md:text-2xl lg:text-2xl text-center text-lg text-brand-cream drop-shadow sm:text-xl">
          {heroSubtitle}
        </h2>
        <p className="max-w-2xl md:text-left text-center text-[12px] text-brand-cream drop-shadow sm:text-base">
          {translate("heroSubPara")}
        </p>
        <div className="flex md:flex-col flex-row flex-wrap gap-3 pt-2 justify-center md:justify-start">
          <Button
            size="lg"
            onClick={() => scrollToId("services")}
            className="border-2 w-fit p-2 h-9 min-h-[48px] min-w-[48px] border-brand-gold bg-brand-navy text-brand-navy-foreground hover:bg-brand-navy/80"
          >
            {translate("heroCtaSecondary")}
          </Button>
          
          <Button
            size="lg"
            onClick={() => scrollToId("services")}
            className="border-2 w-fit p-2 h-9 min-h-[48px] min-w-[48px] border-brand-gold bg-brand-navy text-brand-navy-foreground hover:bg-brand-navy/80"
          >
            {translate("heroCtaThird")}
          </Button>
          
        </div>
      </div>
    </section>
  );
}
