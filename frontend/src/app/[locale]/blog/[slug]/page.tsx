import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link as I18nLink } from "@/i18n/routing";
import { ArrowLeft, Clock, Tag } from "lucide-react";
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
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-xs text-white/40"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
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
