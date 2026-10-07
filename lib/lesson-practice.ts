import { curriculum } from "./curriculum";
import { practices } from "./practices";

type PracticeSlug = (typeof practices)[number]["slug"];

// Editorial pairings for the digital edition's contemporary exercises, not
// claims that these Studio sequences appeared in the original 2024 book.
export const lessonPracticeSlugs: Record<number, PracticeSlug> = {
  1: "clear-intention", 2: "one-pointed-focus", 3: "one-pointed-focus",
  4: "one-pointed-focus", 5: "clarity-discernment", 6: "one-pointed-focus",
  7: "care-honesty", 8: "step-away", 9: "one-pointed-focus",
  10: "clear-intention", 11: "small-start", 12: "clear-intention",
  13: "step-away", 14: "care-honesty", 15: "small-start",
  16: "step-away", 17: "small-start", 18: "one-pointed-focus",
  19: "clear-intention", 20: "clear-intention", 21: "clear-intention",
  22: "clear-intention", 23: "clear-intention", 24: "clear-intention",
  25: "clarity-discernment", 26: "care-honesty", 27: "one-pointed-focus",
  28: "one-pointed-focus", 29: "clarity-discernment", 30: "clarity-discernment",
  31: "one-pointed-focus", 32: "step-away", 33: "step-away",
  34: "one-pointed-focus", 35: "step-away", 36: "step-away",
  37: "step-away", 38: "clear-intention", 39: "one-pointed-focus",
  40: "clear-intention", 41: "step-away", 42: "step-away",
  43: "step-away", 44: "step-away", 45: "clarity-discernment",
  46: "clarity-discernment", 47: "step-away", 48: "clarity-discernment",
  49: "one-pointed-focus", 50: "step-away", 51: "step-away",
  52: "step-away", 53: "step-away", 54: "clarity-discernment",
  55: "step-away", 56: "clarity-discernment", 57: "clarity-discernment",
  58: "clarity-discernment", 59: "small-start", 60: "small-start",
  61: "clear-intention", 62: "small-start", 63: "small-start",
  64: "small-start",
};

export type StudioLesson = {
  number: number;
  title: string;
  slug: string;
  practice: string;
  reflection: string;
  nextLesson?: { number: number; title: string; slug: string };
};

type SearchValue = string | string[] | undefined;

export function lessonPracticeHref(lesson: { number: number; slug: string }) {
  const query = new URLSearchParams({
    practice: lessonPracticeSlugs[lesson.number] ?? practices[0].slug,
    lesson: lesson.slug,
  });
  return `/practice?${query}`;
}

export function resolveStudioEntry(params: { practice?: SearchValue; lesson?: SearchValue }) {
  // Reject duplicate or unknown lesson parameters; never accept arbitrary return URLs
  // or user-provided teaching text. Only project-owned published content is passed on.
  const lesson = typeof params.lesson === "string"
    ? curriculum.find(item => item.slug === params.lesson && item.paragraphs?.length)
    : undefined;
  const explicitChoice = practices.findIndex(item => item.slug === params.practice);
  const suggestedChoice = practices.findIndex(item => item.slug === (lesson && lessonPracticeSlugs[lesson.number]));
  const initialChoice = explicitChoice >= 0 ? explicitChoice : Math.max(0, suggestedChoice);
  let origin: StudioLesson | undefined;
  if (lesson) {
    const next = curriculum.find(item => item.number === lesson.number + 1 && item.paragraphs?.length);
    origin = {
      number: lesson.number, title: lesson.title, slug: lesson.slug,
      practice: lesson.practice, reflection: lesson.reflection,
      ...(next ? { nextLesson: { number: next.number, title: next.title, slug: next.slug } } : {}),
    };
  }
  return { initialChoice, origin };
}
