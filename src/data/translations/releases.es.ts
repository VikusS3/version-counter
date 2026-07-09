export interface ReleaseTranslation {
  nombre: string;
  descripcion: string;
}

export const releasesTranslations: Record<string, ReleaseTranslation> = {
  "neverness-to-everness": {
    nombre: "Neverness to Everness (NTE)",
    descripcion:
      "El RPG de mundo abierto urbano estará disponible en PC, PS5, iOS y Android. Se espera un lanzamiento simultáneo en todas las plataformas con soporte multiplataforma, precedido por un estreno en China el 23 de abril.",
  },
  "silver-palace": {
    nombre: "Silver Palace",
    descripcion:
      "¡Las inscripciones para la beta de Silver Palace ya están abiertas! Regístrate ahora y sé uno de los primeros en experimentar la emoción de este nuevo juego. Descubre un mundo lleno de aventuras, desafíos y recompensas exclusivas. No pierdas la oportunidad de formar parte de la comunidad de Silver Palace desde el principio.",
  },
};
