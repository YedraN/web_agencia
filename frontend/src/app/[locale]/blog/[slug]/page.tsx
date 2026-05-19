import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
  getAdjacentPosts,
} from "@/lib/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link as I18nLink } from "@/i18n/routing";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const slugs = getPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};

  const isEn = locale === "en";
  const canonical = isEn
    ? `https://vynta.dev/en/blog/${slug}`
    : `https://vynta.dev/blog/${slug}`;

  return {
    title: `${post.title} | Vynta Blog`,
    description: post.description,
    alternates: {
      canonical,
      languages: {
        es: `https://vynta.dev/blog/${slug}`,
        en: `https://vynta.dev/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Vynta"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");

  const [relatedPosts, { prev, next }] = await Promise.all([
    getRelatedPosts(locale, slug, post.tags, 3),
    getAdjacentPosts(locale, slug),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Vynta", url: "https://vynta.dev" },
    publisher: {
      "@type": "Organization",
      name: "Vynta",
      url: "https://vynta.dev",
      logo: { "@type": "ImageObject", url: "https://vynta.dev/favicon.ico" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": locale === "en"
        ? `https://vynta.dev/en/blog/${slug}`
        : `https://vynta.dev/blog/${slug}`,
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-[72px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="mx-auto max-w-3xl px-6 sm:px-10 py-20 sm:py-28">
          {/* Back */}
          <I18nLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </I18nLink>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <I18nLink
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-xs text-white/40 hover:text-white hover:border-white/[0.16] transition-colors"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </I18nLink>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.15] mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-white/30 mb-12 pb-12 border-b border-white/[0.06]">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                locale === "en" ? "en-US" : "es-ES",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} {t("minRead")}
            </span>
          </div>

          {/* Content */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Previous / Next navigation */}
          {(prev || next) && (
            <nav className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <I18nLink
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] transition-colors"
                >
                  <span className="flex items-center gap-1 text-xs text-white/30">
                    <ChevronLeft className="h-3 w-3" />
                    {t("previousPost")}
                  </span>
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors line-clamp-2">
                    {prev.title}
                  </span>
                </I18nLink>
              ) : (
                <div />
              )}
              {next ? (
                <I18nLink
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] transition-colors sm:text-right"
                >
                  <span className="flex items-center gap-1 text-xs text-white/30 sm:justify-end">
                    {t("nextPost")}
                    <ChevronRight className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors line-clamp-2">
                    {next.title}
                  </span>
                </I18nLink>
              ) : (
                <div />
              )}
            </nav>
          )}

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-white/[0.06]">
              <h2 className="text-lg font-semibold text-white mb-6">
                {t("relatedPosts")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <I18nLink
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.12] transition-colors"
                  >
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors line-clamp-2 mb-2">
                      {rp.title}
                    </span>
                    <span className="text-xs text-white/30 line-clamp-2 flex-1">
                      {rp.description}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/20 group-hover:text-white/50 transition-colors mt-3">
                      {t("minRead")} <ArrowRight className="h-3 w-3" />
                    </span>
                  </I18nLink>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-white/[0.06] rounded-2xl">
            <p className="text-white/40 text-sm mb-4">{t("ctaLabel")}</p>
            <I18nLink
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-semibold px-5 py-2.5 hover:bg-white/90 transition-colors"
            >
              {t("ctaButton")}
            </I18nLink>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
