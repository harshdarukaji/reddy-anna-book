import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { FAQJsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/ui";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createMetadata({
  title: "Reddy Anna FAQ — Account, Login, Payments & Support",
  description:
    "Reddy Anna Book FAQ — answers about registration, login, Reddy Anna ID, deposits, withdrawals, app download, bonuses, and customer support.",
  path: "/faq",
  keywords: ["reddy anna faq", "reddy anna help", "reddy anna support"],
});

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd faqs={siteConfig.faqs} />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-zinc-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">FAQ</span>
        </nav>

        <h1 className="text-4xl font-bold text-white">
          Reddy Anna Book — FAQs
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Common questions with clear answers about account setup, login,
          security, payments, and support.
        </p>

        <div className="mt-6">
          <WhatsAppButton>Still Have Questions? Chat on WhatsApp</WhatsAppButton>
        </div>
      </div>

      <FAQ showHeading={false} />
    </>
  );
}
