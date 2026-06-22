export type BannerType = "character" | "weapon" | "featured";
export type BannerStatus = "active" | "upcoming" | "ended";

export interface Banner {
  id: string;
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  type: BannerType;
  game: string;
  phase?: string;
}

export interface GameBanners {
  game: string;
  gameTitle: string;
  gameAlias: string;
  gameColor: string;
  icon: string;
  banners: Banner[];
}

export function getBannerStatus(banner: Banner): BannerStatus {
  const now = new Date();
  const start = new Date(banner.startDate);
  const end = new Date(banner.endDate);

  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "active";
}

export function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
