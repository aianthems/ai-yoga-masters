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
};
