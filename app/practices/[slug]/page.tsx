import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/site-header";
import { practiceNeeds, libraryBookPages } from "../../../lib/practice-library";
import { practices } from "../../../lib/practices";
import { curriculum, bookUrl } from "../../../lib/curriculum";
import { chapterFiveEntries, chapterFivePath } from "../../../lib/chapter-five";
import { lessonMedia } from "../../../lib/lesson-media";

export const dynamicParams = false;
export function generateStaticParams() { return practiceNeeds.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const need = practiceNeeds.find(n => n.slug === slug);
  return { title: need ? `${need.need} | AI Yoga Masters` : "Practice not found", description: need?.invitation };
}

export default async function NeedPractice({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const need = practiceNeeds.find(n => n.slug === slug);
  if (!need) notFound();
  const practice = practices.find(p => p.slug === need.practice)!;
  const lessons = need.lessons.map(number => curriculum.find(l => l.number === number)!);
  const companionSlugs: Record<string, string[]> = {
    "scattered-attention": ["meditation-for-focus"],
    "begin-something": ["start-here-yoga"],
    "take-a-break": ["yoga-for-eyes", "yoga-for-relaxation"],
    "create-with-purpose": ["meditation-for-innovation"],
  };
  const companions = chapterFiveEntries.filter(entry => companionSlugs[need.slug]?.includes(entry.slug));
  const music = lessons.filter(l => lessonMedia[l.slug]);
  return <><SiteHeader /><main id="content" className="school">
    <section className="school-intro"><a className="text-link" href="/practices">← Practice Library</a><p className="section-kicker">{need.time} · {practice.title}</p><h1>{need.need}</h1><p className="school-lede">{need.invitation}</p><a className="button primary" href={`/practice?practice=${practice.slug}`}>Begin this guided practice →</a></section>
    <section className="school-section original-teaching"><p className="section-kicker">Try it now</p><h2>{practice.title}</h2><p>{practice.prepare}</p><ol className="practice-cues">{practice.cues.map(cue => <li key={cue}>{cue}</li>)}</ol><h3>Reflect afterward</h3><p>{practice.reflection}</p><p className="editorial-note">A new practice inspired by the book. Reflect in your own words; nothing needs to be submitted.</p></section>
    <section className="school-section"><p className="section-kicker">Roots in the book</p><h2>Explore the connected teachings.</h2><div className="school-grid">{lessons.map(lesson => <article className="school-card" key={lesson.number}><p className="section-kicker">Lesson {lesson.number} · {lesson.paragraphs?.length ? "Read on the site" : "Read in the book"}</p><h3>{lesson.title}</h3>{lesson.paragraphs?.length ? <a className="text-link" href={`/lessons/${lesson.slug}`}>Read lesson →</a> : <a className="text-link" href={`${bookUrl}#page=${libraryBookPages[lesson.number]}`} target="_blank" rel="noreferrer">Open printed p. {libraryBookPages[lesson.number] - 5} in the book ↗</a>}</article>)}</div></section>
    {companions.length ? <section className="school-section"><p className="section-kicker">Chapter 5 companions</p><h2>Explore a flow or meditation.</h2><p>Read the original book practice and its separate application for AI work.</p>{companions.map(entry => <div key={entry.slug}><a className="text-link" href={chapterFivePath(entry)}>{entry.title} →</a></div>)}</section> : null}
    <section className="school-section"><p className="section-kicker">Music and teaching</p><h2>{music.length ? "A song to explore alongside this practice." : "Explore the school’s available music."}</h2>{music.length ? music.map(lesson => <div key={lesson.slug}><p>This recording accompanies Lesson {lesson.number}: {lesson.title}.</p><a className="text-link" href={`/lessons/${lesson.slug}`}>{lessonMedia[lesson.slug].title} · Listen with the lesson →</a></div>) : <><p>A recording for these connected lessons has not yet been added. You can explore the verified music currently available in the library.</p><a className="text-link" href="/practices">Browse practices and available music →</a></>}</section>
    <nav className="school-pagination" aria-label="More practices"><a className="text-link" href="/practices">Find another practice →</a><a className="text-link" href="/curriculum">Explore the curriculum →</a></nav>
  </main><footer><p>Founded by Alex Julian · Go deeper to reach higher.</p></footer></>;
}
