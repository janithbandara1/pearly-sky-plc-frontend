import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServiceBySlug } from "@/lib/catalog-api";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildServiceAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { getServiceMeta } from "@/lib/countries/service-meta";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { buildLocalePath } from "@/lib/locale";
import { ServiceBookingView } from "./service-booking-view";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
import RelatedServices from "@/components/services-links";
import PaymentMarquee from "@/components/payment-method-services";

const pathFor = (slug: string) => `/services/${slug}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const [{ serviceSlug }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);

  try {
    const service = await getServiceBySlug(serviceSlug, country, language);
    const alternates = buildServiceAlternates(pathFor, service.name, service.locales, { language });
    // Country+language override / language translation SEO copy, then the
    // existing per-country (language-agnostic) hand-authored copy, then a
    // plain generated fallback — see the fallback hierarchy in seo.ts.
    const legacy = getServiceMeta(service.name);
    const title = service.seo.title || legacy?.title || `${service.localizedName} | Pearly Sky`;
    const description =
      service.seo.description ||
      legacy?.description ||
      service.localizedDescription ||
      `Book ${service.localizedName} with Pearly Sky's eco-luxury cleaning team.`;
    const ogTitle = service.seo.ogTitle || title;
    const ogDescription = service.seo.ogDescription || description;
    return { title, description, alternates, ...buildSocialMeta(ogTitle, ogDescription, service.imageUrl ?? undefined) };
  } catch {
    const alternates = buildCountryAlternates(`/services/${serviceSlug}`, { language });
    return { title: "Services | Pearly Sky", alternates };
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const [{ serviceSlug }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);

  // The booking view's internal logic (content lookups, category checks) is
  // keyed by the base English slug, not whatever locale-specific slug the
  // URL used — so it always gets `service.name`, never the raw `serviceSlug`.
  let canonicalSlug = serviceSlug;
  let label = serviceSlug;
  let localizedSlug: string | null = null;
  try {
    const service = await getServiceBySlug(serviceSlug, country, language);
    canonicalSlug = service.name;
    label = service.localizedName;
    localizedSlug = service.slug;
  } catch {
    // Unknown slug — fall through with the raw values; the booking view's own fallback handles it.
  }

  // Reached via a non-canonical slug for this language (e.g. the base
  // English slug, or another locale's slug shared by an old link/bookmark)
  // — 308 onto the current language's own slug so the visible URL always
  // matches what buildServiceAlternates' canonical tag above claims.
  if (localizedSlug && localizedSlug !== serviceSlug) {
    redirect(buildLocalePath(`/services/${localizedSlug}`, language ?? "en"));
  }

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: label, path: `/services/${serviceSlug}` },
        ])}
      />
      <ServiceBookingView serviceSlug={canonicalSlug} />
      <JoinWithUsSection />
      <RelatedServices />
      <PaymentMarquee />
    </>
  );
}
