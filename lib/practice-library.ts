export const practiceNeeds = [
  { slug: "scattered-attention", need: "My attention is scattered.", practice: "one-pointed-focus", time: "2–5 minutes", invitation: "Choose one point of attention and practice returning to it.", lessons: [3, 4, 6] },
  { slug: "check-an-answer", need: "I’m accepting AI answers too quickly.", practice: "clarity-discernment", time: "5–10 minutes", invitation: "Take one claim out of the stream of answers and check it carefully.", lessons: [5, 7] },
  { slug: "begin-something", need: "I keep postponing starting.", practice: "small-start", time: "2–5 minutes", invitation: "Make the first action smaller. Give yourself something real to build on.", lessons: [11, 17, 62, 63] },
  { slug: "take-a-break", need: "I need to step away from the screen.", practice: "step-away", time: "At your own pace", invitation: "Leave a clear place to resume, then let your attention return to your surroundings.", lessons: [8, 17, 41] },
  { slug: "create-with-purpose", need: "I want to create with a clearer intention.", practice: "clear-intention", time: "5–10 minutes", invitation: "Name what you want to make, who it is for, and what matters most.", lessons: [1, 12, 23] },
] as const;

// Exact lesson starts checked against the original PDF. Unpublished lessons open the book.
export const libraryBookPages: Record<number, number> = { 23: 56, 41: 87, 62: 147, 63: 148 };
