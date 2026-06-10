import {
  createLandingPageMetadata,
  LandingPage,
} from "@/components/LandingPage";

const page = {
  path: "/deposit-withdrawal",
  title: "Reddy Anna Deposit & Withdrawal — UPI, Bank Transfer Guide",
  h1: "Reddy Anna Deposit & Withdrawal Guide",
  description:
    "Deposit and withdraw on Reddy Anna Book via UPI, net banking, and wallets. Instant deposits, 24-hour withdrawals, secure payments, and troubleshooting help.",
  keywords: [
    "reddy anna deposit",
    "reddy anna withdrawal",
    "reddy anna upi",
    "reddy anna payment methods",
  ],
  breadcrumbLabel: "Deposit & Withdrawal",
  intro:
    "Fast, secure payments are why 55,000+ users trust Reddy Anna Book. Deposits via UPI reflect instantly. Withdrawals process within 24 hours with no hidden fees. This page covers every payment method and step-by-step instructions.",
  sections: [
    {
      title: "Supported Payment Methods",
      content: "Reddy Anna Book accepts all major Indian payment options:",
      list: [
        "UPI — GPay, PhonePe, Paytm (instant deposit)",
        "Net Banking — all major Indian banks",
        "Digital Wallets — fast mobile payments",
        "Bank Transfer — direct NEFT/IMPS deposits",
      ],
    },
    {
      title: "How to Deposit",
      content:
        "Login → Wallet/Deposit → Select UPI or bank → Enter amount → Confirm payment. Balance updates instantly in most cases. Minimum deposit amounts vary — contact WhatsApp support for current limits.",
    },
    {
      title: "How to Withdraw",
      content:
        "Login → Withdrawal section → Enter amount → Select UPI or bank transfer → Submit. Most withdrawals complete within 24 hours. If delayed, contact WhatsApp support with your transaction ID for instant resolution.",
    },
  ],
  relatedLinks: [
    { href: "/blog/reddy-anna-deposit-withdrawal-guide", label: "Detailed Payment Guide" },
    { href: "/login", label: "Login" },
    { href: "/reddy-anna-id", label: "Get ID" },
    { href: "/faq", label: "FAQ" },
  ],
};

export const metadata = createLandingPageMetadata(page);

export default function DepositWithdrawalPage() {
  return <LandingPage {...page} />;
}
