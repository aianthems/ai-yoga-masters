import { pageMetadata } from "../../lib/seo";
import SiteHeader from "../components/site-header";
import { bookUrl } from "../../lib/curriculum";

export const metadata = pageMetadata({
  title: "About Alex Julian | AI Yoga Masters",
  description: "Meet Alex Julian, author of AI Yoga Masters: 15 years teaching yoga, a lifelong creative practice, and a path into AI through focus and conscious intention.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <p className="section-kicker">About the founder</p>
          <h1>Alex Julian</h1>
          <p className="school-lede">
            Yoga teacher, artist, author, and the founder of AI Anthems.
            AI Yoga Masters brings those parts of his life together.
          </p>
        </section>
        <section className="school-section">
          <h2>15 years of teaching yoga.</h2>
          <p>
            Alex founded Alex Julian Yoga, created Tree Yoga School around a
            direct relationship with nature, and developed Drive Enlightened
            to bring awareness into everyday driving. His teaching also reached
            inside prisons, where breath and attention offered space for reflection.
          </p>
        </section>
        <section className="school-section">
          <h2>Ancient practice. A new medium.</h2>
          <p>
            In his 2024 book, AI Yoga Masters, Alex explored how yoga principles
            could guide the process of learning AI: mindfulness, focus, clarity,
            ethics, experimentation, and conscious intention.
          </p>
          <p>
            He put those principles into practice, learning the technology and
            building AI Anthems with no prior technical experience.
          </p>
        </section>
        <section className="school-section">
          <h2>A life of making things.</h2>
          <p>
            His creative background includes 5 years of ballet, 10 years of piano,
            15 years of songwriting, and 30 years of drawing. Today, music and
            visual art continue that exploration through AI.
          </p>
          <a className="text-link" href="https://aianthems.com/about/alex-julian">
            Read Alex’s full story at AI Anthems →
          </a>
        </section>
        <section className="school-section">
          <h2>Explore AI Yoga Masters.</h2>
          <div className="actions">
            <a className="button primary" href="/curriculum">Explore the curriculum</a>
            <a className="button ghost" href={bookUrl} target="_blank" rel="noreferrer">Read the book</a>
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
