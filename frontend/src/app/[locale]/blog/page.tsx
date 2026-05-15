import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";
import BlogSearchClient from "@/components/blog/BlogSearchClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn ? "Blog | Vynta" : "Blog | Vynta",
    description: isEn
      ? "Articles on web design, AI automation, and digital strategy from the Vynta team."
      : "Artículos sobre diseño web, automatización con IA y estrategia digital del equipo de Vynta.",
    alternates: {
      canonical: isEn ? "https://vynta.dev/en/blog" : "https://vynta.dev/blog",
      languages: {
        es: "https://vynta.dev/blog",
        en: "https://vynta.dev/en/blog",
      },
    },
    openGraph: {
      title: isEn ? "Blog | Vynta" : "Blog | Vynta",
      description: isEn
        ? "Articles on web design, AI automation, and digital strategy."
        : "Artículos sobre diseño web, automatización con IA y estrategia digital.",
      type: "website",
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Blog");
  const posts = await getAllPosts(locale);

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />

      <main className="flex-1 pt-[72px]">
        <section className="mx-auto max-w-7xl px-6 sm:px-10 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/50 mb-6">
              {t("label")}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4">
              {t("title")}{" "}
              <span className="italic text-white/40">{t("titleItalic")}</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="mt-16">
            <BlogSearchClient
              posts={posts}
              locale={locale}
              translations={{
                minRead: t("minRead"),
                page: t("page"),
                pageOf: t("pageOf"),
                prevPage: t("prevPage"),
                nextPage: t("nextPage"),
                noResults: t("noPosts"),
                searchPlaceholder: locale === "en" ? "Search articles..." : "Buscar artículos...",
                searchResultsSingular: locale === "en" ? "article found" : "artículo encontrado",
                searchResultsPlural: locale === "en" ? "articles found" : "artículos encontrados",
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
