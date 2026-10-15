import SiteHeader from "../components/site-header";
import { EvidenceCards } from "../components/evidence-review";
import { evidenceTopics, lessonEvidence, EVIDENCE_REVIEW_DATE } from "../../lib/evidence";
import { curriculum } from "../../lib/curriculum";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Evidence Review | AI Yoga Masters",
  description: "A focused, sourced review of selected health and scientific claims in the original AI Yoga Masters book, with findings, limitations, and links to the research.",
  path: "/evidence",
});

export default function Evidence() {
  const reviewedLessons = curriculum.filter(lesson => lessonEvidence[lesson.slug]);
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <p className="section-kicker">Source, practice, and evidence</p>
          <h1>The evidence, in context.</h1>
          <p className="school-lede">The original book combines lived experience,
            philosophy, practical exercises, and scientific claims. This review
            helps distinguish what the cited research supports from what remains uncertain.</p>
          <p>AI-assisted editorial review · Sources checked <time dateTime={EVIDENCE_REVIEW_DATE}>October 15, 2026</time>.</p>
        </section>
        <section className="school-section" aria-labelledby="review-scope">
          <h2 id="review-scope">What this review covers.</h2>
          <p>This focused review addresses {evidenceTopics.length} topics across {reviewedLessons.length} numbered lessons,
            plus the general benefit claims accompanying all 16 flows and 4 meditations.
            The original book text, pose lists, and benefit lists are preserved unchanged.</p>
          <p>Sources include original experiments, replication studies, systematic
            reviews, and guidance from public-health and safety agencies. Commentary
            distinguishes measured outcomes from broader interpretations, and notes
            important limits such as small samples, short follow-up, and uncertainty.</p>
          <p>This is not a systematic literature review, clinical review by a health
            professional, or a complete scientific or historical fact-check. It does
            not establish the safety or effectiveness of these particular flows,
            meditation scripts, or AI exercises. Claims outside the topics below
            remain outside this review.</p>
          <p>Findings such as “not established” mean that the reviewed sources do
            not substantiate the specific claim. They do not mean that an effect is
            impossible. Study findings and public guidance can change as research develops.</p>
          <p>Spiritual language and personal meaning are not being tested as if they
            were clinical outcomes. When the book presents a mechanism or health
            promise as scientific fact, that claim can be evaluated separately.</p>
        </section>
        <section className="school-section" aria-labelledby="review-findings">
          <h2 id="review-findings">Findings and sources.</h2>
          <p>Open a topic for the claim, evidence, practical interpretation, and
            sources. Source publication dates differ from the date checked.</p>
          <EvidenceCards topics={evidenceTopics} />
        </section>
        <section className="school-section" aria-labelledby="reviewed-lessons">
          <h2 id="reviewed-lessons">Read the commentary beside the teaching.</h2>
          <ul className="lesson-map">
            {reviewedLessons.map(lesson => <li key={lesson.slug}><a href={`/lessons/${lesson.slug}`}>Lesson {lesson.number}: {lesson.title}</a></li>)}
          </ul>
          <a className="text-link" href="/chapters/flows-and-meditations">Chapter 5: flow and meditation benefit notes</a>
          <p>These notes support informed reading and do not replace individualized
            medical care or qualified physical instruction.</p>
        </section>
      </main>
    </>
  );
}
