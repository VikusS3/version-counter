import type { GameBanners } from "../types/banners";
import { toIsoDate } from "./seo";

interface BannersJsonLdOptions {
  title: string;
  description: string;
  url: string;
  lang: "en" | "es";
  site: string | URL;
}

function requireIsoDate(value: string, context: string): string {
  const result = toIsoDate(value);
  if (!result) {
    throw new Error(`[banner-schema] Invalid date "${value}" in ${context}`);
  }
  return result;
}

function getEventStatus(startDate: string, endDate: string): string {
  const now = Date.now();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return "https://schema.org/EventScheduled";
  }
  if (now > end) return "https://schema.org/EventEnded";
  return "https://schema.org/EventScheduled";
}

export function buildBannersJsonLd(
  bannersData: GameBanners[],
  { title, description, url, lang, site }: BannersJsonLdOptions,
): Record<string, unknown> {
  const baseUrl = new URL(site).origin;
  const localePrefix = lang === "es" ? "/es" : "";
  const pageUrl = url.endsWith("/") ? url : `${url}/`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    mainEntity: bannersData.flatMap((game) =>
      game.banners.map((banner) => {
        const context = `${game.game}/${banner.id}`;
        const gameUrl = `${baseUrl}${localePrefix}${game.gamePagePath}/`;
        const eventDescription =
          lang === "es"
            ? `${banner.title}: banner de ${game.gameTitle}`
            : `${banner.title} - ${game.gameTitle} banner`;

        return {
          "@type": "Event",
          name: banner.title,
          description: eventDescription,
          startDate: requireIsoDate(banner.startDate, context),
          endDate: requireIsoDate(banner.endDate, context),
          image: new URL(banner.image, site).href,
          url: `${pageUrl}#${game.game}`,
          eventStatus: getEventStatus(banner.startDate, banner.endDate),
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          location: {
            "@type": "VirtualLocation",
            url: gameUrl,
          },
        };
      }),
    ),
  };
}
