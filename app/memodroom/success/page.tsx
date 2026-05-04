"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOrder } from "@/lib/api";
import { STYLE_META } from "@/lib/types";
import { track } from "@vercel/analytics";
import type { Order, OrderStatus } from "@/lib/types";

const MAX_POLL_MS = 20 * 60 * 1000;

const STATUS_STEPS: Array<{
  status: OrderStatus;
  label: string;
  detail: string;
  progress: number;
}> = [
  { status: "paid", label: "Payment confirmed", detail: "Your order is confirmed.", progress: 10 },
  {
    status: "processing",
    label: "Building your AI avatar",
    detail: "Our AI is studying every pixel of your photo...",
    progress: 30,
  },
  {
    status: "avatar_ready",
    label: "Avatar ready — rendering",
    detail: "Crafting your words into something unforgettable...",
    progress: 60,
  },
  {
    status: "video_ready",
    label: "Finalizing your Memo",
    detail: "Nearly there — adding the final touches...",
    progress: 85,
  },
  {
    status: "delivered",
    label: "Your Memo is on its way",
    detail: "Your cinematic video message is ready.",
    progress: 100,
  },
];

const BUNDLE_LABELS = [
  "Version 1 · The Greenhouse",
  "Version 2 · The Terrace",
  "Version 3 · The Studio",
];

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLong, setIsLong] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const deliveredFiredRef = useRef(false);

  const poll = useCallback(async (id: string, email: string) => {
    try {
      const res = await getOrder(id, email);
      if (res.success && res.order) {
        setOrder(res.order);
        if (res.order.status === "delivered" || res.order.status === "failed") {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (res.order.status === "delivered" && !deliveredFiredRef.current) {
            deliveredFiredRef.current = true;
            track("payment_success", { plan: res.order.plan, style: res.order.style, vibe: res.order.vibe });
          }
        }
      }
    } catch {
      // Silently ignore poll errors
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("memodroom_email") || "";
    setSenderEmail(email);

    if (!orderId) {
      setError("No order ID found.");
      return;
    }

    poll(orderId, email);

    intervalRef.current = setInterval(() => {
      if (Date.now() - startTimeRef.current > MAX_POLL_MS) {
        clearInterval(intervalRef.current!);
        setIsLong(true);
        return;
      }
      poll(orderId, email);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [orderId, poll]);

  const currentStatus = order?.status ?? "processing";
  const currentStep = STATUS_STEPS.find((s) => s.status === currentStatus);
  const progressPct = currentStep?.progress ?? 10;

  const completedStatuses = new Set<OrderStatus>(
    STATUS_STEPS.slice(
      0,
      STATUS_STEPS.findIndex((s) => s.status === currentStatus) + 1
    ).map((s) => s.status)
  );

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">{error}</p>
        <Link href="/" className="mt-6 inline-block text-sm text-[#FF7B31] hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 animate-fade-in">
      {currentStatus === "failed" ? (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl mb-3 text-[#231D1D]">Something went wrong</h1>
          <p className="text-gray-500 text-sm mb-6">
            We couldn&apos;t generate your Memo. Please contact us and we&apos;ll sort it out.
          </p>
          <a href="mailto:hello@memodroom.com" className="text-sm text-[#FF7B31] hover:underline">
            hello@memodroom.com
          </a>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#FF7B31] mb-3 font-semibold">Memodroom</p>
            {currentStatus === "delivered" ? (
              <h1 className="font-serif text-4xl mb-3 text-[#231D1D]">Your Memo is ready.</h1>
            ) : (
              <h1 className="font-serif text-4xl mb-3 text-[#231D1D]">
                {currentStep?.label ?? "Processing your Memo"}
              </h1>
            )}
            <p className="text-sm text-gray-500">{currentStep?.detail ?? ""}</p>
          </div>

          {/* Progress bar */}
          {currentStatus !== "delivered" && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs text-gray-400">{progressPct}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF7B31] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Status tracker */}
          <div className="space-y-0 mb-10">
            {STATUS_STEPS.filter((s) => s.status !== "failed").map((s) => {
              const isDone = completedStatuses.has(s.status);
              const isCurrent = currentStatus === s.status && currentStatus !== "delivered";

              return (
                <div key={s.status} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                  <div className="shrink-0 mt-0.5">
                    {isDone && currentStatus === "delivered" ? (
                      <div className="w-6 h-6 rounded-full bg-[#FF7B31] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      </div>
                    ) : isDone ? (
                      <div className="w-6 h-6 rounded-full bg-[#FF7B31] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      </div>
                    ) : isCurrent ? (
                      <div className="w-6 h-6 rounded-full border-2 border-[#FF7B31]/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border-2 border-[#FF7B31]/20 border-t-[#FF7B31] animate-spin" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-200 bg-gray-50" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium transition-colors ${isDone || isCurrent ? "text-[#231D1D]" : "text-gray-300"}`}>
                      {s.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-gray-400 mt-0.5">{s.detail}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Email notice */}
          {currentStatus !== "delivered" && senderEmail && (
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl mb-6">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                We&apos;ll send it to{" "}
                <span className="text-gray-700 font-medium">{senderEmail}</span>{" "}
                the moment it&apos;s ready.
              </p>
            </div>
          )}

          {/* Long wait notice */}
          {isLong && currentStatus !== "delivered" && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl mb-6">
              <p className="text-xs text-gray-500 leading-relaxed text-center">
                Taking a bit longer than usual — check your email, it may already be there.{" "}
                <a href="mailto:hello@memodroom.com" className="text-[#FF7B31] hover:underline">
                  Contact support
                </a>
              </p>
            </div>
          )}

          {/* Videos */}
          {currentStatus === "delivered" && order && (order.videoUrls?.length ?? 0) > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-center mb-2 text-[#231D1D]">Your Memo</h2>
              {order.videoUrls.map((url, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  {order.plan === "bundle" && (
                    <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-xs text-gray-500 font-medium">{BUNDLE_LABELS[i] || `Version ${i + 1}`}</p>
                    </div>
                  )}
                  <video
                    src={url}
                    controls
                    playsInline
                    className="w-full aspect-video bg-gray-100"
                  />
                  <div className="px-5 py-3 flex justify-end border-t border-gray-100">
                    <a
                      href={url}
                      download={`memodroom-${i + 1}.mp4`}
                      onClick={() => track("video_downloaded", { index: i + 1, plan: order.plan })}
                      className="text-xs text-gray-400 hover:text-[#FF7B31] flex items-center gap-1.5 transition-colors"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Style badge */}
          {order && (
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                Atmosphere · {STYLE_META[order.style]?.label ?? order.style}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#231D1D]">
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
        <SuccessContent />
      </Suspense>
    </div>
  );
}
