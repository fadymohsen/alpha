import type { MetadataRoute } from "next";

const siteUrl = "https://alpha-transportation.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ar", "en"];
  const pages = ["", "/about", "/services", "/contact", "/faq", "/careers", "/privacy", "/terms", "/refund"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "/about" || page === "/services" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
