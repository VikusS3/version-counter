import { createGuideFromYoutube } from "../lib/youtube";

export interface Guide {
  id: string;
  title: string;
  game: "genshin" | "wuwa" | "zzz" | "hsr";
  language: "EN" | "ES";
  youtubeUrl: string;
  thumbnail: string;
  duration: string | null;
  creator: {
    name: string;
    avatar: string | null;
  };
}

const rawGuides: Array<{
  url: string;
  game: "genshin" | "wuwa" | "zzz" | "hsr";
  language: "EN" | "ES";
}> = [
  {
    url: "https://www.youtube.com/watch?v=f8FMC1xfntA",
    game: "genshin",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=wA5ph7YoaQg",
    game: "zzz",
    language: "ES",
  },
  {
    url: "https://www.youtube.com/watch?v=MZgIr1TSIyw",
    game: "hsr",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=RC1_9DmKPCM",
    game: "hsr",
    language: "ES",
  },
  {
    url: "https://www.youtube.com/watch?v=BvGOv86OPq0",
    game: "genshin",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=zMovmSz0UYc",
    game: "wuwa",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=Enm_H7ejMEc",
    game: "wuwa",
    language: "ES",
  },
  {
    url: "https://www.youtube.com/watch?v=p14lmvnUqTc",
    game: "zzz",
    language: "ES",
  },
  {
    url: "https://www.youtube.com/watch?v=Dhg-uuYRYWU",
    game: "zzz",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=JygB1TcL4uI",
    game: "wuwa",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=MmPGrOv2cyM",
    game: "hsr",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=muPnKZbMC0k",
    game: "hsr",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=VA74EYiD7Nw",
    game: "genshin",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=GoDey7703Fw",
    game: "genshin",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=qY69um-KKh4",
    game: "wuwa",
    language: "EN",
  },
  {
    url: "https://www.youtube.com/watch?v=twmlU1V4T0E",
    game: "wuwa",
    language: "ES",
  },
  {
    url: "https://www.youtube.com/watch?v=y-fMoi12vD0",
    game: "zzz",
    language: "ES",
  },
];

export const guides: Guide[] = await Promise.all(
  rawGuides.map((g) => createGuideFromYoutube(g.url, g.game, g.language)),
);
