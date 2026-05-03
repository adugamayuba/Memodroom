"use client";

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-white">
        <Link href="/" className="text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-gray-600 transition-colors font-medium">
          Memodroom
        </Link>
        <p className="text-xs text-gray-400">
          Step {state.step} of {STEPS.length}
        </p>
      </header>

      {/* Progress bar */}
      <div className="h-0.5 bg-gray-100 relative">
        <div
          className="absolute left-0 top-0 h-full bg-[#25D366] transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="border-b border-gray-100 bg-white">
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
                          ? "bg-[#25D366] text-white"
                          : isCurrent
                          ? "bg-[#25D366]/15 border border-[#25D366]/50 text-[#25D366]"
                          : "bg-gray-100 border border-gray-200 text-gray-400"
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
                        isCurrent ? "text-gray-700" : isCompleted ? "text-gray-400" : "text-gray-300"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-3 h-px bg-gray-100" />
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
