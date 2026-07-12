import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/services", "/pricing", "/work", "/about", "/faq", "/contact", "/privacy"];
  const servicePaths = services.map((s) => `/services/${s.slug}`);

  return [...staticPaths, ...servicePaths].map((path) => ({
    url: siteUrl + path,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
