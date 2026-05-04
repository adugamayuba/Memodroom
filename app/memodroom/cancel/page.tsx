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
      <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-8">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="font-serif text-3xl font-normal mb-4 text-gray-900">
        Your order wasn&apos;t completed.
      </h1>
      <p className="text-sm text-gray-500 mb-10 leading-relaxed">
        No charge was made. Your progress is saved — pick up right where you left off.
      </p>

      <Link
        href={createHref}
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF7B31] text-white font-semibold rounded-full hover:bg-[#e86a24] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FF7B31]/20"
      >
        Back to your Memo
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </Link>

      <div className="mt-8">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          Return to home
        </Link>
      </div>
    </div>
  );
}

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] text-gray-900">
      <header className="border-b border-gray-100 px-6 py-4 bg-white">
        <Link href="/" className="text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-gray-600 transition-colors font-medium">
          Memodroom
        </Link>
      </header>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#FF7B31] rounded-full animate-spin" />
          </div>
        }
      >
        <CancelContent />
      </Suspense>
    </div>
  );
}
