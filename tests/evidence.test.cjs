const { test } = require("node:test");
const assert = require("node:assert/strict");
const { evidenceTopics, lessonEvidence, evidenceForLesson, evidenceForPractice, evidenceReadingText, EVIDENCE_REVIEW_DATE } = require("./lib/evidence.js");
const { curriculum } = require("./lib/curriculum.js");
const { chapterFiveEntries } = require("./lib/chapter-five.js");
const { readingJourney, estimatedReadingMinutes } = require("./lib/reading-journey.js");

test("every evidence mapping resolves to a real lesson and a sourced review topic", () => {
  assert.equal(new Set(evidenceTopics.map(topic => topic.id)).size, evidenceTopics.length);
  assert.equal(evidenceTopics.length, 18);
  assert.equal(Object.keys(lessonEvidence).length, 19);
  for (const [slug, ids] of Object.entries(lessonEvidence)) {
    assert.ok(curriculum.some(lesson => lesson.slug === slug), slug);
    assert.equal(new Set(ids).size, ids.length);
    const topics = evidenceForLesson(slug);
    assert.equal(topics.length, ids.length);
    assert.ok(topics.every(Boolean), slug);
  }
  assert.deepEqual(evidenceForLesson("not-a-lesson"), []);
  for (const topic of evidenceTopics) {
    for (const field of ["title", "finding", "claim", "commentary", "implication"]) assert.ok(topic[field]?.trim(), `${topic.id}: ${field}`);
    assert.ok(topic.sources.length, topic.id);
    for (const source of topic.sources) {
      assert.equal(new URL(source.url).protocol, "https:");
      assert.ok(source.title && source.kind);
    }
  }
  assert.equal(EVIDENCE_REVIEW_DATE, "2026-10-15");
});

test("all 20 practices have the right evidence scope and the eye-flow correction", () => {
  assert.equal(chapterFiveEntries.length, 20);
  for (const entry of chapterFiveEntries) {
    const topics = evidenceForPractice(entry);
    assert.ok(topics.every(Boolean));
    assert.equal(topics[0].id, entry.kind === "flow" ? "yoga-benefits" : "meditation-benefits");
    assert.equal(topics.some(topic => topic.id === "eye-blinking"), entry.slug === "yoga-for-eyes");
  }
});

test("reading estimates include the commentary shown on reviewed readers", () => {
  const lesson = curriculum.find(item => item.slug === "new-health-variables");
  const actual = readingJourney.find(item => item.href === `/lessons/${lesson.slug}`);
  const text = [...lesson.paragraphs, ...evidenceReadingText(evidenceForLesson(lesson.slug)), lesson.practice, lesson.reflection];
  assert.equal(actual.readingMinutes, estimatedReadingMinutes(text));
  const entry = chapterFiveEntries.find(item => item.slug === "yoga-for-eyes");
  const flow = readingJourney.find(item => item.href === `/flows/${entry.slug}`);
  assert.equal(flow.readingMinutes, estimatedReadingMinutes([...entry.paragraphs, ...entry.poses, ...entry.benefits, entry.note, entry.practice, entry.reflection, ...evidenceReadingText(evidenceForPractice(entry))]));
});
