import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob, getTranslatedJob } from "@/lib/content/jobs";
import { getRequestLanguage } from "@/lib/i18n/server";
import { translateFor } from "@/lib/i18n/translate";
import type { LanguageCode } from "@/lib/i18n/config";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd, buildJobPostingJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { IS_CAREERS_ENABLED } from "@/lib/countries/config";
import { JobDetailView } from "./job-detail-view";
import { NoCareersNotice } from "@/components/careers/no-careers-notice";

/**
 * The job's own title/employmentType/location are already translated via
 * getTranslatedJob (see below), but the surrounding "Careers at Pearly Sky"
 * / "role at Pearly Sky" copy used to be hardcoded English regardless of
 * language — so a French job title ended up next to English boilerplate.
 * Word order/prepositions differ enough per language that a single
 * placeholder template can't get all of them right, so each gets its own
 * sentence shape instead (mirrors the approach in meta-templates.ts).
 */
const CAREERS_TITLE_SUFFIX: Record<LanguageCode, string> = {
  en: "Careers at Pearly Sky",
  fr: "Carrières chez Pearly Sky",
  de: "Karriere bei Pearly Sky",
  es: "Empleo en Pearly Sky",
  it: "Lavora con noi da Pearly Sky",
};

function buildJobMetaTitle(language: LanguageCode, jobTitle: string): string {
  return `${jobTitle} | ${CAREERS_TITLE_SUFFIX[language]}`;
}

function buildJobMetaDescription(
  language: LanguageCode,
  jobTitle: string,
  employmentType: string,
  location: string,
): string {
  switch (language) {
    case "fr":
      return `${jobTitle} — poste ${employmentType} chez Pearly Sky, ${location}.`;
    case "de":
      return `${jobTitle} — ${employmentType}-Stelle bei Pearly Sky, ${location}.`;
    case "es":
      return `${jobTitle} — puesto ${employmentType} en Pearly Sky, ${location}.`;
    case "it":
      return `${jobTitle} — posizione ${employmentType} presso Pearly Sky, ${location}.`;
    default:
      return `${jobTitle} — ${employmentType} role at Pearly Sky, ${location}.`;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jobId: string }>;
}): Promise<Metadata> {
  const [{ jobId }, language] = await Promise.all([params, getRequestLanguage()]);

  // Careers is France-only hiring (see IS_CAREERS_ENABLED) — every job id is
  // treated as "no jobs" on the UK/Sri Lanka sites, without even looking one up.
  if (!IS_CAREERS_ENABLED) {
    const title = "Careers | Pearly Sky";
    return { title, ...buildSocialMeta(title) };
  }

  const resolvedLanguage = language ?? "en";
  const rawJob = getJob(jobId);
  // getJob() only has titleKey/employmentTypeKey/locationKey (translation
  // keys) — translate them before use, same as job-detail-view.tsx does
  // client-side via useLanguage(), so the title/description below don't
  // read "undefined".
  const job = rawJob ? getTranslatedJob(rawJob, translateFor(resolvedLanguage)) : undefined;
  const title = job ? buildJobMetaTitle(resolvedLanguage, job.title) : "Careers | Pearly Sky";
  const description = job
    ? buildJobMetaDescription(resolvedLanguage, job.title, job.employmentType, job.location)
    : undefined;

  return {
    title,
    description,
    alternates: buildCountryAlternates(`/careers/${jobId}`, { language }),
    ...buildSocialMeta(title, description),
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  if (!IS_CAREERS_ENABLED) {
    return <NoCareersNotice />;
  }

  const [{ jobId }, language] = await Promise.all([params, getRequestLanguage()]);
  const rawJob = getJob(jobId);

  if (!rawJob) notFound();

  const job = getTranslatedJob(rawJob, translateFor(language ?? "en"));

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${jobId}` },
        ])}
      />
      <JsonLd data={buildJobPostingJsonLd(job)} />
      <JobDetailView job={rawJob} />
    </>
  );
}
