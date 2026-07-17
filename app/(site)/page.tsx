import type { Metadata } from "next";
import { getServices } from "@/lib/catalog-api";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { CoverageStrip } from "@/components/home/coverage-strip";
import { SectorsMarquee } from "@/components/home/sectors-marquee";
import { Testimonials } from "@/components/home/testimonials";
import { ContactSection } from "@/components/home/contact-section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pearly Sky | Eco-Luxury Home & Office Cleaning in France",
  description:
    "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across France. Request an instant bespoke quote from Pearly Sky today.",
};

export default async function Home() {
  const services = await getServices();

  return (
    <main className="flex-1">
      <Hero />
      <TrustBar />
      <ServicesSection services={services} />
      <AboutSection />
      <CoverageStrip />
      <SectorsMarquee />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
