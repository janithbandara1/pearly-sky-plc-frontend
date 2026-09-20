import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { getServices } from "@/lib/catalog-api";
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
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta, GLOBAL_META } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { Welcome } from "@/components/home/welcome";
import { VisionaryTeam } from "@/components/home/visionary-team";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  // The global gateway isn't any one country, so it gets the generic
  // site-wide title instead of getCountryPageMeta's France/UK/Sri Lanka
  // copy (which defaults to France's when CURRENT_COUNTRY has no real
  // value to fall back to — see IS_GLOBAL_SITE in lib/countries/config.ts).
  if (IS_GLOBAL_SITE) {
    return {
      title: GLOBAL_META.title,
      description: GLOBAL_META.description,
      ...buildSocialMeta(GLOBAL_META.title, GLOBAL_META.description),
    };
  }

  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("home", language ?? "en");

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
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  // The global gateway has no backend behind it at all — never fetch the
  // catalog, and don't render the section that would show it.
  const services = IS_GLOBAL_SITE ? [] : await getCachedServices(country, language);

  return (
    <main className="flex-1">
      <Hero />
      <TrustBar />
      {!IS_GLOBAL_SITE && <ServicesSection services={services} />}
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
