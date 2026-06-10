import { notFound } from "next/navigation";
import {
  BlogContent,
  BlogFeaturedImage,
  Breadcrumbs,
  RelatedPosts,
  TableOfContents,
} from "@/components/Blog";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/ui";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/content/blog/posts";
import { createArticleMetadata } from "@/lib/seo";
import { getBlogImage } from "@/lib/blog-images";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { src } = getBlogImage(post);
  return createArticleMetadata({ ...post, image: src });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        image={getBlogImage(post).src}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
        ]}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <span className="rounded-full bg-gold/10 px-3 py-0.5 font-medium text-gold">
              {post.category}
            </span>
            <time dateTime={post.publishedAt}>
              Published{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            {post.updatedAt !== post.publishedAt && (
              <time dateTime={post.updatedAt}>
                · Updated{" "}
                {new Date(post.updatedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            )}
            <span>· {post.readingTime} min read</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{post.description}</p>
        </header>

        <BlogFeaturedImage post={post} priority />

        {post.externalUrl && (
          <p className="mb-6 text-sm text-zinc-500">
            Source:{" "}
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              Original cricket report
            </a>
          </p>
        )}

        <div className="mb-8 lg:hidden">
          <TableOfContents blocks={post.blocks} />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
          <BlogContent blocks={post.blocks} />
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents blocks={post.blocks} />
              <div className="rounded-xl border border-green/30 bg-green/5 p-4 text-center">
                <p className="mb-3 text-xs text-zinc-400">
                  Get ID in 2 minutes
                </p>
                <WhatsAppButton className="!px-4 !py-2 text-xs">
                  WhatsApp Now
                </WhatsAppButton>
              </div>
            </div>
          </aside>
        </div>

        <RelatedPosts posts={related} />
      </article>
    </>
  );
}
