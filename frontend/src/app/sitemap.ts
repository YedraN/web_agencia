import type { MetadataRoute } from "next";
import {
  getPostSlugs,
  getAllTags,
} from "@/lib/blog";

const baseUrl = "https://vynta.dev";

const publicPages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/agencia-digital", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

function addPage(
  routes: MetadataRoute.Sitemap,
  path: string,
  priority: number,
  changeFrequency: string
) {
  routes.push({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority,
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  for (const page of publicPages) {
    routes.push({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          es: `${baseUrl}${page.path}`,
          en: `${baseUrl}/en${page.path}`,
        },
      },
    });
  }

  // Blog posts — Spanish slugs
  const esSlugs = getPostSlugs("es");
  for (const slug of esSlugs) {
    addPage(routes, `/blog/${slug}`, 0.7, "monthly");
  }

  // Blog posts — English slugs
  const enSlugs = getPostSlugs("en");
  for (const slug of enSlugs) {
    addPage(routes, `/en/blog/${slug}`, 0.7, "monthly");
  }

  // Tag pages — Spanish
  const esTags = await getAllTags("es");
  for (const tag of esTags) {
    addPage(routes, `/blog/tag/${tag}`, 0.5, "weekly");
  }

  // Tag pages — English
  const enTags = await getAllTags("en");
  for (const tag of enTags) {
    addPage(routes, `/en/blog/tag/${tag}`, 0.5, "weekly");
  }

  return routes;
}
