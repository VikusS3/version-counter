/**
 * Eneba affiliate link (programa propio de Eneba, af_id=vikus).
 *
 * Nota sobre los sub-IDs (s1/s2): viajan como parámetros extra y son inocuos
 * si el panel de Eneba no los usa. Si tu panel soporta tracking por campaña,
 * sirven para saber qué placement convierte sin tocar el código.
 *
 * IMPORTANTE (términos Eneba): prohibido promocionar vía Google Ads / Google
 * Shopping y vía webs de códigos de descuento. Solo contenido orgánico propio.
 */
export const ENEBA_AFFILIATE_URL = "https://www.eneba.com/?af_id=vikus";

/** Slug de juegos → placement tracking (coincide con `game` de las páginas). */
export const ENEBA_GAME_PLACEMENTS = {
  "genshin-impact": "genshin",
  "honkai-star-rail": "hsr",
  "wuthering-waves": "wuwa",
  "zenless-zone-zero": "zzz",
  "neverness-to-everness": "nte",
  "arknights-endfield": "arknights-endfield",
} as const;

/**
 * Construye el link de afiliado etiquetado con el placement.
 * @param placement Identificador corto del sitio donde aparece el CTA
 * (ej. "popup", "footer", "prefooter", "game-genshin").
 */
export function enebaUrl(placement: string): string {
  const params = new URLSearchParams({
    s1: "gachacountdown",
    s2: placement,
  });
  return `${ENEBA_AFFILIATE_URL}&${params.toString()}`;
}

/** Link de Eneba etiquetado con el placement de una página de juego. */
export function enebaGameUrl(
  game: keyof typeof ENEBA_GAME_PLACEMENTS,
): { url: string; placement: string } {
  const slug = ENEBA_GAME_PLACEMENTS[game] ?? String(game);
  const placement = `game-${slug}`;
  return { url: enebaUrl(placement), placement };
}
