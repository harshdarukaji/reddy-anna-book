import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./ui";

export function Features() {
  return (
    <section className="py-20" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Top Features of Reddy Anna Book"
          description="Unmatched reliability, unlimited transactions, and round-the-clock customer service for a hassle-free betting experience."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-gold/30 hover:bg-white/[0.07]"
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
