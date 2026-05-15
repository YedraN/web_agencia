"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, Clock, Tag, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

const POSTS_PER_PAGE = 9;

interface Props {
  posts: BlogPostMeta[];
  locale: string;
  translations: {
    minRead: string;
    page: string;
    pageOf: string;
    prevPage: string;
    nextPage: string;
    noResults: string;
    searchPlaceholder: string;
    searchResultsSingular: string;
    searchResultsPlural: string;
  };
}

export default function BlogSearchClient({ posts, locale, translations }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const t = translations;

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(q));
  }, [posts, query]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const safePage = Math.min(page, Math.max(totalPages, 1));
  const paginatedPosts = query.trim()
    ? filtered
    : filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  const showPagination = !query.trim() && totalPages > 1;

  return (
    <div>
      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3.5 pl-11 pr-10 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.16] focus:bg-white/[0.06] transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query.trim() && (
        <p className="text-sm text-white/40 mb-6">
          {filtered.length} {filtered.length === 1 ? t.searchResultsSingular : t.searchResultsPlural}
        </p>
      )}

      {paginatedPosts.length === 0 ? (
        <p className="text-white/40 text-center py-20">{t.noResults}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
              >
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-white/40"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-lg font-semibold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors line-clamp-3">
                  {post.title}
                </h2>

                <p className="text-sm text-white/40 leading-relaxed mb-6 line-clamp-3 flex-1">
                  {post.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(
                        locale === "en" ? "en-US" : "es-ES",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </time>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} {t.minRead}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          {showPagination && (
            <nav className="flex items-center justify-center gap-4 mt-16">
              {safePage > 1 && (
                <button
                  onClick={() => setPage(safePage - 1)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm text-white/70 hover:bg-white/[0.08] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t.prevPage}
                </button>
              )}
              <span className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-white/50">
                {t.page} {safePage} {t.pageOf} {totalPages}
              </span>
              {safePage < totalPages && (
                <button
                  onClick={() => setPage(safePage + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-semibold px-5 py-2.5 hover:bg-white/90 transition-colors"
                >
                  {t.nextPage}
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
