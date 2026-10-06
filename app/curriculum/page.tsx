import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import { chapters, curriculum } from "../../lib/curriculum";
export const metadata: Metadata = {
  title: "Curriculum | AI Yoga Masters",
  description:
    "Explore the original seven chapters, 64 lessons, yoga flows, and meditations.",
};
export default function Curriculum() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <p className="section-kicker">The original learning journey</p>
          <h1>
            Seven chapters.
            <br />
            64 lessons.
          </h1>
          <p className="school-lede">
            Follow the book in order, or explore a lesson on its own. Chapters 1–3
            are readable here; the remaining teaching is available in the
            original book.
          </p>
          <a className="button primary" href="/lessons/redefining-yoga">
            Begin with Lesson 1 →
          </a>
        </section>
        <section className="school-section">
          <h2>The curriculum</h2>
          <div className="school-grid">
            {chapters.map((chapter) => (
              <article className="school-card" key={chapter.number}>
                <p className="section-kicker">
                  Chapter {chapter.number} ·{" "}
                  {curriculum.some((lesson) => lesson.chapter === chapter.number && lesson.paragraphs?.length)
                    ? "Read on the site"
                    : "Read in the book"}
                </p>
                <h3>
                  <a href={`/chapters/${chapter.slug}`}>{chapter.title}</a>
                </h3>
                <p>
                  {chapter.number === 5
                    ? "16 flows and 4 meditations"
                    : chapter.number === 1
                      ? "Lessons 1–9"
                      : chapter.number === 2
                        ? "Lessons 10–17"
                        : chapter.number === 3
                          ? "Lessons 18–30"
                          : chapter.number === 4
                            ? "Lessons 31–48"
                            : chapter.number === 6
                              ? "Lessons 49–59"
                              : "Lessons 60–64"}
                </p>
                <a className="text-link" href={`/chapters/${chapter.slug}`}>
                  Explore chapter →
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <p>Founded by Alex Julian · Based on the original AI Yoga Masters.</p>
        <p>Go deeper to reach higher.</p>
      </footer>
    </>
  );
}

