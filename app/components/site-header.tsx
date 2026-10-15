export default function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <a href="/" className="brand" aria-label="AI Yoga Masters home">
          <img
            src="https://media.aiyogamasters.com/images/logos/ai-yoga-masters-logo.webp"
            alt=""
            width={1200}
            height={1310}
            style={{ display: "block", width: "auto", height: 64, flexShrink: 0 }}
          />
          <span>AI Yoga Masters</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/start-here">Start Here</a>
          <a href="/curriculum">Curriculum</a>
          <a href="/about">About</a>
          <a
            href="https://media.aianthems.com/books/ai-yoga-masters/ai-yoga-masters-optimized.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Book
          </a>
        </nav>
      </header>
    </>
  );
}

