"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ProjectImage } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentIndex] || {
    url: "/assets/images/logo/mylogo.png",
    caption: projectTitle,
    alt: projectTitle,
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance && hasMultipleImages) {
      handleNext();
    } else if (distance < -minSwipeDistance && hasMultipleImages) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-16/9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-2">
          <Layers className="w-8 h-8 opacity-40" />
          <span className="text-xs uppercase tracking-wider font-semibold">
            No screenshots available
          </span>
        </div>
      </div>
    );
  }

  return (
    <section aria-label="Project Gallery" className="space-y-4">
      {/* Main Display Stage */}
      <div
        className="relative w-full aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xl group/gallery select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={currentImage.url}
          alt={currentImage.alt || `${projectTitle} screenshot ${currentIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-contain transition-transform duration-300 group-hover/gallery:scale-[1.01]"
        />

        {/* Ambient Top & Bottom Vignettes */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-[#0B2046] text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          title="Open Fullscreen Viewer"
          aria-label="Open Fullscreen Viewer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fullscreen</span>
        </button>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/55 hover:bg-[#0B2046] text-white backdrop-blur-md border border-white/15 transition-all shadow-lg cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Previous screenshot"
              title="Previous screenshot"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/55 hover:bg-[#0B2046] text-white backdrop-blur-md border border-white/15 transition-all shadow-lg cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Next screenshot"
              title="Next screenshot"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Bottom Bar: Image Counter & Caption */}
        <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 flex items-center justify-between gap-3 text-white pointer-events-none">
          {currentImage.caption ? (
            <p className="text-xs sm:text-sm font-medium text-slate-100 drop-shadow-md truncate max-w-[80%]">
              {currentImage.caption}
            </p>
          ) : (
            <span />
          )}

          {hasMultipleImages && (
            <span className="shrink-0 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono font-semibold tracking-wider">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
      </div>

      {/* Thumbnails Row */}
      {hasMultipleImages && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto custom-scrollbar py-2 px-1">
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "relative shrink-0 w-20 h-14 sm:w-28 sm:h-18 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 group",
                  isActive
                    ? "border-[#0B2046] dark:border-blue-400 ring-2 ring-blue-500/30 scale-[1.03] shadow-md opacity-100"
                    : "border-slate-300 dark:border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-400"
                )}
                aria-label={`Switch to screenshot ${idx + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen screenshot viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLightboxOpen(false);
          }}
        >
          {/* Top Controls */}
          <div className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-8 flex items-center justify-between text-white z-20 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-300">
                {projectTitle}
              </span>
              {hasMultipleImages && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-mono">
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Close fullscreen viewer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Fullscreen Image Canvas */}
          <div className="relative w-full h-[80vh] sm:h-[86vh] max-w-6xl mx-auto px-4 sm:px-12 flex items-center justify-center">
            <Image
              src={currentImage.url}
              alt={currentImage.alt || `${projectTitle} fullscreen screenshot`}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Lightbox Prev / Next Controls */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:scale-110 active:scale-95 border border-white/10"
                aria-label="Previous screenshot (Left Arrow)"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:scale-110 active:scale-95 border border-white/10"
                aria-label="Next screenshot (Right Arrow)"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Lightbox Caption */}
          {currentImage.caption && (
            <div className="absolute bottom-4 inset-x-4 sm:bottom-6 text-center text-xs sm:text-sm font-medium text-slate-300 px-4 py-2 rounded-lg bg-black/60 max-w-2xl mx-auto backdrop-blur-sm border border-white/10">
              {currentImage.caption}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
