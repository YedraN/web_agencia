import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en/", "/about", "/en/about", "/services", "/en/services", "/portfolio", "/en/portfolio", "/contact", "/en/contact"],
        disallow: ["/dashboard", "/login", "/register", "/forgot-password", "/reset-password", "/confirm-email", "/en/dashboard", "/en/login", "/en/register"],
      },
    ],
    sitemap: "https://vynta.dev/sitemap.xml",
  };
}
