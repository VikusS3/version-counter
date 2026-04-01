# Agent Guidelines for version-counter

This document provides guidelines for agentic coding agents operating in this repository.

## Project Overview

- **Project Name**: version-counter
- **Type**: Astro web application (SSG with client-side interactivity)
- **Stack**: Astro 5.x, React 19, Tailwind CSS 4, TypeScript (strict)
- **Package Manager**: pnpm
- **Purpose**: Display version countdown timers for gacha games (Genshin Impact, Honkai Star Rail, Wuthering Waves, Zenless Zone Zero)

---

## Build & Development Commands

```bash
# Development
pnpm dev              # Start dev server (astro dev)
pnpm build            # Build for production
pnpm preview          # Preview production build

# Astro CLI
pnpm astro            # Run astro CLI commands
pnpm astro check      # Run Astro type checks
pnpm astro --help     # Show available commands
```

### Running a Single Test

**Note**: This project currently has **no test suite** implemented. Tests would require adding a testing framework (Vitest recommended for Astro/React projects).

To add testing in the future:
```bash
# Install Vitest
pnpm add -D vitest @testing-library/react @testing-library/astro

# Run tests
pnpm vitest run        # Run all tests once
pnpm vitest run src/components/react/Counter.test.tsx  # Single file
pnpm vitest            # Watch mode
```

---

## Code Style Guidelines

### Project Structure

```
src/
├── components/       # Astro components
│   ├── react/        # React components (.tsx)
│   ├── guides/       # Guide-related components
│   ├── patchComponents/
│   └── test-components/
├── pages/            # Astro pages (routing)
│   ├── games/        # Individual game pages
│   ├── guides/
│   └── patch/
├── layouts/          # Astro layouts
├── lib/              # Utility libraries (youtube.ts)
├── utils/            # Helper functions (change-version.ts)
├── constants/        # App constants
├── data/             # Static data (games.json, guides.ts)
├── styles/           # Global CSS
└── assets/           # Static assets (SVG, images)
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (Astro) | kebab-case | `GameCard.astro`, `game-filters.astro` |
| Files (TypeScript/React) | PascalCase | `Counter.tsx`, `GameCardTest.tsx` |
| Directories | kebab-case | `src/components/react`, `src/pages/games` |
| Components | PascalCase | `Counter`, `FullBlock` |
| Functions | camelCase | `extractVideoId`, `avanzarVersion` |
| Variables | camelCase | `fecha_inicio`, `duracion_dias` |
| Constants | UPPER_SNAKE or camelCase | `MANTENIMIENTO_DURACION_HORAS` |
| Props | camelCase | `variant`, `onFinalizado` |

### Import Organization

**Use absolute imports** with `~` alias (configured in tsconfig):
```typescript
// Good
import { Counter } from "~components/react/Counter";
import { extractVideoId } from "~lib/youtube";

// Avoid (unless external)
import { Counter } from "../components/react/Counter";
```

**Import order (recommended)**:
1. External libraries (React, Astro)
2. Internal absolute imports (~components, ~lib, ~utils)
3. Relative imports (only when necessary)

### TypeScript Guidelines

- Use **strict TypeScript** (`extends: "astro/tsconfigs/strict"`)
- Define interfaces explicitly for component props
- Use `type` for simple unions/types, `interface` for object shapes
- Avoid `any` - use `unknown` when type is truly unknown
- Add return types to utility functions

```typescript
// Good
interface CounterProps {
  fecha_inicio?: string | Date;
  duracion_dias?: number;
  variant?: "mini" | "full";
  onFinalizado?: () => void;
}

export const Counter: React.FC<CounterProps> = ({ ... }) => { ... };

// Avoid
interface Props { ... }  // Unclear naming
```

### Astro Component Style

- Use TypeScript in frontmatter (default in this project)
- Destructure props explicitly
- Define component props with `interface` or `type`

```astro
---
import { Counter } from "~components/react/Counter";

interface Props {
  title: string;
  current: string;
  upcoming: string;
  // ...
}

const { title, current, upcoming } = Astro.props;
---
```

### React Component Style

- Use functional components with arrow functions or `function` keyword
- Prefer `React.FC<Props>` for explicit typing
- Use early returns for conditional rendering
- Keep components focused and small

### CSS & Styling (Tailwind CSS 4)

- Use Tailwind utility classes primarily
- Custom CSS variables defined in `src/styles/global.css`
- Colors use theme variables: `--color-genshin`, `--color-hsr`, etc.
- Glass effect: `glass-panel` class
- Typography: `countdown-font` for numbers, `text-gold` for accents

### Error Handling

- Use try/catch for async operations
- Throw descriptive errors for invalid inputs
- Handle edge cases explicitly (null, undefined checks)

```typescript
// Good
export function extractVideoId(url: string): string | null {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// In async functions
try {
  const data = await fetchYoutubeMetadata(url);
  return data;
} catch (error) {
  console.error("Failed to fetch metadata:", error);
  return null;
}
```

### Best Practices

1. **Client-side hydration**: Use `client:load` or `client:visible` for interactive React components in Astro
2. **Accessibility**: Use semantic HTML, alt text for images, proper ARIA labels
3. **Performance**: Lazy load images, use optimized formats (WebP)
4. **SEO**: Use proper meta tags, sitemap configured in astro.config.mjs

---

## Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config (integrations: React, Sitemap, Tailwind) |
| `tsconfig.json` | TypeScript config (strict, JSX react-jsx) |
| `package.json` | Dependencies and scripts |
| `.vscode/` | VS Code settings (extensions, launch config) |

---

## Common Tasks

### Adding a New Game Page
1. Create page at `src/pages/games/[game].astro`
2. Add game data to `src/data/games.json`
3. Use existing components (GameCard, Counter)

### Adding a New Component
- Astro: `src/components/ComponentName.astro`
- React: `src/components/react/ComponentName.tsx`

### Modifying Game Data
Edit `src/data/games.json` - contains version info, dates, colors per game.