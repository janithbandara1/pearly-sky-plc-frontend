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
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { Welcome } from "@/components/home/welcome";
import { VisionaryTeam } from "@/components/home/visionary-team";
 
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const { title, description } = getCountryPageMeta("home", country, language ?? "en");

  return {
    title,
    description,
    alternates: buildCountryAlternates("/", { country, language }),
    ...buildSocialMeta(title, description),
  };
}

/**
 * force-dynamic means every SSR request re-runs this page for every one of
 * the ~390 country/language combos, and all of that server-side traffic
 * shares one source IP at the backend's throttler (see lib/api.ts's
 * loopback API_INTERNAL_URL) — without this, the shared bucket blows past
 * the backend's rate limit and getServices starts throwing 429s.
 */
const getCachedServices = unstable_cache(
  (country: string | null, language: string | null) => getServices(country, language),
  ["home-services"],
  { revalidate: 60 },
);

export default async function Home() {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const services = await getCachedServices(country, language);

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
