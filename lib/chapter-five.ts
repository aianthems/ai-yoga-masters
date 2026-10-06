import source from "../content/chapter-five.json";
import introduction from "../content/chapter-five-intro.json";

export type ChapterFiveEntry = {
  title: string;
  slug: string;
  kind: "flow" | "meditation";
  printedPage: number;
  pdfPage: number;
  paragraphs: string[];
  poses: string[];
  benefits: string[];
  practice: string;
  reflection: string;
  note: string;
  relatedLessons: number[];
  studioPractice: string;
};

export const chapterFiveEntries: ChapterFiveEntry[] = source as ChapterFiveEntry[];
export const chapterFiveIntroduction = introduction;
export const yogaFlows = chapterFiveEntries.filter(entry => entry.kind === "flow");
export const chapterMeditations = chapterFiveEntries.filter(entry => entry.kind === "meditation");
export function chapterFivePath(entry: ChapterFiveEntry) {
  return `/${entry.kind === "flow" ? "flows" : "meditations"}/${entry.slug}`;
}
