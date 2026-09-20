import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/content/jobs";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd, buildJobPostingJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { JobDetailView } from "./job-detail-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jobId: string }>;
}): Promise<Metadata> {
  const [{ jobId }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);
  const job = getJob(jobId);
  const title = job ? `${job.title} | Careers at Pearly Sky` : "Careers | Pearly Sky";
  const description = job ? `${job.title} — ${job.employmentType} role at Pearly Sky, ${job.location}.` : undefined;

  return {
    title,
    description,
    alternates: buildCountryAlternates(`/careers/${jobId}`, { language }),
    ...buildSocialMeta(title, description),
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = getJob(jobId);

  if (!job) notFound();

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
      <JobDetailView job={job} />
    </>
  );
}
