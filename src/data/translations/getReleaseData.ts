import releasesData from "../releases.json";
import { type Locale } from "../../i18n/config";
import { releasesTranslations as releasesEn } from "./releases.en";
import { releasesTranslations as releasesEs } from "./releases.es";

const translationsMap = {
  en: releasesEn,
  es: releasesEs,
};

export interface LocalizedRelease {
  slug: string;
  nombre: string;
  nombre_oficial: string;
  descripcion: string;
  fecha_salida: string;
  alias: string;
  imagen: string;
  href: string;
  icon: string;
  tema: string;
  url?: string;
}

export function getLocalizedReleases(locale: Locale): LocalizedRelease[] {
  const translations = translationsMap[locale];

  return releasesData.releases.map((release) => {
    const releaseTranslation = translations[release.slug];
    return {
      ...release,
      nombre: releaseTranslation?.nombre ?? release.nombre_oficial,
      descripcion: releaseTranslation?.descripcion ?? release.descripcion,
    };
  });
}

export function getLocalizedRelease(
  slug: string,
  locale: Locale
): LocalizedRelease | undefined {
  const releases = getLocalizedReleases(locale);
  return releases.find((release) => release.slug === slug);
}