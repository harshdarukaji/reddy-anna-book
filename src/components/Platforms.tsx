import { siteConfig } from "@/lib/site-config";
import { SectionHeading, WhatsAppButton } from "./ui";

export function Platforms() {
  return (
    <section className="bg-dark-card py-20" id="platforms">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="All Platforms"
          title="Access All Reddy Book Platforms in One Place"
          description="One ID. Multiple platforms. Get instant access to Reddy Anna Book, reddybook.live, reddybook.club, and more with exclusive bonuses."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.platforms.map((platform) => (
            <article
              key={platform.slug}
              className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                "featured" in platform && platform.featured
                  ? "border-gold/40 bg-gradient-to-br from-gold/10 to-transparent shadow-lg shadow-gold/10"
                  : "border-white/10 bg-white/5 hover:border-gold/30"
              }`}
            >
              {"featured" in platform && platform.featured && (
                <span className="absolute -top-3 right-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-dark">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-white">{platform.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {platform.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-green-light">
                🎁 {platform.bonus}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Best for: {platform.bestFor}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <WhatsAppButton>Get All IDs in 2 Minutes</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
