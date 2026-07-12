"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const TEAM: { nameKey: TranslationKey; image: string }[] = [
  { nameKey: "teamCustomerService", image: "/images/team/customer-service.webp" },
  { nameKey: "teamMarketing", image: "/images/team/marketing.webp" },
  { nameKey: "teamHumanResources", image: "/images/team/human-resources.webp" },
  { nameKey: "teamFinance", image: "/images/team/finance.webp" },
];

const CONTACT_EMAIL = "info@pearlyskyglobalclean.com";

export function TeamSection() {
  const { translate } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {translate("teamTitle")}
      </h2>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {TEAM.map((member) => (
          <div key={member.nameKey} className="flex flex-col items-center gap-3 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-brand-gold/40 sm:h-32 sm:w-32">
              <Image
                src={member.image}
                alt={translate(member.nameKey)}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <p className="font-semibold">{translate(member.nameKey)}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-gold-dark"
            >
              <Mail className="h-3.5 w-3.5" />
              {CONTACT_EMAIL}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
