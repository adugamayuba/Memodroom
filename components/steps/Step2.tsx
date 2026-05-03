"use client";

import { useState, useRef, useCallback } from "react";
import { useMemodroom } from "@/lib/context";
import { uploadPhotos } from "@/lib/api";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  addToast: (msg: string) => void;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILES = 3;

export function Step2({ onNext, onBack, addToast }: Step2Props) {
  const { state, dispatch, setLoading } = useMemodroom();
  const [files, setFiles] = useState<File[]>(state.photos);
  const [previews, setPreviews] = useState<string[]>(
    state.photos.map((f) => URL.createObjectURL(f))
  );
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const newErrors: string[] = [];
    const valid: File[] = [];

    for (const f of arr) {
      if (!ACCEPTED.includes(f.type)) {
        newErrors.push(`${f.name}: Only JPEG, PNG, and WebP are supported`);
        continue;
      }
      if (files.length + valid.length >= MAX_FILES) {
        newErrors.push(`Maximum ${MAX_FILES} photos allowed`);
        break;
      }
      valid.push(f);
    }

    setFileErrors(newErrors);
    if (valid.length === 0) return;

    const newFiles = [...files, ...valid].slice(0, MAX_FILES);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setFiles(newFiles);
    setPreviews(newPreviews);
  }, [files]);

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleNext = async () => {
    if (files.length === 0) {
      addToast("Please add at least one photo to continue.");
      return;
    }
    if (!state.orderId) {
      addToast("Order not found. Please go back and start again.");
      return;
    }

    setLoading(true);
    setUploadProgress(true);
    try {
      const res = await uploadPhotos(state.orderId, files);
      if (!res.success) {
        addToast(res.error || "Photo upload failed. Please try again.");
        return;
      }
      dispatch({ type: "SET_PHOTOS", payload: files });
      dispatch({ type: "SET_PHOTO_URLS", payload: res.photoUrls || [] });
      onNext();
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Connection error — please try again");
    } finally {
      setLoading(false);
      setUploadProgress(false);
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-10">
        <h2 className="font-serif text-3xl font-normal text-[#f5f0e8] mb-2">
          Upload your photo
        </h2>
        <p className="text-sm text-zinc-500">
          Add 1–3 photos. The first one will be used to build your AI avatar.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => files.length < MAX_FILES && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
          isDragging
            ? "border-[#d9a016]/60 bg-[#d9a016]/5"
            : files.length >= MAX_FILES
            ? "border-white/10 cursor-not-allowed opacity-50"
            : "border-white/15 hover:border-white/25 hover:bg-white/2"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-zinc-300 font-medium">
              Drag and drop, or click to browse
            </p>
            <p className="text-xs text-zinc-600 mt-1">JPEG, PNG, WebP · Up to 3 photos</p>
          </div>
          {files.length > 0 && (
            <span className="text-xs font-medium text-[#d9a016] bg-[#d9a016]/10 px-3 py-1 rounded-full">
              {files.length}/{MAX_FILES} selected
            </span>
          )}
        </div>
      </div>

      {/* File errors */}
      {fileErrors.length > 0 && (
        <div className="mt-3 space-y-1">
          {fileErrors.map((err, i) => (
            <p key={i} className="text-xs text-red-400">{err}</p>
          ))}
        </div>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {previews.map((src, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-2 py-1.5">
                  <p className="text-[10px] text-[#d9a016] font-medium text-center leading-tight">
                    Main photo — AI avatar
                  </p>
                </div>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tip */}
      <div className="mt-6 p-4 bg-zinc-900/40 border border-white/5 rounded-xl">
        <p className="text-xs text-zinc-500 leading-relaxed">
          Use a clear, front-facing photo in good lighting. The AI performs best with a single person visible and no heavy shadows or sunglasses.
        </p>
      </div>

      {/* Upload progress */}
      {uploadProgress && (
        <div className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
          <span className="w-4 h-4 border-2 border-zinc-600 border-t-[#d9a016] rounded-full animate-spin" />
          Uploading your photos...
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-white/10 rounded-xl text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-300 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={state.isLoading || files.length === 0}
          className="flex items-center gap-2 px-8 py-3 bg-[#d9a016] text-black font-semibold rounded-xl hover:bg-[#ecb82a] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {state.isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Uploading...
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
