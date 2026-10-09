# Search and sharing

The canonical public origin is `https://aiyogamasters.com`. `lib/seo.ts` owns
absolute canonical URLs, page-specific Open Graph/Twitter metadata, and the
indexing policy. Existing page titles, source teaching, navigation, and Studio
behavior are preserved. Canonicals omit query strings and fragments.

Vercel production is indexable. Preview, custom, development, and unknown
Vercel environments are noindex, and their robots file disallows crawling.
The local/self-hosted equivalent requires `NODE_ENV=production` and
`AYM_INDEXABLE=true`. Do not promote a preview artifact without a fresh
production build: static metadata is generated for its build environment.
Existing Vercel deployment authentication is unchanged; noindex is not access
control, and this patch does not add or remove login requirements.

The public sitemap uses the route collections: homepage, curriculum, Practice
Library, generic Studio, chapters, published numbered lessons, flows,
meditations, and need-based practices. It has no fabricated modification dates.
The current collection yields 100 URLs (4 landing pages, 7 chapters, 64 lessons,
16 flows, 4 meditations, 5 practices); tests derive coverage from the data and
links rather than requiring a frozen count. Book-only lessons remain excluded.

Studio links with `lesson` or `practice` parameters keep their full functionality
but are noindex and canonicalize to `/practice`. The generic Studio is
indexable. Query values, intentions, and reflections never enter sharing
metadata or image generation. Tracking-only parameters retain clean canonicals.
Unknown routes keep true 404 responses and do not inherit a homepage canonical.

`/share-image.png` is a 1200 by 630 PNG generated at build time using Next.js
ImageResponse. The SVG favicon and 180 by 180 Apple icon reuse the existing
concentric mark and site colors. No external font or image downloads are needed
at build/runtime, and the sharing image is not downloaded by normal page loads.

## Validation

Use Node 24, then run:

```sh
npm install --no-audit --no-fund
npm run typecheck
npm test
npx playwright install --with-deps chromium --only-shell
npm run test:browser
```

The browser command builds isolated production and preview variants, checks
every public sitemap URL and its metadata, verifies all linked native content,
checks image formats/dimensions, query exclusions and 404s, and tests navigation
and the lesson-aware Studio/timer at 1440, 390 and 320 pixels. External embeds
are fixture responses. No live mail, votes, or database writes occur. It restores
generated TypeScript files and cleans up the isolated build directories.
Diagnostics are local in `test-results/` (git-ignored). CI runs the same checks.
The repository retains its existing npm-install convention; Playwright is pinned
as a development-only dependency and Next.js/React versions are unchanged.

After deployment verify the apex and www redirect anonymously, public robots
and sitemap, canonical/social metadata, icon/image responses, and protected
preview URLs. Search Console submission and actual search inclusion are not
performed or guaranteed by this patch. DNS and email authentication are separate
workflows and remain untouched. Rollback is a revert and fresh production build,
not a DNS change.
