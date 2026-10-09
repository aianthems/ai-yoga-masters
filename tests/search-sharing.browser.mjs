import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { rm } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { chromium } from "playwright";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const origin = "https://aiyogamasters.com";
const next = join(root, "node_modules/next/dist/bin/next");
const originals = ["next-env.d.ts", "tsconfig.json"].map(name => ({ name, content: readFileSync(join(root, name)) }));
const results = { modes: [], browser: [] };
const output = join(root, "test-results");
mkdirSync(output, { recursive: true });
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) || [];
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
const decode = value => value?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, name) => decode(attribute(tags(html, "meta").find(tag => attribute(tag, "name") === name || attribute(tag, "property") === name) || "", "content"));
const canonicals = html => tags(html, "link").filter(tag => attribute(tag, "rel") === "canonical").map(tag => new URL(decode(attribute(tag, "href"))).href);
const canonical = path => { const url = new URL(path, origin); url.search = ""; url.hash = ""; return url.href; };

function checkPage(response, html, path, noIndex = false) {
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get("www-authenticate"), null, path);
  assert.deepEqual(canonicals(html), [canonical(path)], `canonical ${path}`);
  assert.equal(new URL(meta(html, "og:url")).href, canonical(path), path);
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1]);
  assert.ok(title, path);
  assert.equal(meta(html, "og:title"), title, path);
  assert.equal(meta(html, "twitter:title"), title, path);
  assert.ok(meta(html, "description"), path);
  assert.equal(meta(html, "og:description"), meta(html, "description"), path);
  assert.equal(meta(html, "twitter:description"), meta(html, "description"), path);
  assert.equal(meta(html, "og:site_name"), "AI Yoga Masters", path);
  assert.equal(meta(html, "twitter:card"), "summary_large_image", path);
  assert.equal(meta(html, "og:image"), origin + "/share-image.png", path);
  assert.equal(meta(html, "twitter:image"), origin + "/share-image.png", path);
  assert.equal(meta(html, "og:image:width"), "1200", path);
  assert.equal(meta(html, "og:image:height"), "630", path);
  assert.ok(meta(html, "og:image:alt"), path);
  assert.equal(/noindex/.test(meta(html, "robots") || ""), noIndex, path);
  if (!noIndex) assert.ok(!/noindex/.test(response.headers.get("x-robots-tag") || ""));
  assert.ok(tags(html, "link").some(tag => attribute(tag, "href") === "/favicon.svg"));
  assert.ok(tags(html, "link").some(tag => attribute(tag, "href") === "/apple-touch-icon.png"));
}

async function port() {
  const socket = createServer(); socket.listen(0, "127.0.0.1"); await once(socket, "listening");
  const number = socket.address().port; await new Promise(resolve => socket.close(resolve)); return number;
}
async function stop(child) {
  if (!child || child.exitCode !== null) return;
  const exited = once(child, "exit"); child.kill("SIGTERM");
  await Promise.race([exited, delay(3000)]);
  if (child.exitCode === null) { child.kill("SIGKILL"); await exited; }
}

let browser;
try {
  for (const mode of ["production", "preview"]) {
    const distDir = `.next-seo-${mode}`;
    const env = { ...process.env, NODE_ENV: "production", VERCEL_ENV: mode, VERCEL_TARGET_ENV: mode, AYM_TEST_DIST_DIR: distDir, NEXT_TELEMETRY_DISABLED: "1" };
    await rm(join(root, distDir), { recursive: true, force: true });
    const build = spawn(process.execPath, [next, "build"], { cwd: root, env, stdio: "inherit" });
    const [code] = await once(build, "exit"); assert.equal(code, 0, `${mode} build`);
    const base = `http://127.0.0.1:${await port()}`;
    const server = spawn(process.execPath, [next, "start", "--hostname", "127.0.0.1", "--port", new URL(base).port], { cwd: root, env, stdio: "inherit" });
    const get = path => fetch(base + path, { redirect: "manual", headers: { "User-Agent": "Googlebot" }, signal: AbortSignal.timeout(30000) });
    try {
      let ready = false;
      for (let n = 0; n < 60; n++) {
        if (server.exitCode !== null) throw new Error("Test server exited");
        try { if ((await get("/robots.txt")).ok) { ready = true; break; } } catch { /* starting */ }
        await delay(500);
      }
      assert.ok(ready, "Local server starts");
      const robotResponse = await get("/robots.txt"); assert.equal(robotResponse.status, 200);
      const robots = await robotResponse.text();
      const sitemapResponse = await get("/sitemap.xml"); assert.equal(sitemapResponse.status, 200);
      const xml = await sitemapResponse.text();
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
      if (mode === "preview") {
        assert.match(robots, /^Disallow: \/$/m); assert.ok(!robots.includes("Sitemap:")); assert.deepEqual(urls, []);
        for (const path of ["/", "/curriculum", "/lessons/redefining-yoga", "/practice"]) {
          const r = await get(path); checkPage(r, await r.text(), path, true);
        }
        results.modes.push({ mode, result: "PASS", sitemapUrls: 0 });
        console.log("PASS preview metadata noindex, deny-all robots and no sitemap URLs; Vercel access protection unchanged");
        continue;
      }
      assert.match(robots, /^Allow: \/$/m); assert.ok(!/^Disallow: \/$/m.test(robots));
      assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
      assert.ok(urls.length > 10); assert.equal(urls.length, new Set(urls).size);
      assert.ok(!xml.includes("<lastmod>"), "Do not invent modified dates");
      const links = new Set([origin + "/"]);
      for (let start = 0; start < urls.length; start += 4) {
        await Promise.all(urls.slice(start, start + 4).map(async url => {
          const parsed = new URL(url); assert.equal(parsed.origin, origin); assert.equal(parsed.search, ""); assert.equal(parsed.hash, "");
          const response = await get(parsed.pathname); const html = await response.text(); checkPage(response, html, parsed.pathname);
          for (const tag of tags(html, "a")) {
            const href = decode(attribute(tag, "href")); if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
            links.add(canonical(href));
          }
        }));
      }
      assert.deepEqual([...links].sort(), [...urls].map(url => new URL(url).href).sort(), "Sitemap matches all linked native content");
      for (const path of ["/practice?lesson=redefining-yoga", "/practice?practice=step-away", "/practice?lesson=", "/practice?lesson=a&lesson=b", "/practice?lesson=https%3A%2F%2Funtrusted.example"]) {
        const r = await get(path); checkPage(r, await r.text(), path, true);
      }
      for (const path of ["/practice?utm_source=launch", "/curriculum?utm_source=launch"]) {
        const r = await get(path); checkPage(r, await r.text(), path);
      }
      for (const path of ["/not-a-page", "/chapters/not-published", "/lessons/not-published", "/flows/not-published", "/meditations/not-published", "/practices/not-published"]) {
        const r = await get(path); assert.equal(r.status, 404, path); const html = await r.text(); assert.match(html, /noindex/); assert.deepEqual(canonicals(html), [], "No inherited homepage canonical on 404s");
      }
      for (const [path, width, height] of [["/share-image.png", 1200, 630], ["/apple-touch-icon.png", 180, 180]]) {
        const r = await get(path); assert.equal(r.status, 200); assert.match(r.headers.get("content-type"), /^image\/png/);
        const data = Buffer.from(await r.arrayBuffer()); assert.equal(data.toString("hex", 0, 8), "89504e470d0a1a0a");
        assert.equal(data.readUInt32BE(16), width); assert.equal(data.readUInt32BE(20), height); assert.ok(data.length < 1_000_000);
        writeFileSync(join(output, path.slice(1)), data);
      }
      const icon = await get("/favicon.svg"); assert.equal(icon.status, 200); assert.match(icon.headers.get("content-type"), /image\/svg\+xml/);
      results.modes.push({ mode, result: "PASS", sitemapUrls: urls.length });
      console.log(`PASS ${urls.length} anonymous pages, full metadata, discovery, icons, query canonicals and real 404s`);

      browser = await chromium.launch({ headless: true });
      for (const width of [1440, 390, 320]) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 500, hasTouch: width < 500, reducedMotion: "reduce" });
        // No external embeds or live media/database mutations in regression tests.
        await context.route(url => url.origin !== base, route => route.fulfill({ status: 200, contentType: "text/html", body: "Local test embed" }));
        const page = await context.newPage(); const errors = []; const writes = []; const media = [];
        page.on("pageerror", error => errors.push(error.message));
        page.on("request", request => { if (!["GET", "HEAD"].includes(request.method())) writes.push(request.url()); if (/\.(mp3|mp4|pdf)(\?|$)/.test(request.url())) media.push(request.url()); });
        const samples = ["/", "/curriculum", "/chapters/lost-teachings-of-yoga", "/lessons/ekagra-one-pointed-focus", "/practices", "/practices/scattered-attention", "/practice", ...["flows", "meditations"].map(section => new URL(urls.find(url => new URL(url).pathname.startsWith(`/${section}/`))).pathname)];
        for (const path of samples) {
          const r = await page.goto(base + path); assert.equal(r.status(), 200, path);
          assert.equal(await page.locator("h1").count(), 1, path);
          assert.deepEqual(await page.locator('link[rel="canonical"]').evaluateAll(nodes => nodes.map(n => new URL(n.href).href)), [canonical(path)]);
          const dimensions = await page.evaluate(() => ({ viewport: innerWidth, body: document.documentElement.scrollWidth }));
          assert.ok(dimensions.body <= dimensions.viewport, `${width}px overflow ${path}`);
          for (const link of await page.locator("header nav a").all()) assert.ok(await link.isVisible());
        }
        await page.goto(base + "/"); await page.screenshot({ path: join(output, `home-${width}.png`) });
        for (const href of ["/curriculum", "/chapters/lost-teachings-of-yoga", "/practices", "/practice", "/#petals"]) {
          await page.locator(`header nav a[href="${href}"]`).click(); await page.waitForURL(base + href);
        }
        await page.goto(base + "/lessons/ekagra-one-pointed-focus");
        await page.locator('a[href^="/practice?"]').first().click();
        assert.equal(await page.locator(".studio-origin").count(), 1);
        await page.getByLabel("Steady", { exact: true }).check();
        await page.getByRole("button", { name: "Continue →", exact: true }).click();
        await page.getByRole("button", { name: "Choose this practice →", exact: true }).click();
        await page.locator("#intention").fill("Local regression test"); await page.locator("#duration").selectOption("2");
        await page.getByRole("button", { name: "Begin practicing →", exact: true }).click();
        await page.getByRole("button", { name: "Start timer", exact: true }).click(); await page.waitForTimeout(1200);
        await page.getByRole("button", { name: "Pause timer", exact: true }).click(); assert.notEqual(await page.getByRole("timer").innerText(), "02:00");
        await page.getByRole("button", { name: "Finish and reflect →", exact: true }).click();
        await page.locator("#reflection").fill("Local test completed");
        await page.getByRole("button", { name: "Close my practice →", exact: true }).click();
        assert.ok(await page.getByRole("heading", { name: "Your session is complete.", exact: true }).isVisible());
        await page.getByRole("button", { name: "Clear and begin a new practice", exact: true }).click();
        assert.ok(await page.getByRole("heading", { name: "How is your attention right now?", exact: true }).isVisible());
        assert.deepEqual(errors, []); assert.deepEqual(writes, []); assert.deepEqual(media, []);
        results.browser.push({ width, pages: samples.length, navigation: "PASS", lessonStudioTimer: "PASS", errors: 0, networkWrites: 0 });
        await context.close(); console.log(`PASS ${width}px metadata/navigation and lesson-aware Studio/timer without errors or network writes`);
      }
      await browser.close(); browser = undefined;
    } finally { await stop(server); }
  }
  writeFileSync(join(output, "search-sharing-results.json"), JSON.stringify(results, null, 2));
  console.log("Search-and-sharing regressions passed in both deployment modes.");
} finally {
  if (browser) await browser.close();
  for (const item of originals) writeFileSync(join(root, item.name), item.content);
  for (const mode of ["production", "preview"]) await rm(join(root, `.next-seo-${mode}`), { recursive: true, force: true });
}
