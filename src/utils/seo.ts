export type SeoLocale = "en" | "es";

export const SITE_NAME = "Gacha Countdown";
export const SITE_URL = "https://gachacountdown.online/";
export const DEFAULT_SITE_URL = SITE_URL;
export const DEFAULT_OG_IMAGE = "/og-image.webp";

const localeLabels: Record<SeoLocale, string> = {
  en: "Home",
  es: "Inicio",
};

const segmentLabels: Record<string, Record<SeoLocale, string>> = {
  about: { en: "About", es: "Sobre nosotros" },
  banners: { en: "Current Banners", es: "Banners actuales" },
  blog: { en: "Blog", es: "Blog" },
  contact: { en: "Contact", es: "Contacto" },
  games: { en: "Games", es: "Juegos" },
  guides: { en: "Guides", es: "Guías" },
  privacy: { en: "Privacy", es: "Privacidad" },
  releases: { en: "Upcoming Releases", es: "Próximos estrenos" },
  terms: { en: "Terms", es: "Términos" },
};

export interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface AlternateLinks {
  en: string;
  es: string;
  "x-default": string;
}

export function normalizePath(pathname: string): string {
  if (!pathname) return "/";

  const withoutQuery = pathname.split(/[?#]/, 1)[0] ?? "/";
  const withLeadingSlash = withoutQuery.startsWith("/")
    ? withoutQuery
    : `/${withoutQuery}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");

  if (collapsed === "/") return "/";

  const withoutIndex = collapsed.replace(/\/index(?:\.html)?$/, "");
  const normalized = withoutIndex === "" ? "/" : withoutIndex;

  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function normalizeAssetPath(path: string): string {
  if (!path) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(path)) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

export function getSiteUrl(site: URL | string | undefined): URL {
  if (site instanceof URL) return site;
  if (site) return new URL(site);
  return new URL(SITE_URL);
}

export function absoluteUrl(
  site: URL | string | undefined,
  pathOrUrl: string,
): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(normalizeAssetPath(pathOrUrl), getSiteUrl(site)).href;
}

export function getLocaleFromPath(pathname: string): SeoLocale {
  const segments = normalizePath(pathname).split("/").filter(Boolean);
  return segments[0] === "es" ? "es" : "en";
}

export function switchLocale(pathname: string, targetLocale: SeoLocale): string {
  const normalized = normalizePath(pathname);
  const withoutLocale =
    normalized === "/es/"
      ? "/"
      : normalized.replace(/^\/es(?=\/)/, "");

  if (targetLocale === "en") return normalizePath(withoutLocale);
  if (withoutLocale === "/") return "/es/";
  return normalizePath(`/es${withoutLocale}`);
}

export function buildAlternates(
  pathname: string,
  site: URL | string | undefined,
): AlternateLinks {
  const normalized = normalizePath(pathname);
  return {
    en: absoluteUrl(site, switchLocale(normalized, "en")),
    es: absoluteUrl(site, switchLocale(normalized, "es")),
    "x-default": absoluteUrl(site, switchLocale(normalized, "en")),
  };
}

export function resolveImage(
  site: URL | string | undefined,
  image: string | undefined,
): string {
  return absoluteUrl(site, normalizeAssetPath(image ?? DEFAULT_OG_IMAGE));
}

export function robotsContent(options?: {
  noindex?: boolean;
  nofollow?: boolean;
}): string {
  const directives = [
    options?.noindex ? "noindex" : "index",
    options?.nofollow ? "nofollow" : "follow",
    "max-image-preview:large",
    "max-snippet:-1",
  ];
  return directives.join(", ");
}

function humanizeSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildBreadcrumbs(
  pathname: string,
  locale: SeoLocale,
  site: URL | string | undefined,
): BreadcrumbItem[] {
  const segments = normalizePath(pathname).split("/").filter(Boolean);
  const homePath = locale === "es" ? "/es/" : "/";
  const items: BreadcrumbItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: localeLabels[locale],
      item: new URL(normalizePath(homePath), getSiteUrl(site)).href,
    },
  ];

  let currentPath = locale === "es" ? "/es" : "";

  for (const segment of segments) {
    if (segment === "es") continue;
    currentPath += `/${segment}`;
    if (segment !== "games") {
      items.push({
        "@type": "ListItem",
        position: items.length + 1,
        name: segmentLabels[segment]?.[locale] ?? humanizeSegment(segment),
        item: new URL(normalizePath(currentPath), getSiteUrl(site)).href,
      });
    }
  }

  return items;
}

export function toIsoDate(value: Date | string | undefined): string | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
