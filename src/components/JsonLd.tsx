import { siteConfig } from "@/lib/site-config";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        foundingDate: siteConfig.established,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["English", "Hindi"],
          url: siteConfig.whatsappLink,
        },
        sameAs: [],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/faq?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: readonly { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  image?: string;
}) {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}/logo.png`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: `${siteConfig.url}/blog/${slug}`,
        datePublished: publishedAt,
        dateModified: updatedAt,
        author: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/blog/${slug}`,
        },
        image: imageUrl,
        inLanguage: "en-IN",
      }}
    />
  );
}

export function BlogListJsonLd({
  posts,
}: {
  posts: { title: string; slug: string; description: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${siteConfig.name} Blog`,
        description: "Expert guides on Reddy Anna, cricket betting, IPL, casino, and more.",
        url: `${siteConfig.url}/blog`,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: `${siteConfig.url}/blog/${post.slug}`,
        })),
      }}
    />
  );
}
