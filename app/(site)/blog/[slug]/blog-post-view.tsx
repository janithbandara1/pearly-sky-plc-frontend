"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { useLanguage } from "@/lib/i18n/language-context";
import type { BlogPost } from "@/lib/content/blog-posts";

export function BlogPostView({ post, otherPosts }: { post: BlogPost; otherPosts: BlogPost[] }) {
  const { translate } = useLanguage();

  return (
    <main className="flex-1">
      <PageHero image={post.image} title={post.title} subtitle={post.date} hidePriceSelector />
      
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_1fr]">
        <article>
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-brand-gold-dark hover:underline">
            <ArrowLeft className="h-4 w-4" />
            {translate("blogBackToBlog")}
          </Link>
          <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{post.title}</h1>
          <div className="mt-4 space-y-4 text-muted-foreground">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            {translate("blogRecentArticles")}
          </h2>
          <div className="space-y-4">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="flex gap-3 rounded-lg p-2 hover:bg-muted">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
                  <Image src={p.image} alt={p.title} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
