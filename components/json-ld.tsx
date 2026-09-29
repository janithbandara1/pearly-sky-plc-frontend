import { CURRENT_COUNTRY_LANGUAGES } from "@/lib/countries/config";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

/** Renders a schema.org JSON-LD object as an inline <script> tag. */
export function JsonLd({ data }: { data: object }) {
  // JSON.stringify doesn't escape "<", so a "</script>" inside a string value
  // would otherwise close the tag early and let following markup be parsed as HTML.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/** Server Components only — builds the breadcrumb list in the current request's language. */
export async function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const language = (await getRequestLanguage()) ?? CURRENT_COUNTRY_LANGUAGES[0];
  return <JsonLd data={buildBreadcrumbJsonLd(items, language)} />;
}
