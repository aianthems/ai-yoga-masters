import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/site-header";
import { curriculum, bookUrl, chapters } from "../../../lib/curriculum";
import { lessonMedia } from "../../../lib/lesson-media";
const lessons = curriculum.filter((l) => l.paragraphs?.length);
export const dynamicParams = false;
export function generateStaticParams() {
  return lessons.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = lessons.find((l) => l.slug === slug);
  return {
    title: l
      ? `Lesson ${l.number}: ${l.title} | AI Yoga Masters`
      : "Lesson not found",
  };
}
export default async function Lesson({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = lessons.findIndex((l) => l.slug === slug);
  const lesson = lessons[index];
  if (!lesson) notFound();
  const media = lessonMedia[slug];
  const chapter = chapters.find((c) => c.number === lesson.chapter)!;
  const nextChapter = chapters.find((c) => c.number === lesson.chapter + 1);
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <a className="text-link" href={`/chapters/${chapter.slug}`}>
            ← Chapter {chapter.number} · {chapter.title}
          </a>
          <p className="section-kicker">
            Lesson {lesson.number} · Original 2024 edition
          </p>
          <h1>{lesson.title}</h1>
          <a
            className="text-link"
            href={`${bookUrl}#page=${lesson.pdfPage}`}
            target="_blank"
            rel="noreferrer"
          >
            Original book · printed p. {lesson.printedPage} onward ↗
          </a>
        </section>
        {media && (
          <section
            className="school-section lesson-music"
            aria-labelledby="music"
          >
            <p className="section-kicker">
              AI Yoga Masters · The original recording
            </p>
            <h2 id="music">{media.title}</h2>
            <p>
              Listen to the original song, then explore the lesson directly from
              the book below.
            </p>
            <div className="lesson-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}`}
                title={`${media.title} — Lesson ${lesson.number}: ${lesson.title}`}
                width="960"
                height="540"
                loading="lazy"
                allow="encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a
              className="text-link"
              href={`https://www.youtube.com/watch?v=${media.youtubeId}`}
              target="_blank"
              rel="noreferrer"
            >
              Open the original song on YouTube ↗
            </a>
          </section>
        )}
        <section
          className="school-section source-note"
          aria-labelledby="edition"
        >
          <h2 id="edition">About this edition</h2>
          <p>
            The teaching below preserves the original book’s wording, with page
            footers and layout whitespace removed. The AI practice and
            reflection are new adaptations.
          </p>
          <p>{lesson.note}</p>
          <p>
            Historical and scientific claims in the source have not yet
            undergone a complete evidence review.
          </p>
        </section>
        <section
          className="school-section original-teaching"
          aria-labelledby="teaching"
        >
          <p className="section-kicker">Source teaching · Alex Julian, 2024</p>
          <h2 id="teaching">The original lesson</h2>
          {lesson.paragraphs?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="copyright-note">
            © 2024 Alex Julian Yoga. All rights reserved.
          </p>
        </section>
        <section
          className="school-section practice-panel"
          aria-labelledby="practice"
        >
          <p className="section-kicker">New contemporary AI application</p>
          <h2 id="practice">Try it in your next AI session.</h2>
          <p>{lesson.practice}</p>
          <h3>Reflect afterward</h3>
          <p>{lesson.reflection}</p>
          <a className="text-link" href="/practice">Bring this teaching to the Practice Studio →</a>
          <p className="editorial-note">
            Developed with AI assistance for this digital edition. Reflect
            privately; nothing needs to be submitted or shared.
          </p>
        </section>
        {!media && (
          <section className="school-section" aria-labelledby="music">
            <p className="section-kicker">Music and teaching</p>
            <h2 id="music">The original song and video</h2>
            <p>
              This lesson’s original song and video will appear here once the
              recordings and their lesson match have been verified.
            </p>
          </section>
        )}
        <nav className="school-pagination" aria-label="Lesson navigation">
          {index > 0 && (
            <a
              className="text-link"
              href={`/lessons/${lessons[index - 1].slug}`}
            >
              ← Lesson {lessons[index - 1].number}: {lessons[index - 1].title}
            </a>
          )}
          <a className="text-link" href={`/chapters/${chapter.slug}`}>
            Chapter {chapter.number} lessons
          </a>
          {index < lessons.length - 1 ? (
            <a
              className="text-link"
              href={`/lessons/${lessons[index + 1].slug}`}
            >
              Lesson {lessons[index + 1].number}: {lessons[index + 1].title} →
            </a>
          ) : nextChapter ? (
            <a className="text-link" href={`/chapters/${nextChapter.slug}`}>
              Continue to Chapter {nextChapter.number} →
            </a>
          ) : (
            <a className="text-link" href="/practices">
              Explore the Practice Library →
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

