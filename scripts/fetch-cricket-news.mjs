import fs from "fs";
import path from "path";
import {
  fetchRecentMatches,
  fetchUpcomingMatches,
  fetchScheduleByDay,
  fetchMatchHeader,
  sortMatchesByPriority,
  sortRecentByPriority,
} from "./lib/cricbuzz.mjs";
import {
  buildDailyDigest,
  buildMatchPreview,
  buildResultPost,
  buildRecordPost,
  buildHeadlinePost,
  extractRecordHighlights,
} from "./lib/news-posts.mjs";

const NEWS_DIR = "src/content/blog/news";
const RSS_URL = "https://feeds.bbci.co.uk/sport/cricket/rss.xml";
const MAX_HEADLINES = 3;
const MAX_PREVIEWS = 4;
const MAX_RESULTS = 3;

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parseRss(xml) {
  const items = [];
  for (const chunk of xml.split("<item>").slice(1)) {
    const title =
      chunk.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ??
      chunk.match(/<title>(.*?)<\/title>/)?.[1];
    const link = chunk.match(/<link>(.*?)<\/link>/)?.[1];
    const desc =
      chunk.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ??
      chunk.match(/<description>(.*?)<\/description>/)?.[1];
    if (title && link) {
      items.push({
        title: stripHtml(title),
        link,
        description: stripHtml(desc ?? ""),
      });
    }
  }
  return items;
}

async function fetchRss() {
  const res = await fetch(RSS_URL, {
    headers: { "User-Agent": "ReddyAnnaBook-NewsBot/1.0" },
  });
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
  return parseRss(await res.text());
}

function loadExistingSlugs() {
  if (!fs.existsSync(NEWS_DIR)) return new Set();
  return new Set(
    fs
      .readdirSync(NEWS_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""))
  );
}

function writePost(post, existing) {
  if (existing.has(post.slug)) {
    console.log("exists:", post.slug);
    return false;
  }
  fs.writeFileSync(path.join(NEWS_DIR, `${post.slug}.json`), JSON.stringify(post, null, 2));
  console.log("created:", post.slug);
  return true;
}

function regenerateIndex() {
  const allNews = fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(NEWS_DIR, f), "utf8")))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const ts = `import type { BlogPost } from "./types";

/** Auto-generated cricket news — run \`npm run news:fetch\` */
export const cricketNewsPosts: BlogPost[] = ${JSON.stringify(allNews, null, 2)} as BlogPost[];
`;

  fs.writeFileSync("src/content/blog/cricket-news-posts.ts", ts);
  return allNews.length;
}

async function main() {
  fs.mkdirSync(NEWS_DIR, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const existing = loadExistingSlugs();
  let created = 0;

  console.log("Fetching cricket data from Cricbuzz...");
  const [recent, upcoming, schedule, rssItems] = await Promise.all([
    fetchRecentMatches().catch((e) => {
      console.warn("Recent matches:", e.message);
      return [];
    }),
    fetchUpcomingMatches().catch((e) => {
      console.warn("Upcoming matches:", e.message);
      return [];
    }),
    fetchScheduleByDay().catch((e) => {
      console.warn("Schedule:", e.message);
      return [];
    }),
    fetchRss().catch((e) => {
      console.warn("RSS:", e.message);
      return [];
    }),
  ]);

  console.log(`Data: ${recent.length} recent, ${upcoming.length} upcoming, ${schedule.length} scheduled, ${rssItems.length} RSS`);

  const recentSorted = sortRecentByPriority(recent);
  const upcomingSorted = sortMatchesByPriority(upcoming);

  const rssRecords = extractRecordHighlights(rssItems);
  const rssHeadlines = rssItems.filter((r) => !rssRecords.includes(r));

  // Daily digest — always refresh today's file
  const digest = buildDailyDigest({
    today,
    recent: recentSorted,
    upcoming: upcomingSorted,
    schedule,
    rssRecords,
    rssHeadlines,
  });
  const digestPath = path.join(NEWS_DIR, `${digest.slug}.json`);
  const digestExists = fs.existsSync(digestPath);
  fs.writeFileSync(digestPath, JSON.stringify(digest, null, 2));
  console.log(digestExists ? "updated:" : "created:", digest.slug);
  if (!digestExists) created++;

  // Match previews — next international + league fixtures
  const previewCandidates = upcomingSorted.slice(0, MAX_PREVIEWS);
  for (const block of previewCandidates) {
    const post = await buildMatchPreview({ ...block, today });
    if (writePost(post, existing)) {
      existing.add(post.slug);
      created++;
    }
  }

  // Recent results with full scorecard
  for (const block of recentSorted.slice(0, MAX_RESULTS)) {
    const header = await fetchMatchHeader(block.matchInfo.matchId);
    const post = await buildResultPost({ ...block, today, header });
    if (writePost(post, existing)) {
      existing.add(post.slug);
      created++;
    }
  }

  // Record-breaking headlines from BBC
  for (const item of rssRecords.slice(0, MAX_HEADLINES)) {
    const post = buildRecordPost(item, today);
    if (writePost(post, existing)) {
      existing.add(post.slug);
      created++;
    }
  }

  // General headlines (fill remaining slots)
  for (const item of rssHeadlines.slice(0, MAX_HEADLINES)) {
    const post = buildHeadlinePost(item, today);
    if (!post) continue;
    if (writePost(post, existing)) {
      existing.add(post.slug);
      created++;
    }
  }

  const total = regenerateIndex();
  console.log(`Done. ${created} new posts. Total news: ${total}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
