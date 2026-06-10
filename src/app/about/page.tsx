import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/ui";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createMetadata({
  title: "About Reddy Anna Book — India's Trusted Betting Platform Since 2010",
  description:
    "Learn about Reddy Anna Book — operating since 2010 with 200+ branches, 55,000+ users, and India's most reliable cricket betting and casino platform.",
  path: "/about",
  keywords: ["about reddy anna", "reddy anna book history", "reddy anna trusted"],
});

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-zinc-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">About</span>
        </nav>

        <h1 className="text-4xl font-bold text-white">
          About Reddy Anna Book
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          India&apos;s trusted platform for online sports betting and casino
          gaming since {siteConfig.established}.
        </p>

        <div className="prose prose-invert mt-10 max-w-none space-y-6 text-zinc-300">
          <p>
            Our journey began in {siteConfig.established} with a simple mission:
            to provide Indian players with a safe, transparent, and exciting
            online betting experience. What started as a small sports-focused
            portal has grown into a complete gaming destination — cricket
            betting, football wagers, live casino games, slots, and the
            exclusive Reddy Book exchange.
          </p>

          <h2 className="text-2xl font-semibold text-white">
            Why Reddy Anna is Trusted
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-white">Established Since 2010</strong> —
              Over a decade of consistent performance and reliability.
            </li>
            <li>
              <strong className="text-white">200+ Branch Network</strong> —
              Wide agent network across India for quick account setup and local
              support.
            </li>
            <li>
              <strong className="text-white">{siteConfig.userCount} Active Users</strong> —
              Strong community trust and positive word-of-mouth growth.
            </li>
            <li>
              <strong className="text-white">Stable During Peak Events</strong> —
              Reliable performance even during IPL and high-traffic tournaments.
            </li>
            <li>
              <strong className="text-white">24/7 Customer Support</strong> —
              WhatsApp, live chat, and email support always available.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-white">
            Platform Details
          </h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Platform Name", siteConfig.name],
                  ["Industry", "Online Sports Betting & Casino"],
                  ["Established", `Since ${siteConfig.established}`],
                  ["User Base", `${siteConfig.userCount} active users`],
                  ["Branch Network", "200+ partner branches & agents"],
                  ["Core Focus", "Cricket Betting & Live Casino"],
                  ["Access", "Web + Reddy Anna Book App"],
                  ["Support", "24/7 Customer Assistance"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium text-gold">{label}</td>
                    <td className="px-4 py-3 text-zinc-300">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10">
          <WhatsAppButton>Get Your Reddy Anna ID</WhatsAppButton>
        </div>
      </article>
    </>
  );
}
