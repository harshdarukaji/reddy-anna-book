import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/ui";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createMetadata({
  title: "Get Reddy Anna ID — Instant Cricket ID in 2 Minutes",
  description:
    "Get your Reddy Anna ID instantly in 2 minutes. Contact WhatsApp, share basic details, receive login credentials. Access cricket betting, casino, and live games.",
  path: "/reddy-anna-id",
  keywords: [
    "reddy anna id",
    "get reddy anna id",
    "cricket id",
    "online betting id",
    "reddy anna online book id",
  ],
});

export default function ReddyAnnaIdPage() {
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Get Reddy Anna ID", url: `${siteConfig.url}/reddy-anna-id` },
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
          <span className="text-zinc-300">Get Reddy Anna ID</span>
        </nav>

        <h1 className="text-4xl font-bold text-white">
          Get Your Reddy Anna ID in 2 Minutes
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Your Reddy Anna ID is your complete betting identity — access sports
          betting, casino games, deposits, and withdrawals from one secure
          account.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Live Sports Betting",
              desc: "Place bets on cricket, football, tennis with real-time odds.",
            },
            {
              title: "Full Casino Access",
              desc: "Teen Patti, Andar Bahar, live dealer games, and more.",
            },
            {
              title: "Secure Wallet",
              desc: "UPI deposits and fast withdrawals linked to your ID.",
            },
            {
              title: "Performance Tracking",
              desc: "Review betting history and improve your strategy.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-zinc-400">
            Contact us on WhatsApp and receive your Reddy Anna ID with login
            credentials in under 2 minutes. Free registration, no hidden fees.
          </p>
          <div className="mt-6">
            <WhatsAppButton className="text-base">
              Get Free Reddy Anna ID Now
            </WhatsAppButton>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">
            Access All Platforms with One ID
          </h2>
          <p className="mt-2 text-zinc-400">
            Your Reddy Anna ID unlocks access to Reddy Anna Book, reddybook.live,
            reddybook.club, reddybook.green, reddybook.pro, and reddybook24 —
            all with exclusive welcome bonuses.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-gold hover:underline"
          >
            View all platforms →
          </Link>
        </section>
      </article>
    </>
  );
}
