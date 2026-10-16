"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { continueReading, parseReadingProgress, READING_PROGRESS_KEY, type ReadingEntry, type ReadingProgress } from "../../lib/reading-progress";

type ProgressContextValue = {
  entries: ReadingEntry[];
  progress: ReadingProgress | null;
  ready: boolean;
  error: string;
  enable: () => void;
  clear: () => void;
  visit: (href: string) => void;
  toggle: (href: string) => void;
};
const ProgressContext = createContext<ProgressContextValue | null>(null);
function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("Reading progress requires its provider");
  return value;
}

export function ReadingProgressProvider({ entries, children }: { entries: ReadingEntry[]; children: ReactNode }) {
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const paths = useMemo(() => new Set(entries.map(entry => entry.href)), [entries]);

  useEffect(() => {
    try { setProgress(parseReadingProgress(localStorage.getItem(READING_PROGRESS_KEY), entries)); }
    catch { setError("This browser is not allowing progress storage. You can keep reading normally."); }
    setReady(true);
    const sync = (event: StorageEvent) => {
      try {
        if (event.storageArea === localStorage && (event.key === READING_PROGRESS_KEY || event.key === null)) {
          setProgress(parseReadingProgress(event.newValue, entries));
          setError("");
        }
      } catch { /* A later browser restriction must not interrupt reading. */ }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [entries]);

  const save = useCallback((next: ReadingProgress) => {
    try {
      localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(next));
      setProgress(next);
      setError("");
    } catch { setError("Your latest change could not be saved in this browser. You can keep reading normally."); }
  }, []);
  const enable = useCallback(() => save({ version: 1, lastHref: null, completed: [] }), [save]);
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(READING_PROGRESS_KEY);
      setProgress(null);
      setError("");
    } catch { setError("This browser did not allow progress to be cleared. Please try again in your browser settings."); }
  }, []);
  const visit = useCallback((href: string) => {
    if (progress && paths.has(href) && progress.lastHref !== href) save({ ...progress, lastHref: href });
  }, [progress, paths, save]);
  const toggle = useCallback((href: string) => {
    if (!progress || !paths.has(href)) return;
    const completed = progress.completed.includes(href)
      ? progress.completed.filter(path => path !== href)
      : [...progress.completed, href];
    save({ ...progress, lastHref: href, completed });
  }, [progress, paths, save]);
  const value = useMemo(() => ({ entries, progress, ready, error, enable, clear, visit, toggle }), [entries, progress, ready, error, enable, clear, visit, toggle]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

function StorageNote() {
  const { error } = useProgress();
  return <>{error ? <p className="progress-error" role="status">{error}</p> : null}</>;
}

export function ProgressOverview() {
  const { entries, progress, ready, enable, clear } = useProgress();
  const [confirmClear, setConfirmClear] = useState(false);
  const next = progress ? continueReading(progress, entries) : undefined;
  const allComplete = progress?.completed.length === entries.length;
  return (
    <section className="reading-progress-summary" aria-labelledby="reading-progress-title">
      <p className="section-kicker">Your reading journey</p>
      <h2 id="reading-progress-title">{progress ? "Continue reading" : "Keep your place"}</h2>
      {progress ? <>
        <p className="progress-count" aria-live="polite">{progress.completed.length} of {entries.length} readings marked complete · 64 lessons, 16 flows, 4 meditations</p>
        <progress max={entries.length} value={progress.completed.length} aria-label="Readings marked complete" />
        {allComplete ? <p>You’ve marked the whole collection complete. Revisit any teaching at your own pace.</p> : null}
        {next ? <a className="button primary" href={next.href}>{allComplete ? "Revisit" : "Continue with"} {next.label}</a> : null}
        <p className="progress-privacy">Saved only in this browser. No account or device sync. Completion is always your choice.</p>
        {confirmClear ? <div className="progress-reset" role="group" aria-label="Confirm clearing reading progress">
          <p>Clear all completion marks and your saved place, and turn off progress saving?</p>
          <button type="button" className="button ghost" onClick={() => { clear(); setConfirmClear(false); }}>Clear and turn off</button>
          <button type="button" className="text-link progress-text-button" onClick={() => setConfirmClear(false)}>Cancel</button>
        </div> : <button type="button" className="text-link progress-text-button" onClick={() => setConfirmClear(true)}>Clear progress and turn off</button>}
      </> : <>
        <p>Save your last opened reading and mark lessons, flows, and meditations complete when you choose.</p>
        <button type="button" className="button primary" disabled={!ready} onClick={enable}>Enable progress on this browser</button>
        <p className="progress-privacy">Optional. Saved only in this browser, with no account or device sync. Your reflections and writing are never saved here.</p>
      </>}
      <StorageNote />
    </section>
  );
}

export function ReaderProgress({ href }: { href: string }) {
  const { progress, ready, enable, visit, toggle } = useProgress();
  const visited = useRef<string | null>(null);
  useEffect(() => {
    if (!progress) { visited.current = null; return; }
    // Record an entry once, not every time another tab saves its own place.
    if (ready && visited.current !== href) { visited.current = href; visit(href); }
  }, [ready, progress, visit, href]);
  const completed = progress?.completed.includes(href) ?? false;
  return (
    <section className="reader-progress" aria-label="Your progress on this reading">
      {progress ? <>
        <p aria-live="polite">{completed ? "You marked this reading complete." : "Your place is saved in this browser. Mark this reading complete whenever you’re ready."}</p>
        <button type="button" className="button primary" aria-pressed={completed} onClick={() => toggle(href)}>{completed ? "Mark as incomplete" : "Mark as complete"}</button>
        <a className="text-link" href="/curriculum#reading-progress">View your progress</a>
      </> : <>
        <p>Want to keep your place? Enable optional progress saving in this browser.</p>
        <button type="button" className="button ghost" disabled={!ready} onClick={enable}>Enable progress on this browser</button>
      </>}
      <StorageNote />
    </section>
  );
}

export function CompletionMarker({ href }: { href: string }) {
  const { progress } = useProgress();
  return progress?.completed.includes(href) ? <span className="completion-marker">Completed</span> : null;
}
