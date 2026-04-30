export interface GameTranslation {
  nombre: string;
  descripcion: string;
  slogan_desc: string;
  patch_notes_description: string;
}

export const gamesTranslations: Record<string, GameTranslation> = {
  "genshin-impact": {
    nombre: "Genshin Impact New Version Countdown",
    descripcion:
      "Genshin Impact 6.6 Countdown for all region like America, Europe, Asia. Genshin Banner Countdown, Patch Notes, and more.",
    slogan_desc: "New zone in Mondstadt, new characters, and more.",
    patch_notes_description: "Latest patch notes for Genshin Impact 6.5",
  },
  "wuthering-waves": {
    nombre: "Wuthering Waves New Version Countdown",
    descripcion:
      "Wuthering Waves 3.4 Countdown for all region like America, Europe, Asia. Wuthering Banner Countdown, Patch Notes, and more.",
    slogan_desc:
      "Hiyuki is now available in wuthering waves, new maps, and more.",
    patch_notes_description: "Latest patch notes for Wuthering Waves 3.3",
  },
  "honkai-star-rail": {
    nombre: "Honkai Star Rail New Version Countdown",
    descripcion:
      "Honkai Star Rail 4.3 Countdown for all region like America, Europe, Asia. Honkai Banner Countdown, Patch Notes, and more.",
    slogan_desc: "Silver Wolf lv999 is now available, new region, and more.",
    patch_notes_description: "Latest patch notes for Honkai Star Rail 4.2",
  },
  "zenless-zone-zero": {
    nombre: "Zenless Zone Zero New Version Countdown",
    descripcion:
      "Zenless Zone Zero 2.8 Countdown for all region like America, Europe, Asia. Zenless Banner Countdown, Patch Notes, and more.",
    slogan_desc: "A new mission arrives in zzz",
    patch_notes_description: "Latest patch notes for Zenless Zone Zero 2.7",
  },
};
