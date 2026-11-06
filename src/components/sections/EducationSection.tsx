"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { educationList } from "@/data/educationData";
import {
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

        {/* Clean Line-Based Academic Timeline (No outer box, clean dividing lines only) */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Institution Details Column (Left 4 cols) */}
              <div className="lg:col-span-4 space-y-4">
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
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2046] dark:text-white leading-tight">
                      {edu.institution}
                    </h3>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pl-1">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {edu.degree}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
                    <span>{edu.period}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.location}</span>
                  </p>
                </div>
              </div>

              {/* Coursework & Achievements Column (Right 8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {edu.description}
                </p>

                {/* Coursework */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                    <span>Key Coursework & Technical Specializations</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {edu.coreCourses.map((course, idx) => (
                      <div
                        key={idx}
                        className="py-1.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B2046] dark:bg-blue-400 shrink-0" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                    <span>Academic Highlights & Leadership</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {edu.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
