import { MetadataRoute } from "next";

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
        ],
      },
    ],
    sitemap: "https://vynta.dev/sitemap.xml",
  };
}
