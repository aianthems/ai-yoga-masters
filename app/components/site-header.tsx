export default function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <a href="/" className="brand" aria-label="AI Yoga Masters home">
          <img
            src="https://pub-651b74915ffe45ecaf36799e0842fc9f.r2.dev/images/logos/ai-yoga-masters-logo.webp"
            alt=""
            width={1200}
            height={1310}
            style={{ display: "block", width: "auto", height: 64, flexShrink: 0 }}
          />
          <span>AI Yoga Masters</span>
        </a>
        <nav aria-label="Primary navigation">
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

