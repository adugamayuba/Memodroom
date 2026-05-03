"use client";

import { useState } from "react";
import { useMemodroom } from "@/lib/context";
import { createOrder } from "@/lib/api";

interface Step1Props {
  onNext: () => void;
  addToast: (msg: string) => void;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Step1({ onNext, addToast }: Step1Props) {
  const { state, setSender, setOrderId, setLoading, setError } = useMemodroom();
  const [name, setName] = useState(state.senderName);
  const [email, setEmail] = useState(state.senderEmail);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = "Your name is required";
    if (!email.trim()) e.email = "Your email is required";
    else if (!isValidEmail(email)) e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await createOrder(email.trim(), name.trim());
      if (!res.success) {
        addToast(res.error || "Something went wrong. Please try again.");
        return;
      }
      setSender(email.trim(), name.trim());
      setOrderId(res.orderId);
      onNext();
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Connection error — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-10">
        <h2 className="font-serif text-3xl font-normal text-gray-900 mb-2">
          Who is this from?
        </h2>
        <p className="text-sm text-gray-500">
          We&apos;ll use your name in the video and send you the result.
        </p>
      </div>

      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Jane"
            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/10 focus:bg-white ${
              errors.name ? "border-red-400" : "border-gray-200"
            }`}
            autoFocus
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="jane@example.com"
            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/10 focus:bg-white ${
              errors.email ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
          )}
          <p className="mt-1.5 text-xs text-gray-400">
            We&apos;ll send your finished video here.
          </p>
        </div>

        <button
          onClick={handleNext}
          disabled={state.isLoading}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1db954] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-md shadow-[#25D366]/20"
        >
          {state.isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Setting up...
            </>
          ) : (
            <>
              Continue
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
