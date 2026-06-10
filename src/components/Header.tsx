"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/site-config";
import { CTAButton, WhatsAppButton } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <Logo height={40} />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <CTAButton href="/login" variant="outline" className="!px-4 !py-2">
            Login
          </CTAButton>
          <WhatsAppButton className="!px-4 !py-2">Get ID</WhatsAppButton>
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <WhatsAppButton className="!min-h-10 !px-3 !py-2 !text-xs">Get ID</WhatsAppButton>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-zinc-300 active:bg-white/10"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-4 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-3">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-white/5 hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <CTAButton href="/login" variant="outline">
                Login
              </CTAButton>
              <WhatsAppButton>Get Reddy Anna ID</WhatsAppButton>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
