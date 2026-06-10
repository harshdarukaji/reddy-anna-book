import Link from "next/link";
import { BlogCard } from "@/components/Blog";
import { BlogListJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { OptimizedImage } from "@/components/OptimizedImage";
import { SectionHeading, WhatsAppButton } from "@/components/ui";
import { getAllCategories, getAllPosts } from "@/content/blog/posts";
import { PAGE_HERO_IMAGES } from "@/lib/blog-images";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createMetadata({
  title: "Reddy Anna Blog — Cricket Betting Guides, IPL Tips & App Tutorials",
  description:
    "Reddy Anna Book blog — expert guides on cricket betting, IPL 2026 tips, app download, login help, casino games, deposits, and bonuses. Updated for 2026.",
  path: "/blog",
  keywords: [
    "reddy anna blog",
    "cricket betting blog",
    "ipl betting guide",
    "reddy anna tips",
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const newsPosts = posts.filter((p) => p.category === "Cricket News");
  const guidePosts = posts.filter((p) => p.category !== "Cricket News");
  const hero = PAGE_HERO_IMAGES["/blog"];

  return (
    <>
      <BlogListJsonLd posts={posts} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
        ]}
      />

      <div className="relative overflow-hidden bg-dark py-16">
        {hero && (
          <div className="absolute inset-0 opacity-20">
            <OptimizedImage src={hero.src} alt={hero.alt} fill sizes="100vw" />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Blog"
            title="Reddy Anna Book — Expert Betting Guides & Cricket News"
            description="Cricket betting strategies, daily match updates, IPL 2026 tips, app tutorials, and payment guides."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`rounded-full border px-3 py-1 text-xs ${
                  cat === "Cricket News"
                    ? "border-green/40 bg-green/10 text-green-light"
                    : "border-white/10 text-zinc-400"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {newsPosts.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Latest Cricket News
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newsPosts.slice(0, 6).map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-6 text-2xl font-bold text-white">
            Betting Guides & Tutorials
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guidePosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            Ready to Start Betting?
          </h2>
          <p className="mt-2 text-zinc-400">
            Get your Reddy Anna ID in 2 minutes with ₹5,000 welcome bonus.
          </p>
          <div className="mt-6">
            <WhatsAppButton>Get Reddy Anna ID Free</WhatsAppButton>
          </div>
        </div>

        <nav className="mt-10 text-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-gold">
            ← Back to Home
          </Link>
        </nav>
      </div>
    </>
  );
}
