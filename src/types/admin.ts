export interface Inquiry {
  id: number;
  client_name: string;
  service: string;
  company: string;
  phone?: string;
  email?: string;
  project_details?: string;
  need_nda?: boolean;
  created_at: string;
  status: string;
}

export interface Candidate {
  id: number;
  candidate_name: string;
  domain_specialty: string;
  email: string;
  portfolio_github: string;
  created_at: string;
  status: string;
}

export interface SpecItem {
  key: string;
  value: string;
}

export interface BuyButton {
  store: string;
  text: string;
  url: string;
  color: string;
}

export interface SubArticle {
  id: string;
  title: string;
  content: string;
}

export interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  status: string;
  description: string;
  tags: string[];
  created_at?: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  verified: boolean;
  created_at?: string;
}

export interface ArticleReview {
  id: number;
  reviewer_name: string;
  organization: string;
  article_title: string;
  rating: number;
  details: string;
  submitted_at: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  avatar?: string;
  review_title?: string;
  article_id?: number;
  helpful?: number;
  date?: string;
  name?: string;
  role?: string;
  comment?: string;
  title?: string;
}

export interface VideoItem {
  id: number;
  title: string;
  category: string;
  duration: string;
  embed_url: string;
  thumbnail_url?: string;
  views?: number;
  created_at?: string;
}

export interface SubscriberItem {
  id: number;
  email: string;
  source: string;
  status: string;
  created_at?: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  client: string;
  summary: string;
  stack: string[];
  live_url?: string;
  github_url?: string;
  image_url?: string;
  created_at?: string;
}

export interface ArticleItem {
  id: number;
  title: string;
  category: string;
  author: string;
  read_time: string;
  cover_photo_url?: string;
  video_embed_url?: string;
  audio_stream_url?: string;
  editor_note?: string;
  content?: string;
  pros?: any;
  cons?: any;
  specs?: any;
  buy_buttons?: any;
  sub_articles?: any;
  status?: "DRAFT" | "PUBLISHED" | string;
  source_news?: string;
  created_at?: string;
}

export interface TelemetryData {
  database: string;
  port: number;
  latencyMs: number;
  status: string;
  uptimeSeconds: number;
  memoryHeapUsedMB: number;
  counts: Record<string, number>;
}
