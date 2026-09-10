import type { Metadata } from "next";
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
  const { title, description } = getCountryPageMeta("home", country);

  return {
    title,
    description,
    alternates: buildCountryAlternates("/", { country, language }),
    ...buildSocialMeta(title, description),
  };
}

export default async function Home() {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const services = await getServices(country, language);

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
