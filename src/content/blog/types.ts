export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "cta"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  keywords: string[];
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  relatedSlugs?: string[];
  source?: string;
  image?: string;
  imageAlt?: string;
  externalUrl?: string;
  blocks: BlogBlock[];
};

export type BlogCategory =
  | "Guides"
  | "Cricket Betting"
  | "IPL 2026"
  | "Cricket News"
  | "App & Login"
  | "Casino"
  | "Payments";
