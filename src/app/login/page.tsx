import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/ui";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createMetadata({
  title: "Reddy Anna Login — Access Your Account Securely",
  description:
    "Reddy Anna Login guide — enter your username and password to access sports betting, casino games, wallet management, and live cricket betting on Reddy Anna Book.",
  path: "/login",
  keywords: ["reddy anna login", "reddy anna book login", "anna reddy login"],
});

export default function LoginPage() {
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Login", url: `${siteConfig.url}/login` },
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
          <span className="text-zinc-300">Login</span>
        </nav>

        <h1 className="text-4xl font-bold text-white">Reddy Anna Login</h1>
        <p className="mt-4 text-lg text-zinc-400">
          Access your Reddy Anna Book account securely and start betting in
          seconds.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold text-white">
              How to Login to Reddy Anna
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-6 text-zinc-300">
              <li>Enter your registered username provided during registration.</li>
              <li>Input your password securely on the login page.</li>
              <li>If OTP is enabled, verify the OTP sent to your mobile.</li>
              <li>Access your dashboard with sports betting, casino, and wallet.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              What You Get After Login
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Live sports betting with real-time odds",
                "Casino games — Teen Patti, Andar Bahar, Blackjack",
                "Wallet management — deposits & withdrawals",
                "Betting history and performance tracking",
                "Stable performance during IPL peak traffic",
                "Mobile and desktop access",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-lg bg-white/5 px-4 py-3 text-sm text-zinc-300"
                >
                  <span className="text-green-light">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-gold/30 bg-gold/5 p-8">
            <h2 className="text-xl font-semibold text-white">
              Don&apos;t Have an Account?
            </h2>
            <p className="mt-2 text-zinc-400">
              Get your Reddy Anna ID in just 2 minutes via WhatsApp. No complex
              verification required.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <WhatsAppButton>Get Reddy Anna ID</WhatsAppButton>
              <Link
                href="/registration"
                className="inline-flex items-center text-gold hover:underline"
              >
                View Registration Guide →
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Forgot Password?
            </h2>
            <p className="mt-2 text-zinc-400">
              Use the Forgot Password option on the login screen, or contact
              support on WhatsApp with your registered mobile number for instant
              help.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
