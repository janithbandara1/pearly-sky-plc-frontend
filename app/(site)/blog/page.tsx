import type { Metadata } from "next";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { BlogView } from "./blog-view";

const TITLE = "Blog | Pearly Sky";
const DESCRIPTION = "Cleaning tips, industry insights, and company news from Pearly Sky's eco-luxury cleaning experts.";

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildCountryAlternates("/blog", { country, language }),
    ...buildSocialMeta(TITLE, DESCRIPTION),
  };
}

export default function BlogPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <BlogView />
    </>
  );
}
