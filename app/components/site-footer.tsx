import { bookUrl } from "../../lib/curriculum";

const socials = [
  ["X", "https://x.com/sianthems"],
  ["Instagram", "https://www.instagram.com/aianthems/"],
  ["TikTok", "https://www.tiktok.com/@sianthems"],
  ["YouTube", "https://www.youtube.com/@ai_anthems"],
  ["GitHub", "https://github.com/aianthems"],
];

export default function SiteFooter() {
  return (
    <footer className="school-footer">
      <div className="school-footer-top">
        <a className="school-footer-brand" href="/" aria-label="AI Yoga Masters home">
          <img src="https://media.aiyogamasters.com/images/logos/ai-yoga-masters-logo.webp" alt="AI Yoga Masters" width={1200} height={1310} loading="lazy" />
        </a>
        <div className="school-footer-message">
          <p className="section-kicker">Yoga 2.0</p>
          <p className="school-footer-motto">Go deeper to reach higher.</p>
          <p>Founded by Alex Julian.</p>
        </div>
        <div className="school-footer-links" aria-label="Footer links">
          <a href="/start-here">Start Here</a>
          <a href="/curriculum">Curriculum</a>
          <a href="/about">About</a>
          <a href={bookUrl} target="_blank" rel="noopener noreferrer">Book</a>
        </div>
      </div>
      <div className="school-footer-bottom">
        <p>© {new Date().getFullYear()} Alex Julian · AI Yoga Masters</p>
        <div className="school-footer-socials" aria-label="Social links">
          {socials.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
