const { test } = require("node:test");
const assert = require("node:assert/strict");
const { searchEntries, searchReadings, searchKind } = require("./lib/content-search.js");
const { readingJourney } = require("./lib/reading-journey.js");

test("search covers every published reading exactly once", () => {
  assert.equal(new Set(searchEntries.map(x => x.href)).size, searchEntries.length);
  assert.deepEqual(searchEntries.map(x => x.href).sort(), readingJourney.map(x => x.href).sort());
  for (const entry of searchEntries) {
    assert.ok(searchReadings(entry.title).some(result => result.href === entry.href));
    assert.ok(searchReadings(entry.passages[0].split(/\s+/).slice(0, 6).join(" ")).some(result => result.href === entry.href));
  }
});

test("exact titles rank first; case, accents and punctuation do not prevent matches", () => {
  assert.equal(searchReadings("Ekagra: One-Pointed Focus")[0].href, "/lessons/ekagra-one-pointed-focus");
  assert.deepEqual(searchReadings("FOCUS").map(x => x.href), searchReadings("fócus").map(x => x.href));
  assert.ok(searchReadings("breath").some(x => x.kind === "flow"));
  assert.ok(searchReadings("focus").some(x => x.kind === "meditation"));
});

test("type filters, multiple keywords, empty input and no matches behave predictably", () => {
  for (const kind of ["lesson", "flow", "meditation"]) {
    const results = searchReadings("yoga", kind);
    assert.ok(results.length);
    assert.ok(results.every(x => x.kind === kind));
  }
  assert.equal(searchKind(["lesson", "flow"]), "all");
  assert.equal(searchKind("unknown"), "all");
  for (const query of ["", "  ", "!!!", "no-such-topic-xyzzy", "focus xyzzy"]) assert.deepEqual(searchReadings(query), []);
  assert.ok(searchReadings("one pointed focus").length);
  for (const result of searchReadings("breath")) assert.ok(result.excerpt.length <= 222);
});
