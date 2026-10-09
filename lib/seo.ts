import type { Metadata } from "next";

export const SITE_URL = "https://aiyogamasters.com";
export const SITE_NAME = "AI Yoga Masters";
export const SITE_DESCRIPTION = "Ancient practice for intelligent tools. Train attention, judgment, and agency in the age of AI.";
export const SOCIAL_IMAGE_PATH = "/share-image.png";
export const SOCIAL_IMAGE_ALT = "AI Yoga Masters — Ancient practice for intelligent tools. Attention, judgment, and agency.";

type Environment = Record<string, string | undefined>;

// Never infer the canonical origin or indexing policy from request headers.
// Previews/custom environments stay noindex even when NODE_ENV is production.
export function isIndexableDeployment(env: Environment = process.env): boolean {
  if (env.VERCEL === "1" || env.VERCEL_ENV || env.VERCEL_TARGET_ENV) {
    return env.VERCEL_ENV === "production" &&
      (!env.VERCEL_TARGET_ENV || env.VERCEL_TARGET_ENV === "production");
  }
  // Explicit opt-in for self-hosted production and isolated regression builds.
  return env.NODE_ENV === "production" && env.AYM_INDEXABLE === "true";
}

export function canonicalUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || /[\\\s]/.test(path)) {
    throw new Error("Canonical paths must be local absolute paths");
  }
  const url = new URL(path, SITE_URL);
  if (url.origin !== SITE_URL) throw new Error("Invalid canonical origin");
  url.search = "";
  url.hash = "";
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  return url.href;
}

export function robotsMetadata(noIndex = false, env: Environment = process.env): Metadata["robots"] {
  return isIndexableDeployment(env)
    ? { index: !noIndex, follow: true }
    : { index: false, follow: false, nocache: true };
}

export function pageMetadata(
  page: { title: string; description: string; path: string; noIndex?: boolean },
  env: Environment = process.env,
): Metadata {
  const url = canonicalUrl(page.path);
  const images = [{ url: SITE_URL + SOCIAL_IMAGE_PATH, width: 1200, height: 630, type: "image/png", alt: SOCIAL_IMAGE_ALT }];
  return {
    // Preserve this project's existing page-title format.
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    robots: robotsMetadata(page.noIndex, env),
    openGraph: { type: "website", locale: "en_US", siteName: SITE_NAME, title: page.title, description: page.description, url, images },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images },
  };
}

export function hasStudioParameters(params: Record<string, string | string[] | undefined>): boolean {
  return ["lesson", "practice"].some(key => params[key] !== undefined);
}
