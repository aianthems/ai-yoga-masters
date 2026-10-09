import { pageMetadata } from "../../lib/seo";
import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import { practiceNeeds } from "../../lib/practice-library";
import { practices } from "../../lib/practices";
import { lessonMedia } from "../../lib/lesson-media";

export const metadata: Metadata = pageMetadata({ title: "Practice Library | AI Yoga Masters", description: "Find a short AI yoga practice for scattered attention, checking answers, beginning, stepping away, or creating with intention.", path: "/practices" });

export default function PracticeLibrary() {
  const music = Object.entries(lessonMedia);
  return <><SiteHeader /><main id="content" className="school">
    <section className="school-intro"><p className="section-kicker">Practice Library</p><h1>What do you need right now?</h1><p className="school-lede">Start with your experience. Find a short practice, explore its teachings, and bring it into the way you work with AI.</p><p>You can follow a practice here or open its guided session in the Studio. Suggested times are invitations; work at your own pace.</p></section>
    <section className="school-section" aria-label="Find a practice by need"><div className="school-grid need-grid">{practiceNeeds.map(need => {
      const practice = practices.find(p => p.slug === need.practice)!;
      return <article className="school-card need-card" key={need.slug}><p className="section-kicker">{need.time}</p><h2><a href={`/practices/${need.slug}`}>{need.need}</a></h2><p>{need.invitation}</p><p className="need-practice">{practice.title}</p><a className="text-link" href={`/practices/${need.slug}`}>Explore this practice →</a></article>;
    })}</div></section>
    <section className="school-section"><p className="section-kicker">Music and teaching</p><h2>Listen, then explore.</h2><p>The original recordings offer another way into the teachings. These are the recordings currently connected to lessons on the school.</p>{music.map(([slug, recording]) => <a className="text-link library-music-link" key={slug} href={`/lessons/${slug}`}>{recording.title} · Listen with the lesson →</a>)}</section>
    <section className="school-section"><h2>Follow the whole journey.</h2><p>These practices are new applications of the book’s teachings. You can also explore the curriculum in chapter order.</p><a className="text-link" href="/curriculum">Explore all seven chapters →</a></section>
  </main><footer><p>Founded by Alex Julian · Go deeper to reach higher.</p></footer></>;
}
