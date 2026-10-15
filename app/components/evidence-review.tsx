import { EVIDENCE_REVIEW_DATE, type EvidenceTopic } from "../../lib/evidence";

export function EvidenceCards({ topics }: { topics: EvidenceTopic[] }) {
  return topics.map(topic => (
    <details className="evidence-card" id={`evidence-${topic.id}`} key={topic.id}>
      <summary>
        <strong>{topic.title}</strong>
        <span>{topic.finding}</span>
      </summary>
      <p><strong>Claim reviewed:</strong> {topic.claim}</p>
      <p><strong>What the evidence shows:</strong> {topic.commentary}</p>
      <p><strong>How to read the lesson:</strong> {topic.implication}</p>
      <h4>Sources checked</h4>
      <ul className="evidence-sources">
        {topic.sources.map(source => (
          <li key={source.url}>
            <a className="text-link" href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
            <small>{source.kind}</small>
          </li>
        ))}
      </ul>
    </details>
  ));
}

export default function EvidenceReview({ topics }: { topics: EvidenceTopic[] }) {
  return (
    <div className="evidence-review" aria-labelledby="evidence-heading">
      <h3 id="evidence-heading">Evidence review</h3>
      <p className="editorial-note">AI-assisted editorial review · Checked <time dateTime={EVIDENCE_REVIEW_DATE}>October 15, 2026</time></p>
      <p>These notes assess selected claims, not every statement or listed benefit.
        The original 2024 teaching remains below. Open a topic to see the findings and sources.</p>
      <EvidenceCards topics={topics} />
      <a className="text-link" href="/evidence">Review scope, sources, and remaining limits</a>
    </div>
  );
}
