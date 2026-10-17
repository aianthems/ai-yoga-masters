import SiteHeader from "../components/site-header";
import { searchKind, searchReadings } from "../../lib/content-search";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Search | AI Yoga Masters",
  description: "Find a teaching, yoga flow, or meditation in AI Yoga Masters.",
  path: "/search", noIndex: true,
});

export default async function SearchPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.slice(0, 160).trim() : "";
  const kind = searchKind(params.type);
  const results = searchReadings(query, kind);
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <p className="section-kicker">Find your next reading</p>
          <h1>Search the school</h1>
          <p className="school-lede">Explore 64 lessons, 16 yoga flows, and 4 meditations. Search a topic, a title, or a phrase from the teaching.</p>
          <form action="/search" method="get" role="search" className="reading-search">
            <div className="reading-search-query">
              <label htmlFor="reading-query">What would you like to explore?</label>
              <input id="reading-query" name="q" type="search" defaultValue={query} maxLength={160} placeholder="Try focus, breath, or starting" />
            </div>
            <div>
              <label htmlFor="reading-type">Reading type</label>
              <select id="reading-type" name="type" defaultValue={kind}>
                <option value="all">All readings</option>
                <option value="lesson">Lessons</option>
                <option value="flow">Yoga flows</option>
                <option value="meditation">Meditations</option>
              </select>
            </div>
            <button className="button primary" type="submit">Search</button>
          </form>
          <p className="search-hint">Search terms appear in the page address. Use topics rather than private reflections.</p>
        </section>
        <section className="school-section" aria-labelledby="search-results">
          <h2 id="search-results">{query ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”` : "Where would you like to begin?"}</h2>
          {query ? (
            results.length ? <ul className="search-results">
              {results.map(result => <li key={result.href} className="school-card">
                <p className="section-kicker">{result.label} · {result.chapter}</p>
                <h3><a href={result.href}>{result.title}</a></h3>
                <p>{result.excerpt}</p>
                <a className="text-link" href={result.href}>Open {result.kind === "flow" ? "flow" : result.kind}</a>
              </li>)}
            </ul> : <div>
              <p>No readings matched this search. Try fewer words, a broader topic, or choose All readings.</p>
              <a className="text-link" href="/search">Clear search</a>
              <p>You can also <a className="text-link" href="/curriculum">browse the curriculum</a>.</p>
            </div>
          ) : <div>
            <p>Try one of these topics, or enter your own above.</p>
            <div className="search-topics">{["Focus", "Breath", "Innovation", "Starting", "Meditation"].map(topic => <a className="text-link" key={topic} href={`/search?q=${topic.toLowerCase()}`}>{topic}</a>)}</div>
            <p>Prefer to follow the book? <a className="text-link" href="/curriculum">Browse all chapters</a>.</p>
          </div>}
        </section>
      </main>
    </>
  );
}
