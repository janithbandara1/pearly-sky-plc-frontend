"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { blogPosts } from "@/lib/content/blog-posts";

export function BlogView() {
  const { translate } = useLanguage();

  return (
    <main className="flex-1">
      <PageHero
        image="/images/about/hero.webp"
        title={translate("blogPageTitle")}
        subtitle={translate("blogPageSubtitle")}
        hidePriceSelector
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-xl font-bold tracking-tight">{translate("blogRecentArticles")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-video">
                  <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                  <p className="mt-1 font-semibold leading-snug">{post.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
