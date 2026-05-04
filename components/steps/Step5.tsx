"use client";

import { useState } from "react";
import { useMemodroom } from "@/lib/context";
import { patchOrder, createCheckout } from "@/lib/api";
import { track } from "@vercel/analytics";
import { PLAN_META, STYLE_META, VIBE_META } from "@/lib/types";
import type { Plan } from "@/lib/types";

interface Step5Props {
  onBack: () => void;
  addToast: (msg: string) => void;
}

export function Step5({ onBack, addToast }: Step5Props) {
  const { state, dispatch, setLoading } = useMemodroom();
  const [plan, setPlan] = useState<Plan>(state.plan);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!state.orderId) {
      addToast("Order not found. Please restart.");
      return;
    }

    setIsCheckingOut(true);
    setLoading(true);

    try {
      const patchRes = await patchOrder(state.orderId, { plan });
      if (!patchRes.success) {
        addToast(patchRes.error || "Failed to save plan. Please try again.");
        return;
      }

      dispatch({ type: "SET_PLAN", payload: plan });

      const checkoutRes = await createCheckout(state.orderId);
      if (!checkoutRes.success) {
        addToast(checkoutRes.error || "Checkout failed. Please try again.");
        return;
      }

      track("checkout_started", { plan, price: PLAN_META[plan].price });
      window.location.href = checkoutRes.checkoutUrl;
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Connection error — please try again");
    } finally {
      setIsCheckingOut(false);
      setLoading(false);
    }
  };

  const planKeys: Plan[] = ["single", "bundle", "apex"];

  return (
    <div className="animate-slide-up">
      <div className="mb-10">
        <h2 className="font-serif text-3xl font-normal text-[#231D1D] mb-2">
          Choose your plan
        </h2>
        <p className="text-sm text-gray-500">One payment. No subscription. No surprises.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {planKeys.map((key) => {
          const p = PLAN_META[key];
          const isSelected = plan === key;
          return (
            <button
              key={key}
              onClick={() => { setPlan(key); track("plan_selected", { plan: key, price: p.price }); }}
              className={`relative text-left rounded-2xl p-6 border transition-all ${
                isSelected
                  ? "border-[#FF7B31]/50 bg-[#FF7B31]/5 shadow-md shadow-[#FF7B31]/10"
                  : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-4">
                  <span className="bg-[#FF7B31] text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap uppercase tracking-wide">
                    {p.badge}
                  </span>
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{p.label}</p>
                  <p className="text-3xl font-serif text-[#231D1D]">{p.price}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 mt-1 transition-all flex items-center justify-center shrink-0 ${
                    isSelected ? "border-[#FF7B31] bg-[#FF7B31]" : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 5l2.5 2.5L8 2" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{p.videos}</p>
              {p.extras && (
                <p className="text-xs text-gray-400 leading-relaxed">{p.extras}</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Order summary */}
      <div className="border border-gray-200 rounded-2xl p-6 mb-6 bg-gray-50">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">Order summary</p>
        <div className="space-y-3">
          <SummaryRow label="Recipient" value={state.recipientName || "—"} />
          <SummaryRow label="Atmosphere" value={STYLE_META[state.style]?.label || state.style} />
          <SummaryRow label="Vibe" value={VIBE_META[state.vibe]?.label || state.vibe} />
          <SummaryRow
            label="Voice"
            value={state.voiceUploaded ? "Your voice" : "Studio voice"}
          />
          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-lg font-serif text-[#231D1D]">{PLAN_META[plan].price}</span>
          </div>
        </div>
      </div>

      {/* Trust signals */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF7B31" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          100% satisfaction guarantee — if your Memo isn&apos;t stunning, we&apos;ll remake it.
        </div>
        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF7B31" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Secured by Stripe · Visa · Mastercard · Amex · Apple Pay
        </div>
        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF7B31" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Estimated delivery: ~5–10 minutes after payment
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          disabled={isCheckingOut}
          className="px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#FF7B31] text-white font-semibold rounded-xl hover:bg-[#e86a24] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#FF7B31]/20"
        >
          {isCheckingOut ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Redirecting to payment...
            </>
          ) : (
            <>
              Continue to Payment
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm text-gray-700">{value}</span>
    </div>
  );
}
