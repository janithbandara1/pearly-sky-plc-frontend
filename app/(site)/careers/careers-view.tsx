"use client";

import { useMemo, useState } from "react";
import Link from "@/components/locale-link";
import { ArrowLeft, Briefcase, MapPin, Search } from "lucide-react";
import { PageHero } from "@/components/careers/careers-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { jobs, getTranslatedJob } from "@/lib/content/jobs";

export function CareersView() {
  const { translate } = useLanguage();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const translatedJobs = useMemo(() => {
    return jobs.map((job) => getTranslatedJob(job, translate));
  }, [translate]);

  const filtered = useMemo(() => {
    const t = title.trim().toLowerCase();
    const l = location.trim().toLowerCase();
    return translatedJobs.filter(
      (job) =>
        (!t || job.title.toLowerCase().includes(t) || job.category.toLowerCase().includes(t)) &&
        (!l || job.location.toLowerCase().includes(l)),
    );
  }, [title, location, translatedJobs]);

  return (
    <main className="flex-1 bg-[rgb(18,30,45)] md:bg-[#d9d9d9]">
      <PageHero
        image="/images/careers/hero.webp"
        title={translate("careersPageTitle")}
        subtitle={translate("careersPageSubtitle")}
      />
      <div className="flex w-full  flex-col gap-6 px-4 py-5 sm:px-6 md:mx-auto">
        <Link href="/" title="Back to home" className="mb-6 inline-flex items-center gap-1 text-sm text-brand-gold-dark hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {translate("commonBack")}
        </Link>
      </div>
      <section className="mx-auto mt-2 w-full max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={translate("careersSearchTitlePlaceholder")}
              className="pl-8"
            />
          </div>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={translate("careersSearchLocationPlaceholder")}
              className="pl-8"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground">{translate("careersNoJobs")}</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((job) => (
            <Card key={job.id}>
              <CardContent className="flex h-full flex-col gap-3 pt-6">
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" />
                  <div>
                    <p className="font-semibold leading-snug">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.category} · {job.employmentType}</p>
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </p>
                <Button asChild size="sm" className="mt-auto w-fit">
                  <Link className="min-h-[48px] py-3 px-4" href={`/careers/${job.id}`}>{translate("careersApplyNow")}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
