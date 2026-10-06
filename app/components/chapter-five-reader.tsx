import SiteHeader from "./site-header";
import { bookUrl, curriculum } from "../../lib/curriculum";
import { chapterFiveEntries, chapterFivePath, type ChapterFiveEntry } from "../../lib/chapter-five";

export default function ChapterFiveReader({ entry }: { entry: ChapterFiveEntry }) {
  const index = chapterFiveEntries.findIndex(item => item.slug === entry.slug);
  const previous = chapterFiveEntries[index - 1];
  const next = chapterFiveEntries[index + 1];
  const lessons = entry.relatedLessons.map(number => curriculum.find(lesson => lesson.number === number)!);
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <a className="text-link" href="/chapters/flows-and-meditations">← Chapter 5 · Flows and Meditations</a>
          <p className="section-kicker">{entry.kind === "flow" ? `Flow ${index + 1} of 16` : `Meditation ${index - 15} of 4`} · Original 2024 edition</p>
          <h1>{entry.title}</h1>
          <a className="text-link" href={`${bookUrl}#page=${entry.pdfPage}`} target="_blank" rel="noreferrer">Original book · printed p. {entry.printedPage} onward ↗</a>
        </section>
        <section className="school-section source-note" aria-labelledby="edition">
          <h2 id="edition">About this edition</h2>
          <p>The original text, lists, and meditation cues below preserve the book’s wording, with page footers and layout whitespace removed. The AI application and reflection are new adaptations.</p>
          <p>{entry.note}</p>
          {entry.slug === "meditation-on-mortality" ? <a className="text-link" href="#practice">Go directly to the optional reflection →</a> : null}
          <p>Historical and scientific claims, including the benefits listed in the source, have not yet undergone a complete evidence review.</p>
        </section>
        <section className="school-section original-teaching" aria-labelledby="teaching">
          <p className="section-kicker">Source teaching · Alex Julian, 2024</p>
          <h2 id="teaching">{entry.kind === "flow" ? "The original flow overview" : "The original meditation"}</h2>
          {entry.kind === "meditation" ? <h3>Practice</h3> : null}
          {entry.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          {entry.poses.length ? <><h3>Poses / Exercises</h3><ol className="practice-cues">{entry.poses.map((pose, i) => <li key={i}>{pose}</li>)}</ol></> : null}
          <h3>Benefits listed in the original book</h3>
          <ul>{entry.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}</ul>
          <p className="copyright-note">© 2024 Alex Julian Yoga. All rights reserved.</p>
        </section>
        <section className="school-section practice-panel" aria-labelledby="practice">
          <p className="section-kicker">New contemporary AI application</p>
          <h2 id="practice">Try it in your next AI session.</h2>
          <p>{entry.practice}</p>
          <h3>Reflect afterward</h3>
          <p>{entry.reflection}</p>
          <a className="text-link" href={`/practice?practice=${entry.studioPractice}`}>Bring this teaching to the Practice Studio →</a>
          <p className="editorial-note">Developed with AI assistance for this digital edition. Reflect privately; nothing needs to be submitted or shared.</p>
        </section>
        <section className="school-section" aria-labelledby="connections">
          <p className="section-kicker">Roots in the book</p>
          <h2 id="connections">Explore the connected teachings.</h2>
          {lessons.map(lesson => <div key={lesson.number}><a className="text-link" href={`/lessons/${lesson.slug}`}>Lesson {lesson.number}: {lesson.title} →</a></div>)}
        </section>
        <section className="school-section" aria-labelledby="video">
          <h2 id="video">Original teaching video</h2>
          <p>The book refers to accompanying videos. A verified instructional video for this {entry.kind} has not yet been added to this edition.</p>
        </section>
        <nav className="school-pagination" aria-label="Flow and meditation navigation">
          {previous ? <a className="text-link" href={chapterFivePath(previous)}>← {previous.title}</a> : <a className="text-link" href="/lessons/deprogramming">← Lesson 48: Deprogramming</a>}
          <a className="text-link" href="/chapters/flows-and-meditations">Chapter 5 practices</a>
          {next ? <a className="text-link" href={chapterFivePath(next)}>{next.title} →</a> : <a className="text-link" href="/chapters/mirrors-and-fractals">Continue to Chapter 6 →</a>}
        </nav>
      </main>
      <footer><p>Founded by Alex Julian · Based on the original AI Yoga Masters.</p></footer>
    </>
  );
}
