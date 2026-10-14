export type LessonMedia = {
  youtubeId: string;
  title: string;
};

// Original recordings supplied by Alex Julian; metadata checked via YouTube oEmbed.
export const lessonMedia: Record<string, LessonMedia> = {
  "redefining-yoga": {
    youtubeId: "VWHyEHNGLws",
    title: "Redefining Yoga Song",
  },
  "8-petals-of-yoga": {
    youtubeId: "xEeG-B0_oyY",
    title: "8 Petals of Yoga",
  },
  "5-states-of-mind": {
    youtubeId: "itzoPgdyKI8",
    title: "5 States of Mind",
  },
  "ekagra-one-pointed-focus": {
    youtubeId: "THSWd6OBRiw",
    title: "Ekagra",
  },
  "clarity-and-discernment": {
    youtubeId: "tuvj5_X8uno",
    title: "Clarity and Discernment",
  },
  "pratyahara-and-dharana": {
    youtubeId: "tUTgclKpKUU",
    title: "Pratyahara and Dharana",
  },
  "ahimsa-and-satya": {
    youtubeId: "x08VTs8O-NQ",
    title: "Ahimsa and Satya",
  },
  "mental-and-physical": {
    youtubeId: "SmX0GtkBXoU",
    title: "Mental and Physical Yoga",
  },
  "one-pose": {
    youtubeId: "ghbn8vlsJTI",
    title: "One Pose",
  },
  "redefining-ai": {
    youtubeId: "LLeIM339MDQ",
    title: "Redefining AI",
  },
  "upgrading-the-person": {
    youtubeId: "trg03vqrHUI",
    title: "Upgrading the Person",
  },
  "samyama": {
    youtubeId: "bdbGt3GWgqk",
    title: "Samyama",
  },
  "emotion-and-stimulation": {
    youtubeId: "ECeVyGU0LNM",
    title: "Emotion and Stimulation",
  },
};
