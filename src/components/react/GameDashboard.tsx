import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { VisibilityState } from "./GameFilter";

interface GameItem {
  alias: string;
  icon: string;
  tema: string;
  href: string;
  nombre_oficial: string;
  version_actual: string;
  proxima_version: string;
  imagen: string;
  fecha_inicio: string;
  duracion_dias: number;
}

interface GameDashboardProps {
  games: GameItem[];
  labels: {
    filterTitle: string;
    showAll: string;
    hideAll: string;
    gameVisibility: string;
    gameHidden: string;
    gameVisible: string;
    allHidden: string;
    current: string;
    upcoming: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    finished: string;
  };
  storageKey?: string;
}

const DEFAULT_VISIBILITY: VisibilityState = {
  genshin: true,
  wuthering: true,
  honkai: true,
  zenless: true,
  nte: true,
  arknights: true,
};

const colorMap: Record<string, string> = {
  genshin: "var(--color-genshin)",
  wuthering: "var(--color-wuwa)",
  honkai: "var(--color-hsr)",
  zenless: "var(--color-zzz)",
  nte: "var(--color-nte)",
  arknights: "var(--color-arknights)",
};

function useTimer(fecha_inicio: string, duracion_dias: number) {
  const finMs = useRef(
    new Date(fecha_inicio).getTime() + duracion_dias * 24 * 60 * 60 * 1000,
  ).current;

  const [timeLeft, setTimeLeft] = useState(() => {
    const now = Date.now();
    const diff = finMs - now;
    if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0, finished: true };
    const totalSeg = Math.floor(diff / 1000);
    return {
      dias: Math.floor(totalSeg / (60 * 60 * 24)),
      horas: Math.floor((totalSeg % (60 * 60 * 24)) / (60 * 60)),
      minutos: Math.floor((totalSeg % (60 * 60)) / 60),
      segundos: totalSeg % 60,
      finished: false,
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      const diff = finMs - now;
      if (diff <= 0) {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0, finished: true });
        clearInterval(id);
        return;
      }
      const totalSeg = Math.floor(diff / 1000);
      setTimeLeft({
        dias: Math.floor(totalSeg / (60 * 60 * 24)),
        horas: Math.floor((totalSeg % (60 * 60 * 24)) / (60 * 60)),
        minutos: Math.floor((totalSeg % (60 * 60)) / 60),
        segundos: totalSeg % 60,
        finished: false,
      });
    }, 1000);

    return () => clearInterval(id);
  }, [finMs]);

  return timeLeft;
}

function GameCardComponent({ game, isVisible, labels }: {
  game: GameItem;
  isVisible: boolean;
  labels: GameDashboardProps["labels"];
}) {
  const accentColor = colorMap[game.alias] || "var(--color-genshin)";
  const timeLeft = useTimer(game.fecha_inicio, game.duracion_dias);

  if (!isVisible) return null;

  return (
    <a
      href={`games${game.href}`}
      className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 h-95 flex flex-col justify-end p-4 sm:p-8 transition-all duration-300"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10, 10, 12, 0.2) 0%, rgba(10, 10, 12, 0.95) 100%), url(${game.imagen})`,
        }}
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-4 sm:top-6 right-4 sm:right-6 glass-panel px-2.5 sm:px-3 py-1 rounded-full"
        style={{ border: `1px solid ${accentColor}` }}
      >
        <span
          className="text-[10px] sm:text-xs font-bold tracking-widest uppercase"
          style={{ color: game.tema }}
        >
          {labels.current}: v{game.version_actual}
        </span>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {game.nombre_oficial}
          </h3>
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
        </div>
        <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
          {labels.upcoming}:{" "}
          <span className="text-white font-medium">
            v{game.proxima_version}
          </span>
        </p>
        {!timeLeft.finished ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs">
            {[
              { value: timeLeft.dias, label: labels.days },
              { value: timeLeft.horas, label: labels.hours },
              { value: timeLeft.minutos, label: labels.minutes },
              { value: timeLeft.segundos, label: labels.seconds },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold countdown-font text-white leading-none">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-sm italic opacity-80 text-slate-400">
            {labels.finished}
          </span>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 transition-all w-0 group-hover:w-full"
        style={{ backgroundColor: accentColor }}
      />
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 h-95 flex flex-col justify-end p-4 sm:p-8">
      <div className="absolute inset-0 bg-slate-900" />
      <div className="relative z-10 animate-pulse">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 sm:h-8 w-40 sm:w-48 bg-slate-700 rounded" />
        </div>
        <div className="h-3 sm:h-4 w-20 sm:w-24 bg-slate-800 rounded mb-4 sm:mb-6" />
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-8 sm:h-10 w-10 sm:w-12 bg-slate-800 rounded" />
              <div className="h-2 w-6 sm:w-8 bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GameDashboard({
  games,
  labels,
  storageKey = "game-visibility",
}: GameDashboardProps) {
  const [visibility, setVisibility] =
    useState<VisibilityState>(DEFAULT_VISIBILITY);
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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
    if (!isLoaded) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(visibility));
      } catch {
        console.warn("Failed to save visibility preference");
      }
    }, 300);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [visibility, isLoaded, storageKey]);

  const toggleGame = useCallback((alias: string) => {
    setVisibility((prev) => ({ ...prev, [alias]: !prev[alias] }));
  }, []);

  const showAll = useCallback(() => {
    setVisibility(
      games.reduce(
        (acc, game) => ({ ...acc, [game.alias]: true }),
        {} as VisibilityState,
      ),
    );
  }, [games]);

  const hideAll = useCallback(() => {
    setVisibility(
      games.reduce(
        (acc, game) => ({ ...acc, [game.alias]: false }),
        {} as VisibilityState,
      ),
    );
  }, [games]);

  const visibleGames = useMemo(
    () => games.filter((g) => visibility[g.alias]),
    [games, visibility],
  );
  const allHidden = visibleGames.length === 0;

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <SkeletonCard key={game.alias} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-slate-200">
          {labels.filterTitle}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={showAll}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors min-h-[36px]"
            aria-label={labels.showAll}
          >
            {labels.showAll}
          </button>
          <button
            onClick={hideAll}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors min-h-[36px]"
            aria-label={labels.hideAll}
          >
            {labels.hideAll}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
        {games.map((game) => {
          const isVisible = visibility[game.alias];
          const accentColor = game.tema || "#4ade80";

          return (
            <button
              key={game.alias}
              onClick={() => toggleGame(game.alias)}
              className={`group relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer ${
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
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105 ${
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
                className={`text-[10px] sm:text-xs font-medium transition-colors ${
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
        <p className="text-center text-slate-500 text-sm mb-6">
          {labels.allHidden}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {visibleGames.map((game) => (
          <GameCardComponent
            key={game.alias}
            game={game}
            isVisible={visibility[game.alias]}
            labels={labels}
          />
        ))}
      </div>
    </div>
  );
}
