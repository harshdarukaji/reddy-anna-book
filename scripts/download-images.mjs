import fs from "fs";
import path from "path";

const OUT = "public/images/blog";

const images = [
  {
    file: "bonus-offers.jpg",
    url: "https://reddyannabook.social/wp-content/uploads/2026/02/Reddy-Anna-Book-Bonus-Offers-Explained-for-New-Users.jpg",
    slug: "reddy-anna-book-bonus-offers-new-users",
  },
  {
    file: "best-time-bet.jpg",
    url: "https://reddyannabook.social/wp-content/uploads/2026/02/Best-Time-to-Place-Bets-on-Reddy-Anna-Book-for-Higher-Wins.jpg",
    slug: "best-time-to-bet-on-reddy-anna-book",
  },
  {
    file: "live-betting-strategies.webp",
    url: "https://reddyannabook.social/wp-content/uploads/2026/02/Simple-Reddy-Anna-Strategies-For-Improved-Live-Betting-Results.webp",
    slug: "simple-reddy-anna-live-betting-strategies",
  },
  {
    file: "cricket-hero.jpg",
    url: "https://images.unsplash.com/photo-1531418848799-148f7326df4a?w=1200&q=80&auto=format&fit=crop",
    category: "Cricket Betting",
  },
  {
    file: "ipl-cricket.jpg",
    url: "https://images.unsplash.com/photo-1540747913346-19eb32adc3f0?w=1200&q=80&auto=format&fit=crop",
    category: "IPL 2026",
  },
  {
    file: "cricket-news.jpg",
    url: "https://images.unsplash.com/photo-1624526267942-ab0ff8a545e7?w=1200&q=80&auto=format&fit=crop",
    category: "Cricket News",
  },
  {
    file: "casino-games.jpg",
    url: "https://images.unsplash.com/photo-1596838132731-3301c4aa0a42?w=1200&q=80&auto=format&fit=crop",
    category: "Casino",
  },
  {
    file: "mobile-app.jpg",
    url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    category: "App & Login",
  },
  {
    file: "payments.jpg",
    url: "https://images.unsplash.com/photo-1563013547-824ae1b704d3?w=1200&q=80&auto=format&fit=crop",
    category: "Payments",
  },
  {
    file: "guides-default.jpg",
    url: "https://images.unsplash.com/photo-1622279457486-62dcc4a431db?w=1200&q=80&auto=format&fit=crop",
    category: "Guides",
  },
];

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync("public/images/pages", { recursive: true });

for (const img of images) {
  const dest = path.join(OUT, img.file);
  if (fs.existsSync(dest)) {
    console.log("skip", img.file);
    continue;
  }
  try {
    const res = await fetch(img.url);
    if (!res.ok) throw new Error(res.statusText);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log("ok", img.file);
  } catch (e) {
    console.log("fail", img.file, e.message);
  }
}

// Page hero images
const pages = [
  { file: "cricket-betting-hero.jpg", url: "https://images.unsplash.com/photo-1531418848799-148f7326df4a?w=1400&q=80&auto=format&fit=crop" },
  { file: "ipl-hero.jpg", url: "https://images.unsplash.com/photo-1540747913346-19eb32adc3f0?w=1400&q=80&auto=format&fit=crop" },
];

for (const p of pages) {
  const dest = path.join("public/images/pages", p.file);
  if (fs.existsSync(dest)) continue;
  try {
    const res = await fetch(p.url);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log("page ok", p.file);
  } catch (e) {
    console.log("page fail", p.file);
  }
}

const manifest = images.reduce(
  (acc, img) => {
    if (img.slug) acc.bySlug[img.slug] = `/images/blog/${img.file}`;
    if (img.category) acc.byCategory[img.category] = `/images/blog/${img.file}`;
    return acc;
  },
  { bySlug: {}, byCategory: {} }
);

fs.writeFileSync("src/lib/blog-images.manifest.json", JSON.stringify(manifest, null, 2));
console.log("manifest written");
