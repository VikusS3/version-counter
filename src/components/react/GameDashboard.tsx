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
    if (diff <= 0)
      return { dias: 0, horas: 0, minutos: 0, segundos: 0, finished: true };
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
    const id = window.setInterval(() => {
      const now = Date.now();
      const diff = finMs - now;
      if (diff <= 0) {
        setTimeLeft({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
          finished: true,
        });
        window.clearInterval(id);
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

    return () => window.clearInterval(id);
  }, [finMs]);

  return timeLeft;
}

function GameCardComponent({
  game,
  isVisible,
  labels,
}: {
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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d18] h-96 flex flex-col justify-end p-5 sm:p-7 transition-all duration-500 hover:shadow-2xl hover:border-white/20"
      style={{
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Background artwork with cinematic vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(7, 8, 15, 0.15) 0%, rgba(7, 8, 15, 0.6) 45%, rgba(7, 8, 15, 0.98) 100%), url(${game.imagen})`,
        }}
        aria-hidden="true"
      ></div>

      {/* Top HUD Version Pill */}
      <div
        className="absolute top-4 sm:top-5 right-4 sm:right-5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md transition-all group-hover:bg-black/80"
        style={{
          border: `1px solid ${accentColor}60`,
          boxShadow: `0 0 12px ${accentColor}25`,
        }}
      >
        <span
          className="font-mono text-[10px] sm:text-xs font-black tracking-wider uppercase"
          style={{ color: game.tema }}
        >
          {labels.current}: v{game.version_actual}
        </span>
      </div>

      {/* Card Content Overlay */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-1.5">
          <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-wide group-hover:text-slate-100 transition-colors">
            {game.nombre_oficial}
          </h3>
          <span
            className="size-2 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
          />
        </div>

        <p className="text-slate-400 text-xs sm:text-sm mb-4 font-medium flex items-center gap-2">
          <span>{labels.upcoming}:</span>
          <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded text-xs border border-white/10">
            v{game.proxima_version}
          </span>
        </p>

        {!timeLeft.finished ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-xs">
            {[
              { value: timeLeft.dias, label: labels.days, highlight: false },
              { value: timeLeft.horas, label: labels.hours, highlight: false },
              { value: timeLeft.minutos, label: labels.minutes, highlight: false },
              { value: timeLeft.segundos, label: labels.seconds, highlight: true },
            ].map(({ value, label, highlight }) => (
              <div
                key={label}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                  highlight
                    ? "bg-black/70 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                    : "bg-black/50 border-white/[0.08]"
                }`}
              >
                <span
                  className={`text-xl sm:text-2xl font-black countdown-font leading-none ${
                    highlight ? "text-indigo-300" : "text-white"
                  }`}
                >
                  {String(value).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-slate-400 mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs uppercase tracking-wider">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            {labels.finished}
          </div>
        )}
      </div>

      {/* Bottom glowing accent bar */}
      <div
        className="absolute bottom-0 left-0 h-1 transition-all duration-500 w-0 group-hover:w-full"
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 16px ${accentColor}`,
        }}
      />
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d18] h-96 flex flex-col justify-end p-5 sm:p-7">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="relative z-10 animate-pulse">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 sm:h-8 w-44 sm:w-52 bg-white/10 rounded-lg" />
        </div>
        <div className="h-4 w-24 bg-white/5 rounded mb-5" />
        <div className="grid grid-cols-4 gap-2 max-w-xs">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-white/5 rounded-lg border border-white/5" />
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
  const [filterOpen, setFilterOpen] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

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
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2.5 cursor-pointer text-left group"
          aria-expanded={filterOpen}
          aria-controls="filter-controls"
          type="button"
        >
          <div className="p-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 group-hover:scale-105 transition-transform">
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                filterOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
            </svg>
          </div>
          <h2 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">
            {labels.filterTitle}
          </h2>
        </button>
        <div className="flex gap-2">
          <button
            onClick={showAll}
            className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 hover:border-indigo-400/40 transition-all min-h-[36px] cursor-pointer"
            aria-label={labels.showAll}
          >
            {labels.showAll}
          </button>
          <button
            onClick={hideAll}
            className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 hover:border-indigo-400/40 transition-all min-h-[36px] cursor-pointer"
            aria-label={labels.hideAll}
          >
            {labels.hideAll}
          </button>
        </div>
      </div>

      <div
        id="filter-controls"
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          filterOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 p-3 rounded-2xl bg-[#090a16]/60 border border-white/[0.05]">
            {games.map((game) => {
              const isVisible = visibility[game.alias];
              const accentColor = game.tema || "#34d399";

              return (
                <button
                  key={game.alias}
                  onClick={() => toggleGame(game.alias)}
                  className={`group relative flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-xl transition-all duration-300 cursor-pointer min-w-[76px] sm:min-w-[88px] ${
                    isVisible
                      ? "bg-white/[0.06] shadow-lg"
                      : "bg-black/40 opacity-40 hover:opacity-70"
                  }`}
                  style={{
                    borderColor: isVisible ? `${accentColor}80` : "rgba(255,255,255,0.06)",
                    borderWidth: "1px",
                    boxShadow: isVisible ? `0 0 14px -4px ${accentColor}40` : "none",
                  }}
                  aria-label={`${game.nombre_oficial}: ${
                    isVisible ? labels.gameVisible : labels.gameHidden
                  }`}
                  aria-pressed={!isVisible}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-1 transition-transform duration-200 group-hover:scale-105 p-0.5 ${
                      !isVisible ? "grayscale opacity-50 ring-white/10" : "ring-white/20 bg-white/5"
                    }`}
                  >
                    <img
                      src={game.icon}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-mono font-bold tracking-tight transition-colors ${
                      isVisible ? "text-slate-200" : "text-slate-500"
                    }`}
                  >
                    {game.nombre_oficial.length > 10
                      ? game.nombre_oficial.slice(0, 10) + "..."
                      : game.nombre_oficial}
                  </span>
                  <div
                    className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full transition-all ${
                      isVisible ? "scale-100" : "scale-0"
                    }`}
                    style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
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
