"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton } from "./ui";

function getTimeLeft() {
  const target = new Date("2026-03-22T19:30:00+05:30").getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function IPLCountdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green/20 via-dark-card to-gold/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gold/30 bg-dark/80 p-8 backdrop-blur lg:p-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Limited Time Offer
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Reddy Anna IPL 2026 Welcome Offers
            </h2>
            <p className="mt-3 text-zinc-400">
              Create your Reddy Anna ID now & unlock exclusive IPL bonuses instantly
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-3 sm:gap-6">
            {units.map((unit) => (
              <div key={unit.label} className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-2xl font-bold text-gold sm:h-20 sm:w-20 sm:text-3xl">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <p className="mt-2 text-xs text-zinc-400">{unit.label}</p>
              </div>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "₹5,000 Welcome Bonus",
              "Free Bet on First IPL Betting",
              "Daily Cashback Rewards",
              "High Winnings Boost Deals",
              "Special Mega IPL Contests",
              "Premium Reddy Book Rewards",
            ].map((offer) => (
              <li
                key={offer}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3 text-sm text-zinc-300"
              >
                <span className="text-green-light">✓</span>
                {offer}
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <WhatsAppButton message="Hi! I want to claim my IPL 2026 bonus and get my Reddy Anna ID.">
              Get Free Reddy Anna ID — Claim ₹5,000 Bonus
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
