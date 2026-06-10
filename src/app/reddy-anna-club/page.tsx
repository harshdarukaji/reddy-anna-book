import {
  createLandingPageMetadata,
  LandingPage,
} from "@/components/LandingPage";

const page = {
  path: "/reddy-anna-club",
  title: "Reddy Anna Club — reddybook.club Beginner Betting Platform",
  h1: "Reddy Anna Club — reddybook.club",
  description:
    "Reddy Anna Club (reddybook.club) — beginner-friendly betting platform with clean interface, ₹1,500 starter bonus, and easy cricket betting. Get access with your Reddy Anna ID.",
  keywords: [
    "reddy anna club",
    "reddybook club",
    "reddybook.club",
    "reddy anna club login",
    "reddy anna club id",
  ],
  breadcrumbLabel: "Reddy Anna Club",
  intro:
    "Reddy Anna Club, also known as reddybook.club, is the perfect starting point for new bettors. With a clean, simple interface and ₹1,500 starter bonus, it's designed for beginners who want easy cricket betting without a complicated dashboard.",
  sections: [
    {
      title: "Why Choose Reddy Anna Club?",
      content: "Reddy Anna Club is ideal if you're new to online betting:",
      list: [
        "Clean, simple interface — no confusing menus",
        "₹1,500 Starter Bonus for new users",
        "Easy cricket market navigation",
        "Same secure wallet as Reddy Anna Book",
        "24/7 WhatsApp support for beginners",
      ],
    },
    {
      title: "How to Access Reddy Anna Club",
      content:
        "Your Reddy Anna ID works across all Reddybook platforms including reddybook.club. Contact the official WhatsApp agent and request Reddy Anna Club access along with your ID setup. Activation takes under 2 minutes.",
    },
    {
      title: "Reddy Anna Club vs Reddy Anna Book",
      content:
        "Reddy Anna Book is the premium platform for live betting and high-stakes games. Reddy Anna Club is simplified for beginners. As you gain experience, upgrade to reddybook.live or reddybook.pro for advanced features and higher bonuses.",
    },
  ],
  relatedLinks: [
    { href: "/blog/reddy-anna-club-reddybook-platforms", label: "All Platforms Guide" },
    { href: "/registration", label: "Register" },
    { href: "/reddy-anna-id", label: "Get ID" },
    { href: "/cricket-betting", label: "Cricket Betting" },
  ],
};

export const metadata = createLandingPageMetadata(page);

export default function ReddyAnnaClubPage() {
  return <LandingPage {...page} />;
}
