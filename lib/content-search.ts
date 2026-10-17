import { chapters, publishedLessons } from "./curriculum";
import { chapterFiveEntries, chapterFivePath } from "./chapter-five";

export type SearchKind = "lesson" | "flow" | "meditation";
type SearchEntry = { title: string; href: string; kind: SearchKind; label: string; chapter: string; passages: string[] };

export const searchEntries: SearchEntry[] = [
  ...publishedLessons.map(lesson => ({
    title: lesson.title, href: `/lessons/${lesson.slug}`, kind: "lesson" as const,
    label: `Lesson ${lesson.number}`, chapter: chapters.find(chapter => chapter.number === lesson.chapter)!.title,
    passages: [...lesson.paragraphs, lesson.practice, lesson.reflection, lesson.note],
  })),
  ...chapterFiveEntries.filter(entry => entry.paragraphs.length).map(entry => ({
    title: entry.title, href: chapterFivePath(entry), kind: entry.kind,
    label: entry.kind === "flow" ? "Yoga flow" : "Meditation", chapter: "Flows and Meditations",
    passages: [...entry.paragraphs, ...entry.poses, ...entry.benefits, entry.practice, entry.reflection, entry.note],
  })),
];

function normalize(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function searchKind(value: unknown): SearchKind | "all" {
  return value === "lesson" || value === "flow" || value === "meditation" ? value : "all";
}

export function searchReadings(query: string, kind: SearchKind | "all" = "all") {
  const phrase = normalize(query.slice(0, 160));
  const terms = [...new Set(phrase.split(" ").filter(Boolean))];
  if (!terms.length) return [];
  return searchEntries.flatMap(entry => {
    if (kind !== "all" && entry.kind !== kind) return [];
    const title = normalize(entry.title);
    const passages = entry.passages.map(normalize);
    const allText = [title, normalize(entry.label), normalize(entry.chapter), ...passages].join(" ");
    if (!terms.every(term => allText.includes(term))) return [];
    const score = (title === phrase ? 100 : title.includes(phrase) ? 50 : 0)
      + terms.filter(term => title.includes(term)).length * 10;
    // Prefer an excerpt containing the most search words, preserving source wording.
    let best = 0;
    let bestCount = -1;
    passages.forEach((passage, index) => {
      const count = terms.filter(term => passage.includes(term)).length;
      if (count > bestCount) { best = index; bestCount = count; }
    });
    const passage = (entry.passages[best] ?? "").replace(/\s+/g, " ").trim();
    const firstMatch = terms.map(term => passage.toLowerCase().indexOf(term)).filter(index => index >= 0);
    const match = firstMatch.length ? Math.min(...firstMatch) : 0;
    const start = match > 90 ? passage.lastIndexOf(" ", match - 60) + 1 : 0;
    const end = start + 220;
    const excerpt = `${start ? "…" : ""}${passage.slice(start, end).trim()}${passage.length > end ? "…" : ""}`;
    return [{ title: entry.title, href: entry.href, kind: entry.kind, label: entry.label, chapter: entry.chapter, excerpt, score }];
  }).sort((a, b) => b.score - a.score);
}
