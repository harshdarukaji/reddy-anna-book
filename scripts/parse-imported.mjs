import fs from "fs";
import path from "path";

const IN_DIR = "src/content/blog/imported";

const FOOTER = [
  /head office/i,
  /all rights reserved/i,
  /\[email/i,
  /Reddy Anna Book \| Reddy Anna \| Reddy Anna Login/i,
  /^Contact Us$/i,
];

const SECTION_SPLITS = [
  " What Is ",
  " Why ",
  " How to ",
  " How Do ",
  " Types of ",
  " Best Time ",
  " Understanding ",
  " Choose One ",
  " Smart ",
  " Timing Is ",
  " Use Match ",
  " Avoid ",
  " Use Simple ",
  " Track Your ",
  " Common Mistakes ",
  " Deposit Bonus ",
  " Welcome Bonus ",
  " Referral Bonus ",
  " After Official ",
  " Avoid Betting ",
  " After Momentum ",
  " Wait After ",
  " Middle Phase ",
  " End Game ",
  " Bet Only ",
  " Stop After ",
  " Times When ",
  " Combine Timing ",
  " Conclusion ",
  " Step-by-Step ",
  " Step 1",
  " Step 2",
  " Live betting ",
  " Getting your ",
  " Registration ",
  " Login ",
  " Payment ",
  " Casino ",
  " Cricket ",
  " IPL ",
  " India vs ",
  " IND vs ",
  " Virtual Sports ",
  " Fantasy Cricket ",
  " Betting Odds ",
  " What Are ",
  " Why Odds ",
  " Simple Tips ",
  " Live Betting Odds ",
  " How Payout ",
  " Tips for ",
  " Benefits Of ",
  " Top Esports ",
  " Safest Cricket ",
  " Spot Profitable ",
  " Sports Trends ",
  " VIP Level ",
  " Popular ",
  " How Clubs ",
  " Using Bonuses ",
  " How to Place ",
  " How to Deposit ",
  " How to Withdraw ",
  " Withdraw ",
  " Choose the Match ",
  " Place Your Bet ",
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
}

function parseArticle(text) {
  let t = text.replace(/\s+/g, " ").trim();
  const blocks = [];

  // Split on section markers
  const parts = [t];
  for (const marker of SECTION_SPLITS) {
    const next = [];
    for (const part of parts) {
      const idx = part.indexOf(marker);
      if (idx > 30) {
        next.push(part.slice(0, idx).trim());
        next.push(part.slice(idx).trim());
      } else {
        next.push(part);
      }
    }
    // flatten only if we actually split
    if (next.length > parts.length) parts.length = 0, parts.push(...next.filter(Boolean));
  }

  for (const part of parts) {
    if (part.length < 25 || FOOTER.some((p) => p.test(part))) continue;

    // Check if starts with heading-like text (short phrase before colon or first sentence)
    const colonMatch = part.match(/^([A-Z][^.!?]{5,70}):\s*(.+)/);
    if (colonMatch && colonMatch[1].split(" ").length <= 10) {
      blocks.push({ type: "h2", text: colonMatch[1].trim(), id: slugify(colonMatch[1]) });
      if (colonMatch[2].length > 30) blocks.push({ type: "p", text: colonMatch[2].trim() });
      continue;
    }

    // Numbered step
    const stepMatch = part.match(/^(\d+\.?\s+[A-Z][^.]{5,60})\.?\s*(.+)/);
    if (stepMatch) {
      blocks.push({ type: "h3", text: stepMatch[1].trim(), id: slugify(stepMatch[1]) });
      if (stepMatch[2].length > 30) blocks.push({ type: "p", text: stepMatch[2].trim() });
      continue;
    }

    // Short title-like opening (under 80 chars, no period in middle)
    if (part.length < 90 && !part.includes(". ") && /^[A-Z]/.test(part)) {
      blocks.push({ type: "h2", text: part, id: slugify(part) });
      continue;
    }

    blocks.push({ type: "p", text: part });
  }

  // Merge consecutive short paragraphs
  return blocks.filter((b) => {
    const text = b.text ?? "";
    return text.length > 20 && !FOOTER.some((p) => p.test(text));
  });
}

function processJson(raw) {
  const main = raw.blocks.find((b) => b.type === "p" && b.text?.length > 200);
  if (!main) return null;

  const blocks = parseArticle(main.text);
  if (blocks.length < 2) return null;

  blocks.push({
    type: "cta",
    text: "Get your Reddy Anna ID on WhatsApp — instant setup with ₹5,000 welcome bonus.",
  });

  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    excerpt: raw.description.slice(0, 160),
    keywords: ["reddy anna", "reddy anna book", raw.slug.replace(/-/g, " ")],
    category: "Guides",
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt,
    readingTime: Math.max(5, Math.ceil(blocks.length / 2)),
    source: "reddyannabook.in",
    blocks,
  };
}

const files = fs.readdirSync(IN_DIR).filter((f) => f.endsWith(".json"));
const posts = files.map((f) => processJson(JSON.parse(fs.readFileSync(path.join(IN_DIR, f), "utf8")))).filter(Boolean);

const ts = `import type { BlogPost } from "./types";

/** Blog posts from https://reddyannabook.in */
export const reddyAnnaBookPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)} as BlogPost[];
`;

fs.writeFileSync("src/content/blog/reddyannabook-posts.ts", ts);
console.log(`Parsed ${posts.length} posts`);
posts.forEach((p) => console.log(`  ${p.slug}: ${p.blocks.length} blocks`));
