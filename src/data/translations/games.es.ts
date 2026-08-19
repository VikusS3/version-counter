export interface GameTranslation {
  nombre: string;
  descripcion: string;
  slogan_desc: string;
  patch_notes_description: string;
}

export const gamesTranslations: Record<string, GameTranslation> = {
  "genshin-impact": {
    nombre:
      "Cuenta Regresiva Genshin Impact - Próxima Versión, Banners y Parche",
    descripcion:
      "Cuenta regresiva para el lanzamiento de Genshin Impact 7.1 en todas las regiones como América, Europa, Asia. Sigue la hora de la próxima actualización de Genshin Impact, los banners de personajes, el mantenimiento y las notas del parche oficiales.",
    slogan_desc: "Snezhnaya's está ahora disponible, nuevos personajes y más.",
    patch_notes_description:
      "Últimas notas del parche oficiales de Genshin Impact 7.0 en Hoyolab",
  },
  "wuthering-waves": {
    nombre: "Cuenta Regresiva Nueva Versión Wuthering Waves",
    descripcion:
      "Cuenta regresiva Wuthering Waves 3.6 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "Version 3.5 está ahora disponible, nueva misión y más.",
    patch_notes_description:
      "Últimas notas del parche para Wuthering Waves 3.5",
  },
  "honkai-star-rail": {
    nombre: "Cuenta Regresiva Nueva Versión Honkai Star Rail",
    descripcion:
      "Cuenta regresiva Honkai Star Rail 4.5 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "Himeko Nova y la Colaboración Fate parte 2 están por llegar!",
    patch_notes_description:
      "Últimas notas del parche para Honkai Star Rail 4.4",
  },
  "zenless-zone-zero": {
    nombre: "Cuenta Regresiva Nueva Versión Zenless Zone Zero",
    descripcion:
      "Cuenta regresiva Zenless Zone Zero 3.1 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "Agonista de la Vacuidad Remille llego a ZZZ",
    patch_notes_description:
      "Últimas notas del parche para Zenless Zone Zero 3.1",
  },
  "arknights-endfield": {
    nombre: "Cuenta Regresiva Nueva Versión Arknights Endfield",
    descripcion:
      "Cuenta regresiva Arknights Endfield 1.5 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "La versión 1.4 ya está disponible, nuevos personajes y más.",
    patch_notes_description:
      "Últimas notas del parche para Arknights Endfield 1.4",
  },
  "neverness-to-everness": {
    nombre: "Cuenta Regresiva Nueva Versión Neverness to Everness",
    descripcion:
      "Cuenta regresiva Neverness to Everness 1.4 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc:
      "La versión 1.3 de Neverness to Everness ya está disponible, nuevos personajes y más.",
    patch_notes_description:
      "Últimas notas del parche para Neverness to Everness 1.3",
  },
};
