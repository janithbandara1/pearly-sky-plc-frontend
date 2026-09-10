import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { STATIC_PAGE_META } from "@/lib/countries/meta-data";

const { title: TITLE } = STATIC_PAGE_META.termsAndConditions;

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);

  return {
    title: TITLE,
    alternates: buildCountryAlternates("/terms-and-conditions", { country, language }),
    ...buildSocialMeta(TITLE),
  };
}

export default function TermsAndConditionsPage() {
  return (
    <main className="flex-1">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms-and-conditions" },
        ])}
      />
      <PageHero hidePriceSelector image="/images/about/hero.webp" title="Terms and Conditions" />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
        <p className="text-sm text-muted-foreground">Last updated: August 8, 2026</p>

        <p>
          Welcome to Pearly Sky Cleaning Services Pvt. Ltd. These Terms and Conditions govern
          your use of our website at{" "}
          <a href="https://www.pearlyskyglobalclean.com" className="underline underline-offset-2">
            www.pearlyskyglobalclean.com
          </a>{" "}
          and the services we provide. By accessing or using our website, you agree to comply
          with and be bound by these Terms and Conditions. If you do not agree, please refrain
          from using our website.
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By using our website, you confirm that you are at least 18 years old or have the
            legal capacity to enter into a binding agreement. You also agree to comply with all
            applicable laws and regulations.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">2. Services Offered</h2>
          <p className="text-muted-foreground">
            Pearly Sky Cleaning Services Pvt. Ltd. provides cleaning and care services, including
            but not limited to:
          </p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>Residential and commercial cleaning</li>
            <li>Elder care and child care services</li>
            <li>Specialized cleaning solutions</li>
          </ul>
          <p className="text-muted-foreground">Our services are currently available in:</p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>France</li>
            <li>United Kingdom</li>
            <li>Sri Lanka</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">3. User Responsibilities</h2>
          <p className="text-muted-foreground">You agree to:</p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>Provide accurate and complete information when using our website or booking services</li>
            <li>Use our website and services only for lawful purposes</li>
            <li>Not engage in any activity that disrupts or interferes with the functionality of our website</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">4. Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content on our website, including text, graphics, logos, and images, is the
            property of Pearly Sky Cleaning Services Pvt. Ltd. and is protected by intellectual
            property laws. You may not reproduce, distribute, or use any content without our
            prior written consent.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">5. Privacy</h2>
          <p className="text-muted-foreground">
            Your use of our website is also governed by our{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            , which explains how we collect, use, and protect your personal information.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">6. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the fullest extent permitted by law, Pearly Sky Cleaning Services Pvt. Ltd. shall
            not be liable for any indirect, incidental, or consequential damages arising from
            your use of our website or services.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">7. Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms and Conditions are governed by the laws of France, where our headquarters
            is located. Any disputes arising from these terms shall be resolved in the courts of
            France.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">8. Changes to These Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to update or modify these Terms and Conditions at any time. Any
            changes will be posted on this page with an updated revision date. Your continued use
            of our website constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">9. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms and Conditions, please contact us at{" "}
            <a href="mailto:info@pearlyskyglobalclean.com" className="underline underline-offset-2">
              info@pearlyskyglobalclean.com
            </a>
            .
          </p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>Headquarters (France): 15 Rue Des Halles, 75001 Paris, France</li>
            <li>Sri Lanka: No. 188/2, Kandy Road, Pahala Imbulgoda, Imbulgoda, Sri Lanka</li>
            <li>United Kingdom: 60 Tottenham Court Road, Office 775, Fitzrovia, London, W1T 2EW, United Kingdom</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
