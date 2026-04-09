import React, { useState, useMemo } from "react";
import type { Guide } from "../../data/guides";

interface GuideFiltersProps {
  guides: Guide[];
}

interface FilterBarProps {
  activeGame: string;
  activeLang: string;
  onGameChange: (game: string) => void;
  onLangChange: (lang: string) => void;
}

const games = [
  { id: "all", label: "All", icon: null },
  { id: "genshin", label: "Genshin", icon: "/genshin-icon.webp" },
  { id: "wuwa", label: "WuWa", icon: "/wuwa-icon.webp" },
  { id: "zzz", label: "ZZZ", icon: "/zenless-icon.webp" },
  { id: "hsr", label: "HSR", icon: "/honkai-icon.webp" },
];

const languages = [
  { id: "all", label: "All" },
  { id: "EN", label: "EN" },
  { id: "ES", label: "ES" },
];

const gameStyles: Record<string, { border: string; bg: string; text: string }> =
  {
    genshin: {
      border: "#4ade80",
      bg: "rgba(74, 222, 128, 0.2)",
      text: "#4ade80",
    },
    wuwa: { border: "#22d3ee", bg: "rgba(34, 211, 238, 0.2)", text: "#22d3ee" },
    zzz: { border: "#facc15", bg: "rgba(250, 204, 21, 0.2)", text: "#facc15" },
    hsr: { border: "#a855f7", bg: "rgba(168, 85, 247, 0.2)", text: "#a855f7" },
  };

const FilterBar: React.FC<FilterBarProps> = ({
  activeGame,
  activeLang,
  onGameChange,
  onLangChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-primary/20">
      <div className="flex gap-2 sm:gap-8 overflow-x-auto no-scrollbar">
        {games.map((game) => {
          const isActive = activeGame === game.id;
          const style = gameStyles[game.id];
          if (game.id === "all") {
            return (
              <button
                key={game.id}
                onClick={() => onGameChange(game.id)}
                className={`flex flex-col items-center gap-2 pb-3 pt-2 group relative border-b-2 transition-all ${
                  isActive
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                }`}
              >
                <div className="size-12 rounded-xl flex items-center justify-center overflow-hidden border bg-slate-100 dark:bg-primary/10 border-slate-200 dark:border-primary/20">
                  <svg
                    className="w-6 h-6 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-primary" : "text-slate-500"}`}
                >
                  {game.label}
                </span>
              </button>
            );
          }
          return (
            <button
              key={game.id}
              onClick={() => onGameChange(game.id)}
              className="flex flex-col items-center gap-2 pb-3 pt-2 group relative border-b-2 transition-all"
              style={{
                borderColor: isActive ? style.border : "transparent",
              }}
            >
              <div
                className="size-12 rounded-xl flex items-center justify-center overflow-hidden border"
                style={{
                  backgroundColor: isActive ? style.bg : "",
                  borderColor: isActive ? style.border : undefined,
                }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={game.icon!}
                  alt={game.label}
                />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: isActive ? style.text : "#64748b" }}
              >
                {game.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 pb-3">
        <div className="flex bg-slate-100 dark:bg-primary/10 rounded-lg p-1">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => onLangChange(lang.id)}
              className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${
                activeLang === lang.id
                  ? "bg-white dark:bg-primary shadow-sm"
                  : "text-slate-500 hover:text-primary"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GuideCard: React.FC<{ guide: Guide }> = ({ guide }) => {
  const gameStyle = gameStyles[guide.game];

  return (
    <a
      href={guide.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-slate-900/50 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          src={guide.thumbnail}
          alt={guide.title}
        />
        {guide.duration && (
          <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
            {guide.duration}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-2 py-0.5 text-xs font-bold uppercase rounded"
            style={{ backgroundColor: gameStyle.bg, color: gameStyle.text }}
          >
            {guide.game}
          </span>
          <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-slate-700 text-slate-300">
            {guide.language}
          </span>
        </div>
        <h3 className="font-bold text-sm line-clamp-2 mb-2">{guide.title}</h3>
        <div className="flex items-center gap-2">
          {guide.creator.avatar && (
            <img
              className="w-6 h-6 rounded-full object-cover"
              src={guide.creator.avatar}
              alt={guide.creator.name}
            />
          )}
          <span className="text-xs text-slate-500">{guide.creator.name}</span>
        </div>
      </div>
    </a>
  );
};

export const GuideFilters: React.FC<GuideFiltersProps> = ({ guides }) => {
  const [activeGame, setActiveGame] = useState("all");
  const [activeLang, setActiveLang] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesGame = activeGame === "all" || guide.game === activeGame;
      const matchesLang = activeLang === "all" || guide.language === activeLang;
      return matchesGame && matchesLang;
    });
  }, [guides, activeGame, activeLang]);

  const visibleGuides = useMemo(() => {
    return filteredGuides.slice(0, visibleCount);
  }, [filteredGuides, visibleCount]);

  const hasMore = visibleCount < filteredGuides.length;

  const handleGameChange = (game: string) => {
    setActiveGame(game);
    setVisibleCount(8);
  };

  const handleLangChange = (lang: string) => {
    setActiveLang(lang);
    setVisibleCount(8);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        activeGame={activeGame}
        activeLang={activeLang}
        onGameChange={handleGameChange}
        onLangChange={handleLangChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleGuides.length > 0 ? (
          visibleGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500">
              No guides found with the selected filters.
            </p>
          </div>
        )}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl transition-all"
          >
            Load More Guides
          </button>
        </div>
      )}
    </div>
  );
};
