import SiteHeader from "./components/site-header";
import { chapters as chapterMap } from "../lib/curriculum";

const bookUrl =
  "https://media.aianthems.com/books/ai-yoga-masters/ai-yoga-masters-optimized.pdf";

const petals = [
  ["Yamas", "Use powerful tools without abandoning ethics."],
  ["Niyamas", "Build the inner conditions for clear judgment."],
  ["Asana", "Care for the body doing the work."],
  ["Pranayama", "Use breath to regulate pace and reactivity."],
  ["Pratyahara", "Choose what deserves your attention."],
  ["Dharana", "Return to one meaningful point of focus."],
  ["Dhyana", "Stay with worthwhile work long enough to go deep."],
  ["Samadhi", "Let sustained attention become absorbed practice."],
];

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
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Ancient practice for intelligent tools</p>
              <h1>
                Train the user,
                <br />
                not only the model.
              </h1>
              <p className="lede">
                AI Yoga Masters explores how mindfulness, focus, philosophy, and
                contemplative practice can improve the way people use artificial
                intelligence.
              </p>
              <div className="actions">
                <a className="button primary" href="/practice">
                  Begin an AI Practice
                </a>
                <a
                  className="button ghost"
                  href={bookUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the original book ↗
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="orb orb-one" />
              <div className="orb orb-two" />
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="center-symbol">ॐ</div>
              <p className="art-caption">Focus · Discernment · Agency</p>
            </div>
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

        <section className="petals shell" id="petals">
          <div className="section-heading">
            <p className="section-kicker">The 8 Petals as AI practice</p>
            <h2>Ancient structure. Contemporary application.</h2>
          </div>

          <div className="petal-grid">
            {petals.map(([name, text], index) => (
              <article className="petal-card" key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{name}</h3>
                <p>{text}</p>
              </article>
            ))}
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

        <section className="principle shell">
          <p className="section-kicker">The relationship matters</p>
          <div className="principle-grid">
            <h2>
              Use the tool deliberately — and retain the ability to put it down.
            </h2>
            <div>
              <p>
                AI Yoga Masters is neither anti-AI nor blindly pro-AI. It is a
                practice of attention, discernment, ethics, embodiment, and
                non-attachment.
              </p>
              <p>
                AI can assist the school. Humans remain responsible for the
                school.
              </p>
            </div>
          </div>
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

