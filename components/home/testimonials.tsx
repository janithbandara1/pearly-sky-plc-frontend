"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const REVIEWS: { name: string; image: string; textKey: TranslationKey }[] = [
  { name: "Filippa Blylod", image: "/images/testimonials/reviewer-1.jpeg", textKey: "review1Text" },
  { name: "Viktoriya Fromm", image: "/images/testimonials/reviewer-2.jpeg", textKey: "review2Text" },
  { name: "Lucas Meyer", image: "/images/testimonials/reviewer-3.webp", textKey: "review3Text" },
];

export function Testimonials() {
  const { translate } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {translate("testimonialsTitle")}
      </h2>

      <div className="grid gap-6 sm:grid-cols-3">
        {REVIEWS.map((review) => (
          <Card key={review.name} className="h-full">
            <CardContent className="flex h-full flex-col gap-4 pt-6">
              <div className="flex gap-1 text-brand-gold-dark">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="flex-1 text-sm text-muted-foreground">{translate(review.textKey)}</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.image} alt={review.name} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">{review.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
