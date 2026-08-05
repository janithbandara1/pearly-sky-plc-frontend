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
import { ContactSection } from "@/components/home/contact-section";
import { buildCountryAlternates } from "@/lib/countries/seo";
import { getRequestCountry } from "@/lib/countries/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pearly Sky | Eco-Luxury Home & Office Cleaning in France",
  description:
    "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across France. Request an instant bespoke quote from Pearly Sky today.",
  alternates: buildCountryAlternates("/"),
};

export default async function Home() {
  const country = await getRequestCountry();
  const services = await getServices(country);

  return (
    <main className="flex-1">
      <Hero />
      <TrustBar />
      <ServicesSection services={services} />
      <AboutSection />
      <CoverageStrip />
      <SectorsMarquee />
      <MomentsOfExcellence />
      <Testimonials />
      <RecentArticles />
      <ContactSection />
    </main>
  );
}
