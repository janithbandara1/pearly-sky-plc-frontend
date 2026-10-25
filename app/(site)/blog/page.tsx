import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildGlobalAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { BlogView } from "./blog-view";
import { GlobalBlog } from "@/components/global-home/global-blog";
import { getBlogPosts } from "@/lib/content/blog-posts";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("blog", language ?? "en");

  if (IS_GLOBAL_SITE) {
    return { title, description, alternates: buildGlobalAlternates("/blog", language),
      ...buildSocialMeta(title, description) };
  }

  return {
    title,
    description,
    alternates: buildCountryAlternates("/blog", { language }),
    ...buildSocialMeta(title, description),
  };
}

export default async function BlogPage() {
  // The global blog gets its posts in the visitor's language, minus the article
  // text (it only lists them), so the browser never downloads every article.
  const posts = IS_GLOBAL_SITE
    ? getBlogPosts(await getRequestLanguage()).map(({ body, ...listing }) => {
        void body;
        return listing;
      })
    : [];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      {IS_GLOBAL_SITE ? <GlobalBlog posts={posts} /> : <BlogView />}
    </>
  );
}
