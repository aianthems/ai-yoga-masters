import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/site-header";
import {
  chapters,
  curriculum,
  bookUrl,
} from "../../../lib/curriculum";
import { yogaFlows, chapterMeditations, chapterFivePath, chapterFiveIntroduction } from "../../../lib/chapter-five";
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
                  : chapter.number === 4
                    ? "Eighteen lessons on everyday attention, body awareness, personal cues, digital breaks, nature, and changing your perspective."
                    : chapter.number === 5
                      ? "Sixteen yoga flow overviews and four meditation scripts, with original pose lists, book references, and separate applications for your AI work."
                      : chapter.number === 6
                        ? "Eleven lessons on the practitioner’s surroundings, care for the body, working habits, evaluating claims, and learning from AI."
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
              <ul className="lesson-map">
                {yogaFlows.map(flow => <li key={flow.slug}><a href={chapterFivePath(flow)}>{flow.title}<span>Read flow →</span></a></li>)}
              </ul>
              <h2>Meditations</h2>
              <ul className="lesson-map">
                {chapterMeditations.map(meditation => <li key={meditation.slug}><a href={chapterFivePath(meditation)}>{meditation.title}<span>Read meditation →</span></a></li>)}
              </ul>
              <p>These twenty practices form a separate collection alongside the book’s 64 numbered lessons.</p>
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
        {chapter.number === 5 ? <section className="school-section original-teaching" aria-labelledby="introduction">
          <p className="section-kicker">Source teaching · Alex Julian, 2024 · Printed p. 93</p>
          <h2 id="introduction">The original chapter introduction</h2>
          {chapterFiveIntroduction.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          <p className="editorial-note">The website address above is part of the original 2024 text. Verified accompanying videos have not yet been added to this edition. Health and benefit claims in the source have not undergone a complete evidence review.</p>
          <p className="copyright-note">© 2024 Alex Julian Yoga. All rights reserved.</p>
        </section> : null}
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

