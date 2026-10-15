import { chapters, publishedLessons } from "./curriculum";
import { yogaFlows, chapterMeditations } from "./chapter-five";
import { canonicalUrl } from "./seo";

// These collections are the same ones used by each route's static parameters.
// Do not add book-only lessons, session queries, or made-up modification dates.
export function sitemapEntries(): { url: string }[] {
  const paths = [
    "/", "/curriculum", "/about",
    ...chapters.map(item => `/chapters/${item.slug}`),
    ...publishedLessons.map(item => `/lessons/${item.slug}`),
    ...yogaFlows.map(item => `/flows/${item.slug}`),
    ...chapterMeditations.map(item => `/meditations/${item.slug}`),
  ];
  return [...new Set(paths.map(canonicalUrl))].map(url => ({ url }));
}
