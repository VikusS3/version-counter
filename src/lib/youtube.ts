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

  const meta = await fetchYoutubeMetadata(url);

  const duration = await getVideoDuration(videoId);

  const handle = extractChannelHandle(meta.channelUrl);

  return {
    id: crypto.randomUUID(),
    title: meta.title,
    youtubeUrl: url,
    thumbnail: meta.thumbnail,
    duration,
    game,
    language,
    creator: {
      name: meta.channel,
      avatar: handle ? getChannelAvatar(handle) : "/default-avatar.webp",
    },
  };
}
