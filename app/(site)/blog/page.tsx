import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildGlobalAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { BlogView } from "./blog-view";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("blog", language ?? "en");

  if (IS_GLOBAL_SITE) {
    return { title, description, alternates: buildGlobalAlternates("C:/Program Files/Git/blog", language),
      ...buildSocialMeta(title, description) };
  }

  return {
    title,
    description,
    alternates: buildCountryAlternates("/blog", { language }),
    ...buildSocialMeta(title, description),
  };
}

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <BlogView />
    </>
  );
}
