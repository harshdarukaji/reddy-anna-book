import {
  createLandingPageMetadata,
  LandingPage,
} from "@/components/LandingPage";

const page = {
  path: "/cricket-betting",
  title: "Cricket Betting on Reddy Anna — IPL, Live Odds & Online ID",
  h1: "Online Cricket Betting on Reddy Anna Book",
  description:
    "Bet on cricket online with Reddy Anna — IPL 2026, World Cup, T20 leagues, live betting, session bets, and instant Cricket ID. India's #1 cricket betting platform since 2010.",
  keywords: [
    "cricket betting india",
    "online cricket betting",
    "cricket betting id",
    "live cricket betting",
    "ipl cricket betting",
  ],
  breadcrumbLabel: "Cricket Betting",
  intro:
    "Cricket betting is the heart of Reddy Anna Book. From IPL 2026 to ICC World Cup, Asia Cup, and bilateral series — Reddy Anna offers the deepest cricket markets, fastest live odds, and the most reliable platform during high-traffic match days.",
  sections: [
    {
      title: "Cricket Tournaments on Reddy Anna",
      content: "Bet on every major cricket event with real-time odds and multiple market types:",
      list: [
        "Indian Premier League (IPL) 2026 — daily matches, deepest markets",
        "ICC Cricket World Cup & T20 World Cup",
        "Asia Cup — India vs Pakistan rivalry matches",
        "Bilateral series — India vs Australia, England, South Africa",
        "T20 leagues — BBL, CPL, SA20 when IPL is off-season",
      ],
    },
    {
      title: "Types of Cricket Bets",
      content: "Reddy Anna supports every popular cricket betting market:",
      list: [
        "Match Winner — predict the winning team",
        "Session Betting — runs in an over or session (most popular in India)",
        "Toss Betting — predict toss winner",
        "Player Bets — top batsman, most wickets, man of the match",
        "Live In-Play — bet during the match with changing odds",
      ],
    },
    {
      title: "Why Reddy Anna for Cricket Betting?",
      content:
        "Stable platform during IPL finals when competitors crash. 24-hour withdrawals so you access winnings fast. 55,000+ users trust Reddy Anna for genuine odds and transparent transactions. Get your Cricket ID in 2 minutes on WhatsApp.",
    },
  ],
  relatedLinks: [
    { href: "/ipl-2026", label: "IPL 2026 Betting" },
    { href: "/blog/cricket-betting-strategies-india", label: "Betting Strategies" },
    { href: "/blog/live-cricket-betting-session-guide", label: "Session Betting Guide" },
    { href: "/reddy-anna-id", label: "Get Cricket ID" },
  ],
};

export const metadata = createLandingPageMetadata(page);

export default function CricketBettingPage() {
  return <LandingPage {...page} />;
}
