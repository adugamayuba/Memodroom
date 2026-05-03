"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useMemodroom } from "@/lib/context";
import { Step1 } from "@/components/steps/Step1";
import { Step2 } from "@/components/steps/Step2";
import { Step3 } from "@/components/steps/Step3";
import { Step4 } from "@/components/steps/Step4";
import { Step5 } from "@/components/steps/Step5";
import { ToastManager } from "@/components/ui/Toast";
import { useToast } from "@/lib/useToast";

const STEPS = [
  { number: 1, label: "From" },
  { number: 2, label: "Photos" },
  { number: 3, label: "Personalize" },
  { number: 4, label: "Voice" },
  { number: 5, label: "Plan" },
];

export default function CreatePage() {
  const { state, setStep } = useMemodroom();
  const { toasts, addToast, removeToast } = useToast();

  // Auto-redirect if orderId exists and status isn't draft
  useEffect(() => {
    const orderId = localStorage.getItem("memodroom_order_id");
    if (orderId && state.step === 1) {
      // Hydration will handle this — the context reads from localStorage
    }
  }, [state.step]);

  const goNext = () => {
    if (state.step < 5) setStep((state.step + 1) as 1 | 2 | 3 | 4 | 5);
  };

  const goBack = () => {
    if (state.step > 1) setStep((state.step - 1) as 1 | 2 | 3 | 4 | 5);
  };

  const goToStep = (n: number) => {
    if (n < state.step) setStep(n as 1 | 2 | 3 | 4 | 5);
  };

  const progressPct = ((state.step - 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors font-medium">
          Memodroom
        </Link>
        <p className="text-xs text-zinc-600">
          Step {state.step} of {STEPS.length}
        </p>
      </header>

      {/* Progress bar */}
      <div className="h-px bg-white/5 relative">
        <div
          className="absolute left-0 top-0 h-full bg-[#d9a016] transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-1">
            {STEPS.map((s, i) => {
              const isCompleted = state.step > s.number;
              const isCurrent = state.step === s.number;
              const canClick = s.number < state.step;

              return (
                <div key={s.number} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => canClick && goToStep(s.number)}
                    disabled={!canClick}
                    className={`flex items-center gap-2 transition-all ${
                      canClick ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-all ${
                        isCompleted
                          ? "bg-[#d9a016] text-black"
                          : isCurrent
                          ? "bg-[#d9a016]/20 border border-[#d9a016]/60 text-[#d9a016]"
                          : "bg-white/5 border border-white/10 text-zinc-600"
                      }`}
                    >
                      {isCompleted ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 5l2 2.5L8 2" />
                        </svg>
                      ) : (
                        s.number
                      )}
                    </div>
                    <span
                      className={`text-xs hidden sm:block transition-colors ${
                        isCurrent ? "text-zinc-300" : isCompleted ? "text-zinc-500" : "text-zinc-700"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-3 h-px bg-white/8" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {state.step === 1 && <Step1 onNext={goNext} addToast={addToast} />}
        {state.step === 2 && <Step2 onNext={goNext} onBack={goBack} addToast={addToast} />}
        {state.step === 3 && <Step3 onNext={goNext} onBack={goBack} addToast={addToast} />}
        {state.step === 4 && <Step4 onNext={goNext} onBack={goBack} addToast={addToast} />}
        {state.step === 5 && <Step5 onBack={goBack} addToast={addToast} />}
      </main>

      <ToastManager toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
