import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { getServices, toHomeService } from "@/lib/catalog-api";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { CoverageStrip } from "@/components/home/coverage-strip";
import { SectorsMarquee } from "@/components/home/sectors-marquee";
import { MomentsOfExcellence } from "@/components/home/moments-of-excellence";
import { Testimonials } from "@/components/home/testimonials";
import { RecentArticles } from "@/components/home/recent-articles";
import { ContactSection } from "@/components/home/home-contact-us";
import { buildCountryAlternates, buildGlobalAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { Welcome } from "@/components/home/welcome";
import { VisionaryTeam } from "@/components/home/visionary-team";
import { GlobalHome } from "@/components/global-home/global-home";
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("home", language ?? "en");

  // The global gateway's pages aren't "the same content in another
  // language/region" as any real country site's — they're generic instead
  // of country-specific — so hreflang alternates cross-linking them would
  // misrepresent duplicate content that isn't actually duplicate.
  if (IS_GLOBAL_SITE) {
    return { title, description, alternates: buildGlobalAlternates("/", language),
      ...buildSocialMeta(title, description) };
  }

  return {
    title,
    description,
    alternates: buildCountryAlternates("/", { language }),
    ...buildSocialMeta(title, description),
  };
}

/**
 * force-dynamic means every SSR request re-runs this page for every one of
 * CURRENT_COUNTRY's languages (up to 5, for France — see COUNTRY_LANGUAGES
 * in lib/countries/config.ts), and all of that server-side traffic shares
 * one source IP at the backend's throttler (see lib/api.ts's loopback
 * API_INTERNAL_URL) — without this, the shared bucket blows past the
 * backend's rate limit and getServices starts throwing 429s.
 */
const getCachedServices = unstable_cache(
  (country: string | null, language: string | null) => getServices(country, language),
  ["home-services"],
  { revalidate: 60 },
);

export default async function Home() {
  // The global gateway gets its own static home page and never fetches the
  // catalog to render it.
  if (IS_GLOBAL_SITE) return <GlobalHome />;

  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const services = (await getCachedServices(country, language)).map(toHomeService);

  return (
    <main className="flex-1">
      <Hero />
      <TrustBar />
      <ServicesSection services={services} />
      <Welcome />
      <AboutSection />
      <CoverageStrip />
      <VisionaryTeam />
      <SectorsMarquee />
      <MomentsOfExcellence />
      <Testimonials />
      <RecentArticles />
      <ContactSection />
    </main>
  );
}
