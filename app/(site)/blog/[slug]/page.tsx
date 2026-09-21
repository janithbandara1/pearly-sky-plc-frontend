import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/content/blog-posts";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { BlogPostView } from "./blog-post-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const [{ slug }, language] = await Promise.all([params, getRequestLanguage()]);
  const post = getBlogPost(slug);
  const title = post ? `${post.title} | Pearly Sky Blog` : "Blog | Pearly Sky";

  return {
    title,
    description: post?.description,
    alternates: buildCountryAlternates(`/blog/${slug}`, { language }),
    ...buildSocialMeta(title, post?.description, post?.image),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />
      <JsonLd data={buildArticleJsonLd(post)} />
      <BlogPostView post={post} otherPosts={otherPosts} />
    </>
  );
}
