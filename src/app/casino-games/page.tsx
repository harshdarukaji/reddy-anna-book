import {
  createLandingPageMetadata,
  LandingPage,
} from "@/components/LandingPage";

const page = {
  path: "/casino-games",
  title: "Casino Games on Reddy Anna — Teen Patti, Andar Bahar & Live Casino",
  h1: "Casino Games on Reddy Anna Book",
  description:
    "Play Teen Patti, Andar Bahar, Blackjack, Roulette, and live casino on Reddy Anna. One Reddy Anna ID for sports betting and casino. Fast deposits, quick withdrawals.",
  keywords: [
    "reddy anna casino",
    "teen patti online",
    "andar bahar online",
    "live casino india",
    "online casino reddy anna",
  ],
  breadcrumbLabel: "Casino Games",
  intro:
    "Reddy Anna Book is not just cricket betting — it's a complete gaming destination. Play Indian card games like Teen Patti and Andar Bahar, international casino classics, and live dealer games with HD streaming. All accessible with your single Reddy Anna ID.",
  sections: [
    {
      title: "Popular Casino Games",
      content: "The casino section on Reddy Anna Book includes:",
      list: [
        "Teen Patti — India's favorite card game with fast rounds",
        "Andar Bahar — simple, exciting 50/50 card game",
        "Blackjack — strategy card game with skill element",
        "Roulette — bet on numbers, colors, or sections",
        "Baccarat — elegant live casino classic",
        "Live Casino — real dealers via HD video stream",
      ],
    },
    {
      title: "How to Play Casino on Reddy Anna",
      content:
        "Login with your Reddy Anna ID, navigate to the Casino section, choose a game, set your bet amount, and play. Winnings credit to your wallet instantly. Withdraw via UPI within 24 hours — same as sports betting winnings.",
    },
    {
      title: "Sports vs Casino on Reddy Anna",
      content:
        "Many users enjoy both — cricket bets during IPL match days and Teen Patti or Andar Bahar between matches. One wallet, one login, unlimited entertainment on India's most trusted platform since 2010.",
    },
  ],
  relatedLinks: [
    { href: "/blog/teen-patti-andar-bahar-casino-guide", label: "Casino Guide" },
    { href: "/cricket-betting", label: "Cricket Betting" },
    { href: "/reddy-anna-id", label: "Get Reddy Anna ID" },
    { href: "/deposit-withdrawal", label: "Deposits & Withdrawals" },
  ],
};

export const metadata = createLandingPageMetadata(page);

export default function CasinoGamesPage() {
  return <LandingPage {...page} />;
}
