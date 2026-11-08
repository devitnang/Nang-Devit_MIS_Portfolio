"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { GithubIcon } from "@/components/ui/Icons";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Layers,
  Building,
  FileText,
  Users,
  ExternalLink,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const images = project.images && project.images.length > 0 ? project.images : [];
  const currentImage = images[currentImageIndex];

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0D182E] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/60 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-100 dark:bg-blue-950/60 text-[#0B2046] dark:text-blue-300 border border-blue-200 dark:border-blue-900/40">
                {project.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B2046] dark:text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Gallery Carousel */}
          {images.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt || project.title}
                  fill
                  className="object-contain"
                  priority
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-[#0B2046] transition-colors cursor-pointer border border-white/10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-[#0B2046] transition-colors cursor-pointer border border-white/10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-mono border border-white/10">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Caption */}
              {currentImage.caption && (
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 italic">
                  {currentImage.caption}
                </p>
              )}

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="flex gap-2 justify-start sm:justify-center overflow-x-auto custom-scrollbar py-1.5 px-1 max-w-full">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-12 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                        idx === currentImageIndex
                          ? "border-[#0B2046] dark:border-blue-400 shadow-sm scale-105"
                          : "border-slate-300 dark:border-slate-700 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0" />
              <span className="text-slate-500 dark:text-slate-400">Role:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {project.role}
              </span>
            </div>
            {project.clientOrOrg && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0" />
                <span className="text-slate-500 dark:text-slate-400">Context:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {project.clientOrOrg}
                </span>
              </div>
            )}
            {project.teamMembers && project.teamMembers.length > 0 && (
              <div className="flex items-center gap-2 sm:col-span-2">
                <Users className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0" />
                <span className="text-slate-500 dark:text-slate-400">Project Team:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {project.teamMembers.join(" • ")}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 mb-2">
              Project Overview & Architecture
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 mb-3">
                Key Deliverables & Specifications
              </h4>
              <ul className="space-y-2">
                {project.keyFeatures.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 mb-2.5">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <div className="flex flex-wrap items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold bg-[#0B2046] text-white hover:bg-[#07152E] dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors shadow-2xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Website</span>
              </a>
            )}
            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold bg-blue-50 dark:bg-blue-950/70 text-[#0B2046] dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-900/50 transition-colors"
              >
                <FileText className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                <span>PDF Documentation</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
