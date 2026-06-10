import type { BlogBlock } from "@/content/blog/types";
import Link from "next/link";
import { getBlogImage } from "@/lib/blog-images";
import { OptimizedImage } from "./OptimizedImage";
import { WhatsAppButton } from "./ui";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="prose prose-invert max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="mb-4 leading-relaxed text-zinc-300">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                id={block.id ?? slugify(block.text)}
                className="mb-4 mt-10 scroll-mt-24 text-2xl font-bold text-white"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={block.id ?? slugify(block.text)}
                className="mb-3 mt-8 scroll-mt-24 text-xl font-semibold text-white"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mb-6 list-disc space-y-2 pl-6 text-zinc-300">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mb-6 list-decimal space-y-2 pl-6 text-zinc-300">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="-mx-1 mb-6 overflow-x-auto rounded-xl border border-white/10 sm:mx-0">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      {block.headers.map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-semibold text-gold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-white/10">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 text-zinc-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "cta":
            return (
              <div
                key={i}
                className="my-8 rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center"
              >
                <p className="mb-4 text-zinc-300">{block.text}</p>
                <WhatsAppButton>Get Reddy Anna ID on WhatsApp</WhatsAppButton>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function BlogFeaturedImage({
  post,
  priority = false,
}: {
  post: { slug: string; category: string; title: string; image?: string; imageAlt?: string };
  priority?: boolean;
}) {
  const { src, alt } = getBlogImage(post);
  return (
    <div className="relative mb-8 aspect-[1200/630] w-full overflow-hidden rounded-2xl border border-white/10 bg-dark-card">
      <OptimizedImage src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 896px" />
    </div>
  );
}

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  publishedAt,
  readingTime,
  image,
  imageAlt,
}: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  image?: string;
  imageAlt?: string;
}) {
  const { src, alt } = getBlogImage({ slug, category, title, image, imageAlt });

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-gold/30 hover:bg-white/[0.07]">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark-card">
          <OptimizedImage
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="transition duration-300 group-hover:scale-105"
          />
          {category === "Cricket News" && (
            <span className="absolute left-3 top-3 rounded-full bg-green px-2.5 py-0.5 text-xs font-semibold text-white">
              Live News
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="rounded-full bg-gold/10 px-2.5 py-0.5 font-medium text-gold">
            {category}
          </span>
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <span>{readingTime} min read</span>
        </div>
        <h2 className="text-lg font-semibold text-white group-hover:text-gold">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-block text-sm font-medium text-gold hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}

export function TableOfContents({ blocks }: { blocks: BlogBlock[] }) {
  const headings = blocks.filter(
    (b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2"
  );

  if (headings.length < 3) return null;

  return (
    <nav
      className="rounded-xl border border-white/10 bg-white/5 p-5"
      aria-label="Table of contents"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">
        In this article
      </p>
      <ol className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id ?? h.text}>
            <a
              href={`#${h.id ?? slugify(h.text)}`}
              className="text-zinc-400 transition hover:text-gold"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function RelatedPosts({
  posts,
}: {
  posts: { slug: string; title: string; excerpt: string }[];
}) {
  if (!posts.length) return null;

  return (
    <section className="mt-12 border-t border-white/10 pt-10">
      <h2 className="mb-6 text-xl font-bold text-white">Related Articles</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-gold/30"
          >
            <h3 className="font-medium text-white hover:text-gold">{post.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="mb-8 text-sm text-zinc-500" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-gold">
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-300">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function InternalLinks() {
  const links = [
    { href: "/reddy-anna-id", label: "Get Reddy Anna ID" },
    { href: "/login", label: "Reddy Anna Login" },
    { href: "/registration", label: "Registration Guide" },
    { href: "/reddy-anna-app", label: "Reddy Anna App" },
    { href: "/reddy-anna-apk", label: "Reddy Anna APK Download" },
    { href: "/cricket-betting", label: "Cricket Betting" },
    { href: "/casino-games", label: "Casino Games" },
    { href: "/ipl-2026", label: "IPL 2026 Betting" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <section className="border-t border-white/10 bg-dark-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-lg font-semibold text-white">
          Explore Reddy Anna Book
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-gold/40 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
