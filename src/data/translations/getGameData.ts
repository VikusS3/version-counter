import gamesData from "../games.json";
import { defaultLocale, type Locale } from "../../i18n/config";
import { gamesTranslations as gamesEn } from "./games.en";
import { gamesTranslations as gamesEs } from "./games.es";

const translationsMap = {
  en: gamesEn,
  es: gamesEs,
};

export interface LocalizedGame {
  slug: string;
  nombre: string;
  nombre_oficial: string;
  descripcion: string;
  version_actual: string;
  proxima_version: string;
  nombre_version_actual: string;
  slogan_name: string;
  slogan_desc: string;
  fecha_inicio: string;
  duracion_dias: number;
  alias: string;
  imagen: string;
  patch_notes: string;
  patch_notes_description: string;
  href: string;
  icon: string;
  tema: string;
}

export function getLocalizedGames(locale: Locale): LocalizedGame[] {
  const translations = translationsMap[locale];

  return gamesData.games.map((game) => {
    const gameTranslation = translations[game.slug];
    return {
      ...game,
      nombre: gameTranslation?.nombre ?? game.nombre,
      descripcion: gameTranslation?.descripcion ?? game.descripcion,
      slogan_desc: gameTranslation?.slogan_desc ?? game.slogan_desc,
      patch_notes_description:
        gameTranslation?.patch_notes_description ?? game.patch_notes_description,
    };
  });
}

export function getLocalizedGame(
  slug: string,
  locale: Locale
): LocalizedGame | undefined {
  const games = getLocalizedGames(locale);
  return games.find((game) => game.slug === slug);
}