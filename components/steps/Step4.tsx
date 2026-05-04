"use client";

import { useState, useRef, useEffect } from "react";
import { useMemodroom } from "@/lib/context";
import { uploadVoice } from "@/lib/api";
import { track } from "@vercel/analytics";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  addToast: (msg: string) => void;
}

type Mode = "idle" | "recording" | "recorded" | "uploading" | "done";

export function Step4({ onNext, onBack, addToast }: Step4Props) {
  const { state, dispatch } = useMemodroom();
  const [mode, setMode] = useState<Mode>("idle");
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [waveValues, setWaveValues] = useState<number[]>(Array(20).fill(4));
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_SECONDS = 10;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (waveRef.current) clearInterval(waveRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        setRecordedUrl(url);
        setMode("recorded");
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setElapsed(0);
      setMode("recording");

      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev + 1 >= MAX_SECONDS) {
            stopRecording();
            return MAX_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);

      waveRef.current = setInterval(() => {
        setWaveValues(Array.from({ length: 20 }, () => Math.random() * 28 + 4));
      }, 120);
    } catch {
      addToast("Microphone access denied. Please allow microphone access and try again.");
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (waveRef.current) clearInterval(waveRef.current);
    mediaRecorderRef.current?.stop();
    setWaveValues(Array(20).fill(4));
  };

  const handleUploadVoice = async (file: File | Blob, fileName?: string) => {
    if (!state.orderId) { addToast("Order not found."); return; }
    setIsUploading(true);
    setMode("uploading");
    try {
      const f = file instanceof File ? file : new File([file], fileName || "voice.webm", { type: file.type });
      const res = await uploadVoice(state.orderId, f);
      if (!res.success) {
        addToast(res.error || "Voice upload failed.");
        setMode(recordedBlob ? "recorded" : "idle");
        return;
      }
      dispatch({ type: "SET_VOICE_UPLOADED", payload: true });
      track("voice_uploaded");
      setMode("done");
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Connection error");
      setMode(recordedBlob ? "recorded" : "idle");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadedFile(f);
    handleUploadVoice(f);
  };

  const handleSkip = () => {
    dispatch({ type: "SET_VOICE_UPLOADED", payload: false });
    track("voice_skipped");
    onNext();
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-3xl font-normal text-[#231D1D]">
            Add your voice
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
            Optional
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Record a 5–10 second clip in a quiet room. The AI just needs to hear your voice — say anything.
        </p>
      </div>

      <button
        onClick={handleSkip}
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-8 flex items-center gap-1.5"
      >
        Skip this step
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6h8M6 2l4 4-4 4" />
        </svg>
      </button>

      {mode === "done" ? (
        <div className="p-6 bg-green-50 border border-[#FF7B31]/25 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FF7B31]/15 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#FF7B31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l5 5 7-9" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FF7B31]">Voice uploaded</p>
            <p className="text-xs text-gray-500 mt-0.5">Your photo will speak in your voice</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Record option */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-5">Record a clip</p>

            {/* Waveform */}
            <div className="flex items-center justify-center gap-1 h-10 mb-6">
              {waveValues.map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full transition-all duration-100"
                  style={{
                    height: `${h}px`,
                    backgroundColor: mode === "recording" ? "#FF7B31" : "#e5e7eb",
                  }}
                />
              ))}
            </div>

            {mode === "idle" || mode === "recorded" ? (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={startRecording}
                  className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-300 hover:border-red-400 hover:bg-red-100 transition-all flex items-center justify-center group"
                >
                  <div className="w-6 h-6 rounded-full bg-red-500 group-hover:scale-110 transition-transform" />
                </button>
                <p className="text-xs text-gray-400">
                  {mode === "recorded" ? "Record again" : "Tap to record"}
                </p>
              </div>
            ) : mode === "recording" ? (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={stopRecording}
                  className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-400 transition-all flex items-center justify-center"
                >
                  <div className="w-5 h-5 rounded bg-red-500" />
                </button>
                <p className="text-sm font-mono text-red-500">
                  {elapsed}s / {MAX_SECONDS}s
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="w-4 h-4 border-2 border-gray-200 border-t-[#FF7B31] rounded-full animate-spin" />
                Uploading...
              </div>
            )}

            {mode === "recorded" && recordedUrl && (
              <div className="mt-5 space-y-3">
                <audio controls src={recordedUrl} className="w-full h-10" />
                <button
                  onClick={() => recordedBlob && handleUploadVoice(recordedBlob, "recording.webm")}
                  disabled={isUploading}
                  className="w-full py-2.5 bg-[#FF7B31] text-white font-semibold text-sm rounded-xl hover:bg-[#e86a24] transition-all disabled:opacity-40 shadow-sm shadow-[#FF7B31]/20"
                >
                  Use this recording
                </button>
              </div>
            )}
          </div>

          {/* Upload option */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-3">Or upload a file</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/mpeg,audio/mp4,audio/ogg,audio/webm,audio/wav"
              className="hidden"
              onChange={handleFileSelect}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-[#FF7B31]/40 hover:text-[#FF7B31] transition-all disabled:opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              {uploadedFile ? uploadedFile.name : "Choose audio file"}
            </button>
            <p className="text-xs text-gray-400 mt-2">MP3, MP4, OGG, WebM, WAV</p>
          </div>

          {/* Studio voice fallback note */}
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <p className="text-xs text-gray-500 leading-relaxed">
              Skipping? A professional Studio Voice will be used — it sounds great.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={mode === "recording" || mode === "uploading"}
          className="flex items-center gap-2 px-8 py-3 bg-[#FF7B31] text-white font-semibold rounded-xl hover:bg-[#e86a24] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#FF7B31]/20"
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
