export interface GameTranslation {
  nombre: string;
  descripcion: string;
  slogan_desc: string;
  patch_notes_description: string;
}

export const gamesTranslations: Record<string, GameTranslation> = {
  "genshin-impact": {
    nombre: "Cuenta Regresiva Nueva Versión Genshin Impact",
    descripcion:
      "Cuenta regresiva Genshin Impact 6.6 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "Nueva zona en Mondstadt, nuevos personajes y más.",
    patch_notes_description: "Últimas notas del parche para Genshin Impact 6.5",
  },
  "wuthering-waves": {
    nombre: "Cuenta Regresiva Nueva Versión Wuthering Waves",
    descripcion:
      "Cuenta regresiva Wuthering Waves 3.2 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "Prepárate para la nueva región Lahai-Roi.",
    patch_notes_description:
      "Últimas notas del parche para Wuthering Waves 3.2",
  },
  "honkai-star-rail": {
    nombre: "Cuenta Regresiva Nueva Versión Honkai Star Rail",
    descripcion:
      "Cuenta regresiva Honkai Star Rail 4.3 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "Silver Wolf lv999 is now available, new region, and more.",
    patch_notes_description:
      "Últimas notas del parche para Honkai Star Rail 4.2",
  },
  "zenless-zone-zero": {
    nombre: "Cuenta Regresiva Nueva Versión Zenless Zone Zero",
    descripcion:
      "Cuenta regresiva Zenless Zone Zero 2.8 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "Una nueva misión llega a zzz",
    patch_notes_description:
      "Últimas notas del parche para Zenless Zone Zero 2.7",
  },
};
