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
        <h2 className="font-serif text-3xl font-normal text-gray-900 mb-2">
          Upload your photo
        </h2>
        <p className="text-sm text-gray-500">
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
            ? "border-[#25D366] bg-[#25D366]/5"
            : files.length >= MAX_FILES
            ? "border-gray-200 cursor-not-allowed opacity-50"
            : "border-gray-200 hover:border-[#25D366]/50 hover:bg-gray-50"
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
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">
              Drag and drop, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP · Up to 3 photos</p>
          </div>
          {files.length > 0 && (
            <span className="text-xs font-semibold text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded-full">
              {files.length}/{MAX_FILES} selected
            </span>
          )}
        </div>
      </div>

      {/* File errors */}
      {fileErrors.length > 0 && (
        <div className="mt-3 space-y-1">
          {fileErrors.map((err, i) => (
            <p key={i} className="text-xs text-red-500">{err}</p>
          ))}
        </div>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {previews.map((src, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-2 py-1.5">
                  <p className="text-[10px] text-[#25D366] font-semibold text-center leading-tight">
                    Main photo — AI avatar
                  </p>
                </div>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm"
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
      <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-xl">
        <p className="text-xs text-gray-500 leading-relaxed">
          Use a clear, front-facing photo in good lighting. The AI performs best with a single person visible and no heavy shadows or sunglasses.
        </p>
      </div>

      {/* Upload progress */}
      {uploadProgress && (
        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
          <span className="w-4 h-4 border-2 border-gray-200 border-t-[#25D366] rounded-full animate-spin" />
          Uploading your photos...
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
          onClick={handleNext}
          disabled={state.isLoading || files.length === 0}
          className="flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1db954] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#25D366]/20"
        >
          {state.isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
