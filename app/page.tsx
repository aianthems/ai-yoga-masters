import { pageMetadata, SITE_NAME, SITE_DESCRIPTION } from "../lib/seo";
import SiteHeader from "./components/site-header";
import { ProgressOverview } from "./components/reading-progress";
import { chapters as chapterMap, publishedLessons } from "../lib/curriculum";

export const metadata = pageMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/" });

const bookUrl =
  "https://media.aianthems.com/books/ai-yoga-masters/ai-yoga-masters-optimized.pdf";

const startingPoints = [
  { title: "Focus", need: "My attention is scattered.", invitation: "Practice returning to one worthwhile task.", lessonNumber: 4 },
  { title: "Clarity", need: "I want to think more clearly.", invitation: "Check an AI answer with care and discernment.", lessonNumber: 5 },
  { title: "Creativity", need: "I want to create with purpose.", invitation: "Give your next idea a clear intention and direction.", lessonNumber: 23 },
  { title: "Getting Started", need: "I keep putting it off.", invitation: "Make one small beginning in something that matters.", lessonNumber: 63 },
  { title: "Stepping Away", need: "I need a screen break.", invitation: "Pause deliberately and make room for life beyond the screen.", lessonNumber: 41 },
].map(point => ({ ...point, lesson: publishedLessons.find(lesson => lesson.number === point.lessonNumber)! }));

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
            src="https://media.aiyogamasters.com/images/laptop-girls/laptop-girl-1.webp"
            alt="Woman meditating beside a laptop beneath a neon sunset"
            width={1672}
            height={941}
            fetchPriority="high"
          />
          <div className="landing-content">
            <h1 id="hero-title">Yoga 2.0</h1>
            <p className="landing-introduction">
              A yoga school for people creating and working with AI. Explore
              lessons, music, and everyday practices for clearer attention,
              conscious intention, and a more balanced relationship with technology.
            </p>
            <div className="landing-actions">
              <a className="button landing-book" href="/start-here">
                Start Here
              </a>
              <a className="button landing-curriculum" href="/curriculum">
                Explore the curriculum →
              </a>
              <a className="button landing-curriculum" href={bookUrl} target="_blank" rel="noreferrer">
                Read the book ↗
              </a>
            </div>
          </div>
        </section>

        <div className="home-reading-progress"><ProgressOverview /></div>

        <section className="starting-points shell" aria-labelledby="starting-points-title">
          <div className="section-heading">
            <p className="section-kicker">Find your starting point</p>
            <h2 id="starting-points-title">What do you need today?</h2>
            <p className="starting-points-intro">Choose what would help right now. Each choice opens a lesson with an original song and a simple practice.</p>
          </div>
          <ul className="starting-points-grid">
            {startingPoints.map(point => (
              <li key={point.lessonNumber}>
                <a className="starting-point" href={`/lessons/${point.lesson.slug}`}>
                  <h3>{point.title}</h3>
                  <p className="starting-point-need">{point.need}</p>
                  <p className="starting-point-invitation">{point.invitation}</p>
                  <span className="starting-point-lesson">Lesson {point.lesson.number} · {point.lesson.title}</span>
                  <span className="starting-point-action">Explore {point.title.toLowerCase()}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="founder-story" id="origin" aria-labelledby="founder-title">
          <div className="founder-story-inner">
            <div className="founder-copy">
              <p className="section-kicker">The founder’s introduction · Original footage</p>
              <h2 id="founder-title">Before the anthems.<br /><em>A vision.</em></h2>
              <p className="founder-lede">
                AI Anthems began as AI Yoga Masters.
              </p>
              <p className="founder-description">
                In this original submission to OpenAI’s Converge 2 program,
                founder Alex Julian introduces AI Yoga Masters in about a minute.
                It marks the beginning of his startup journey: an early vision
                for the relationship between human practice and artificial intelligence.
              </p>
              <p className="founder-invitation">Meet the person behind the practice. Hear where it all began.</p>
            </div>
            <figure className="founder-film">
              <div className="founder-film-label"><span>The original pitch</span><span>About 1 minute</span></div>
              <div className="founder-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/T9yNkkitpyw"
                  title="Alex Julian introduces AI Yoga Masters — original OpenAI Converge 2 founder submission"
                  width="960"
                  height="540"
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <figcaption>
                <span>Alex Julian <span className="founder-caption-role">/ Founder, AI Yoga Masters &amp; AI Anthems</span></span>
                <a className="text-link" href="https://www.youtube.com/watch?v=T9yNkkitpyw" target="_blank" rel="noreferrer">Watch on YouTube</a>
              </figcaption>
            </figure>
          </div>
          <div className="founder-continuation"><span>An idea becomes a practice.</span><a className="text-link" href="/start-here">Begin yours →</a></div>
        </section>

        <section className="curriculum shell" id="curriculum">
          <div className="section-heading">
            <p className="section-kicker">Original curriculum</p>
            <h2>64 lessons across 7 chapters.</h2>
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
    </>
  );
}

