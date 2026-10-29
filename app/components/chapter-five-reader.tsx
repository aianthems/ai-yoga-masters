import SiteHeader from "./site-header";
import ReaderSections from "./reader-sections";
import { ReaderProgress } from "./reading-progress";
import { bookUrl, curriculum } from "../../lib/curriculum";
import { chapterFiveEntries, type ChapterFiveEntry } from "../../lib/chapter-five";

import { readerNavigation } from "../../lib/reading-journey";


// Original meditation recordings supplied by Alex Julian.
const meditationVideos: Record<string, string> = {
  "meditation-for-focus": "qqE0-OSnbEM",
  "meditation-for-innovation": "K1himeePf88",
  "meditation-on-mortality": "7Ea9WtsuxF8",
  "thank-you-love-meditation": "4fOC4xPC2Ck",
};

export default function ChapterFiveReader({ entry }: { entry: ChapterFiveEntry }) {
  const videoId = entry.kind === "meditation" ? meditationVideos[entry.slug] : undefined;
  const index = chapterFiveEntries.findIndex(item => item.slug === entry.slug);
  const { current, previous, next } = readerNavigation(`/${entry.kind === "flow" ? "flows" : "meditations"}/${entry.slug}`)!;
  const lessons = entry.relatedLessons.map(number => curriculum.find(lesson => lesson.number === number)!);
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <a className="text-link" href="/chapters/flows-and-meditations">Chapter 5 · Flows and Meditations</a>
          <p className="section-kicker">{entry.kind === "flow" ? `Flow ${index + 1} of 16` : `Meditation ${index - 15} of 4`} · Original 2024 edition</p>
          <h1>{entry.title}</h1>
          <p className="reader-position">
            Practice {current.chapterPosition} of {current.chapterTotal} in Chapter 5
            {" · "}About {current.readingMinutes} min read
          </p>
          <p className="reader-time-note">Reading estimate only; music and practice are at your own pace.</p>
          <a className="text-link" href={`${bookUrl}#page=${entry.pdfPage}`} target="_blank" rel="noreferrer">Original book · printed p. {entry.printedPage} onward</a>
          <ReaderSections listenHref={videoId ? "#video" : undefined} />
        </section>
        {videoId && (
          <section className="school-section" aria-labelledby="video">
            <p className="section-kicker">AI Yoga Masters · The original recording</p>
            <h2 id="video" tabIndex={-1}>{entry.title}</h2>
            <div className="lesson-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title={`${entry.title} — Original meditation video`}
                width="960"
                height="540"
                loading="lazy"
                allow="encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a className="text-link" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer">
              Open the original meditation on YouTube
            </a>
          </section>
        )}
        <section className="school-section source-note" aria-labelledby="edition">
          <h2 id="edition">About this edition</h2>
          <p>The original text, lists, and meditation cues below preserve the book’s wording, with page footers and layout whitespace removed. The AI application and reflection are new adaptations.</p>
          <p>{entry.note}</p>
          {entry.slug === "meditation-on-mortality" ? <a className="text-link" href="#practice">Go directly to the optional reflection</a> : null}
        </section>
        <section className="school-section original-teaching" aria-labelledby="teaching">
          <p className="section-kicker">Source teaching · Alex Julian, 2024</p>
          <h2 id="teaching" tabIndex={-1}>{entry.kind === "flow" ? "The original flow overview" : "The original meditation"}</h2>
          {entry.kind === "meditation" ? <h3>Practice</h3> : null}
          {entry.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          {entry.poses.length ? <><h3>Poses / Exercises</h3><ol className="practice-cues">{entry.poses.map((pose, i) => <li key={i}>{pose}</li>)}</ol></> : null}
          <h3>Benefits listed in the original book</h3>
          <ul>{entry.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}</ul>
          <p className="copyright-note">© 2024 Alex Julian Yoga. All rights reserved.</p>
        </section>
        <section className="school-section practice-panel" aria-labelledby="practice">
          <p className="section-kicker">New contemporary AI application</p>
          <h2 id="practice" tabIndex={-1}>Try it in your next AI session.</h2>
          <p>{entry.practice}</p>
          <h3>Reflect afterward</h3>
          <p>{entry.reflection}</p>
          <p className="editorial-note">Developed with AI assistance for this digital edition. Reflect privately; nothing needs to be submitted or shared.</p>
        </section>
        <section className="school-section" aria-labelledby="connections">
          <p className="section-kicker">Roots in the book</p>
          <h2 id="connections">Explore the connected teachings.</h2>
          {lessons.map(lesson => <div key={lesson.number}><a className="text-link" href={`/lessons/${lesson.slug}`}>Lesson {lesson.number}: {lesson.title}</a></div>)}
        </section>
        {!videoId && <section className="school-section" aria-labelledby="video">
          <h2 id="video">Original teaching video</h2>
          <p>The book refers to accompanying videos. A verified instructional video for this {entry.kind} has not yet been added to this edition.</p>
        </section>}
        <ReaderProgress href={`/${entry.kind === "flow" ? "flows" : "meditations"}/${entry.slug}`} />
        <nav className="school-pagination" aria-label="Flow and meditation navigation">
          {previous ? <a className="text-link" href={previous.href} rel="prev">{previous.label}</a> : null}
          <a className="text-link" href="/chapters/flows-and-meditations">Chapter 5 practices</a>
          {next ? <a className="text-link" href={next.href} rel="next">{next.label}</a> : null}
        </nav>
      </main>
    </>
  );
}
