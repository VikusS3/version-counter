import { useState, useEffect, useCallback } from "react";

interface GameItem {
  alias: string;
  icon: string;
  tema: string;
  nombre_oficial: string;
  href: string;
}

interface GameFilterProps {
  games: GameItem[];
  labels: {
    filterTitle: string;
    showAll: string;
    hideAll: string;
    gameVisibility: string;
    gameHidden: string;
    gameVisible: string;
    allHidden: string;
  };
  storageKey?: string;
}

interface VisibilityState {
  [alias: string]: boolean;
}

const DEFAULT_VISIBILITY: VisibilityState = {
  genshin: true,
  wuthering: true,
  honkai: true,
  zenless: true,
  nte: true,
  arknights: true,
};

export function GameFilter({
  games,
  labels,
  storageKey = "game-visibility",
}: GameFilterProps) {
  const [visibility, setVisibility] = useState<VisibilityState>(DEFAULT_VISIBILITY);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as VisibilityState;
        const merged = { ...DEFAULT_VISIBILITY, ...parsed };
        setVisibility(merged);
      }
    } catch {
      console.warn("Failed to load visibility preference");
    }
    setIsLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(visibility));
      } catch {
        console.warn("Failed to save visibility preference");
      }
    }
  }, [visibility, isLoaded, storageKey]);

  const toggleGame = useCallback((alias: string) => {
    setVisibility((prev) => ({ ...prev, [alias]: !prev[alias] }));
  }, []);

  const showAll = useCallback(() => {
    setVisibility(
      games.reduce(
        (acc, game) => ({ ...acc, [game.alias]: true }),
        {} as VisibilityState
      )
    );
  }, [games]);

  const hideAll = useCallback(() => {
    setVisibility(
      games.reduce(
        (acc, game) => ({ ...acc, [game.alias]: false }),
        {} as VisibilityState
      )
    );
  }, [games]);

  const visibleGames = games.filter((g) => visibility[g.alias]);
  const allHidden = visibleGames.length === 0;

  const visibilityJSON = JSON.stringify(visibility);

  return (
    <div className="game-filter">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-200">{labels.filterTitle}</h2>
        <div className="flex gap-2">
          <button
            onClick={showAll}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            aria-label={labels.showAll}
          >
            {labels.showAll}
          </button>
          <button
            onClick={hideAll}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            aria-label={labels.hideAll}
          >
            {labels.hideAll}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {games.map((game) => {
          const isVisible = visibility[game.alias];
          const accentColor = game.tema || "#4ade80";

          return (
            <button
              key={game.alias}
              onClick={() => toggleGame(game.alias)}
              className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                isVisible
                  ? "bg-slate-800/80 hover:bg-slate-700/80"
                  : "bg-slate-900/50 opacity-40 hover:opacity-60"
              }`}
              style={{
                borderColor: isVisible ? accentColor : "transparent",
                borderWidth: "1px",
              }}
              aria-label={`${game.nombre_oficial}: ${
                isVisible ? labels.gameVisible : labels.gameHidden
              }`}
              aria-pressed={!isVisible}
            >
              <div
                className={`w-12 h-12 rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105 ${
                  !isVisible ? "grayscale opacity-50" : ""
                }`}
              >
                <img
                  src={game.icon}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  isVisible ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {game.nombre_oficial.length > 10
                  ? game.nombre_oficial.slice(0, 10) + "..."
                  : game.nombre_oficial}
              </span>
              <div
                className={`absolute top-1 right-1 w-2 h-2 rounded-full transition-all ${
                  isVisible ? "scale-100" : "scale-0"
                }`}
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      {allHidden && (
        <p className="text-center text-slate-500 text-sm mt-4">{labels.allHidden}</p>
      )}

      <input
        type="hidden"
        name="game-visibility"
        value={visibilityJSON}
        readOnly
      />
    </div>
  );
}

export type { GameFilterProps, VisibilityState };