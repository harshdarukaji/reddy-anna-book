import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog/posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/reddy-anna-id", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/login", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/registration", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/ipl-2026", priority: 0.95, changeFrequency: "daily" as const },
  { path: "/reddy-anna-app", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/reddy-anna-apk", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/reddy-anna-club", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/cricket-betting", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/casino-games", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/deposit-withdrawal", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.8, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
