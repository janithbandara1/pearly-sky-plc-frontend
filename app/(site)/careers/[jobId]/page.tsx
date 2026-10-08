import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob, getTranslatedJob } from "@/lib/content/jobs";
import { getRequestLanguage } from "@/lib/i18n/server";
import { translateFor } from "@/lib/i18n/translate";
import type { LanguageCode } from "@/lib/i18n/config";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildJobPostingJsonLd } from "@/lib/seo/json-ld";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
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

/**
 * Approved per-job SEO copy, keyed by job id. Takes precedence over the
 * generated title/description below, which only covers jobs missing here.
 * Every listing is France-based (jobLocationFrance), so the copy names France
 * on every site that has careers enabled.
 */
const JOB_META: Record<string, Record<LanguageCode, { title: string; description: string }>> = {
  "residential-cleaner": {
    en: {
      title: "Residential & Commercial Cleaner | Careers at Pearly Sky",
      description:
        "Join Pearly Sky as a Residential & Commercial Cleaner in France. Full-time, part-time and flexible opportunities may be available depending on location.",
    },
    fr: {
      title: "Agent d'entretien résidentiel et commercial | Carrières chez Pearly Sky",
      description:
        "Rejoignez Pearly Sky en tant qu'agent d'entretien résidentiel et commercial en France. Des postes à temps plein, à temps partiel et flexibles peuvent être proposés selon le lieu.",
    },
    de: {
      title: "Reinigungskraft für Privat- & Gewerbeobjekte | Karriere bei Pearly Sky",
      description:
        "Werden Sie Teil von Pearly Sky als Reinigungskraft für Privat- und Gewerbeobjekte in Frankreich. Je nach Standort sind Vollzeit-, Teilzeit- und flexible Stellen möglich.",
    },
    es: {
      title: "Limpiador/a residencial y comercial | Empleo en Pearly Sky",
      description:
        "Únase a Pearly Sky como limpiador/a residencial y comercial en Francia. Según la ubicación, puede haber oportunidades a tiempo completo, a tiempo parcial y flexibles.",
    },
    it: {
      title: "Addetto/a alle pulizie residenziali e commerciali | Lavora con noi da Pearly Sky",
      description:
        "Unisciti a Pearly Sky come addetto/a alle pulizie residenziali e commerciali in Francia. In base alla località possono essere disponibili posizioni a tempo pieno, part-time e flessibili.",
    },
  },
  "childcare-assistant": {
    en: {
      title: "Childcare Assistant | Careers at Pearly Sky",
      description:
        "Explore Childcare Assistant opportunities with Pearly Sky in France. Part-time and full-time roles may be available depending on location and requirements.",
    },
    fr: {
      title: "Assistant(e) de garde d'enfants | Carrières chez Pearly Sky",
      description:
        "Découvrez les opportunités d'assistant(e) de garde d'enfants chez Pearly Sky en France. Des postes à temps partiel et à temps plein peuvent être proposés selon le lieu et les besoins.",
    },
    de: {
      title: "Kinderbetreuer/in | Karriere bei Pearly Sky",
      description:
        "Entdecken Sie Stellen als Kinderbetreuer/in bei Pearly Sky in Frankreich. Je nach Standort und Anforderungen sind Teilzeit- und Vollzeitstellen möglich.",
    },
    es: {
      title: "Asistente de cuidado infantil | Empleo en Pearly Sky",
      description:
        "Descubra las oportunidades como asistente de cuidado infantil en Pearly Sky en Francia. Según la ubicación y las necesidades, puede haber puestos a tiempo parcial y a tiempo completo.",
    },
    it: {
      title: "Assistente all'infanzia | Lavora con noi da Pearly Sky",
      description:
        "Scopri le opportunità come assistente all'infanzia con Pearly Sky in Francia. In base alla località e alle esigenze possono essere disponibili posizioni part-time e a tempo pieno.",
    },
  },
  "elder-care-assistant": {
    en: {
      title: "Elder Care Assistant | Careers at Pearly Sky",
      description:
        "Explore Elder Care Assistant opportunities with Pearly Sky in France. Full-time, part-time and flexible roles may be available depending on location.",
    },
    fr: {
      title: "Auxiliaire d'aide aux personnes âgées | Carrières chez Pearly Sky",
      description:
        "Découvrez les opportunités d'auxiliaire d'aide aux personnes âgées chez Pearly Sky en France. Des postes à temps plein, à temps partiel et flexibles peuvent être proposés selon le lieu.",
    },
    de: {
      title: "Seniorenbetreuer/in | Karriere bei Pearly Sky",
      description:
        "Entdecken Sie Stellen als Seniorenbetreuer/in bei Pearly Sky in Frankreich. Je nach Standort sind Vollzeit-, Teilzeit- und flexible Stellen möglich.",
    },
    es: {
      title: "Asistente de cuidado de mayores | Empleo en Pearly Sky",
      description:
        "Descubra las oportunidades como asistente de cuidado de mayores en Pearly Sky en Francia. Según la ubicación, puede haber puestos a tiempo completo, a tiempo parcial y flexibles.",
    },
    it: {
      title: "Assistente agli anziani | Lavora con noi da Pearly Sky",
      description:
        "Scopri le opportunità come assistente agli anziani con Pearly Sky in Francia. In base alla località possono essere disponibili posizioni a tempo pieno, part-time e flessibili.",
    },
  },
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
  const approved = job ? JOB_META[jobId]?.[resolvedLanguage] : undefined;
  const title =
    approved?.title ?? (job ? buildJobMetaTitle(resolvedLanguage, job.title) : "Careers | Pearly Sky");
  const description =
    approved?.description ??
    (job ? buildJobMetaDescription(resolvedLanguage, job.title, job.employmentType, job.location) : undefined);

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
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${jobId}` },
        ]} />
      <JsonLd data={buildJobPostingJsonLd(job)} />
      <JobDetailView job={rawJob} />
    </>
  );
}
