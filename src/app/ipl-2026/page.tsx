import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { IPLCountdown } from "@/components/IPLCountdown";
import { WhatsAppButton } from "@/components/ui";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createMetadata({
  title: "Reddy Anna IPL 2026 — Welcome Bonus & Cricket Betting Offers",
  description:
    "Reddy Anna IPL 2026 exclusive offers — ₹5,000 welcome bonus, free first bet, daily cashback, and mega IPL contests. Get your Cricket ID and start IPL betting.",
  path: "/ipl-2026",
  keywords: [
    "ipl betting 2026",
    "reddy anna ipl",
    "ipl welcome bonus",
    "cricket betting ipl",
    "reddy anna ipl offer",
  ],
});

export default function IPL2026Page() {
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "IPL 2026", url: `${siteConfig.url}/ipl-2026` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <IPLCountdown />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-zinc-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">IPL 2026</span>
        </nav>

        <h1 className="text-4xl font-bold text-white">
          Reddy Anna IPL 2026 Cricket Betting
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          The Indian Premier League is the king of cricket betting in India.
          Bet on every IPL 2026 match with live odds, session betting, and
          exclusive bonuses on Reddy Anna Book.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white">
              Why Bet on IPL with Reddy Anna?
            </h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              <li>
                <strong className="text-white">Daily Matches</strong> — Continuous
                betting action throughout the IPL season.
              </li>
              <li>
                <strong className="text-white">Deep Markets</strong> — Match
                winner, session betting, player performance, toss, and more.
              </li>
              <li>
                <strong className="text-white">Live Betting</strong> — Real-time
                odds that update instantly during T20 action.
              </li>
              <li>
                <strong className="text-white">Stable Platform</strong> — No
                crashes during peak IPL traffic, unlike many competitors.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              IPL 2026 Betting Types
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Match Winner Betting",
                "Session / Over Betting",
                "Toss Betting",
                "Player Performance Bets",
                "Live In-Play Betting",
                "Tournament Winner Outright",
              ].map((type) => (
                <div
                  key={type}
                  className="rounded-lg bg-white/5 px-4 py-3 text-sm text-zinc-300"
                >
                  🏏 {type}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center">
            <h2 className="text-xl font-semibold text-white">
              Claim Your IPL 2026 Bonus
            </h2>
            <p className="mt-2 text-zinc-400">
              New users get up to ₹5,000 welcome bonus plus free first bet on IPL
              matches.
            </p>
            <div className="mt-6">
              <WhatsAppButton message="Hi! I want to claim my IPL 2026 bonus and get my Reddy Anna ID.">
                Get ID + ₹5,000 IPL Bonus
              </WhatsAppButton>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
