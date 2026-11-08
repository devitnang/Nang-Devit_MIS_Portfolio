"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { educationList } from "@/data/educationData";
import {
  Calendar,
  MapPin,
  Eye,
  X,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { ParallaxBackground } from "@/components/ui/Parallax";

export function EducationSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section
      id="education"
      className="relative py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors overflow-hidden"
    >
      {/* Ambient Parallax Multi-Plane Depth Background */}
      <ParallaxBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Academic Qualifications"
            title="Education Background"
            subtitle="Formal higher education in Management Information Systems (MIS) integrating enterprise technology management with advanced computer science disciplines."
          />
        </ScrollReveal>

        {/* Clean Line-Based Academic Timeline */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
          {educationList.map((edu, idx) => {
            const courseImg = edu.courseImage || "/assets/images/my_course.JPG";

            return (
              <ScrollReveal
                key={edu.id}
                animation="fade-up"
                delay={idx * 100}
                className="relative py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
              >
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-6 pr-12 sm:pr-0">
                  {/* SETEC Logo */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-white p-1 border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} Logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#0B2046] dark:text-blue-300">
                        {edu.year}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {edu.period}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0B2046] dark:text-white leading-tight">
                      {edu.institution}
                    </h3>

                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0" />
                      <span>{edu.degree}</span>
                    </p>

                    <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{edu.location}</span>
                    </p>
                  </div>
                </div>

                {/* Eye Icon Action Button (Top-right aligned on mobile, centered on desktop) */}
                <div className="absolute top-6 right-0 sm:static sm:top-auto sm:right-auto flex items-center shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedImage(courseImg)}
                    className="p-2 sm:p-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0B2046] dark:hover:text-blue-400 transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer flex items-center justify-center group focus-visible:ring-2 focus-visible:ring-[#0B2046] dark:focus-visible:ring-blue-400 active:scale-95"
                    title="Preview Course Curriculum"
                    aria-label="Preview Course Curriculum"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B2046] dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Course Image */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImage(null);
          }}
        >
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#0D182E] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                <h3 className="text-sm sm:text-base font-bold text-[#0B2046] dark:text-white">
                  SETEC Institute — MIS Course Curriculum
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Open original in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close image modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex items-center justify-center bg-slate-950/20">
              <div className="relative w-full max-w-3xl aspect-16/11 sm:aspect-16/10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
                <Image
                  src={selectedImage}
                  alt="SETEC MIS Course Full View"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Management Information Systems (MIS) — Year 4
              </span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="px-4 py-1.5 rounded-md text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
