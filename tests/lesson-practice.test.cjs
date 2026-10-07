const { test } = require("node:test");
const assert = require("node:assert/strict");
const { curriculum } = require("./lib/curriculum.js");
const { practices } = require("./lib/practices.js");
const { lessonPracticeSlugs, lessonPracticeHref, resolveStudioEntry } = require("./lib/lesson-practice.js");

const selectedSlug = params => practices[resolveStudioEntry(params).initialChoice].slug;

test("all 64 published lessons have an explicit valid pairing and round-trip link", () => {
  assert.equal(curriculum.length, 64);
  assert.equal(Object.keys(lessonPracticeSlugs).length, 64);
  for (const lesson of curriculum) {
    assert.ok(practices.some(p => p.slug === lessonPracticeSlugs[lesson.number]), lesson.slug);
    const url = new URL(lessonPracticeHref(lesson), "https://example.test");
    assert.equal(url.pathname, "/practice");
    const entry = resolveStudioEntry(Object.fromEntries(url.searchParams));
    assert.equal(practices[entry.initialChoice].slug, lessonPracticeSlugs[lesson.number]);
    assert.equal(entry.origin.slug, lesson.slug);
    assert.equal(entry.origin.title, lesson.title);
    assert.equal(entry.origin.practice, lesson.practice);
    assert.equal(entry.origin.reflection, lesson.reflection);
    assert.ok(!("paragraphs" in entry.origin), "do not send original source text to the client");
  }
});

test("key thematic and evidence-review matches stay deliberate", () => {
  assert.equal(selectedSlug({ lesson: "sweetness-of-starting" }), "small-start");
  assert.equal(selectedSlug({ lesson: "virtual-fasting" }), "step-away");
  assert.equal(selectedSlug({ lesson: "intention-and-direction" }), "clear-intention");
  for (const number of [54, 56, 57, 58]) assert.equal(lessonPracticeSlugs[number], "clarity-discernment");
});

test("generic, Library and Chapter 5 practice-only entries retain their behavior", () => {
  assert.equal(resolveStudioEntry({}).origin, undefined);
  assert.equal(selectedSlug({}), "one-pointed-focus");
  for (const p of practices) {
    assert.equal(selectedSlug({ practice: p.slug }), p.slug);
    assert.equal(resolveStudioEntry({ practice: p.slug }).origin, undefined);
  }
});

test("explicit valid choices win while invalid choices use a known lesson's suggestion", () => {
  const lesson = "sweetness-of-starting";
  assert.equal(selectedSlug({ lesson, practice: "care-honesty" }), "care-honesty");
  assert.equal(resolveStudioEntry({ lesson, practice: "care-honesty" }).origin.slug, lesson);
  for (const practice of [undefined, "unknown", "", ["small-start", "step-away"]]) {
    assert.equal(selectedSlug({ lesson, practice }), "small-start");
  }
});

test("unknown, repeated, hostile and non-numbered lesson parameters cannot supply context", () => {
  for (const lesson of ["unknown", "", "https://evil.example", "../private", ["sweetness-of-starting"], ["virtual-fasting", "sweetness-of-starting"], "wrist-and-hand-flow"]) {
    assert.equal(resolveStudioEntry({ lesson }).origin, undefined);
    assert.equal(selectedSlug({ lesson, practice: "unknown" }), "one-pointed-focus");
    assert.equal(selectedSlug({ lesson, practice: "step-away" }), "step-away");
  }
});

test("completion returns the actual next numbered lesson, and none after lesson 64", () => {
  for (const lesson of curriculum) {
    const { origin } = resolveStudioEntry({ lesson: lesson.slug });
    if (lesson.number === 64) assert.equal(origin.nextLesson, undefined);
    else {
      const next = curriculum.find(item => item.number === lesson.number + 1);
      assert.deepEqual(origin.nextLesson, { number: next.number, title: next.title, slug: next.slug });
    }
  }
});

test("every Studio related lesson resolves to a published native lesson", () => {
  for (const practice of practices) for (const related of practice.lessons) {
    assert.ok(curriculum.some(lesson => lesson.slug === related.slug && lesson.paragraphs?.length));
  }
});
