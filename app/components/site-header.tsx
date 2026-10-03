export default function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <a href="/" className="brand" aria-label="AI Yoga Masters home">
          <span className="mark" aria-hidden="true">
            ◉
          </span>
          <span>AI Yoga Masters</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/curriculum">Curriculum</a>
          <a href="/chapters/lost-teachings-of-yoga">Chapter 1</a>
          <a href="/#practice">Practice</a>
          <a href="/#petals">8 Petals</a>
          <a
            href="https://media.aianthems.com/books/ai-yoga-masters/ai-yoga-masters-optimized.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Book ↗
          </a>
        </nav>
      </header>
    </>
  );
}
