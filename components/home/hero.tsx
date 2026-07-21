"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

const HERO_IMAGES = ["/images/hero/hero-1.webp", "/images/hero/hero-2.webp"];

export function Hero() {
  const { translate } = useLanguage();
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
                sizes="100vw"
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/40" />

      <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center gap-4 px-4 mx-auto sm:px-6">
        <h1 className="max-w-xl text-3xl font-black tracking-wide text-brand-gold drop-shadow-lg sm:text-5xl">
          {translate("heroTitle")}
        </h1>
        <p className="max-w-lg text-lg text-brand-cream drop-shadow sm:text-xl">
          {translate("heroSubtitle")}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            asChild
            size="lg"
            className="border-2 border-brand-gold bg-brand-navy text-brand-navy-foreground hover:bg-brand-navy/80"
          >
            <Link href="#contact">{translate("heroCtaPrimary")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-brand-gold bg-brand-navy/40 text-brand-navy-foreground hover:bg-brand-navy/60"
          >
            <Link href="#services">{translate("heroCtaSecondary")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
