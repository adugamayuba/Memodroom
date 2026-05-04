import Link from "next/link";
import { PLAN_META } from "@/lib/types";
import { FloatingIcons } from "@/components/ui/FloatingIcons";
import { TrackingLink } from "@/components/ui/TrackingLink";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload a photo",
    body: "Share a clear, front-facing photo. Our AI studies every detail to build your digital likeness.",
  },
  {
    step: "02",
    title: "AI writes and directs",
    body: "Pick a vibe and atmosphere. The AI crafts a personal script and directs a cinematic scene around you.",
  },
  {
    step: "03",
    title: "Delivered in minutes",
    body: "Your video message arrives in your inbox in under 10 minutes — ready to share or keep.",
  },
];

const FAQS = [
  {
    q: "How long does it take?",
    a: "About 5–10 minutes after payment. You'll receive it via email the moment it's ready.",
  },
  {
    q: "What if I don't upload a voice clip?",
    a: "A professional studio voice is used. It sounds warm, natural, and great — many customers prefer it.",
  },
  {
    q: "Can I send it directly to the recipient?",
    a: "Yes. Enter their email on Step 3 and we'll deliver it directly to them after you've seen it first.",
  },
  {
    q: "What is the Apex Reelin Twin?",
    a: "Your recipient gets their own Reelin AI digital twin — a personalised AI version of themselves, available to them indefinitely.",
  },
  {
    q: "What photo works best?",
    a: "A single person, front-facing, in good lighting. Avoid heavy shadows or sunglasses. JPEG, PNG, or WebP all work.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f2f4f3] text-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-gray-200/60 bg-[#f2f4f3]/90 backdrop-blur-md">
        <span className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
          Memodroom
        </span>
        <Link
          href="/create"
          className="text-sm px-5 py-2 bg-[#FF7B31] text-white font-semibold rounded-full hover:bg-[#e86a24] transition-colors shadow-sm shadow-[#FF7B31]/20"
        >
          Create your Memo
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 bg-[#f2f4f3] overflow-hidden">
        {/* Floating doodle icons */}
        <FloatingIcons />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f2f4f3] to-transparent pointer-events-none z-10" />

        <div className="relative z-20 max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-normal leading-[1.05] text-balance mb-6 text-gray-900">
            Your Memory,
            <br />
            Directed by AI.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Turn a photo into a 4K cinematic video message, in under 10 minutes.
          </p>
          <TrackingLink
            href="/create"
            eventName="hero_cta_clicked"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF7B31] text-white font-semibold text-base rounded-full hover:bg-[#e86a24] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FF7B31]/25"
          >
            Create Your Memo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </TrackingLink>
          <p className="mt-4 text-sm text-gray-400">No account required · Starts at $14.99</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3 font-medium">Process</p>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-gray-900">
            Three steps. One extraordinary gift.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(({ step, title, body }) => (
            <div key={step} className="group">
              <p className="text-[#FF7B31] font-mono text-sm mb-4 font-semibold">{step}</p>
              <h3 className="text-lg font-medium mb-3 text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              <div className="mt-6 h-px bg-gray-200 group-hover:bg-[#FF7B31]/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-28 px-6 bg-white border-y border-gray-200/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3 font-medium">Pricing</p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-gray-900">
              One payment. No subscription.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(["single", "bundle", "apex"] as const).map((planKey) => {
              const plan = PLAN_META[planKey];
              const isHighlighted = planKey === "bundle";
              return (
                <div
                  key={planKey}
                  className={`relative rounded-2xl p-8 border transition-all ${
                    isHighlighted
                      ? "border-[#FF7B31]/40 bg-[#FF7B31]/4 shadow-lg shadow-[#FF7B31]/10"
                      : "border-gray-200 bg-[#f2f4f3] hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#FF7B31] text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">{plan.label}</p>
                  <p className="text-4xl font-serif font-normal text-gray-900 mb-1">{plan.price}</p>
                  <p className="text-sm text-gray-500 mb-6">{plan.videos}</p>
                  {plan.extras && (
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">{plan.extras}</p>
                  )}
                  <TrackingLink
                    href="/create"
                    eventName="pricing_cta_clicked"
                    eventProps={{ plan: planKey }}
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                      isHighlighted
                        ? "bg-[#FF7B31] text-white hover:bg-[#e86a24]"
                        : "border border-gray-200 text-gray-600 bg-white hover:border-[#FF7B31] hover:text-[#FF7B31]"
                    }`}
                  >
                    Get started
                  </TrackingLink>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3 font-medium">FAQ</p>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-gray-900">Common questions</h2>
        </div>
        <div className="space-y-0">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className="py-7 border-b border-gray-200 last:border-0">
              <p className="font-medium text-gray-900 mb-3">{q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 text-center border-t border-gray-200/60 bg-white">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-gray-900">
            Make something unforgettable.
          </h2>
          <TrackingLink
            href="/create"
            eventName="footer_cta_clicked"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF7B31] text-white font-semibold rounded-full hover:bg-[#e86a24] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FF7B31]/25"
          >
            Create Your Memo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </TrackingLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 py-8 px-6 bg-[#f2f4f3]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p className="text-sm text-gray-500 font-medium">Memodroom</p>
            <p className="text-xs text-gray-400">A product of Reelin AI Inc.</p>
          </div>
          <a
            href="mailto:hello@memodroom.com"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            hello@memodroom.com
          </a>
        </div>
      </footer>
    </main>
  );
}
