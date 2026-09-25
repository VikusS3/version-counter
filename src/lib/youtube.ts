export function extractVideoId(url: string): string | null {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;

  const match = url.match(regExp);

  return match ? match[1] : null;
}

export function extractChannelHandle(authorUrl: string): string | null {
  const match = authorUrl.match(/youtube\.com\/@([^/]+)/);
  return match ? match[1] : null;
}

export async function fetchYoutubeMetadata(url: string) {
  const res = await fetch(
    `https://noembed.com/embed?url=${encodeURIComponent(url)}`,
  );

  const data = await res.json();

  return {
    title: data.title,
    channel: data.author_name,
    channelUrl: data.author_url,
    thumbnail: data.thumbnail_url,
  };
}

export function getChannelAvatar(handle: string) {
  return `https://unavatar.io/youtube/${handle}`;
}

export async function getVideoDuration(videoId: string) {
  const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`);

  const html = await res.text();

  const match = html.match(/"lengthSeconds":"(\d+)"/);

  if (!match) return null;

  const seconds = parseInt(match[1]);

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export async function createGuideFromYoutube(
  url: string,
  game: "genshin" | "wuwa" | "zzz" | "hsr",
  language: "EN" | "ES",
) {
  const videoId = extractVideoId(url);

  if (!videoId) throw new Error("Invalid YouTube URL");

  let meta: Awaited<ReturnType<typeof fetchYoutubeMetadata>> | null = null;
  try {
    meta = await fetchYoutubeMetadata(url);
  } catch (error) {
    console.warn(`[youtube] Metadata unavailable for ${videoId}`, error);
    meta = null;
  }

  let duration: string | null = null;
  try {
    duration = await getVideoDuration(videoId);
  } catch (error) {
    console.warn(`[youtube] Duration unavailable for ${videoId}`, error);
    duration = null;
  }

  const handle = meta?.channelUrl ? extractChannelHandle(meta.channelUrl) : null;

  return {
    id: videoId,
    title: meta?.title ?? `YouTube ${game.toUpperCase()} guide`,
    youtubeUrl: url,
    thumbnail: meta?.thumbnail ?? "/og-image.webp",
    duration,
    game,
    language,
    creator: {
      name: meta?.channel ?? "YouTube creator",
      avatar: handle ? getChannelAvatar(handle) : "/logo.webp",
    },
  };
}
