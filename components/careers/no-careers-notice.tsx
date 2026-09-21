import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/careers/careers-hero";

/**
 * Careers is France-only hiring (see IS_CAREERS_ENABLED in
 * lib/countries/config.ts) — the UK and Sri Lanka sites show this in place
 * of the job list/detail/apply views, rather than 404ing or redirecting
 * away, since /careers is a real, intentional page on those sites too.
 * Plain English text (no translate()) since it only ever renders on the
 * English-only UK/Sri Lanka deployments.
 */
export function NoCareersNotice() {
  return (
    <main className="flex-1 bg-[rgb(18,30,45)] md:bg-[#d9d9d9]">
      <PageHero image="/images/careers/hero.webp" title="careersPageTitle" />
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
        <h2 className="text-xl font-semibold text-brand-navy">No job openings available right now</h2>
        <p className="text-muted-foreground">
          We don't have any open positions in this country at the moment. Please check back later, or visit our
          France careers page to see current openings there.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-1 text-sm text-brand-gold-dark hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
