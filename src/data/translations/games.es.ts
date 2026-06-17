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
      "Cuenta regresiva Genshin Impact 6.7 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc:
      "Nicole y una nueva misión de historia están ahora disponibles.",
    patch_notes_description: "Últimas notas del parche para Genshin Impact 6.6",
  },
  "wuthering-waves": {
    nombre: "Cuenta Regresiva Nueva Versión Wuthering Waves",
    descripcion:
      "Cuenta regresiva Wuthering Waves 3.5 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc:
      "Lucy y Rebeca están ahora disponibles en wuthering waves, nuevos mapas y más.",
    patch_notes_description:
      "Últimas notas del parche para Wuthering Waves 3.4",
  },
  "honkai-star-rail": {
    nombre: "Cuenta Regresiva Nueva Versión Honkai Star Rail",
    descripcion:
      "Cuenta regresiva Honkai Star Rail 4.4 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "Mortenax Blade esta ahora disponible, nueva misión y más.",
    patch_notes_description:
      "Últimas notas del parche para Honkai Star Rail 4.3",
  },
  "zenless-zone-zero": {
    nombre: "Cuenta Regresiva Nueva Versión Zenless Zone Zero",
    descripcion:
      "Cuenta regresiva Zenless Zone Zero 3.1 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "La temporada 3 está por llegar, nuevos personajes y más.",
    patch_notes_description:
      "Últimas notas del parche para Zenless Zone Zero 3.0",
  },
  "arknights-endfield": {
    nombre: "Cuenta Regresiva Nueva Versión Arknights Endfield",
    descripcion:
      "Cuenta regresiva Arknights Endfield 1.4 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc: "La versión 1.3 ya está disponible, nuevos personajes y más.",
    patch_notes_description:
      "Últimas notas del parche para Arknights Endfield 1.3",
  },
  "neverness-to-everness": {
    nombre: "Cuenta Regresiva Nueva Versión Neverness to Everness",
    descripcion:
      "Cuenta regresiva Neverness to Everness 1.2 para todas las regiones como América, Europa, Asia. Cuenta regresiva de banners, notas del parche y más.",
    slogan_desc:
      "La versión 1.1 de Neverness to Everness ya está disponible, nuevos personajes y más.",
    patch_notes_description:
      "Últimas notas del parche para Neverness to Everness 1.1",
  },
};
