export const en = {
  nav: {
    dashboard: "Dashboard",
    currentBanners: "Current Banners",
    patchNotes: "Patch Notes",
    characterGuides: "Character Guides",
    pullTracker: "Pull Tracker",
    releases: "Upcoming Releases",
  },
  home: {
    title: "Gacha Countdown - Track Game Updates",
    subtitle:
      "Track version countdowns, banners, and patch releases for Genshin Impact, Honkai Star Rail, Wuthering Waves, Zenless Zone Zero, and more gacha games.",
    heroTitle: "Update Dashboard",
  },
  releases: {
    title: "Upcoming Releases - Track Launch Dates",
    subtitle:
      "Track upcoming game releases, launch dates, and countdowns for gacha games.",
    heroTitle: "Upcoming Releases",
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
  release: {
    releaseDate: "Release Date",
    daysUntilRelease: "Days Until Release",
    released: "Released",
    comingSoon: "Coming Soon",
    countDownToRelease: "Countdown to Release",
    registrationsOpen: "Registrations Open",
    registerNow: "Register Now",
  },
  gameCard: {
    current: "Current",
    upcoming: "Upcoming",
  },
  releaseCard: {
    releaseDate: "Release Date",
    daysUntil: "Days Until",
  },
  gamePage: {
    countdownToVersion: "Countdown to Version",
    viewPatchNotes: "View Patch Notes",
    currentVersion: "Current Version",
    nextVersion: "Next Version",
    remindMe: "Remind Me",
    toastSuccess: "Link copied! Share it to never miss an update",
    toastError: "Failed to copy link",
  },
  event: {
    limited: "Limited Event",
    name: "Fate's Collab Part 2",
    startsIn: "Event starts in",
    liveNow: "Live Now!",
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
  banner: {
    title: "Current Banners & Warps - Gacha Game Banner Schedule",
    subtitle:
      "Track active and upcoming character event warps, weapon banners, and limited-time banners for Wuthering Waves, Genshin Impact, Honkai Star Rail, Zenless Zone Zero, and more gacha games.",
    liveBanners: "LIVE BANNERS",
    active: "Active",
    upcoming: "Upcoming",
    ended: "Ended",
    characterBanner: "Character",
    weaponBanner: "Weapon",
    featuredBanner: "Featured",
    banner: "Banner",
    banners: "Banners",
    noBanners: "No active banners at the moment. Check back soon!",
    viewBanners: "View Current Banners",
    bannerAlert: "Active Banners Available",
    bannerAlertDesc: "Check out current warps and limited-time banners",
    viewNow: "View Now",
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
    contact: "Contact",
  },
  contact: {
    title: "Contact",
    subtitle:
      "Have questions, suggestions, or found a bug? We'd love to hear from you.",
    github: "View on GitHub",
    description:
      "This is an open source project. You can report issues, contribute code, or simply explore the project on GitHub.",
    bugReport: "Found a bug?",
    featureRequest: "Have a suggestion?",
    contribute: "Want to contribute?",
    footerText: "Your feedback helps make this project better for everyone!",
  },
  meta: {
    description:
      "Track gacha game banners, version countdowns, and patch releases for Genshin Impact, Honkai Star Rail, Wuthering Waves, Zenless Zone Zero, Arknights Endfield, and Neverness to Everness.",
    keywords:
      "gacha banners, game version countdown, game update tracker, genshin impact banners, honkai star rail warps, wuthering waves banners, zenless zone zero banners, gacha game updates",
  },
  common: {
    ver: "VER",
    viewAll: "View All",
  },
  noGames: {
    title: "All Caught Up!",
    description:
      "No upcoming game versions at the moment. Check back soon for new updates.",
    waiting: "Waiting for updates",
  },
  gameFilter: {
    filterTitle: "Filter Games",
    showAll: "Show All",
    hideAll: "Hide All",
    gameVisibility: "Toggle game visibility",
    gameHidden: "Hidden",
    gameVisible: "Visible",
    allHidden: "No games visible. Click the icons above to show games.",
  },
} as const;

export type TranslationKeys = typeof en;
