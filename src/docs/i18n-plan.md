# Internacionalización (i18n) para Version Counter

Implementar soporte multi-idioma en la aplicación Astro, comenzando con **Español (es)** como segundo idioma (el inglés ya es el idioma principal). La arquitectura debe ser escalable para agregar más idiomas en el futuro.

## User Review Required

> [!IMPORTANT]
> **Estrategia de URLs**: Se propone que el inglés (idioma por defecto) **no tenga prefijo** en la URL (`/`, `/games/genshin`, etc.) y los demás idiomas sí lo tengan (`/es/`, `/es/games/genshin`, etc.). Esto preserva todas las URLs actuales y el SEO existente. ¿Estás de acuerdo con esta estrategia?

> [!IMPORTANT]
> **Datos del JSON (`games.json`)**: El JSON contiene campos como `nombre`, `descripcion`, `slogan_name`, `slogan_desc`, `patch_notes_description` que actualmente están en inglés. Se propone **no duplicar el JSON**, sino crear archivos de traducción separados por idioma que sobreescriban solo los campos traducibles. Así el JSON sigue siendo la fuente de verdad para datos técnicos (fechas, versiones, URLs), y las traducciones viven en los archivos de i18n.

> [!WARNING]
> **Páginas de Privacy y Terms**: Estas páginas tienen contenido largo en prosa. Se pueden traducir de dos formas: (A) duplicar las páginas Astro en `src/pages/es/` con contenido en español, o (B) usar archivos de traducción con claves para cada párrafo. Se recomienda la opción **(A)** por simplicidad y porque el contenido legal rara vez se actualiza.

---

## Arquitectura Propuesta

### Enfoque: Astro Built-in i18n + Utilidad de Traducciones Tipada

Se usará el sistema de routing i18n nativo de Astro 5 combinado con un sistema de traducciones propio (sin dependencias externas), siguiendo el patrón recomendado por la documentación oficial.

```
Flujo:
URL → Astro i18n routing → Detecta locale → getTranslations(locale) → Renderiza con textos correctos
```

### Estructura de Archivos (Nuevo/Modificado)

```
src/
├── i18n/
│   ├── config.ts              ← [NEW] Configuración central (locales, defaultLocale)
│   ├── utils.ts               ← [NEW] Funciones helper (getTranslations, getLangFromUrl, etc.)
│   └── ui/
│       ├── en.ts              ← [NEW] Traducciones UI en inglés
│       └── es.ts              ← [NEW] Traducciones UI en español
├── data/
│   ├── games.json             ← [SIN CAMBIOS] Datos técnicos
│   └── translations/
│       ├── games.en.ts        ← [NEW] Textos de juegos en inglés
│       └── games.es.ts        ← [NEW] Textos de juegos en español
├── pages/
│   ├── index.astro            ← [MODIFY] Usa traducciones
│   ├── privacy.astro          ← [SIN CAMBIOS]
│   ├── terms.astro            ← [SIN CAMBIOS]
│   ├── games/
│   │   ├── genshin.astro      ← [MODIFY] Usa traducciones
│   │   ├── hsr.astro          ← [MODIFY]
│   │   ├── wuwa.astro         ← [MODIFY]
│   │   └── zzz.astro          ← [MODIFY]
│   ├── patch/
│   │   └── index.astro        ← [MODIFY]
│   ├── guides/
│   │   └── index.astro        ← [MODIFY]
│   └── es/                    ← [NEW] Páginas duplicadas en español
│       ├── index.astro
│       ├── privacy.astro
│       ├── terms.astro
│       ├── games/
│       │   ├── genshin.astro
│       │   ├── hsr.astro
│       │   ├── wuwa.astro
│       │   └── zzz.astro
│       ├── patch/
│       │   └── index.astro
│       └── guides/
│           └── index.astro
```

> [!TIP]
> Las páginas en `src/pages/es/` serán **wrappers delgados** que importan los mismos componentes pero con el locale `"es"`. No duplican lógica ni estilos, solo pasan el idioma como prop.

---

## Proposed Changes

### 1. Configuración de Astro i18n

#### [MODIFY] [astro.config.mjs](file:///e:/Saul/Mis-Projectos/version-counter/astro.config.mjs)

Agregar la configuración `i18n` nativa de Astro:

```diff
 export default defineConfig({
   vite: {
     plugins: [tailwindcss()],
   },
   site: "https://version-counter.netlify.app",
   integrations: [react(), sitemap()],
+  i18n: {
+    defaultLocale: "en",
+    locales: ["en", "es"],
+    routing: {
+      prefixDefaultLocale: false,
+    },
+  },
 });
```

---

### 2. Sistema de Traducciones

#### [NEW] [config.ts](file:///e:/Saul/Mis-Projectos/version-counter/src/i18n/config.ts)

Configuración central de idiomas disponibles y locale por defecto. Exporta tipos TypeScript para seguridad de tipos.

```typescript
export const defaultLocale = "en" as const;
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
```

#### [NEW] [en.ts](file:///e:/Saul/Mis-Projectos/version-counter/src/i18n/ui/en.ts)

Diccionario completo en inglés. Todas las cadenas de UI de la app organizadas por sección:

| Sección | Claves ejemplo |
|---------|----------------|
| `nav.*` | Dashboard, Patch Notes, Character Guides |
| `home.*` | Update Dashboard, subtítulo |
| `counter.*` | Days, Hours, Mins, Secs, Versión finalizada |
| `gameCard.*` | Current, Upcoming |
| `gamePage.*` | Countdown to Version, View Pre-Patch Notes, Remind Me |
| `stats.*` | Average Patch Duration, Total Active Timers, etc. |
| `patch.*` | LIVE UPDATES, THE DATABASE, Official Patch Notes |
| `guides.*` | Character Guides, No guides found, Load More |
| `footer.*` | Copyright, Privacy, Terms |
| `meta.*` | Títulos y descripciones SEO |

#### [NEW] [es.ts](file:///e:/Saul/Mis-Projectos/version-counter/src/i18n/ui/es.ts)

Diccionario idéntico en español. Mismas claves, valores traducidos.

#### [NEW] [utils.ts](file:///e:/Saul/Mis-Projectos/version-counter/src/i18n/utils.ts)

Funciones helper:

```typescript
// Obtiene el locale de la URL actual
export function getLangFromUrl(url: URL): Locale;

// Retorna la función t() tipada para un locale
export function useTranslations(lang: Locale): (key: TranslationKey) => string;

// Genera URL equivalente en otro idioma (para el language switcher)
export function getLocalizedUrl(url: URL, targetLocale: Locale): string;
```

---

### 3. Traducciones de Datos de Juegos

#### [NEW] [games.en.ts](file:///e:/Saul/Mis-Projectos/version-counter/src/data/translations/games.en.ts)
#### [NEW] [games.es.ts](file:///e:/Saul/Mis-Projectos/version-counter/src/data/translations/games.es.ts)

Archivos que exportan un `Record<string, GameTranslation>` indexado por slug. Contienen **solo** los campos traducibles:

```typescript
interface GameTranslation {
  nombre: string;             // "Genshin Impact New Version Countdown"
  descripcion: string;        // para SEO
  slogan_desc: string;        // p.ej "Varka finalmente está aquí"
  patch_notes_description: string;
}
```

Campos como `version_actual`, `fecha_inicio`, `duracion_dias`, `imagen`, `patch_notes`, `href` **no se traducen** y se siguen leyendo de `games.json`.

#### [NEW] [getGameData.ts](file:///e:/Saul/Mis-Projectos/version-counter/src/data/translations/getGameData.ts)

Función helper que fusiona `games.json` + traducciones del locale activo:

```typescript
export function getLocalizedGames(locale: Locale): LocalizedGame[];
export function getLocalizedGame(slug: string, locale: Locale): LocalizedGame | undefined;
```

---

### 4. Componentes Modificados

#### [MODIFY] [Layout.astro](file:///e:/Saul/Mis-Projectos/version-counter/src/layouts/Layout.astro)

- Leer el locale actual con `getLangFromUrl(Astro.url)`
- Pasar `lang` correcto al `<html>` tag
- Ajustar `og:locale` según idioma (`en_US` / `es_ES`)
- Agregar tags `<link rel="alternate" hreflang="...">` para SEO multi-idioma
- Pasar `locale` al Header y Footer

#### [MODIFY] [Header.astro](file:///e:/Saul/Mis-Projectos/version-counter/src/components/Header.astro)

- Usar `useTranslations(locale)` para textos de navegación
- Agregar **language switcher** (botón/dropdown) que permite cambiar entre EN/ES usando `getLocalizedUrl()`
- Ajustar `href` de los links de navegación para incluir el prefijo de locale

#### [MODIFY] [Footer.astro](file:///e:/Saul/Mis-Projectos/version-counter/src/components/Footer.astro)

- Usar traducciones para "Privacy", "Terms", copyright
- Habilitar el ícono de idioma que ya está comentado en el código actual

#### [MODIFY] [GameCard.astro](file:///e:/Saul/Mis-Projectos/version-counter/src/components/GameCard.astro)

- Traducir "Current:" y "Upcoming:" vía `t()`
- Recibir `locale` como prop para pasar labels al Counter

#### [MODIFY] [Counter.tsx](file:///e:/Saul/Mis-Projectos/version-counter/src/components/react/Counter.tsx)

- Recibir un nuevo prop `labels` con las traducciones de "Days", "Hours", etc.
- **No importar** el sistema i18n directamente (es un componente React client-side); recibe traducciones vía props desde Astro

```typescript
interface CounterProps {
  // ... props existentes
  labels?: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    finished: string;
  };
}
```

#### [MODIFY] [StatsSections.astro](file:///e:/Saul/Mis-Projectos/version-counter/src/components/StatsSections.astro)

- Traducir todos los labels estáticos: "Average Patch Duration", "Total Active Timers", etc.

#### [MODIFY] [PatchCard.astro](file:///e:/Saul/Mis-Projectos/version-counter/src/components/patchComponents/PatchCard.astro)

- Traducir "Official Patch Notes", "VER"

#### [MODIFY] [GuideFilters.tsx](file:///e:/Saul/Mis-Projectos/version-counter/src/components/react/GuideFilters.tsx)

- Recibir labels traducidos como props: "All", "No guides found...", "Load More Guides"

---

### 5. Páginas Españolas (wrappers)

#### [NEW] `src/pages/es/index.astro` (y todas las demás en `/es/`)

Cada página en español será un wrapper delgado. Ejemplo para `index.astro`:

```astro
---
// src/pages/es/index.astro
import StatsSection from "../../components/StatsSections.astro";
import Layout from "../../layouts/Layout.astro";
import GameCard from "../../components/GameCard.astro";
import { getLocalizedGames } from "../../data/translations/getGameData";
import { useTranslations } from "../../i18n/utils";

const t = useTranslations("es");
const games = getLocalizedGames("es");
---
<Layout title={t("home.title")} description={t("home.description")} lang="es">
  <!-- mismo markup que index.astro pero usando t() -->
</Layout>
```

> [!NOTE]
> Para evitar duplicación de markup, se puede extraer el contenido de cada página a un **componente de contenido reutilizable** (ej: `HomeContent.astro`) que reciba `locale` como prop. Las páginas `index.astro` y `es/index.astro` solo importan el componente con distinto locale. Este refactor se aplicará a las páginas que tengan markup complejo.

---

### 6. Resumen de Archivos

| Acción | Archivo | Motivo |
|--------|---------|--------|
| **NEW** | `src/i18n/config.ts` | Configuración de locales |
| **NEW** | `src/i18n/utils.ts` | Helpers de traducción |
| **NEW** | `src/i18n/ui/en.ts` | Diccionario inglés |
| **NEW** | `src/i18n/ui/es.ts` | Diccionario español |
| **NEW** | `src/data/translations/games.en.ts` | Textos de juegos EN |
| **NEW** | `src/data/translations/games.es.ts` | Textos de juegos ES |
| **NEW** | `src/data/translations/getGameData.ts` | Merge JSON + traducciones |
| **NEW** | `src/pages/es/**` (~10 archivos) | Páginas en español |
| **MODIFY** | `astro.config.mjs` | Config i18n |
| **MODIFY** | `Layout.astro` | hreflang, og:locale, lang |
| **MODIFY** | `Header.astro` | Nav traducido + language switcher |
| **MODIFY** | `Footer.astro` | Textos traducidos |
| **MODIFY** | `GameCard.astro` | Labels traducidos |
| **MODIFY** | `Counter.tsx` | Props para labels |
| **MODIFY** | `StatsSections.astro` | Labels traducidos |
| **MODIFY** | `PatchCard.astro` | Labels traducidos |
| **MODIFY** | `GuideFilters.tsx` | Props para labels |
| **MODIFY** | Páginas EN existentes | Usar `t()` en lugar de strings hardcoded |

---

## Open Questions

> [!IMPORTANT]
> 1. **¿Quieres que el Language Switcher esté en el Header o en el Footer?** Actualmente el Footer tiene un ícono de idioma comentado. Se puede colocar en ambos o solo en uno.

> [!IMPORTANT]
> 2. **¿Los nombres de los juegos se traducen?** Por ejemplo, "Genshin Impact" siempre es "Genshin Impact", pero campos como `slogan_desc` ("Varka is finally here") sí se traducirían a español. ¿Confirmas?

> [!IMPORTANT]
> 3. **¿Deseas agregar algún tercer idioma de inmediato?** (Portugués, Japonés, etc.) La arquitectura lo soportará de cualquier forma, pero si lo sabes ahora podemos preparar los archivos.

---

## Verification Plan

### Automated Tests
```bash
pnpm build   # Verificar que se generan páginas tanto en / como en /es/
pnpm preview  # Verificar navegación entre idiomas
```

### Manual Verification
- Verificar en el navegador que:
  - `/` muestra la app en inglés
  - `/es/` muestra la app en español
  - El language switcher funciona correctamente
  - Todas las URLs de juegos en español generan correctamente (`/es/games/genshin`, etc.)
  - Los meta tags tienen `hreflang` alternates correctos
  - Las view transitions de Astro siguen funcionando al cambiar de idioma
  - El componente Counter muestra labels en el idioma correcto
  - Los datos del JSON (versiones, fechas) no se ven afectados por el cambio de idioma
