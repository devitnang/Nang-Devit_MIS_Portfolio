"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  Maximize2,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const images = project.images && project.images.length > 0 ? project.images : [];
  const hasMultipleImages = images.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance && hasMultipleImages) {
      // Swiped left -> next image
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance && hasMultipleImages) {
      // Swiped right -> prev image
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="group rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Interactive Image Slider */}
        <div
          onClick={() => onOpenModal(project)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-16/10 bg-slate-900 overflow-hidden cursor-pointer group/img select-none"
          title="Click to expand gallery"
        >
          {images.length > 0 ? (
            <div
              className="flex w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <div key={idx} className="relative w-full h-full shrink-0">
                  <Image
                    src={img.url}
                    alt={img.alt || `${project.title} screenshot ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <Code2 className="w-10 h-10" />
            </div>
          )}

          {/* Category Badge overlay */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#0B2046]/90 text-white backdrop-blur-xs border border-white/10 z-10">
            {project.category}
          </div>

          {/* Slide Counter Overlay */}
          {hasMultipleImages && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-white backdrop-blur-xs border border-white/10 z-10 flex items-center gap-1">
              <span>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}

          {/* Slide Arrow Navigation */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/75 hover:bg-[#0B2046] text-white opacity-80 sm:opacity-0 sm:group-hover/img:opacity-100 transition-all duration-150 hover:scale-110 shadow-md z-20 cursor-pointer border border-white/10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/75 hover:bg-[#0B2046] text-white opacity-80 sm:opacity-0 sm:group-hover/img:opacity-100 transition-all duration-150 hover:scale-110 shadow-md z-20 cursor-pointer border border-white/10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-slate-950/60 backdrop-blur-xs px-2.5 py-1 rounded-full max-w-[90%] overflow-x-auto">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => handleDotClick(e, dotIdx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
                    dotIdx === currentIndex
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/80"
                  )}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.year}
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
              {project.role}
            </span>
          </div>

          <h3
            onClick={() => onOpenModal(project)}
            className="text-lg font-bold text-[#0B2046] dark:text-white mb-2.5 line-clamp-2 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer transition-colors"
          >
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between">
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2046] dark:text-blue-400 hover:underline transition-colors cursor-pointer"
        >
          <span>Details & Screenshots</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.documentationUrl && (
            <a
              href={project.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-[#0B2046] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              title="Read Architecture Documentation (PDF)"
            >
              <FileText className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="View GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-[#0B2046] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              title="Open Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

