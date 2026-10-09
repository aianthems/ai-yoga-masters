import { yogaFlows, chapterMeditations } from "./chapter-five";
import lessons from "../content/curriculum.json";
export const bookUrl =
  "https://media.aianthems.com/books/ai-yoga-masters/ai-yoga-masters-optimized.pdf";
export const curriculum = lessons;
export const publishedLessons = curriculum.filter(lesson => lesson.paragraphs?.length);
export const chapters = [
  {
    number: 1,
    slug: "lost-teachings-of-yoga",
    title: "Lost Teachings of Yoga",
    page: 6,
  },
  { number: 2, slug: "the-tao-of-ai", title: "The Tao of AI", page: 34 },
  {
    number: 3,
    slug: "philosophy-and-principles",
    title: "Philosophy and Principles",
    page: 49,
  },
  {
    number: 4,
    slug: "techniques-and-practices",
    title: "Techniques and Practices",
    page: 71,
  },
  {
    number: 5,
    slug: "flows-and-meditations",
    title: "Flows and Meditations",
    page: 98,
  },
  {
    number: 6,
    slug: "mirrors-and-fractals",
    title: "Mirrors and Fractals",
    page: 124,
  },
  {
    number: 7,
    slug: "integration-and-innovation",
    title: "Integration and Innovation",
    page: 144,
  },
];
// Chapter 5 keeps its own source-aware entries, separate from numbered lessons.
export const flows = yogaFlows.map(entry => entry.title);
export const meditations = chapterMeditations.map(entry => entry.title);
