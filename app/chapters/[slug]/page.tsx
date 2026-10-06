import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/site-header";
import {
  chapters,
  curriculum,
  bookUrl,
  flows,
  meditations,
} from "../../../lib/curriculum";
export const dynamicParams = false;
export function generateStaticParams() {
  return chapters.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = chapters.find((c) => c.slug === slug);
  return { title: c ? `${c.title} | AI Yoga Masters` : "Chapter not found" };
}
export default async function Chapter({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) notFound();
  const lessons = curriculum.filter((l) => l.chapter === chapter.number);
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <a className="text-link" href="/curriculum">
            ← Full curriculum
          </a>
          <p className="section-kicker">Chapter {chapter.number}</p>
          <h1>{chapter.title}</h1>
          <p className="school-lede">
            {chapter.number === 1
              ? "Nine lessons on focus, ethics, discernment, and the relationship between mental and physical practice."
              : chapter.number === 2
                ? "Eight lessons on your relationship with AI, developing the practitioner, focused work, kindness, and the rhythm of a useful session."
                : chapter.number === 3
                  ? "Thirteen lessons on presence, non-attachment, adaptability, intention, care, priorities, and the willingness to keep learning."
                  : "Explore the original chapter below. Its website edition is still to come."}
          </p>
          <a
            className="button ghost"
            href={`${bookUrl}#page=${chapter.page}`}
            target="_blank"
            rel="noreferrer"
          >
            Open this chapter in the book ↗
          </a>
        </section>
        <section className="school-section">
          {chapter.number === 5 ? (
            <>
              <h2>Yoga flows</h2>
              <ul className="library-list">
                {flows.map((flow) => (
                  <li key={flow}>{flow}</li>
                ))}
              </ul>
              <h2>Meditations</h2>
              <ul className="library-list">
                {meditations.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p>
                These libraries are organized separately from the numbered
                lessons. Read their practices in the original chapter.
              </p>
            </>
          ) : (
            <>
              <h2>Lessons</h2>
              <ol className="lesson-map" start={lessons[0]?.number}>
                {lessons.map((lesson) => (
                  <li key={lesson.number}>
                    {lesson.paragraphs?.length ? (
                      <a href={`/lessons/${lesson.slug}`}>
                        {lesson.title}
                        <span>Read lesson →</span>
                      </a>
                    ) : (
                      <span>
                        {lesson.title}
                        <small>In the original book</small>
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </>
          )}
        </section>
        <nav className="school-pagination" aria-label="Chapter navigation">
          {chapter.number > 1 && (
            <a
              className="text-link"
              href={`/chapters/${chapters[chapter.number - 2].slug}`}
            >
              ← Previous chapter
            </a>
          )}
          {chapter.number < 7 && (
            <a
              className="text-link"
              href={`/chapters/${chapters[chapter.number].slug}`}
            >
              Next chapter →
            </a>
          )}
        </nav>
      </main>
      <footer>
        <p>Founded by Alex Julian · Based on the original AI Yoga Masters.</p>
      </footer>
    </>
  );
}

