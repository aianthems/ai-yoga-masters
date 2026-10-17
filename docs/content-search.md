# Reading search

`/search` searches all published lessons, flows, and meditations. Its native GET
form works without JavaScript. `q` is limited to 160 characters; `type` accepts
`lesson`, `flow`, `meditation`, or `all`. Unknown or duplicate type parameters
fall back to all readings. Duplicate queries are treated as empty.

The index stays on the server and is derived from published source data. It
includes titles, chapter names, original teaching, poses, benefits, practice,
reflection prompts, and editorial notes. Search requires every query word to
match, ignores case, accents, and punctuation, and ranks title matches first.
Excerpts preserve source wording and are rendered as escaped React text.

Search URLs are shareable and work with browser history. They are noindex and
canonicalize to `/search`; query text never enters social metadata. Search is
excluded from the sitemap. Terms are sent to the host in the URL, as explained
beside the form and on the Privacy page. No search history is saved in local
storage, and no search provider, analytics integration, or dependency is added.

`npm test` checks complete reading coverage, ranking, normalization, filters,
body matches, and empty results. `npm run build` validates the page and routes.
