"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { formatBlogDate, getBlogPosts } from "@/lib/content/blog-posts";

const RECENT_COUNT = 3;

export function RecentArticles() {
  const { translate, language } = useLanguage();
  const posts = getBlogPosts(language).slice(0, RECENT_COUNT);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {translate("blogRecentArticles")}
      </h2>

      <div className="grid gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          // Only the title is the link (stretched over the whole card by its
          // ::after overlay), so the anchor text is the title alone rather than
          // date + title + description + image alt.
          <div key={post.slug}>
            <Card className="relative h-full overflow-hidden border border-[#c8a089] transition-shadow hover:shadow-md">
              <div className="relative aspect-video">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">{formatBlogDate(post.date, language)}</p>
                <p className="mt-1 font-semibold leading-snug">
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                  </Link>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/blog"
          className="flex items-center gap-1.5 rounded-lg border border-brand-gold bg-brand-navy px-4 py-3 min-h-[48px] text-sm font-semibold text-brand-navy-foreground transition-colors hover:bg-brand-navy/80"
        >
          {translate("blogViewAll")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
