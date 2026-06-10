import fs from "fs";
import path from "path";

const IN_DIR = "src/content/blog/imported";
const FOOTER_PATTERNS = [
  /Reddy Anna Book – Head Office/i,
  /All rights reserved/i,
  /Follow us on social/i,
  /\[email/,
  /Reddy Anna Book \| Reddy Anna \|/,
  /Contact Us/i,
];

const HEADING_PATTERNS = [
  /^What Is /,
  /^Why /,
  /^How to /,
  /^How Do /,
  /^Types of /,
  /^Best Time /,
  /^Understanding /,
  /^Choose One /,
  /^Smart /,
  /^Timing Is /,
  /^Use Match /,
  /^Avoid /,
  /^Use Simple /,
  /^Track Your /,
  /^Knowing when /,
  /^Common Mistakes /,
  /^Deposit Bonus /,
  /^Welcome Bonus /,
  /^Referral Bonus /,
  /^After Official /,
  /^Avoid Betting /,
  /^After Momentum /,
  /^Wait After /,
  /^Middle Phase /,
  /^End Game /,
  /^Bet Only /,
  /^Stop After /,
  /^Times When /,
  /^Combine Timing /,
  /^Conclusion$/,
  /^Live betting /,
  /^Getting your /,
  /^Registration /,
  /^Login /,
  /^Payment /,
  /^Casino /,
  /^Cricket /,
  /^IPL /,
  /^India vs /,
  /^IND vs /,
  /^Virtual Sports /,
  /^Fantasy Cricket /,
  /^Betting Odds /,
  /^Top Esports /,
  /^Safest Cricket /,
  /^Spot Profitable /,
  /^Sports Trends /,
  /^VIP Level /,
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function splitParagraph(text) {
  const blocks = [];
  let remaining = text.trim();

  while (remaining.length > 0) {
    let bestIdx = -1;
    let bestLen = 0;

    for (const pattern of HEADING_PATTERNS) {
      const m = remaining.match(pattern);
      if (m && m.index !== undefined && m.index > 20) {
        if (bestIdx === -1 || m.index < bestIdx) {
          bestIdx = m.index;
          bestLen = m[0].length;
        }
      }
    }

    if (bestIdx > 40) {
      const before = remaining.slice(0, bestIdx).trim();
      if (before.length > 40) blocks.push({ type: "p", text: before });

      const afterHeading = remaining.slice(bestIdx);
      const nextBreak = HEADING_PATTERNS.map((p) => {
        const m = afterHeading.slice(bestLen).match(p);
        return m?.index !== undefined ? m.index + bestLen : -1;
      }).filter((i) => i > bestLen + 20);

      const endIdx =
        nextBreak.length > 0 ? Math.min(...nextBreak) + bestLen : afterHeading.length;

      let heading = afterHeading.slice(0, endIdx).trim();
      const colonIdx = heading.indexOf(":");
      if (colonIdx > 5 && colonIdx < 80) {
        blocks.push({
          type: "h2",
          text: heading.slice(0, colonIdx).trim(),
          id: slugify(heading.slice(0, colonIdx)),
        });
        const rest = heading.slice(colonIdx + 1).trim();
        if (rest.length > 30) blocks.push({ type: "p", text: rest });
      } else {
        const words = heading.split(" ");
        if (words.length <= 12) {
          blocks.push({
            type: "h2",
            text: heading,
            id: slugify(heading),
          });
        } else {
          blocks.push({ type: "p", text: heading });
        }
      }
      remaining = afterHeading.slice(endIdx).trim();
    } else {
      if (remaining.length > 40) blocks.push({ type: "p", text: remaining });
      break;
    }
  }

  return blocks;
}

function cleanBlocks(blocks) {
  return blocks.filter((b) => {
    const text = b.text ?? "";
    return !FOOTER_PATTERNS.some((p) => p.test(text));
  });
}

function processPost(raw) {
  const mainPara = raw.blocks.find((b) => b.type === "p" && b.text.length > 200);
  if (!mainPara) return raw;

  const split = splitParagraph(mainPara.text);
  const cleaned = cleanBlocks(split);

  if (cleaned.length < 2) return raw;

  return {
    ...raw,
    blocks: [
      ...cleaned,
      {
        type: "cta",
        text: "Get your Reddy Anna ID on WhatsApp — instant setup with ₹5,000 welcome bonus.",
      },
    ],
  };
}

const files = fs.readdirSync(IN_DIR).filter((f) => f.endsWith(".json"));
const posts = files.map((f) => processPost(JSON.parse(fs.readFileSync(path.join(IN_DIR, f), "utf8"))));

function toTs(post) {
  const keywords = ["reddy anna", "reddy anna book", post.slug.replace(/-/g, " ")];
  return `  {
    slug: ${JSON.stringify(post.slug)},
    title: ${JSON.stringify(post.title)},
    description: ${JSON.stringify(post.description)},
    excerpt: ${JSON.stringify(post.description.slice(0, 160))},
    keywords: ${JSON.stringify(keywords)},
    category: "Guides",
    publishedAt: ${JSON.stringify(post.publishedAt)},
    updatedAt: ${JSON.stringify(post.updatedAt)},
    readingTime: ${Math.max(5, Math.ceil(post.blocks.length / 2))},
    source: "reddyannabook.in",
    blocks: ${JSON.stringify(post.blocks, null, 6).replace(/^/gm, "    ").trim()},
  }`;
}

const ts = `import type { BlogPost } from "./types";

/** Blog posts imported from https://reddyannabook.in */
export const reddyAnnaBookPosts: BlogPost[] = [
${posts.map(toTs).join(",\n")}
];
`;

fs.writeFileSync("src/content/blog/reddyannabook-posts.ts", ts);
console.log(`Cleaned ${posts.length} posts`);
