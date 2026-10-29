import { chapters, publishedLessons } from "./curriculum";
import { chapterFiveEntries, chapterFivePath } from "./chapter-five";


export function estimatedReadingMinutes(text: readonly string[]): number {
  const words = text.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// One shared sequence keeps previous/next links reciprocal across every reader.
export const readingJourney = chapters.flatMap(chapter => {
  if (chapter.number === 5) {
    return chapterFiveEntries.map((entry, index) => ({
      href: chapterFivePath(entry),
      label: entry.title,
      chapter: chapter.number,
      chapterPosition: index + 1,
      chapterTotal: chapterFiveEntries.length,
      readingMinutes: estimatedReadingMinutes([
        ...entry.paragraphs, ...entry.poses, ...entry.benefits,
        entry.note, entry.practice, entry.reflection,
      ]),
    }));
  }
  const lessons = publishedLessons.filter(lesson => lesson.chapter === chapter.number);
  return lessons.map((lesson, index) => ({
    href: `/lessons/${lesson.slug}`,
    label: `Lesson ${lesson.number}: ${lesson.title}`,
    chapter: chapter.number,
    chapterPosition: index + 1,
    chapterTotal: lessons.length,
    readingMinutes: estimatedReadingMinutes([
      ...lesson.paragraphs, lesson.note,
      lesson.practice, lesson.reflection,
    ]),
  }));
});

export function readerNavigation(href: string) {
  const index = readingJourney.findIndex(entry => entry.href === href);
  if (index < 0) return undefined;
  return {
    current: readingJourney[index],
    previous: readingJourney[index - 1],
    next: readingJourney[index + 1],
  };
}
