import type { BlogPost } from "@/content/blog/types";

/** Slug → featured image (from reddyannabook.in + curated stock) */
const SLUG_PREFIX_IMAGES: [string, string][] = [
  ["cricket-daily-digest-", "/images/blog/cricket-news.jpg"],
  ["match-preview-", "/images/blog/cricket-hero.jpg"],
  ["cricket-result-", "/images/blog/cricket-hero.jpg"],
];

const SLUG_IMAGES: Record<string, string> = {
  "reddy-anna-book-bonus-offers-new-users": "/images/blog/bonus-offers.jpg",
  "best-time-to-bet-on-reddy-anna-book": "/images/blog/best-time-bet.jpg",
  "simple-reddy-anna-live-betting-strategies": "/images/blog/live-betting-strategies.webp",
  "ipl-2026-betting-guide-reddy-anna": "/images/blog/ipl-cricket.jpg",
  "how-to-get-reddy-anna-id-2026": "/images/blog/cricket-hero.jpg",
  "cricket-betting-strategies-india": "/images/blog/cricket-hero.jpg",
  "live-cricket-betting-session-guide": "/images/blog/live-betting-strategies.webp",
  "reddy-anna-app-download-apk": "/images/blog/mobile-app.jpg",
  "teen-patti-andar-bahar-casino-guide": "/images/blog/casino-games.jpg",
  "reddy-anna-deposit-withdrawal-guide": "/images/blog/payments.jpg",
};

const CATEGORY_IMAGES: Record<string, string> = {
  Guides: "/images/blog/guides-default.jpg",
  "Cricket Betting": "/images/blog/cricket-hero.jpg",
  "IPL 2026": "/images/blog/ipl-cricket.jpg",
  "Cricket News": "/images/blog/cricket-news.jpg",
  "App & Login": "/images/blog/mobile-app.jpg",
  Casino: "/images/blog/casino-games.jpg",
  Payments: "/images/blog/payments.jpg",
};

const DEFAULT_IMAGE = "/images/blog/cricket-hero.jpg";

function slugPrefixImage(slug: string) {
  for (const [prefix, src] of SLUG_PREFIX_IMAGES) {
    if (slug.startsWith(prefix)) {
      if (prefix === "match-preview-" && /ipl|mi-vs|csk-vs|rcb-vs|kkr-vs|srh-vs|dc-vs|rr-vs|gt-vs|lsg-vs|pbks-vs/.test(slug)) {
        return "/images/blog/ipl-cricket.jpg";
      }
      return src;
    }
  }
  return undefined;
}

export function getBlogImage(post: Pick<BlogPost, "slug" | "category" | "title" | "image" | "imageAlt">) {
  if (post.image) {
    return { src: post.image, alt: post.imageAlt ?? `${post.title} — Reddy Anna Book` };
  }
  const src =
    SLUG_IMAGES[post.slug] ??
    slugPrefixImage(post.slug) ??
    CATEGORY_IMAGES[post.category] ??
    DEFAULT_IMAGE;
  return {
    src,
    alt: `${post.title} — Reddy Anna Book cricket betting guide`,
  };
}

export const PAGE_HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  "/cricket-betting": {
    src: "/images/pages/cricket-betting-hero.jpg",
    alt: "Cricket betting on Reddy Anna Book — live IPL and international matches",
  },
  "/ipl-2026": {
    src: "/images/pages/ipl-hero.jpg",
    alt: "IPL 2026 betting offers on Reddy Anna Book",
  },
  "/blog": {
    src: "/images/blog/cricket-news.jpg",
    alt: "Reddy Anna Book blog — cricket betting guides and news",
  },
};
