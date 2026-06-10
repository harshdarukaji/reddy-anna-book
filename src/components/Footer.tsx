import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-dark-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <Logo height={40} href="/" />
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              India&apos;s most trusted hub for cricket, football, casino, and
              exchange betting. Secure payments, 24/7 support, and responsible
              gaming since {siteConfig.established}.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Guides & Pages
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/reddy-anna-app", label: "Reddy Anna App" },
                { href: "/reddy-anna-apk", label: "Reddy Anna APK" },
                { href: "/reddy-anna-club", label: "Reddy Anna Club" },
                { href: "/cricket-betting", label: "Cricket Betting" },
                { href: "/casino-games", label: "Casino Games" },
                { href: "/deposit-withdrawal", label: "Deposit & Withdraw" },
                { href: "/about", label: "About Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Customer Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-green-light"
                >
                  WhatsApp Support — 24/7
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-zinc-500">
            © {year} {siteConfig.name}. All rights reserved. Users must be 18+
            years old. Please gamble responsibly.
          </p>
          <p className="mt-2 text-center text-xs text-zinc-600">
            Keywords: reddy anna, reddy anna book, reddy anna login, reddy anna
            id, reddy anna app, reddy anna apk, reddy anna club, reddybook,
            cricket betting india, ipl betting 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
