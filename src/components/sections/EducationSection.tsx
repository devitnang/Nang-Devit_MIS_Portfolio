"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { educationList } from "@/data/educationData";
import {
  Calendar,
  MapPin,
  Eye,
  X,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

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
      className="py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Academic Qualifications"
          title="Education Background"
          subtitle="Formal higher education in Management Information Systems (MIS) integrating enterprise technology management with advanced computer science disciplines."
        />

        {/* Clean Line-Based Academic Timeline */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
          {educationList.map((edu) => {
            const courseImg = edu.courseImage || "/assets/images/my_course.JPG";

            return (
              <div
                key={edu.id}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Institution Details Column (Left 6 cols) */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white p-1 border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} Logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#0B2046] dark:text-blue-300 block mb-0.5">
                        {edu.year}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0B2046] dark:text-white leading-tight">
                        {edu.institution}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-1">
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0" />
                      <span>{edu.degree}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400 shrink-0" />
                      <span>{edu.period}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{edu.location}</span>
                    </p>
                  </div>

                  <div className="pt-2 pl-1">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(courseImg)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0B2046] hover:bg-[#07152E] dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all shadow-2xs hover:shadow cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View My Course</span>
                    </button>
                  </div>
                </div>

                {/* Coursework Image Preview Card (Right 6 cols) */}
                <div className="lg:col-span-6">
                  <div
                    onClick={() => setSelectedImage(courseImg)}
                    className="relative aspect-16/10 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 group cursor-pointer shadow-2xs hover:shadow-lg transition-all select-none"
                    title="Click to view full course curriculum"
                  >
                    <Image
                      src={courseImg}
                      alt="SETEC MIS Course Curriculum"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Gradient Overlay & Eye Button */}
                    <div className="absolute inset-0 bg-[#0B2046]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4">
                      <span className="px-4 py-2 rounded-lg bg-white text-[#0B2046] text-xs font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform">
                        <Eye className="w-4 h-4 text-[#0B2046]" />
                        <span>View Full Course Image</span>
                      </span>
                    </div>

                    {/* Badge top-right */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-xs border border-white/10 flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-blue-400" />
                      <span>Course Curriculum</span>
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-slate-950/20">
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
