export const practices = [
  {
    title: "One-Pointed Focus",
    description: "Give one worthwhile task your attention. Notice wandering and return gently.",
    prepare: "Choose a manageable task. Remove one optional distraction, while keeping what you need for accessibility or essential communication. Find a comfortable position; move whenever you need to.",
    cues: ["Work on the task you chose, one step at a time.", "When you notice wandering, acknowledge it without judgment and return to your intention.", "Adjust your position or take a break whenever you need to. Finish when the session stops being useful."],
    reflection: "What helped you return to your task without frustration?",
    lessons: [{ slug: "5-states-of-mind", title: "3 · 5 States of Mind" }, { slug: "ekagra-one-pointed-focus", title: "4 · Ekagra: One-Pointed Focus" }, { slug: "pratyahara-and-dharana", title: "6 · Pratyahara and Dharana" }],
  },
  {
    title: "Clarity & Discernment",
    description: "Slow down and examine one claim before relying on an AI answer.",
    prepare: "Choose one factual claim from an AI response. Decide what you need to know before you rely on it. Keep the response and its sources available.",
    cues: ["Find the primary source behind the claim, if one is available.", "Read what the source actually says. Compare its wording, date, and context with the AI answer.", "Mark what is supported and what remains uncertain. Revise your next decision accordingly."],
    reflection: "How did checking the source change your confidence or your next decision?",
    lessons: [{ slug: "clarity-and-discernment", title: "5 · Clarity and Discernment" }],
  },
  {
    title: "Care & Honesty",
    description: "Review an AI-assisted creation with truthfulness and care for the people it affects.",
    prepare: "Choose one result you intend to share. Consider who will encounter it and whose information or work it includes.",
    cues: ["Check factual statements and remove anything misleading.", "Credit the work and ideas you used. Protect your own and other people’s private information.", "Consider how the result could affect others. Make one revision that improves its honesty or care."],
    reflection: "What did care and honesty require you to change?",
    lessons: [{ slug: "ahimsa-and-satya", title: "7 · Ahimsa and Satya" }],
  },
] as const;
