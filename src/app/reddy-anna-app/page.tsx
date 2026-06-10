import {
  createLandingPageMetadata,
  LandingPage,
} from "@/components/LandingPage";

const page = {
  path: "/reddy-anna-app",
  title: "Reddy Anna App — Download Official Mobile Betting App (2026)",
  h1: "Reddy Anna App — Official Mobile Betting Application",
  description:
    "Download the official Reddy Anna App for Android and iOS. Live cricket betting, casino games, UPI deposits, and 24-hour withdrawals on your phone.",
  keywords: [
    "reddy anna app",
    "reddy anna book app",
    "reddy anna mobile app",
    "reddy anna app download",
  ],
  breadcrumbLabel: "Reddy Anna App",
  intro:
    "The Reddy Anna Book App brings India's most trusted cricket betting platform to your pocket. Bet on IPL 2026, play Teen Patti and Andar Bahar, manage your wallet, and withdraw winnings — all from your smartphone with faster performance than the website.",
  sections: [
    {
      title: "Reddy Anna App Features",
      content:
        "The app is optimized for live betting during high-traffic IPL matches with instant odds updates, one-tap UPI deposits, and push notifications for bonuses and match starts.",
      list: [
        "Live cricket betting with ball-by-ball odds",
        "Casino: Teen Patti, Andar Bahar, Blackjack, Live Dealers",
        "Instant UPI deposits via GPay, PhonePe, Paytm",
        "24-hour withdrawal requests from mobile",
        "Stable during IPL peak — no lag or crashes",
      ],
    },
    {
      title: "How to Get the Reddy Anna App",
      content:
        "Contact the official agent on WhatsApp to receive the download link. Android users get the APK file; iPhone users get a web app link to add to their home screen. Setup takes under 2 minutes with your Reddy Anna ID.",
    },
    {
      title: "Reddy Anna App vs Browser",
      content:
        "The app loads 40% faster for live betting and keeps you logged in securely. Use the browser if you prefer not to install anything — both access the same account and wallet.",
    },
  ],
  relatedLinks: [
    { href: "/reddy-anna-apk", label: "Reddy Anna APK" },
    { href: "/login", label: "Reddy Anna Login" },
    { href: "/blog/reddy-anna-app-download-apk", label: "App Download Guide" },
    { href: "/reddy-anna-id", label: "Get Reddy Anna ID" },
  ],
};

export const metadata = createLandingPageMetadata(page);

export default function ReddyAnnaAppPage() {
  return <LandingPage {...page} />;
}
