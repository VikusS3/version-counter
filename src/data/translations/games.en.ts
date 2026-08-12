export interface GameTranslation {
  nombre: string;
  descripcion: string;
  slogan_desc: string;
  patch_notes_description: string;
}

export const gamesTranslations: Record<string, GameTranslation> = {
  "genshin-impact": {
    nombre:
      "Genshin Impact Release Countdown - Next Version, Banners & Patch Notes",
    descripcion:
      "Genshin Impact 7.1 release countdown for all regions like America, Europe, Asia. Track the next Genshin Impact update time, character banner schedule, maintenance, and official patch notes.",
    slogan_desc: "Snezhnaya's is now available, new characters, and more.",
    patch_notes_description:
      "Latest official patch notes for Genshin Impact 7.0 on Hoyolab",
  },
  "wuthering-waves": {
    nombre: "Wuthering Waves New Version Countdown",
    descripcion:
      "Wuthering Waves 3.6 Countdown for all region like America, Europe, Asia. Wuthering Banner Countdown, Patch Notes, and more.",
    slogan_desc: "Version 3.5 is now available, new mission, and more.",
    patch_notes_description: "Latest patch notes for Wuthering Waves 3.5",
  },
  "honkai-star-rail": {
    nombre: "Honkai Star Rail New Version Countdown",
    descripcion:
      "Honkai Star Rail 4.5 Countdown for all region like America, Europe, Asia. Honkai Banner Countdown, Patch Notes, and more.",
    slogan_desc: "Himeko Nova and Fate Collab part 2 are coming soon!",
    patch_notes_description: "Latest patch notes for Honkai Star Rail 4.4",
  },
  "zenless-zone-zero": {
    nombre: "Zenless Zone Zero New Version Countdown",
    descripcion:
      "Zenless Zone Zero 3.2 Countdown for all region like America, Europe, Asia. Zenless Banner Countdown, Patch Notes, and more.",
    slogan_desc: "Void Hunter Remille is coming in ZZZ",
    patch_notes_description: "Latest patch notes for Zenless Zone Zero 3.1",
  },
  "arknights-endfield": {
    nombre: "Arknights Endfield New Version Countdown",
    descripcion:
      "Arknights Endfield 1.5 Countdown for all region like America, Europe, Asia. Arknights Banner Countdown, Patch Notes, and more.",
    slogan_desc: "Version 1.4 is now available, new characters, and more.",
    patch_notes_description: "Latest patch notes for Arknights Endfield 1.4",
  },
  "neverness-to-everness": {
    nombre: "Neverness to Everness New Version Countdown",
    descripcion:
      "Neverness to Everness 1.3 Countdown for all region like America, Europe, Asia. Genshin Banner Countdown, Patch Notes, and more.",
    slogan_desc:
      "Nerver to Everness 1.2 is now available, new characters, and more.",
    patch_notes_description: "Latest patch notes for Neverness to Everness 1.2",
  },
};
