export const GACHA_SELLS_URLS: Record<string, string> = {
  "genshin-impact": "https://gacha-sells.netlify.app/genshin-impact/",
  "honkai-star-rail": "https://gacha-sells.netlify.app/honkai-star-rail/",
  "wuthering-waves": "https://gacha-sells.netlify.app/wuthering-waves/",
  "zenless-zone-zero": "https://gacha-sells.netlify.app/zenless-zone-zero/",
} as const;

export function getGachaSellsUrl(game: string): string | undefined {
  return GACHA_SELLS_URLS[game];
}
