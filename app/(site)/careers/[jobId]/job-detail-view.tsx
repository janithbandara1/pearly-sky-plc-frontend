"use client";

import Link from "@/components/locale-link";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslatedJob, type Job } from "@/lib/content/jobs";

export function JobDetailView({ job: rawJob }: { job: Job }) {
  const { translate } = useLanguage();
  const job = getTranslatedJob(rawJob, translate);

  return (
    <main className="flex-1">
      <PageHero image="/images/careers/hero.webp" title={job.title} hidePriceSelector />

      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <Link href="/careers" className="mb-6 inline-flex items-center gap-1 text-sm text-brand-gold-dark hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {translate("careersBackToCareers")}
        </Link>

        <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {job.employmentType}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {job.location}
          </span>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold tracking-tight">{translate("careersAboutCompany")}</h2>
          <div className="mt-2 space-y-3 text-muted-foreground">
            {job.aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold tracking-tight">{translate("careersResponsibilities")}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {job.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold tracking-tight">{translate("careersRequirements")}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {job.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold tracking-tight">{translate("careersBenefits")}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {job.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <Button asChild size="lg" className="mt-10 bg-brand-navy text-brand-navy-foreground hover:bg-brand-navy/90">
          <Link href={`/careers/${job.id}/apply`}>{translate("careersApplyNow")}</Link>
        </Button>
      </section>
    </main>
  );
}
