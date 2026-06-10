import { SectionHeading, WhatsAppButton } from "./ui";

const steps = [
  {
    step: "01",
    title: "Connect with Agent",
    description:
      "Contact a verified Reddy Anna agent on WhatsApp for instant account setup.",
  },
  {
    step: "02",
    title: "Share Basic Details",
    description:
      "Provide your name and mobile number. No lengthy forms or complex documentation.",
  },
  {
    step: "03",
    title: "Get Your Cricket ID",
    description:
      "Your unique Reddy Anna ID is generated within 2 minutes.",
  },
  {
    step: "04",
    title: "Start Betting",
    description:
      "Log in, add funds via UPI, and place bets on cricket, casino, and live games.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-dark-card py-20" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get Started"
          title="How to Get Reddy Anna ID in 2 Minutes"
          description="Fast, simple, and beginner-friendly registration process."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.step} className="relative">
              <span className="text-5xl font-black text-gold/20">{item.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <WhatsAppButton>Get Reddy Anna ID Now</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
