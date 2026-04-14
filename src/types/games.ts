export interface Game {
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

export interface GamesData {
  games: Game[];
}

export type GameAlias = "genshin" | "wuthering" | "honkai" | "zenless";

export const GAME_ALIASES: Record<string, GameAlias> = {
  genshin: "genshin",
  "wuthering-waves": "wuthering",
  "honkai-star-rail": "honkai",
  "zenless-zone-zero": "zenless",
} as const;

export const GAME_COLORS: Record<GameAlias, string> = {
  genshin: "#4ade80",
  wuthering: "#22d3ee",
  honkai: "#a855f7",
  zenless: "#facc15",
} as const;