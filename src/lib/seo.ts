import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSeo): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    path === "/"
      ? `${siteConfig.name} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;

  const allKeywords = [...new Set([...siteConfig.keywords, ...keywords])];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": `${siteConfig.url}/feed.xml`,
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [siteConfig.name],
            section: "Betting Guides",
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: siteConfig.social.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

export function createArticleMetadata(post: {
  title: string;
  description: string;
  slug: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  image?: string;
}) {
  const meta = createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });

  if (post.image) {
    const imageUrl = post.image.startsWith("http")
      ? post.image
      : `${siteConfig.url}${post.image}`;
    return {
      ...meta,
      openGraph: {
        ...meta.openGraph,
        images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        ...meta.twitter,
        images: [imageUrl],
      },
    };
  }

  return meta;
}
