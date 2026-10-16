const { test } = require("node:test");
const assert = require("node:assert/strict");
const { parseReadingProgress, continueReading } = require("./lib/reading-progress.js");
const { readingJourney } = require("./lib/reading-journey.js");
const paths = readingJourney.map(entry => entry.href);
const saved = (lastHref, completed = []) => ({ version: 1, lastHref, completed });

test("missing, malformed and unsupported stored progress never opts a reader in", () => {
  for (const raw of [null, "", "invalid JSON", "null", "[]", '{}', '{"version":2,"completed":[]}', '{"version":1,"completed":null}']) {
    assert.equal(parseReadingProgress(raw, readingJourney), null);
  }
});

test("storage accepts only real curriculum paths, deduplicates completion, and discards private or extra data", () => {
  const parsed = parseReadingProgress(JSON.stringify({
    ...saved("https://evil.example", [paths[0], paths[0], paths[1], "/lessons/removed", "//evil.example", null, 4]),
    reflection: "Private writing must not survive parsing",
  }), readingJourney);
  assert.deepEqual(parsed, saved(null, [paths[0], paths[1]]));
});

test("continuation returns an unfinished current reading and crosses both Chapter 5 boundaries after completion", () => {
  for (const href of ["/lessons/deprogramming", "/meditations/thank-you-love-meditation"]) {
    const index = paths.indexOf(href);
    assert.ok(index >= 0);
    assert.equal(continueReading(saved(href), readingJourney).href, href);
    assert.equal(continueReading(saved(href, [href]), readingJourney).href, paths[index + 1]);
  }
});

test("continuation skips completed readings, wraps to unfinished material, and handles a completed collection", () => {
  assert.equal(continueReading(saved(paths[0], paths.slice(0, 3)), readingJourney).href, paths[3]);
  assert.equal(continueReading(saved(paths.at(-1), [paths.at(-1)]), readingJourney).href, paths[0]);
  assert.equal(continueReading(saved(paths[5], paths), readingJourney).href, paths[5]);
  assert.equal(continueReading(saved(null), []), undefined);
});
