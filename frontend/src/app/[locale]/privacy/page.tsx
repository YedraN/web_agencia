import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const t = await getTranslations("Privacy");

  return {
    title: `${t("title")} | Vynta`,
    description: isEn
      ? "Vynta's privacy policy — how we collect, use, and protect your data."
      : "Política de privacidad de Vynta — cómo recopilamos, usamos y protegemos tus datos.",
    alternates: {
      canonical: isEn ? "https://vynta.dev/en/privacy" : "https://vynta.dev/privacy",
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Privacy");

  const sections = [
    { title: t("section1Title"), content: t("section1Content") },
    { title: t("section2Title"), content: t("section2Content") },
    { title: t("section3Title"), content: t("section3Content") },
    { title: t("section4Title"), content: t("section4Content") },
    { title: t("section5Title"), content: t("section5Content") },
    { title: t("section6Title"), content: t("section6Content") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#090909]">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <article className="mx-auto max-w-3xl px-6 sm:px-10 py-20 sm:py-28">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.15] mb-4">
            {t("title")}
          </h1>
          <p className="text-sm text-white/30 mb-12 pb-12 border-b border-white/[0.06]">
            {t("subtitle")}
          </p>

          <p className="text-white/60 leading-relaxed mb-12">
            {t("intro")}
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-white mb-3">
                  {section.title}
                </h2>
                <p className="text-white/50 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
