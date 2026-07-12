"use client";

import { Globe2, Leaf, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function TrustBar() {
  const { translate } = useLanguage();

  const items = [
    { Icon: Globe2, label: translate("trustCoverage") },
    { Icon: Leaf, label: translate("trustEcoCertified") },
    { Icon: Star, label: translate("trustRating") },
  ];

  return (
    <section className="border-b border-border bg-background py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:gap-6 sm:px-6">
        {items.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm font-semibold sm:text-base">
            <Icon className="h-6 w-6 shrink-0 text-brand-gold-dark" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
