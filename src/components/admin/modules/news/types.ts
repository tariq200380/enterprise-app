export interface StoryItem {
  id: string;
  external_id?: string;
  provider: string;
  tag?: string;
  category?: string;
  brandBadge?: string;
  providerLabel?: string;
  providerColor?: string;
  date?: string;
  source?: string;
  sourceName?: string;
  title: string;
  desc?: string;
  summary?: string;
  link?: string;
  sourceUrl?: string;
  img?: string;
  image?: string;
}

export interface GalleryImage {
  filename: string;
  url: string;
  name: string;
}

export const PROVIDER_COLORS: Record<string, string> = {
  apple: "#0284C7",
  google: "#0052FF",
  nvidia: "#059669",
  anthropic: "#D97706",
  openai: "#7C3AED",
  meta: "#0081FB",
  microsoft: "#00A4EF",
  intel: "#0071C5",
  dawn: "#059669",
  brecorder: "#0284C7",
  propakistani: "#D97706",
  tribune: "#DC2626",
};
