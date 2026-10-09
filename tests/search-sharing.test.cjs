const { test } = require("node:test");
const assert = require("node:assert/strict");
const { SITE_URL, SITE_NAME, canonicalUrl, isIndexableDeployment, pageMetadata, hasStudioParameters } = require("./lib/seo.js");
const { sitemapEntries } = require("./lib/sitemap.js");
const { curriculum, publishedLessons, chapters } = require("./lib/curriculum.js");
const { yogaFlows, chapterMeditations } = require("./lib/chapter-five.js");
const { practiceNeeds } = require("./lib/practice-library.js");
const robots = require("./app/robots.js").default;
const sitemap = require("./app/sitemap.js").default;
const production = { NODE_ENV: "production", VERCEL_ENV: "production", VERCEL_TARGET_ENV: "production" };

function withEnvironment(env, check) {
  const keys = ["NODE_ENV", "VERCEL", "VERCEL_ENV", "VERCEL_TARGET_ENV", "AYM_INDEXABLE"];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  try {
    for (const key of keys) { delete process.env[key]; if (env[key] !== undefined) process.env[key] = env[key]; }
    check();
  } finally {
    for (const key of keys) { delete process.env[key]; if (previous[key] !== undefined) process.env[key] = previous[key]; }
  }
}

test("only production or explicit local production opt-in is indexable", () => {
  assert.equal(isIndexableDeployment(production), true);
  assert.equal(isIndexableDeployment({ VERCEL_ENV: "production" }), true);
  assert.equal(isIndexableDeployment({ NODE_ENV: "production", AYM_INDEXABLE: "true" }), true);
  for (const env of [{}, { NODE_ENV: "development", AYM_INDEXABLE: "true" }, { NODE_ENV: "production" }, { VERCEL: "1", AYM_INDEXABLE: "true" }]) assert.equal(isIndexableDeployment(env), false);
});

test("a local flag cannot enable indexing on preview, development or custom deployments", () => {
  for (const target of ["preview", "development", "staging", "unknown"]) {
    assert.equal(isIndexableDeployment({ ...production, VERCEL_ENV: target, AYM_INDEXABLE: "true" }), false);
    assert.equal(isIndexableDeployment({ ...production, VERCEL_TARGET_ENV: target, AYM_INDEXABLE: "true" }), false);
  }
});

test("canonicals use HTTPS apex with no session/query/hash/trailing-slash duplicates", () => {
  assert.equal(canonicalUrl("/"), SITE_URL + "/");
  assert.equal(canonicalUrl("/practice/?lesson=ekagra#private"), SITE_URL + "/practice");
  assert.equal(canonicalUrl("/lessons/redefining-yoga?utm_source=launch"), SITE_URL + "/lessons/redefining-yoga");
});

test("canonical origins cannot be supplied by external or malformed paths", () => {
  for (const path of ["https://evil.example", "//evil.example/path", "/\\evil.example", "relative", "/bad path", "/bad\npath"]) assert.throws(() => canonicalUrl(path));
});

test("page metadata agrees across browser, canonical, Open Graph and Twitter", () => {
  const page = { title: "Lesson 1: Redefining Yoga | AI Yoga Masters", description: "Original source with a separate contemporary practice.", path: "/lessons/redefining-yoga" };
  const m = pageMetadata(page, production);
  assert.equal(m.title, page.title);
  assert.equal(m.description, page.description);
  assert.equal(m.alternates.canonical, SITE_URL + page.path);
  assert.equal(m.openGraph.url, m.alternates.canonical);
  assert.equal(m.openGraph.siteName, SITE_NAME);
  assert.equal(m.openGraph.title, page.title);
  assert.equal(m.twitter.title, page.title);
  assert.equal(m.twitter.description, page.description);
  assert.equal(m.twitter.card, "summary_large_image");
  assert.deepEqual(m.twitter.images, m.openGraph.images);
  assert.equal(m.openGraph.images[0].url, SITE_URL + "/share-image.png");
  assert.equal(m.openGraph.images[0].width, 1200);
  assert.equal(m.openGraph.images[0].height, 630);
  assert.ok(m.openGraph.images[0].alt);
  assert.deepEqual(m.robots, { index: true, follow: true });
});

test("Studio selectors are non-indexable variants without exposing session text", () => {
  for (const params of [{ lesson: "redefining-yoga" }, { practice: "step-away" }, { lesson: "" }, { lesson: ["a", "b"] }]) assert.equal(hasStudioParameters(params), true);
  assert.equal(hasStudioParameters({}), false);
  assert.equal(hasStudioParameters({ utm_source: "launch" }), false);
  const m = pageMetadata({ title: "Practice Studio | AI Yoga Masters", description: "Guided practice.", path: "/practice?lesson=sample", noIndex: true }, production);
  assert.deepEqual(m.robots, { index: false, follow: true });
  assert.equal(m.alternates.canonical, SITE_URL + "/practice");
});

test("preview metadata stays noindex with production canonicals", () => {
  const m = pageMetadata({ title: "Test", description: "Test page.", path: "/curriculum" }, { ...production, VERCEL_ENV: "preview" });
  assert.equal(m.robots.index, false);
  assert.equal(m.robots.follow, false);
  assert.equal(m.alternates.canonical, SITE_URL + "/curriculum");
});

test("sitemap exactly covers the real page collections without imaginary routes or dates", () => {
  assert.deepEqual(publishedLessons, curriculum.filter(lesson => lesson.paragraphs?.length));
  const expected = ["/", "/curriculum", "/practices", "/practice", ...chapters.map(x => `/chapters/${x.slug}`), ...publishedLessons.map(x => `/lessons/${x.slug}`), ...yogaFlows.map(x => `/flows/${x.slug}`), ...chapterMeditations.map(x => `/meditations/${x.slug}`), ...practiceNeeds.map(x => `/practices/${x.slug}`)].map(path => new URL(path, SITE_URL).href);
  const entries = sitemapEntries();
  assert.deepEqual(entries.map(x => x.url).sort(), [...new Set(expected)].sort());
  for (const item of entries) {
    assert.deepEqual(Object.keys(item), ["url"]);
    const url = new URL(item.url);
    assert.equal(url.origin, SITE_URL); assert.equal(url.search, ""); assert.equal(url.hash, "");
  }
});

test("production robots and sitemap are public; previews advertise neither crawling nor sitemap URLs", () => {
  withEnvironment(production, () => {
    assert.deepEqual(robots(), { rules: { userAgent: "*", allow: "/" }, sitemap: SITE_URL + "/sitemap.xml" });
    assert.deepEqual(sitemap(), sitemapEntries());
  });
  withEnvironment({ ...production, VERCEL_ENV: "preview" }, () => {
    assert.deepEqual(robots(), { rules: { userAgent: "*", disallow: "/" } });
    assert.deepEqual(sitemap(), []);
  });
});
