import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/ui";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createMetadata({
  title: "Reddy Anna Registration — Sign Up in 2 Minutes",
  description:
    "Complete Reddy Anna Sign Up guide. Register in 2 minutes via WhatsApp — share name and mobile, get instant login credentials. Beginner-friendly, no complex KYC.",
  path: "/registration",
  keywords: [
    "reddy anna registration",
    "reddy anna sign up",
    "reddy anna register",
  ],
});

const steps = [
  {
    title: "Connect with Verified Agent",
    description:
      "Reach out via WhatsApp to an official Reddy Anna agent. This ensures your account is authentic and secure.",
  },
  {
    title: "Submit Basic Information",
    description:
      "Provide your name and mobile number only. No lengthy documentation or complex verification process.",
  },
  {
    title: "Receive Your Reddy Anna ID",
    description:
      "Your unique ID is generated within minutes and acts as your gateway to all betting features.",
  },
  {
    title: "Get Login Credentials",
    description:
      "Instantly receive username and password. Log in and start exploring betting markets and casino games.",
  },
];

export default function RegistrationPage() {
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Registration", url: `${siteConfig.url}/registration` },
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
          <span className="text-zinc-300">Registration</span>
        </nav>

        <h1 className="text-4xl font-bold text-white">
          Reddy Anna Sign Up / Registration
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Fast, simple, and beginner-friendly. Create your account in just 2
          minutes.
        </p>

        <div className="mt-10 space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-dark">
                {i + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {step.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-green/30 bg-green/5 p-8">
          <h2 className="text-xl font-semibold text-white">
            Tips for Fast & Safe Registration
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>✓ Always use a trusted agent or official WhatsApp link</li>
            <li>✓ Double-check login credentials after receiving them</li>
            <li>✓ Keep your Reddy Anna ID and password secure</li>
            <li>✓ Never share account details with others</li>
          </ul>
          <div className="mt-6">
            <WhatsAppButton>Start Registration on WhatsApp</WhatsAppButton>
          </div>
        </section>

        <p className="mt-8 text-sm text-zinc-500">
          Already registered?{" "}
          <Link href="/login" className="text-gold hover:underline">
            Go to Reddy Anna Login
          </Link>
        </p>
      </article>
    </>
  );
}
