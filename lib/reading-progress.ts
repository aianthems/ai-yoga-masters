export type ReadingEntry = { href: string; label: string };
export type ReadingProgress = { version: 1; lastHref: string | null; completed: string[] };
export const READING_PROGRESS_KEY = "ai-yoga-masters:reading-progress:v1";

// Only curriculum-owned paths are accepted, including when storage is edited
// manually or comes from an older edition. No private writing is stored.
export function parseReadingProgress(raw: string | null, entries: readonly ReadingEntry[]): ReadingProgress | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (!value || value.version !== 1 || !Array.isArray(value.completed)) return null;
    const paths = new Set(entries.map(entry => entry.href));
    return {
      version: 1,
      lastHref: typeof value.lastHref === "string" && paths.has(value.lastHref) ? value.lastHref : null,
      completed: [...new Set<string>(value.completed.filter((href: unknown): href is string => typeof href === "string" && paths.has(href)))],
    };
  } catch {
    return null;
  }
}

export function continueReading(progress: ReadingProgress, entries: readonly ReadingEntry[]): ReadingEntry | undefined {
  const index = entries.findIndex(entry => entry.href === progress.lastHref);
  const completed = new Set(progress.completed);
  if (index >= 0 && !completed.has(entries[index].href)) return entries[index];
  const ordered = [...entries.slice(index + 1), ...entries.slice(0, index + 1)];
  return ordered.find(entry => !completed.has(entry.href)) ?? entries[index] ?? entries[0];
}
