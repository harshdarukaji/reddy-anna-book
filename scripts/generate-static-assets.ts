import fs from "fs";
import { getAllPosts } from "../src/content/blog/posts";
import { siteConfig } from "../src/lib/site-config";
import { assetPath, basePath } from "../src/lib/asset";

const posts = getAllPosts();

const items = posts
  .map(
    (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
  )
  .join("");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>Expert cricket betting guides, IPL tips, Reddy Anna tutorials, and daily cricket news.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

const manifest = {
  name: siteConfig.name,
  short_name: siteConfig.shortName,
  description: siteConfig.description,
  start_url: basePath ? `${basePath}/` : "/",
  scope: basePath ? `${basePath}/` : "/",
  display: "standalone",
  background_color: "#0a0e17",
  theme_color: "#0a0e17",
  lang: "en-IN",
  orientation: "portrait-primary",
  icons: [
    {
      src: assetPath("/favicon.png"),
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: assetPath("/logo.png"),
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};

fs.writeFileSync("public/feed.xml", rss.trim());
fs.writeFileSync("public/manifest.json", JSON.stringify(manifest, null, 2));
console.log(`Generated feed.xml + manifest.json (basePath: ${basePath || "/"})`);
