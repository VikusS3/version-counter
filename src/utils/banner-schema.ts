import type { GameBanners } from "../types/banners";

interface BannersJsonLdOptions {
  title: string;
  description: string;
  url: string;
  lang: "en" | "es";
  site: string | URL;
}

function toIsoDate(dateStr: string, context: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    console.error(`[banner-schema] Invalid date "${dateStr}" in ${context}`);
    return new Date(0).toISOString();
  }
  return date.toISOString();
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

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    mainEntity: bannersData.flatMap((game) =>
      game.banners.map((banner) => {
        const context = `${game.game}/${banner.id}`;
        const gameUrl = `${baseUrl}${localePrefix}${game.gamePagePath}`;

        return {
          "@type": "Event",
          name: banner.title,
          description: `${banner.title} - ${game.gameTitle} banner`,
          startDate: toIsoDate(banner.startDate, context),
          endDate: toIsoDate(banner.endDate, context),
          image: new URL(banner.image, site).href,
          url: `${url}#${game.game}`,
          eventStatus: getEventStatus(banner.startDate, banner.endDate),
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          location: {
            "@type": "VirtualLocation",
            url: gameUrl,
          },
          organizer: {
            "@type": "Organization",
            name: "Gacha Countdown",
            url: baseUrl,
          },
          performer: {
            "@type": "PerformingGroup",
            name: banner.title,
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${url}#${game.game}`,
          },
        };
      }),
    ),
  };
}
