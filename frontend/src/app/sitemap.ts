import { MetadataRoute } from "next";

const baseUrl = "https://vynta.dev";

const publicPages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
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

  routes.push({
    url: `${baseUrl}/agencia-digital`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  });

  return routes;
}
