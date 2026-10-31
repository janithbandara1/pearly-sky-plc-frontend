"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  HeartPulse,
  House,
  KeyRound,
  LayoutGrid,
  Leaf,
  Mail,
  Search,
} from "lucide-react";
import Link from "@/components/locale-link";
import { BLOG_CATEGORIES, formatBlogDate, type BlogCategory } from "@/lib/content/blog-meta";
import type { BlogPost } from "@/lib/content/blog-posts";
import { getCountryContactEmail } from "@/lib/countries/office";
import { useLanguage } from "@/lib/i18n/language-context";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { cn } from "@/lib/utils";
import { greatVibes, playfair } from "./fonts";

const CATEGORY_ICONS: Record<BlogCategory, typeof House> = {
  "Home Cleaning": House,
  "Eco-Friendly Living": Leaf,
  "Property Care": KeyRound,
  "Health & Wellness": HeartPulse,
};

const CATEGORY_KEYS: Record<BlogCategory, GlobalKey> = {
  "Home Cleaning": "blog.category.homeCleaning",
  "Eco-Friendly Living": "blog.category.eco",
  "Property Care": "blog.category.propertyCare",
  "Health & Wellness": "blog.category.health",
};

const PAGE_SIZE = 6;
/** This page lists the newest articles only, up to this many. */
const MAX_POSTS = 10;

/** What the page needs of a post — the article text itself stays on the server. */
export type BlogListPost = Omit<BlogPost, "body">;

/**
 * The global gateway's blog index (IS_GLOBAL_SITE) — search, topic filter, and a
 * popular/recent sidebar. `posts` arrive already in the visitor's language.
 */
export function GlobalBlog({ posts }: { posts: BlogListPost[] }) {
  const { translateGlobal: t, language } = useLanguage();
  const postDate = (post: BlogListPost) => formatBlogDate(post.date, language);
  const gridPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_POSTS),
    [posts],
  );
  const popular = gridPosts.filter((post) => post.popularRank).sort((a, b) => a.popularRank! - b.popularRank!);
  const recent = gridPosts.slice(0, 3);
  // Only offer the topics that actually have posts, so no filter leads to an empty grid.
  const categories = BLOG_CATEGORIES.filter((name) => gridPosts.some((post) => post.category === name));
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const categoryTrackRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return gridPosts.filter(
      (post) =>
        (category === "All" || post.category === category) &&
        (!needle || post.title.toLowerCase().includes(needle) || post.description.toLowerCase().includes(needle)),
    );
  }, [category, query, gridPosts]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(next, 1), pageCount));
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollCategories = (direction: 1 | -1) =>
    categoryTrackRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });

  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex flex-1 flex-col bg-navy-900 font-sans text-slate-100`}>
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <Image src="/images/global-home/about-hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/75 to-navy-900/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full border border-gold-500/40 bg-navy-800/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
              {t("blog.eyebrow")}
            </span>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("blog.title")}
            </h1>
            <p className="mb-4 font-display text-xl font-medium text-gold-300 sm:text-2xl">
              {t("blog.tagline")}
            </p>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {t("blog.description")}
            </p>

            <form
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex max-w-2xl items-center rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md"
            >
              <Search className="ml-3.5 h-4 w-4 shrink-0 text-slate-300" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder={t("blog.searchPlaceholder")}
                aria-label={t("blog.searchAria")}
                className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-white placeholder:text-slate-300 focus:outline-none"
              />
              <button
                type="submit"
                className="gold-gradient-bg shrink-0 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-900 shadow transition-all hover:brightness-110"
              >
                {t("blog.search")}
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-b border-slate-800 bg-navy-900/95 shadow-md backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div ref={categoryTrackRef} className="scrollbar-hide flex items-center gap-3 overflow-x-auto py-1">
            <CategoryButton active={category === "All"} Icon={LayoutGrid} label={t("blog.allArticles")} onClick={() => { setCategory("All"); setPage(1); }} />
            {categories.map((name) => (
              <CategoryButton
                key={name}
                active={category === name}
                Icon={CATEGORY_ICONS[name]}
                label={t(CATEGORY_KEYS[name])}
                onClick={() => {
                  setCategory(name);
                  setPage(1);
                }}
              />
            ))}
          </div>
          <div className="hidden shrink-0 items-center gap-2 text-slate-400 md:flex">
            {([-1, 1] as const).map((direction) => {
              const Icon = direction === -1 ? ChevronLeft : ChevronRight;
              return (
                <button
                  key={direction}
                  type="button"
                  aria-label={direction === -1 ? t("blog.scrollLeft") : t("blog.scrollRight")}
                  onClick={() => scrollCategories(direction)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-navy-800 transition hover:border-gold-500"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="flex-1 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div ref={gridRef} className="scroll-mt-36 space-y-8 lg:col-span-2">
            <h2 className="sr-only">{t("blog.articles")}</h2>
            {visible.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {visible.map((post) => (
                  <ArticleCard key={post.slug} post={post} date={postDate(post)} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-navy-800 py-16 text-center">
                <FolderOpen className="mx-auto mb-3 h-10 w-10 text-gold-500" />
                <h3 className="mb-1 font-display text-lg font-bold text-white">{t("blog.noneTitle")}</h3>
                <p className="text-xs text-slate-400">{t("blog.noneText")}</p>
              </div>
            )}

            {pageCount > 1 && (
              <nav aria-label={t("blog.pagination")} className="flex items-center justify-center gap-2 border-t border-slate-800 pt-6">
                <PageButton label={t("blog.prevPage")} onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </PageButton>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                  <PageButton
                    key={number}
                    label={t("blog.page", { page: number })}
                    active={number === currentPage}
                    onClick={() => goToPage(number)}
                  >
                    {number}
                  </PageButton>
                ))}
                <PageButton label={t("blog.nextPage")} onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageCount}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </PageButton>
              </nav>
            )}
          </div>

          <aside className="space-y-8">
            {popular.length > 0 && (
              <div className="rounded-2xl border border-slate-800 bg-navy-800 p-5 shadow-xl">
                <h2 className="mb-4 border-b border-slate-800 pb-3 font-display text-sm font-bold tracking-wide text-white">
                  {t("blog.mostPopular")}
                </h2>
                <ol className="space-y-4">
                  {popular.map((post, index) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="group flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-xs font-bold text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-900">
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-xs font-semibold leading-snug text-slate-200 transition group-hover:text-gold-400">
                            {post.title}
                          </span>
                          <span className="text-[10px] text-slate-500">{t(CATEGORY_KEYS[post.category])}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="rounded-2xl border border-slate-800 bg-navy-800 p-5 shadow-xl">
              <h2 className="mb-4 border-b border-slate-800 pb-3 font-display text-sm font-bold tracking-wide text-white">
                {t("blog.recent")}
              </h2>
              <ul className="space-y-4">
                {recent.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group flex items-center gap-3">
                      <Image
                        src={post.image}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                      />
                      <span>
                        <span className="block text-xs font-semibold leading-snug text-slate-200 transition group-hover:text-gold-400">
                          {post.title}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {t(CATEGORY_KEYS[post.category])} · {postDate(post)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}

function ArticleCard({ post, date }: { post: BlogListPost; date: string }) {
  const { translateGlobal: t } = useLanguage();

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-navy-800 shadow-xl transition duration-300 hover:border-gold-500/50">
      <div>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-800 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-full border border-gold-500/30 bg-navy-900/90 px-3 py-1 text-[10px] font-semibold text-gold-400 backdrop-blur">
            {t(CATEGORY_KEYS[post.category])}
          </span>
          <span className="absolute bottom-3 right-3 rounded bg-navy-900/80 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
            {date}
          </span>
        </div>
        <div className="p-5">
          <h3 className="mb-2 font-display text-base font-bold leading-snug text-white transition group-hover:text-gold-400">
            <Link href={`/blog/${post.slug}`} className="min-h-0!">
              {post.title}
            </Link>
          </h3>
          <p className="mb-4 text-xs leading-relaxed text-slate-300">{post.description}</p>
        </div>
      </div>
      <div className="px-5 pb-5">
        <Link
          href={`/blog/${post.slug}`}
          aria-label={t("blog.readMoreAria", { title: post.title })}
          className="flex items-center gap-1.5 text-xs font-bold text-gold-400 transition hover:text-gold-300"
        >
          <span>{t("blog.readMore")}</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
}

function CategoryButton({
  active,
  Icon,
  label,
  onClick,
}: {
  active: boolean;
  Icon: typeof House;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition",
        active
          ? "gold-gradient-bg text-navy-900 shadow"
          : "border border-slate-700 bg-navy-800 text-slate-300 hover:border-gold-500 hover:text-white",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function PageButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "gold-gradient-bg font-bold text-navy-900 shadow"
          : "border border-slate-700 bg-navy-800 text-slate-300 hover:border-gold-500",
      )}
    >
      {children}
    </button>
  );
}

/**
 * No newsletter backend exists,
 * so subscribing opens a pre-filled email to the team instead of pretending
 * to store the address.
 */
function Newsletter() {
  const { translateGlobal: t } = useLanguage();
  const [email, setEmail] = useState("");
  const contactEmail = getCountryContactEmail(null);

  return (
    <section className="relative overflow-hidden border-t border-slate-800 py-16">
      <Image src="/images/global-home/blog-newsletter.webp" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r from-navy-900/95 to-navy-900/85" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-2 font-display text-2xl font-bold text-white sm:text-3xl">
          {t("blog.newsletter.title")}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-xs text-slate-300 sm:text-sm">{t("blog.newsletter.description")}</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const subject = encodeURIComponent("Blog newsletter subscription");
            const body = encodeURIComponent(`Please subscribe ${email} to the Pearly Sky blog newsletter.`);
            window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
          }}
          className="mx-auto flex max-w-md items-center rounded-2xl border border-slate-700 bg-navy-900 p-2 shadow-2xl"
        >
          <Mail className="ml-3 h-4 w-4 shrink-0 text-gold-500" />
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("blog.newsletter.placeholder")}
            aria-label={t("blog.newsletter.placeholder")}
            autoComplete="email"
            className="w-full min-w-0 bg-transparent px-3 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none"
          />
          {/* Disabled for now — signups aren't open yet (see the note above Newsletter). */}
          <button
            type="submit"
            disabled
            className="gold-gradient-bg flex shrink-0 cursor-not-allowed items-center gap-1 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy-900 opacity-50 shadow"
          >
            {t("blog.newsletter.subscribe")}
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>
      </div>
    </section>
  );
}
