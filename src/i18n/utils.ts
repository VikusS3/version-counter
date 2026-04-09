import { defaultLocale, locales, type Locale } from "./config";
import { en } from "./ui/en";
import { es } from "./ui/es";

const translations = {
  en,
  es,
} as const;

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang && locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return defaultLocale;
}

export function useTranslations(lang: Locale) {
  return translations[lang] as typeof en;
}

export function getLocalizedUrl(url: URL, targetLocale: Locale): string {
  const currentLang = getLangFromUrl(url);
  const pathSegments = url.pathname.split("/").filter(Boolean);

  if (currentLang === defaultLocale) {
    pathSegments.unshift(targetLocale);
  } else if (targetLocale === defaultLocale) {
    pathSegments.shift();
  } else {
    pathSegments[0] = targetLocale;
  }

  const newPath = pathSegments.length > 0 ? `/${pathSegments.join("/")}/` : "/";
  return newPath + url.search;
}

export function replaceParams(text: string, params: Record<string, string | number>): string {
  let result = text;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`{${key}}`, String(value));
  }
  return result;
}

export { defaultLocale, locales };
export type { Locale };