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
      "Zenless Zone Zero 3.0 Countdown for all region like America, Europe, Asia. Zenless Banner Countdown, Patch Notes, and more.",
    slogan_desc: "Billy and Promeia are now available, new maps, and more.",
    patch_notes_description: "Latest patch notes for Zenless Zone Zero 2.8",
  },
  "arknights-endfield": {
    nombre: "Arknights Endfield New Version Countdown",
    descripcion:
      "Arknights Endfield 1.3 Countdown for all region like America, Europe, Asia. Arknights Banner Countdown, Patch Notes, and more.",
    slogan_desc: "Version 1.2 is now available, new characters, and more.",
    patch_notes_description: "Latest patch notes for Arknights Endfield 1.2",
  },
  "neverness-to-everness": {
    nombre: "Neverness to Everness New Version Countdown",
    descripcion:
      "Neverness to Everness 1.1 Countdown for all region like America, Europe, Asia. Genshin Banner Countdown, Patch Notes, and more.",
    slogan_desc: "Celebrate the release of Neverness to Everness with new characters, a new zone, and more.",
    patch_notes_description: "Latest patch notes for Neverness to Everness 1.0",
  },
};
