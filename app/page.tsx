import Link from "next/link";
import { PLAN_META } from "@/lib/types";

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
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
        <span className="text-sm tracking-[0.2em] uppercase text-zinc-400 font-medium">
          Memodroom
        </span>
        <Link
          href="/create"
          className="text-sm px-5 py-2 bg-[#d9a016] text-black font-semibold rounded-full hover:bg-[#ecb82a] transition-colors"
        >
          Create your Memo
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#d9a016] mb-6 font-medium">
            by Reelin AI
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-normal leading-[1.05] text-balance mb-6">
            Your Memory,
            <br />
            Directed by AI.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Turn a photo into a 4K cinematic video message — in under 10 minutes.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d9a016] text-black font-semibold text-base rounded-full hover:bg-[#ecb82a] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Your Memo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-zinc-600">No account required · Starts at $14.99</p>
        </div>

        {/* Decorative gradient orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#d9a016]/5 blur-[120px] pointer-events-none" />
      </section>

      {/* How It Works */}
      <section className="py-28 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">Process</p>
          <h2 className="font-serif text-3xl md:text-4xl font-normal">
            Three steps. One extraordinary gift.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(({ step, title, body }) => (
            <div key={step} className="group">
              <p className="text-[#d9a016] font-mono text-sm mb-4 opacity-70">{step}</p>
              <h3 className="text-lg font-medium mb-3 text-[#f5f0e8]">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
              <div className="mt-6 h-px bg-white/5 group-hover:bg-[#d9a016]/20 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-28 px-6 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">Pricing</p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal">
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
                      ? "border-[#d9a016]/50 bg-[#d9a016]/5"
                      : "border-white/8 bg-white/2 hover:border-white/15"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#d9a016] text-black text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <p className="text-xs tracking-widest uppercase text-zinc-500 mb-3">{plan.label}</p>
                  <p className="text-4xl font-serif font-normal text-[#f5f0e8] mb-1">{plan.price}</p>
                  <p className="text-sm text-zinc-500 mb-6">{plan.videos}</p>
                  {plan.extras && (
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{plan.extras}</p>
                  )}
                  <Link
                    href="/create"
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                      isHighlighted
                        ? "bg-[#d9a016] text-black hover:bg-[#ecb82a]"
                        : "border border-white/15 text-zinc-300 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    Get started
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">FAQ</p>
          <h2 className="font-serif text-3xl md:text-4xl font-normal">Common questions</h2>
        </div>
        <div className="space-y-0">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="py-7 border-b border-white/8 last:border-0"
            >
              <p className="font-medium text-[#f5f0e8] mb-3">{q}</p>
              <p className="text-sm text-zinc-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 text-center border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-normal mb-6">
            Make something unforgettable.
          </h2>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d9a016] text-black font-semibold rounded-full hover:bg-[#ecb82a] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Your Memo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            Memodroom · by Reelin AI
          </p>
          <a
            href="mailto:hello@memodroom.com"
            className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            hello@memodroom.com
          </a>
        </div>
      </footer>
    </main>
  );
}
