"use client";

import { useState } from "react";
import { useMemodroom } from "@/lib/context";
import { patchOrder } from "@/lib/api";
import { VIBE_META, STYLE_META, RELATIONSHIPS } from "@/lib/types";
import type { Vibe, Style } from "@/lib/types";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  addToast: (msg: string) => void;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Step3({ onNext, onBack, addToast }: Step3Props) {
  const { state, dispatch, setLoading } = useMemodroom();
  const [recipientName, setRecipientName] = useState(state.recipientName);
  const [recipientEmail, setRecipientEmail] = useState(state.recipientEmail);
  const [relationship, setRelationship] = useState(state.relationship);
  const [messageText, setMessageText] = useState(state.messageText);
  const [vibe, setVibe] = useState<Vibe>(state.vibe);
  const [style, setStyle] = useState<Style>(state.style);
  const [errors, setErrors] = useState<{ recipientName?: string; recipientEmail?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!recipientName.trim()) e.recipientName = "Recipient name is required";
    if (recipientEmail && !isValidEmail(recipientEmail))
      e.recipientEmail = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (!state.orderId) {
      addToast("Order not found. Please restart.");
      return;
    }

    setLoading(true);
    try {
      const res = await patchOrder(state.orderId, {
        recipientName: recipientName.trim(),
        recipientEmail: recipientEmail.trim() || undefined,
        relationship,
        messageText: messageText.trim(),
        vibe,
        style,
      });

      if (!res.success) {
        addToast(res.error || "Failed to save. Please try again.");
        return;
      }

      dispatch({
        type: "SET_PERSONALIZATION",
        payload: {
          recipientName: recipientName.trim(),
          recipientEmail: recipientEmail.trim(),
          relationship,
          messageText: messageText.trim(),
          vibe,
          style,
        },
      });
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
        <h2 className="font-serif text-3xl font-normal text-[#f5f0e8] mb-2">
          Personalize your Memo
        </h2>
        <p className="text-sm text-zinc-500">
          Tell us about who you&apos;re sending this to and set the tone.
        </p>
      </div>

      <div className="space-y-8 max-w-2xl">
        {/* Recipient name */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Who is this for? <span className="text-[#d9a016]">*</span>
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => {
              setRecipientName(e.target.value);
              if (errors.recipientName) setErrors((p) => ({ ...p, recipientName: undefined }));
            }}
            placeholder="Mom"
            className={`w-full bg-zinc-900/60 border rounded-xl px-4 py-3 text-[#f5f0e8] placeholder-zinc-600 outline-none transition-all focus:border-[#d9a016]/60 focus:bg-zinc-900 ${
              errors.recipientName ? "border-red-500/60" : "border-white/10"
            }`}
          />
          {errors.recipientName && (
            <p className="mt-1.5 text-xs text-red-400">{errors.recipientName}</p>
          )}
        </div>

        {/* Recipient email */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Send it directly to them?{" "}
            <span className="text-zinc-600 font-normal">(optional)</span>
          </label>
          <p className="text-xs text-zinc-600 mb-2">
            We&apos;ll email them the video after you&apos;ve seen it first.
          </p>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => {
              setRecipientEmail(e.target.value);
              if (errors.recipientEmail) setErrors((p) => ({ ...p, recipientEmail: undefined }));
            }}
            placeholder="recipient@example.com"
            className={`w-full bg-zinc-900/60 border rounded-xl px-4 py-3 text-[#f5f0e8] placeholder-zinc-600 outline-none transition-all focus:border-[#d9a016]/60 focus:bg-zinc-900 ${
              errors.recipientEmail ? "border-red-500/60" : "border-white/10"
            }`}
          />
          {errors.recipientEmail && (
            <p className="mt-1.5 text-xs text-red-400">{errors.recipientEmail}</p>
          )}
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Your relationship
          </label>
          <div className="flex flex-wrap gap-2">
            {RELATIONSHIPS.map((r) => (
              <button
                key={r}
                onClick={() => setRelationship(r)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  relationship === r
                    ? "bg-[#d9a016] text-black"
                    : "border border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-300"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Your message{" "}
            <span className="text-zinc-600 font-normal">(optional)</span>
          </label>
          <p className="text-xs text-zinc-600 mb-2">
            Leave blank and the AI will craft something beautiful from scratch.
          </p>
          <div className="relative">
            <textarea
              value={messageText}
              onChange={(e) => {
                if (e.target.value.length <= 280) setMessageText(e.target.value);
              }}
              placeholder="You've always been my anchor..."
              rows={4}
              className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-[#f5f0e8] placeholder-zinc-600 outline-none transition-all focus:border-[#d9a016]/60 focus:bg-zinc-900 resize-none"
            />
            <span className={`absolute bottom-3 right-3 text-xs ${messageText.length >= 260 ? "text-yellow-500" : "text-zinc-600"}`}>
              {messageText.length}/280
            </span>
          </div>
          <p className="mt-1.5 text-xs text-zinc-600">
            The AI will use this as creative inspiration — it won&apos;t be read word for word.
          </p>
        </div>

        {/* Vibe */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">Vibe</label>
          <div className="grid grid-cols-2 gap-3">
            {(Object.entries(VIBE_META) as [Vibe, typeof VIBE_META[Vibe]][]).map(
              ([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setVibe(key)}
                  className={`text-left px-4 py-3.5 rounded-xl border transition-all ${
                    vibe === key
                      ? "border-[#d9a016]/60 bg-[#d9a016]/8 text-[#f5f0e8]"
                      : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-300"
                  }`}
                >
                  <p className="font-medium text-sm">{meta.label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{meta.description}</p>
                </button>
              )
            )}
          </div>
        </div>

        {/* Style / Atmosphere */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Atmosphere
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(Object.entries(STYLE_META) as [Style, typeof STYLE_META[Style]][]).map(
              ([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setStyle(key)}
                  className={`text-left px-4 py-4 rounded-xl border transition-all ${
                    style === key
                      ? "border-[#d9a016]/60 bg-[#d9a016]/8"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="text-lg mb-2 block">{meta.icon}</span>
                  <p className={`font-medium text-sm ${style === key ? "text-[#f5f0e8]" : "text-zinc-300"}`}>
                    {meta.label}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{meta.description}</p>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-white/10 rounded-xl text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-300 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={state.isLoading}
          className="flex items-center gap-2 px-8 py-3 bg-[#d9a016] text-black font-semibold rounded-xl hover:bg-[#ecb82a] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {state.isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Saving...
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
