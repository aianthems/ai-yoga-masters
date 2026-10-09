import type { MetadataRoute } from "next";
import { isIndexableDeployment } from "../lib/seo";
import { sitemapEntries } from "../lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return isIndexableDeployment() ? sitemapEntries() : [];
}
