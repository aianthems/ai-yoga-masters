export default function ReaderSections({ listenHref }: { listenHref?: "#music" | "#video" }) {
  return (
    <nav className="reader-sections" aria-label="On this page">
      <span>Jump to</span>
      {listenHref ? <a href={listenHref}>Listen</a> : null}
      <a href="#teaching">Read</a>
      <a href="#practice">Practice</a>
    </nav>
  );
}
