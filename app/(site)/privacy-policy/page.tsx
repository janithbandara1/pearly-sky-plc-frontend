import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { STATIC_PAGE_META } from "@/lib/countries/meta-data";
import { ArrowLeft } from "lucide-react";

const { title: TITLE } = STATIC_PAGE_META.privacyPolicy;

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();

  return {
    title: TITLE,
    alternates: buildCountryAlternates("/privacy-policy", { language }),
    ...buildSocialMeta(TITLE),
  };
}

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]} />
      <PageHero image="/images/about/hero.webp" hidePriceSelector title="Privacy Policy" />

          
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
        <p className="text-sm text-muted-foreground">Last updated: August 8, 2026</p>

        <p>
          Pearly Sky Cleaning Services Pvt. Ltd. (“Pearly Sky”, “we”, “us”, or “our”) respects
          your privacy. This Privacy Policy explains how we collect, use, share, and protect your
          personal information when you visit our website, book a service, or otherwise interact
          with us.
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">1. Information We Collect</h2>
          <p className="text-muted-foreground">We collect information you provide directly to us, including:</p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>Contact details — name, email address, and phone number</li>
            <li>Service address — the address(es) where a booking or quotation is to take place</li>
            <li>Account credentials — email and password, if you create an account</li>
            <li>Booking details — service selected, date/time, property details, and any preferences or special requirements you provide</li>
            <li>Payment information — processed securely by our payment provider, Stripe; we do not store your full card details ourselves</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">2. How We Use Your Information</h2>
          <p className="text-muted-foreground">We use the information we collect to:</p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>Create and manage your account</li>
            <li>Process bookings and quotation requests, and schedule and deliver services</li>
            <li>Process payments through Stripe</li>
            <li>Send booking confirmations, price updates, and other service-related emails</li>
            <li>Respond to your enquiries and provide customer support</li>
            <li>Maintain the security of our website and prevent fraud</li>
            <li>Comply with our legal obligations</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">3. Cookies</h2>
          <p className="text-muted-foreground">Our website uses a small number of cookies to make the site work properly, including cookies that:</p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>Remember your selected country and language so we can show you the right pricing and content</li>
            <li>Keep you securely signed in to your account</li>
          </ul>
          <p className="text-muted-foreground">
            We do not use these cookies for advertising. You can control or delete cookies
            through your browser settings, though disabling them may affect parts of the site’s
            functionality.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">4. How We Share Your Information</h2>
          <p className="text-muted-foreground">
            We do not sell your personal information. We share it only where necessary to
            provide our services:
          </p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>With our cleaning and care professionals, so they can carry out the service you’ve booked</li>
            <li>With Stripe, to process payments</li>
            <li>With our email delivery provider, to send booking and account-related emails</li>
            <li>Where required by law, regulation, or a valid legal process</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">5. Data Security</h2>
          <p className="text-muted-foreground">
            We use reasonable technical and organizational measures to protect your personal
            information, including encrypting passwords and using secure connections. No method
            of transmission or storage is completely secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">6. Data Retention</h2>
          <p className="text-muted-foreground">
            We retain your personal information for as long as your account is active or as
            needed to provide you services, comply with our legal obligations, resolve disputes,
            and enforce our agreements.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">7. Your Rights</h2>
          <p className="text-muted-foreground">
            Depending on where you live, you may have rights under data protection laws such as
            the EU/UK General Data Protection Regulation (GDPR), including the right to:
          </p>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to or restrict certain processing</li>
            <li>Request a copy of your data in a portable format</li>
          </ul>
          <p className="text-muted-foreground">
            To exercise any of these rights, contact us using the details in Section 9 below.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">8. Children’s Privacy</h2>
          <p className="text-muted-foreground">
            Our services are not directed to children, and we do not knowingly collect personal
            information from children under 18.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">9. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy or how we handle your personal
            information, please contact us at{" "}
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

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">10. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. Any changes will be posted on
            this page with an updated revision date. See also our{" "}
            <Link href="/terms-and-conditions" className="underline underline-offset-2">
              Terms and Conditions
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
