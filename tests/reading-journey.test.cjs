const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readingJourney, readerNavigation, estimatedReadingMinutes } = require("./lib/reading-journey.js");
const { publishedLessons } = require("./lib/curriculum.js");
const { chapterFiveEntries, chapterFivePath } = require("./lib/chapter-five.js");

test("the journey includes each of the 84 real readers exactly once", () => {
  const paths = [
    ...publishedLessons.map(lesson => `/lessons/${lesson.slug}`),
    ...chapterFiveEntries.map(chapterFivePath),
  ];
  assert.equal(readingJourney.length, 84);
  assert.equal(new Set(readingJourney.map(entry => entry.href)).size, 84);
  assert.deepEqual(readingJourney.map(entry => entry.href).sort(), paths.sort());
});

test("Chapter 5 connects Lesson 48 to Lesson 49 in both directions", () => {
  const first = chapterFivePath(chapterFiveEntries[0]);
  const last = chapterFivePath(chapterFiveEntries.at(-1));
  assert.equal(readerNavigation("/lessons/deprogramming").next.href, first);
  assert.equal(readerNavigation(first).previous.href, "/lessons/deprogramming");
  assert.equal(readerNavigation(last).next.href, "/lessons/reflections-and-extensions");
  assert.equal(readerNavigation("/lessons/reflections-and-extensions").previous.href, last);
});

test("every next/previous pair is reciprocal, with correct chapter positions", () => {
  for (const entry of readingJourney) {
    const { current, previous, next } = readerNavigation(entry.href);
    if (next) assert.equal(readerNavigation(next.href).previous.href, entry.href);
    if (previous) assert.equal(readerNavigation(previous.href).next.href, entry.href);
    const chapter = readingJourney.filter(item => item.chapter === entry.chapter);
    assert.equal(current.chapterTotal, chapter.length);
    assert.equal(current.chapterPosition, chapter.findIndex(item => item.href === entry.href) + 1);
    assert.ok(Number.isInteger(current.readingMinutes) && current.readingMinutes >= 1);
  }
  assert.equal(readerNavigation(readingJourney[0].href).previous, undefined);
  assert.equal(readerNavigation(readingJourney.at(-1).href).next, undefined);
  assert.equal(readerNavigation("/lessons/missing"), undefined);
});

test("reading estimates count words across sections at 200 words per minute", () => {
  assert.equal(estimatedReadingMinutes(["  A short\n lesson.  "]), 1);
  assert.equal(estimatedReadingMinutes([Array(200).fill("word").join(" ")]), 1);
  assert.equal(estimatedReadingMinutes([Array(200).fill("word").join(" "), "reflection"]), 2);
  assert.equal(estimatedReadingMinutes([Array(600).fill("word").join(" ")]), 3);
});
