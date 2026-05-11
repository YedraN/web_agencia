import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/en/dashboard",
          "/login",
          "/en/login",
          "/register",
          "/en/register",
          "/confirm-email",
          "/en/confirm-email",
          "/forgot-password",
          "/en/forgot-password",
          "/reset-password",
          "/en/reset-password",
        ],
      },
    ],
    sitemap: "https://vynta.dev/sitemap.xml",
  };
}
