import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link as I18nLink } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Tag, ArrowUpRight, Clock } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; tag: string }[] = [];
  for (const locale of routing.locales) {
    const tags = await getAllTags(locale);
    for (const tag of tags) {
      params.push({ locale, tag });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  const t = await getTranslations("Blog");
  const isEn = locale === "en";

  return {
    title: `${t("tagTitle")} ${tag} | Vynta Blog`,
    description: `${t("tagDescription")} ${tag}.`,
    alternates: {
      canonical: isEn
        ? `https://vynta.dev/en/blog/tag/${tag}`
        : `https://vynta.dev/blog/tag/${tag}`,
      languages: {
        es: `https://vynta.dev/blog/tag/${tag}`,
        en: `https://vynta.dev/en/blog/tag/${tag}`,
      },
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params;
  const t = await getTranslations("Blog");
  const posts = await getPostsByTag(locale, tag);

  if (posts.length === 0) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-[72px]">
        <section className="mx-auto max-w-7xl px-6 sm:px-10 py-20 sm:py-28">
          <I18nLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </I18nLink>

          <div className="max-w-2xl mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/50 mb-6">
              <Tag className="h-3 w-3" />
              {tag}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              {t("tagTitle")}{" "}
              <span className="italic text-white/40">{tag}</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mt-4">
              {posts.length}{" "}
              {posts.length === 1
                ? locale === "en"
                  ? "article"
                  : "artículo"
                : locale === "en"
                  ? "articles"
                  : "artículos"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <I18nLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
              >
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-white/40"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {t}
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
                      {post.readingTime} {t("minRead")}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
              </I18nLink>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
