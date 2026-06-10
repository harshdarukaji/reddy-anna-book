import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./ui";

export function Testimonials() {
  return (
    <section className="py-20" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="User Reviews"
          title="What Our Users Say"
          description={`Join ${siteConfig.userCount} satisfied users who trust Reddy Anna Book.`}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {siteConfig.testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex text-gold" aria-label="5 star rating">
                {"★★★★★"}
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-white">{t.name}</span>
                  <span className="text-zinc-500">, {t.city}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
