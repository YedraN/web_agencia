import type { MetadataRoute } from "next";

const BASE_URL = "https://vynta.dev";

const publicRoutes = ["", "/about", "/services", "/portfolio", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of publicRoutes) {
    // Spanish (default locale — no prefix)
    entries.push({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}${route}`,
          en: `${BASE_URL}/en${route}`,
        },
      },
    });
  }

  return entries;
}
