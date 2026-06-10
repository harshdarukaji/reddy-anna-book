import Link from "next/link";
import { BlogCard } from "@/components/Blog";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQJsonLd } from "@/components/JsonLd";
import { IPLCountdown } from "@/components/IPLCountdown";
import { Platforms } from "@/components/Platforms";
import { Testimonials } from "@/components/Testimonials";
import { SectionHeading, WhatsAppButton } from "@/components/ui";
import { getAllPosts } from "@/content/blog/posts";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <FAQJsonLd faqs={siteConfig.faqs} />
      <Hero />
      <Platforms />
      <IPLCountdown />
      <Features />
      <HowItWorks />
      <Testimonials />

      <section className="bg-dark-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Latest Guides"
            title="Reddy Anna Book Blog"
            description="Expert cricket betting guides, IPL tips, app tutorials, and payment help — updated for 2026."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-gold hover:underline"
            >
              View all betting guides →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Join Reddy Anna Book Today
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Ready to experience India&apos;s best cricket betting platform? Get
            your instant Cricket ID, 24-hour withdrawals, and unmatched support.
          </p>
          <div className="mt-8">
            <WhatsAppButton>Sign Up — Get Instant Cricket ID</WhatsAppButton>
          </div>
        </div>
      </section>

      <FAQ limit={6} />
    </>
  );
}
