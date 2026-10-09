import type { MetadataRoute } from "next";
import { isIndexableDeployment, SITE_URL } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  return isIndexableDeployment()
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
