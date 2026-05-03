"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function CancelContent() {
  const params = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const id = params.get("orderId") || localStorage.getItem("memodroom_order_id");
    setOrderId(id);
  }, [params]);

  const createHref = orderId ? `/create?orderId=${orderId}` : "/create";

  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto mb-8">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="font-serif text-3xl font-normal mb-4">
        Your order wasn&apos;t completed.
      </h1>
      <p className="text-sm text-zinc-500 mb-10 leading-relaxed">
        No charge was made. Your progress is saved — pick up right where you left off.
      </p>

      <Link
        href={createHref}
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#d9a016] text-black font-semibold rounded-full hover:bg-[#ecb82a] transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Back to your Memo
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </Link>

      <div className="mt-8">
        <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
          Return to home
        </Link>
      </div>
    </div>
  );
}

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      <header className="border-b border-white/5 px-6 py-4">
        <Link href="/" className="text-sm tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors font-medium">
          Memodroom
        </Link>
      </header>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 border-2 border-white/10 border-t-[#d9a016] rounded-full animate-spin" />
          </div>
        }
      >
        <CancelContent />
      </Suspense>
    </div>
  );
}
