"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { educationList } from "@/data/educationData";
import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  Award,
} from "lucide-react";

export function EducationSection() {
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

        <div className="max-w-4xl mx-auto space-y-8">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="relative p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-[#0B2046] dark:bg-blue-600 rounded-b" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  {/* SETEC Logo */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white p-2 border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} Official Seal`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-[#0B2046] dark:text-blue-300">
                        {edu.year}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Undergraduate Degree
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#0B2046] dark:text-white">
                      {edu.institution}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[#D32F2F] dark:text-red-400 mt-0.5">
                      {edu.degree}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="sm:text-right space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex sm:justify-end items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex sm:justify-end items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {edu.description}
              </p>

              {/* Core Coursework Grid */}
              <div className="mb-6">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-[#D32F2F]" />
                  <span>Key Coursework & Technical Specializations</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {edu.coreCourses.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                  <span>Academic Standing & Project Leadership</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {edu.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

