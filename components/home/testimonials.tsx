"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const REVIEWS: { name: string; image: string; textKey: TranslationKey }[] = [
  { name: "Filippa Blylod", image: "/images/testimonials/reviewer-1.jpeg", textKey: "review1Text" },
  { name: "Viktoriya Fromm", image: "/images/testimonials/reviewer-2.jpeg", textKey: "review2Text" },
  { name: "Lucas Meyer", image: "/images/testimonials/reviewer-3.webp", textKey: "review3Text" },
];

export function Testimonials({ titleKey = "testimonialsTitle" }: { titleKey?: TranslationKey }) {
  const { translate } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {translate(titleKey)}
      </h2>

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
        {REVIEWS.map((review) => (
          <article
            key={review.name}
            className="flex min-h-[190px] flex-col rounded-[4px] border border-black/10 bg-[#292a27] px-3 py-3 text-[#f7f4e9] shadow-[0_4px_8px_rgba(0,0,0,0.2)] sm:min-h-[205px] sm:px-3.5 sm:py-3.5"
          >
            <span className="h-5 font-serif text-3xl leading-5 text-[#c9a858]">“</span>
            <div className="mt-1 flex gap-0.5 text-[#c9a858]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current stroke-[1.5] sm:h-3.5 sm:w-3.5" />
                ))}
            </div>
            <p className="mt-2 flex-1 text-[12px] md:text-[15px] lg:text=[16px] leading-[1.35] text-[#f7f4e9]/95 sm:text-[10px]">
              {translate(review.textKey)}
            </p>
            <div className="my-2 h-px w-full bg-[#c9a858]/65" />
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 border border-[#c9a858]/60 sm:h-7 sm:w-7">
                <AvatarImage src={review.image} alt={review.name} />
                <AvatarFallback className="bg-[#c9a858] text-[9px] text-[#292a27]">{review.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] font-semibold text-[#f7f4e9] md:text-[11px] lg:text=[14px]">{review.name}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
