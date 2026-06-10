import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { OptimizedImage } from "@/components/OptimizedImage";
import { WhatsAppButton } from "@/components/ui";
import { PAGE_HERO_IMAGES } from "@/lib/blog-images";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type Section = {
  title: string;
  content: string;
  list?: string[];
};

type LandingPageProps = {
  path: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  intro: string;
  sections: Section[];
  breadcrumbLabel: string;
  relatedLinks?: { href: string; label: string }[];
};

export function createLandingPageMetadata(props: LandingPageProps) {
  return createMetadata({
    title: props.title,
    description: props.description,
    path: props.path,
    keywords: props.keywords,
  });
}

export function LandingPage({
  path,
  h1,
  description,
  intro,
  sections,
  breadcrumbLabel,
  relatedLinks = [],
}: LandingPageProps) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: breadcrumbLabel, url: `${siteConfig.url}${path}` },
        ]}
      />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-zinc-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{breadcrumbLabel}</span>
        </nav>

        {PAGE_HERO_IMAGES[path] && (
          <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
            <OptimizedImage
              src={PAGE_HERO_IMAGES[path].src}
              alt={PAGE_HERO_IMAGES[path].alt}
              fill
              priority
              sizes="896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
          </div>
        )}

        <h1 className="text-4xl font-bold text-white">{h1}</h1>
        <p className="mt-4 text-lg text-zinc-400">{description}</p>
        <p className="mt-6 leading-relaxed text-zinc-300">{intro}</p>

        <div className="mt-8">
          <WhatsAppButton>Get Reddy Anna ID — Free & Instant</WhatsAppButton>
        </div>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-300">
                {section.content}
              </p>
              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {relatedLinks.length > 0 && (
          <section className="mt-12 border-t border-white/10 pt-10">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Related Pages
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:border-gold/40 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            Start on Reddy Anna Book Today
          </h2>
          <p className="mt-2 text-zinc-400">
            Join {siteConfig.userCount} users. Get your ID in 2 minutes with
            ₹5,000 welcome bonus.
          </p>
          <div className="mt-6">
            <WhatsAppButton>Contact on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </article>
    </>
  );
}
