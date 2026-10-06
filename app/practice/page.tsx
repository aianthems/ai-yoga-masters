import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import PracticeSession from "./practice-session";

export const metadata: Metadata = {
  title: "Practice Studio | AI Yoga Masters",
  description: "Begin an AI practice: arrive, choose an intention, practice focused attention, and reflect.",
};

export default function PracticePage() {
  return <><SiteHeader /><main id="content" className="school studio">
    <section className="school-intro">
      <p className="section-kicker">Practice Studio</p>
      <h1>Begin an AI practice.</h1>
      <p className="school-lede">Arrive with attention. Work with intention. Leave with perspective.</p>
      <p>Bring a real task and the AI tool you already use. This space guides your practice alongside it.</p>
    </section>
    <PracticeSession />
    <section className="school-section studio-roots">
      <p className="section-kicker">Rooted in the book</p>
      <h2>Teachings you can put into practice.</h2>
      <p>These guided sessions are new applications of Alex Julian’s original teachings on focus, discernment, and ethics.</p>
      <a className="text-link" href="/chapters/lost-teachings-of-yoga">Explore Chapter 1 →</a>
    </section>
  </main><footer><p>Founded by Alex Julian · Go deeper to reach higher.</p></footer></>;
}
