import React, { useState, useMemo } from "react";
import type { Guide } from "../../data/guides";

interface GuideFiltersProps {
  guides: Guide[];
  labels?: {
    all: string;
    noGuidesFound: string;
    loadMore: string;
  };
}

interface FilterBarProps {
  activeGame: string;
  activeLang: string;
  onGameChange: (game: string) => void;
  onLangChange: (lang: string) => void;
  allLabel: string;
}

const defaultLabels = {
  all: "All",
  noGuidesFound: "No guides found with the selected filters.",
  loadMore: "Load More Guides",
};

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
  allLabel,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-2" role="tablist" aria-label="Filter guides by game">
      <div className="flex gap-2 sm:gap-6 overflow-x-auto no-scrollbar -mb-px">
        {games.map((game) => {
          const isActive = activeGame === game.id;
          const style = gameStyles[game.id];
          if (game.id === "all") {
            return (
              <button
                key={game.id}
                role="tab"
                aria-selected={isActive}
                aria-label="Show all games"
                onClick={() => onGameChange(game.id)}
                className={`flex flex-col items-center gap-2 pb-3 pt-2 group relative border-b-2 transition-all min-w-[64px] cursor-pointer ${
                  isActive
                    ? "border-indigo-400 shadow-[0_4px_12px_-2px_rgba(99,102,241,0.5)]"
                    : "border-transparent hover:border-white/20"
                }`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center overflow-hidden border bg-white/[0.04] border-white/10 group-hover:border-white/20 transition-all">
                  <svg
                    className={`w-5 h-5 transition-colors ${isActive ? "text-indigo-300" : "text-slate-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
                  className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${isActive ? "text-indigo-300" : "text-slate-400"}`}
                >
                  {allLabel}
                </span>
              </button>
            );
          }
          return (
            <button
              key={game.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`Show ${game.label} guides`}
              onClick={() => onGameChange(game.id)}
              className="flex flex-col items-center gap-2 pb-3 pt-2 group relative border-b-2 transition-all min-w-[64px] cursor-pointer"
              style={{
                borderColor: isActive ? style.border : "transparent",
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center overflow-hidden border transition-all p-0.5"
                style={{
                  backgroundColor: isActive ? style.bg : "rgba(255,255,255,0.03)",
                  borderColor: isActive ? style.border : "rgba(255,255,255,0.1)",
                  boxShadow: isActive ? `0 0 12px ${style.border}40` : "none",
                }}
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={game.icon!}
                  alt=""
                />
              </div>
              <span
                className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider"
                style={{ color: isActive ? style.text : "#94a3b8" }}
              >
                {game.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 pb-3" role="tablist" aria-label="Filter by language">
        <div className="flex bg-[#090a16] border border-white/10 rounded-xl p-1 shadow-inner">
          {languages.map((lang) => (
            <button
              key={lang.id}
              role="tab"
              aria-selected={activeLang === lang.id}
              aria-label={`Show ${lang.label} language guides`}
              onClick={() => onLangChange(lang.id)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all min-h-[34px] cursor-pointer ${
                activeLang === lang.id
                  ? "bg-white/15 text-white shadow-[0_0_12px_rgba(255,255,255,0.2)] border border-white/20"
                  : "text-slate-400 hover:text-white"
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
      className="group block bg-[#0c0d18] rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 shadow-xl hover:shadow-2xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={guide.thumbnail}
          alt={guide.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d18] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        {guide.duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white font-mono text-[10px] font-bold rounded border border-white/15 backdrop-blur-sm">
            {guide.duration}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <span
            className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase rounded border"
            style={{ backgroundColor: gameStyle.bg, color: gameStyle.text, borderColor: `${gameStyle.border}40` }}
          >
            {guide.game}
          </span>
          <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase rounded bg-white/[0.06] text-slate-300 border border-white/10">
            {guide.language}
          </span>
        </div>
        <h3 className="font-display font-bold text-sm text-white group-hover:text-indigo-200 transition-colors line-clamp-2 mb-3">
          {guide.title}
        </h3>
        <div className="flex items-center gap-2">
          {guide.creator.avatar && (
            <img
              className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
              src={guide.creator.avatar}
              alt={guide.creator.name}
            />
          )}
          <span className="font-mono text-xs text-slate-400 font-medium">{guide.creator.name}</span>
        </div>
      </div>
    </a>
  );
};

export const GuideFilters: React.FC<GuideFiltersProps> = ({ guides, labels = defaultLabels }) => {
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
        allLabel={labels.all}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleGuides.length > 0 ? (
          visibleGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="font-mono text-sm text-slate-400">
              {labels.noGuidesFound}
            </p>
          </div>
        )}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 sm:px-8 py-3 min-h-[48px] bg-white/[0.05] hover:bg-white/[0.1] text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all border border-white/15 hover:border-indigo-400/40 shadow-lg cursor-pointer"
            aria-label={`${labels.loadMore} (${visibleGuides.length} of ${filteredGuides.length} shown)`}
          >
            {labels.loadMore}
          </button>
        </div>
      )}
    </div>
  );
};
