"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./ui";

export function FAQ({
  limit,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = limit ? siteConfig.faqs.slice(0, limit) : siteConfig.faqs;

  return (
    <section className="bg-dark-card py-20" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Reddy Anna Book — Frequently Asked Questions"
            description="Clear answers about account setup, login, security, payments, and support."
          />
        )}

        <div className={`space-y-3 ${showHeading ? "mt-12" : ""}`}>
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="pr-4 font-medium text-white">
                  {faq.question}
                </span>
                <span className="shrink-0 text-gold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="border-t border-white/10 px-5 py-4">
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
