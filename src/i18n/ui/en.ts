export const en = {
  nav: {
    dashboard: "Dashboard",
    patchNotes: "Patch Notes",
    characterGuides: "Character Guides",
    pullTracker: "Pull Tracker",
  },
  home: {
    title: "Gacha Countdown - Track Game Updates",
    subtitle: "Track upcoming maintenance and patch releases for Hoyoverse and Kuro Games titles.",
    heroTitle: "Update Dashboard",
  },
  counter: {
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
    minutesFull: "Minutes",
    secondsFull: "Seconds",
    finished: "Version finished",
  },
  gameCard: {
    current: "Current",
    upcoming: "Upcoming",
  },
  gamePage: {
    countdownToVersion: "Countdown to Version",
    viewPatchNotes: "View Pre-Patch Notes",
    currentVersion: "Current Version",
    nextVersion: "Next Version",
    remindMe: "Remind Me",
  },
  stats: {
    title: "Update Statistics",
    averagePatchDuration: "Average Patch Duration",
    totalActiveTimers: "Total Active Timers",
    upcomingMaintenance: "Upcoming Maintenance",
    serverStatus: "Server Status",
    games: "Games",
    publishers: "Syncing across {count} publishers",
    allOperational: "All Operational",
  },
  patch: {
    title: "Patch Notes Database",
    subtitle: "Official patch notes from all gacha games",
    officialPatchNotes: "Official Patch Notes",
  },
  guides: {
    title: "Character Guides",
    subtitle: "Best guides for building your characters",
    noGuidesFound: "No guides found with the selected filters.",
    loadMore: "Load More Guides",
    all: "All",
    filterByGame: "Filter by game",
    filterByLanguage: "Filter by language",
  },
  footer: {
    copyright: "© {year} Gacha Countdown Project. Data provided as-is.",
    privacy: "Privacy",
    terms: "Terms",
    language: "Language",
  },
  meta: {
    description: "Track upcoming maintenance and patch releases for Genshin Impact, Honkai Star Rail, Wuthering Waves, and Zenless Zone Zero.",
    keywords: "game version countdown, game update tracker, genshin impact, honkai star rail, wuthering waves, zenless zone zero, gacha game updates",
  },
  common: {
    ver: "VER",
    viewAll: "View All",
  },
} as const;

export type TranslationKeys = typeof en;