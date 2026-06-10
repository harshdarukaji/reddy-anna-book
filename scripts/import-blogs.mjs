import fs from "fs";
import path from "path";

const BASE = "https://reddyannabook.in/blog/";
const OUT_DIR = "src/content/blog/imported";

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"');
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; BlogImporter/1.0)" },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

async function getBlogLinksFromPage(pageNum) {
  const url =
    pageNum === 1 ? `${BASE}index.htm` : `${BASE}page/${pageNum}/index.htm`;
  const html = await fetchText(url);
  const links = new Map();

  for (const m of html.matchAll(
    /aria-label="Read more about ([^"]+)"[^>]*href="([^"]+index\.htm)"/g
  )) {
    const title = decodeEntities(m[1].replace(/&amp;/g, "&"));
    let href = m[2].replace(/^\.\.\/uncategorized\//, "").replace(/^\.\.\//, "");
    if (!href.startsWith("http")) href = `${BASE}${href}`;
    const slug = href
      .replace(BASE, "")
      .replace(/\/index\.htm$/, "")
      .replace(/^blog\//, "");
    links.set(slug, { title, url: href, slug });
  }

  for (const m of html.matchAll(
    /href="([^"]+index\.htm)"[^>]*aria-label="Read more about ([^"]+)"/g
  )) {
    const title = decodeEntities(m[2].replace(/&amp;/g, "&"));
    let href = m[1].replace(/^\.\.\/uncategorized\//, "").replace(/^\.\.\//, "");
    if (!href.startsWith("http")) href = `${BASE}${href}`;
    const slug = href
      .replace(BASE, "")
      .replace(/\/index\.htm$/, "")
      .replace(/^blog\//, "");
    links.set(slug, { title, url: href, slug });
  }

  return [...links.values()];
}

function extractPost(html, fallbackTitle) {
  const title =
    html.match(/property="og:title" content="([^"]+)"/)?.[1] ??
    html.match(/<title>([^<|]+)/)?.[1]?.trim() ??
    fallbackTitle;
  const description =
    html.match(/name="description" content="([^"]+)"/)?.[1] ??
    html.match(/property="og:description" content="([^"]+)"/)?.[1] ??
    "";
  const date =
    html.match(/property="article:published_time" content="([^"]+)"/)?.[1] ??
    html.match(/<time[^>]*datetime="([^"]+)"/)?.[1] ??
    "2026-02-01";

  const headingBlocks = [
    ...html.matchAll(
      /elementor-widget-heading[\s\S]*?elementor-heading-title[^>]*>([^<]+)</g
    ),
  ].map((m) => stripHtml(m[1]));

  const textBlocks = [
    ...html.matchAll(
      /elementor-widget-text-editor[\s\S]*?elementor-widget-container">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g
    ),
  ]
    .map((m) => stripHtml(m[1]))
    .filter((t) => t.length > 40);

  const listBlocks = [
    ...html.matchAll(
      /elementor-icon-list-text[^>]*>([^<]+)</g
    ),
  ].map((m) => stripHtml(m[1])).filter((t) => t.length > 5);

  const blocks = [];
  const seen = new Set();

  function add(type, data) {
    const key = JSON.stringify(data);
    if (seen.has(key)) return;
    seen.add(key);
    blocks.push({ type, ...data });
  }

  const intro = textBlocks.find((t) => t.length > 100 && !t.includes("Follow us"));
  if (intro) add("p", { text: intro });

  for (const h of headingBlocks) {
    if (
      h.length < 5 ||
      h.length > 120 ||
      h.toLowerCase().includes("follow us") ||
      h.toLowerCase().includes("reddy anna book official")
    )
      continue;
    if (blocks.some((b) => b.type === "h2" && b.text === h)) continue;
    add("h2", {
      text: h,
      id: h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    });
  }

  for (const t of textBlocks.slice(1)) {
    if (
      t.includes("All rights reserved") ||
      t.includes("Follow us on social") ||
      t.includes("Unauthorized reproduction") ||
      t.length < 50
    )
      continue;
    add("p", { text: t });
  }

  if (listBlocks.length >= 3) {
    add("ul", { items: listBlocks.slice(0, 12) });
  }

  add("cta", {
    text: "Get your Reddy Anna ID on WhatsApp — instant setup with ₹5,000 welcome bonus.",
  });

  return {
    title: decodeEntities(title.replace(/&amp;/g, "&")),
    description: decodeEntities(description.replace(/&amp;/g, "&")),
    publishedAt: date.split("T")[0],
    updatedAt: date.split("T")[0],
    blocks,
  };
}

function toTsString(post, slug) {
  const keywords = [
    "reddy anna",
    "reddy anna book",
    slug.replace(/-/g, " "),
  ];
  const excerpt = post.description.slice(0, 160);
  const readingTime = Math.max(5, Math.ceil(post.blocks.length / 2));

  const blocksJson = JSON.stringify(post.blocks, null, 4)
    .split("\n")
    .map((line, i) => (i === 0 ? line : "    " + line))
    .join("\n");

  return `  {
    slug: "${slug}",
    title: ${JSON.stringify(post.title)},
    description: ${JSON.stringify(post.description)},
    excerpt: ${JSON.stringify(excerpt)},
    keywords: ${JSON.stringify(keywords)},
    category: "Guides",
    publishedAt: "${post.publishedAt}",
    updatedAt: "${post.updatedAt}",
    readingTime: ${readingTime},
    source: "reddyannabook.in",
    blocks: ${blocksJson},
  }`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const allLinks = new Map();

  for (let page = 1; page <= 14; page++) {
    try {
      const links = await getBlogLinksFromPage(page);
      console.log(`Page ${page}: ${links.length} posts`);
      for (const l of links) allLinks.set(l.slug, l);
    } catch (e) {
      console.log(`Page ${page} failed:`, e.message);
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`Total unique posts: ${allLinks.size}`);

  const imported = [];
  const existingSlugs = new Set([
    "how-to-get-reddy-anna-id-2026",
    "reddy-anna-app-download-apk",
    "ipl-2026-betting-guide-reddy-anna",
    "reddy-anna-login-guide",
    "cricket-betting-strategies-india",
    "live-cricket-betting-session-guide",
    "reddy-anna-deposit-withdrawal-guide",
    "reddy-anna-club-reddybook-platforms",
    "teen-patti-andar-bahar-casino-guide",
    "reddy-anna-welcome-bonus-2026",
    "reddy-anna-vs-other-betting-platforms",
    "responsible-gaming-reddy-anna",
  ]);

  for (const { slug, title, url } of allLinks.values()) {
    if (existingSlugs.has(slug)) {
      console.log(`Skip existing similar: ${slug}`);
      continue;
    }
    try {
      console.log(`Fetching: ${slug}`);
      const html = await fetchText(url);
      const post = extractPost(html, title);
      if (post.blocks.length < 3) {
        console.log(`  Skipped (too short): ${slug}`);
        continue;
      }
      imported.push({ slug, ...post });
      fs.writeFileSync(
        path.join(OUT_DIR, `${slug}.json`),
        JSON.stringify({ slug, ...post }, null, 2)
      );
      await new Promise((r) => setTimeout(r, 300));
    } catch (e) {
      console.log(`  Failed: ${slug}`, e.message);
    }
  }

  const tsEntries = imported.map((p) => toTsString(p, p.slug)).join(",\n");
  const tsContent = `import type { BlogPost } from "./types";

export const importedPosts: BlogPost[] = [
${tsEntries}
];
`;

  fs.writeFileSync("src/content/blog/imported-posts.ts", tsContent);
  fs.writeFileSync(
    "scripts/import-summary.json",
    JSON.stringify({ total: imported.length, slugs: imported.map((p) => p.slug) }, null, 2)
  );
  console.log(`Imported ${imported.length} posts`);
}

main().catch(console.error);
