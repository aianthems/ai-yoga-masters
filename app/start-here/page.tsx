import SiteHeader from "../components/site-header";
import { pageMetadata } from "../../lib/seo";
import { lessonMedia } from "../../lib/lesson-media";

export const metadata = pageMetadata({
  title: "Start Here | AI Yoga Masters",
  description: "Begin AI Yoga Masters with one simple practice of attention, an original song, and a clear next step into the curriculum.",
  path: "/start-here",
});

const recording = lessonMedia["ekagra-one-pointed-focus"];

export default function StartHere() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <p className="section-kicker">Start Here · Your first practice</p>
          <h1>One task. Your full attention.</h1>
          <p className="school-lede">
            AI Yoga Masters brings yoga principles into the way you create and
            work with AI. Begin with one-pointed attention: choose something
            meaningful, notice when your focus wanders, and gently return.
          </p>
          <p>No yoga experience or special equipment is needed. Bring a real task
            and the AI tool you already use.</p>
          <a className="button primary" href="#first-practice">Try the practice</a>
        </section>

        <section className="school-section practice-panel" aria-labelledby="first-practice">
          <p className="section-kicker">A contemporary AI application</p>
          <h2 id="first-practice">Give one task a few undivided minutes.</h2>
          <ol className="practice-cues">
            <li><strong>Choose one task.</strong> Pick a small, meaningful action:
              shape a song idea, improve a paragraph, or work through a question.</li>
            <li><strong>Name your intention.</strong> Before prompting, finish this
              sentence: “By the end of this session, I want to…”</li>
            <li><strong>Make room for attention.</strong> Set aside unrelated tabs
              and notifications where practical. Work with AI on this one task.</li>
            <li><strong>Notice and return.</strong> When your attention wanders,
              bring it back gently. Use your judgment to check what the AI offers.</li>
            <li><strong>Close deliberately.</strong> Stop at a useful point, notice
              what you made or learned, and step away from the screen.</li>
          </ol>
          <h3>Reflect afterward</h3>
          <p>What changed when you began with a clear intention? What helped you
            return when your attention wandered?</p>
          <p className="editorial-note">This exercise is a new AI-assisted
            application of the book’s teachings on focus. Reflect privately;
            nothing needs to be submitted or shared.</p>
        </section>

        <section className="school-section" aria-labelledby="first-song">
          <p className="section-kicker">An optional musical companion</p>
          <h2 id="first-song">Listen to {recording.title}.</h2>
          <p>Explore one-pointed focus through the original song. Listen before
            your session, or return to it afterward.</p>
          <div className="lesson-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${recording.youtubeId}`}
              title={`${recording.title} — One-Pointed Focus`}
              width="960"
              height="540"
              loading="lazy"
              allow="encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <a className="text-link" href={`https://www.youtube.com/watch?v=${recording.youtubeId}`} target="_blank" rel="noreferrer">
            Listen on YouTube
          </a>
        </section>

        <section className="school-section" aria-labelledby="keep-exploring">
          <p className="section-kicker">Your next step</p>
          <h2 id="keep-exploring">Follow your curiosity.</h2>
          <p>Read the teaching behind this practice in Lesson 4, or begin with
            Lesson 1 and follow the book in order. The curriculum includes 64
            lessons, 16 yoga flows, and 4 meditations.</p>
          <div className="actions">
            <a className="button primary" href="/lessons/ekagra-one-pointed-focus">Read the focus lesson</a>
            <a className="button ghost" href="/lessons/redefining-yoga">Begin with Lesson 1</a>
          </div>
          <a className="text-link" href="/curriculum">Explore the full curriculum</a>
        </section>
      </main>
    </>
  );
}
