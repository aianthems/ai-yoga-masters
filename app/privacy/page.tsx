import SiteHeader from "../components/site-header";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Privacy | AI Yoga Masters",
  description: "How AI Yoga Masters handles optional browser-local reading progress, private reflections, embedded videos, technical information, and privacy requests.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="school">
        <section className="school-intro">
          <p className="section-kicker">AI Yoga Masters</p>
          <h1>Privacy</h1>
          <p className="school-lede">Read, listen, and explore without an account. Saving your reading progress is optional and stays in your browser.</p>
          <p>Last updated <time dateTime="2026-10-17">October 17, 2026</time>.</p>
          <p>This notice covers aiyogamasters.com, operated by Alex Julian.</p>
        </section>

        <section className="school-section" aria-labelledby="saved-progress">
          <h2 id="saved-progress">Optional reading progress</h2>
          <p>Progress saving starts only when you select “Enable progress on this browser.” It remembers your last opened lesson, flow, or meditation and the readings you choose to mark complete. Opening a reading does not automatically mark it complete.</p>
          <p>This information is stored in your browser’s local storage. The progress feature does not send it to us or a database, and it does not sync between devices or browser profiles. Other people using the same browser profile may see your saved progress.</p>
          <p>The site sets no automatic expiry for this record. It remains until you clear it or your browser removes it; private browsing and browser settings can limit how long it lasts. If storage is unavailable, you can still read normally.</p>
          <p>To remove it, open the progress panel on the homepage or curriculum, select “Clear progress and turn off,” and confirm “Clear and turn off.” This removes the saved place and completion marks and stops saving until you enable it again. Clearing this website’s data in your browser also removes progress. We cannot restore or remotely delete a record held only in your browser.</p>
          <a className="text-link" href="/curriculum#reading-progress">Open your progress controls</a>
        </section>

        <section className="school-section" aria-labelledby="reflections">
          <h2 id="reflections">Your reflections and writing</h2>
          <p>The exercises invite private reflection. This website has no reflection submission form, and the progress feature does not collect or save your answers, prompts, or personal writing. If you use a separate AI tool or another service for an exercise, its own privacy practices apply.</p>
        </section>

        <section className="school-section" aria-labelledby="technical-information">
          <h2 id="technical-information">Hosting and technical information</h2>
          <p>Vercel hosts this website. Images and book downloads are also delivered from media.aiyogamasters.com and media.aianthems.com. Loading pages or media sends the relevant delivery provider technical request information, such as your IP address, browser information, requested address, and request time. Your browser may also send a referring page.</p>
          <p>These providers process technical information to deliver content, maintain security, and diagnose problems, and may retain operational logs under their settings and policies. This is separate from the reading-progress record saved in your browser.</p>
          <p>Search terms are included in the search page’s address and sent to the website host to find matching readings. They may appear in browser history and technical request logs. Search for topics rather than entering private reflections or sensitive personal information.</p>
          <p>The current website does not include a standalone visitor-analytics or advertising-pixel integration. That does not prevent hosting or embedded-video providers from processing technical information.</p>
          <a className="text-link" href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel privacy notice</a>
        </section>

        <section className="school-section" aria-labelledby="videos">
          <h2 id="videos">YouTube videos and external links</h2>
          <p>Our embedded videos use YouTube’s privacy-enhanced domain, youtube-nocookie.com. This reduces certain personalization uses of embedded views; it does not make the player anonymous or eliminate all data processing.</p>
          <p>When an embedded player loads, your browser connects to YouTube and related delivery services, even before you press play. YouTube may process technical information and use cookies or similar storage as described in Google’s policies. Playback and opening YouTube directly can involve additional processing.</p>
          <p>Links to social networks, research sources, AI Anthems, and other websites take you to services with their own privacy practices. Clearing reading progress does not clear data held by those services.</p>
          <ul>
            <li><a className="text-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google privacy policy</a></li>
            <li><a className="text-link" href="https://support.google.com/youtube/answer/171780" target="_blank" rel="noopener noreferrer">YouTube’s explanation of privacy-enhanced embeds</a></li>
          </ul>
        </section>

        <section className="school-section" aria-labelledby="contact-privacy">
          <h2 id="contact-privacy">Contact and privacy requests</h2>
          <p>For privacy questions, access or deletion requests, or corrections to this notice, email <a className="text-link" href="mailto:contact@aianthems.com?subject=AI%20Yoga%20Masters%20privacy">contact@aianthems.com</a> and mention AI Yoga Masters.</p>
          <p>If you email us, we receive your address, message, and any attachments you choose to send. We use them to respond and handle your request, and retain correspondence as needed for that purpose and applicable recordkeeping requirements. Email is handled by email service providers; it is separate from browser-local progress.</p>
          <p>Privacy rights depend on your location and circumstances. Contact us to make a request about information we hold. Browser-only progress must be cleared through your browser or the site’s progress controls.</p>
        </section>

        <section className="school-section" aria-labelledby="notice-updates">
          <h2 id="notice-updates">Updates to this notice</h2>
          <p>We will update this page and its date when the site’s information practices change. You can return to it at any time through the footer or progress controls.</p>
        </section>
      </main>
    </>
  );
}
