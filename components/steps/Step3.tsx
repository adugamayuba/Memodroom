"use client";

import { useState } from "react";
import { useMemodroom } from "@/lib/context";
import { patchOrder } from "@/lib/api";
import { track } from "@vercel/analytics";
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
      track("personalization_saved", { vibe, style, relationship, hasRecipientEmail: !!recipientEmail.trim(), hasMessage: !!messageText.trim() });
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
          Personalize your Memo
        </h2>
        <p className="text-sm text-gray-500">
          Tell us about who you&apos;re sending this to and set the tone.
        </p>
      </div>

      <div className="space-y-8 max-w-2xl">
        {/* Recipient name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Who is this for? <span className="text-[#FF7B31]">*</span>
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => {
              setRecipientName(e.target.value);
              if (errors.recipientName) setErrors((p) => ({ ...p, recipientName: undefined }));
            }}
            placeholder="Mom"
            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#FF7B31] focus:ring-2 focus:ring-[#FF7B31]/10 focus:bg-white ${
              errors.recipientName ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.recipientName && (
            <p className="mt-1.5 text-xs text-red-500">{errors.recipientName}</p>
          )}
        </div>

        {/* Recipient email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Send it directly to them?{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <p className="text-xs text-gray-400 mb-2">
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
            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#FF7B31] focus:ring-2 focus:ring-[#FF7B31]/10 focus:bg-white ${
              errors.recipientEmail ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.recipientEmail && (
            <p className="mt-1.5 text-xs text-red-500">{errors.recipientEmail}</p>
          )}
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your relationship
          </label>
          <div className="flex flex-wrap gap-2">
            {RELATIONSHIPS.map((r) => (
              <button
                key={r}
                onClick={() => setRelationship(r)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  relationship === r
                    ? "bg-[#FF7B31] text-white shadow-sm shadow-[#FF7B31]/20"
                    : "border border-gray-200 text-gray-600 hover:border-[#FF7B31]/40 hover:text-[#FF7B31]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your message{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <p className="text-xs text-gray-400 mb-2">
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
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#FF7B31] focus:ring-2 focus:ring-[#FF7B31]/10 focus:bg-white resize-none"
            />
            <span className={`absolute bottom-3 right-3 text-xs ${messageText.length >= 260 ? "text-orange-400" : "text-gray-400"}`}>
              {messageText.length}/280
            </span>
          </div>
          <p className="mt-1.5 text-xs text-gray-400">
            The AI will use this as creative inspiration — it won&apos;t be read word for word.
          </p>
        </div>

        {/* Vibe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Vibe</label>
          <div className="grid grid-cols-2 gap-3">
            {(Object.entries(VIBE_META) as [Vibe, typeof VIBE_META[Vibe]][]).map(
              ([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setVibe(key)}
                  className={`text-left px-4 py-3.5 rounded-xl border transition-all ${
                    vibe === key
                      ? "border-[#FF7B31]/50 bg-[#FF7B31]/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className={`font-medium text-sm ${vibe === key ? "text-[#FF7B31]" : "text-gray-700"}`}>
                    {meta.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{meta.description}</p>
                </button>
              )
            )}
          </div>
        </div>

        {/* Style / Atmosphere */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
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
                      ? "border-[#FF7B31]/50 bg-[#FF7B31]/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-lg mb-2 block">{meta.icon}</span>
                  <p className={`font-medium text-sm ${style === key ? "text-[#FF7B31]" : "text-gray-700"}`}>
                    {meta.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{meta.description}</p>
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
          className="px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={state.isLoading}
          className="flex items-center gap-2 px-8 py-3 bg-[#FF7B31] text-white font-semibold rounded-xl hover:bg-[#e86a24] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#FF7B31]/20"
        >
          {state.isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
