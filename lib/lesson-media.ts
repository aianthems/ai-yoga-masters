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
};
