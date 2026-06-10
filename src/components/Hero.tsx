import { siteConfig } from "@/lib/site-config";
import { CTAButton, WhatsAppButton } from "./ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-green/5 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm text-gold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            Trusted by {siteConfig.userCount} Users Across India
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="text-gold">Reddy Anna</span> Official Website —{" "}
            <span className="bg-gradient-to-r from-gold to-green-light bg-clip-text text-transparent">
              Book, Login & Online Cricket ID
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:mt-6 sm:text-lg lg:text-xl">
            India&apos;s #1 trusted platform for online cricket betting. Get
            your instant Cricket ID in 2 minutes, enjoy 24-hour withdrawals,
            100% secure transactions, and round-the-clock support.
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <WhatsAppButton className="w-full sm:w-auto">
              Get Reddy Anna ID — Free
            </WhatsAppButton>
            <CTAButton href="/login" variant="outline" className="w-full sm:w-auto">
              Reddy Anna Login
            </CTAButton>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-4">
            {[
              { value: "2 Min", label: "ID Creation" },
              { value: "24/7", label: "Support" },
              { value: "24 Hr", label: "Withdrawals" },
              { value: "2010", label: "Since" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur sm:p-4"
              >
                <p className="text-xl font-bold text-gold sm:text-2xl">{stat.value}</p>
                <p className="text-[11px] text-zinc-400 sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
