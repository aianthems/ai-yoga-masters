import { pageMetadata, SITE_NAME, SITE_DESCRIPTION } from "../lib/seo";
import SiteHeader from "./components/site-header";
import { chapters as chapterMap } from "../lib/curriculum";

export const metadata = pageMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/" });

const bookUrl =
  "https://media.aianthems.com/books/ai-yoga-masters/ai-yoga-masters-optimized.pdf";

const chapters = [
  [
    "01",
    "Lost Teachings of Yoga",
    "Focus, ethics, discernment, and the 8 Petals.",
  ],
  ["02", "The Tao of AI", "Upgrading the person alongside the tool."],
  [
    "03",
    "Philosophy and Principles",
    "Presence, intention, humility, and non-attachment.",
  ],
  [
    "04",
    "Techniques and Practices",
    "Breath, mantra, posture, virtual fasting, and nature.",
  ],
  [
    "05",
    "Flows and Meditations",
    "Practice libraries for technology-engaged bodies and minds.",
  ],
  [
    "06",
    "Mirrors and Fractals",
    "Reflection, health, habits, and learning from AI.",
  ],
  [
    "07",
    "Integration and Innovation",
    "Implementation, procrastination, and continuing the practice.",
  ],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <section className="landing-hero" id="top" aria-labelledby="hero-title">
          <img
            className="landing-image"
            src="https://pub-651b74915ffe45ecaf36799e0842fc9f.r2.dev/images/laptop-girls/laptop-girl-1.webp"
            alt="Woman meditating beside a laptop beneath a neon sunset"
            width={1672}
            height={941}
            fetchPriority="high"
          />
          <div className="landing-content">
            <h1 id="hero-title">Yoga 2.0</h1>
            <div className="landing-actions">
              <a className="button landing-book" href={bookUrl} target="_blank" rel="noreferrer">
                Read the book ↗
              </a>
              <a className="button landing-curriculum" href="/curriculum">
                Explore the curriculum →
              </a>
            </div>
          </div>
        </section>

        <section className="curriculum shell" id="curriculum">
          <div className="section-heading">
            <p className="section-kicker">Original curriculum</p>
            <h2>64 lessons across seven chapters.</h2>
          </div>

          <div className="chapter-list">
            {chapters.map(([number, title, description]) => (
              <a
                key={number}
                href={`/chapters/${chapterMap[Number(number) - 1].slug}`}
                className="chapter-row"
              >
                <span className="chapter-number">{number}</span>
                <span className="chapter-title">{title}</span>
                <span className="chapter-description">{description}</span>
                <span>→</span>
              </a>
            ))}
          </div>
        </section>

        <section className="thesis shell">
          <p className="section-kicker">The thesis</p>
          <blockquote>
            Better AI use is not only an AI problem. It is also a human-practice
            problem.
          </blockquote>
          <p>
            A more capable machine does not automatically create a clearer,
            calmer, more ethical, or more focused human. This school is about
            cultivating the person on the other side of the interface.
          </p>
        </section>

        <section className="practice shell" id="practice">
          <div className="section-heading">
            <p className="section-kicker">Core practice</p>
            <h2>Use AI with one-pointed attention.</h2>
            <p className="studio-invite">Bring a real task to the Practice Studio. Set your intention, practice at your own pace, and reflect afterward.</p>
            <a className="button primary" href="/practice">Begin an AI Practice →</a>
            <a className="text-link" href="/practices">Find a practice for what you need →</a>
          </div>

          <ol className="steps">
            {[
              "Choose one meaningful task.",
              "Decide what you are actually trying to accomplish before prompting.",
              "Remove unrelated tabs, feeds, and notifications when practical.",
              "Work with the AI on that one task.",
              "Notice when your attention leaves the task.",
              "Return without drama.",
              "Stop when the session stops being useful.",
              "Step away from the screen and re-enter the rest of your life.",
            ].map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="closing">
          <div className="closing-inner">
            <p className="section-kicker">AI Yoga Masters</p>
            <h2>
              Build intelligence.
              <br />
              Cultivate attention.
              <br />
              Keep your agency.
            </h2>
            <a
              className="button light"
              href={bookUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open the book ↗
            </a>
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

